<!--Created by LiuLei on 2019/9/17-->
<template>
  <draggable
    class="pc-layout"
    v-if="draggableModel"
    :tag="curContainerName"
    :component-data="{
      props:curContainerProps,
      on:{
        delete(val){
          $emit('delete',val)
        }
      }
    }"
    @add="handleDraggableAdd"
    @update="handleDraggableUpdate"
    v-model="draggableModel"
    v-bind="draggableOptions">
    <template v-for="(component,index) in layout.children">
      <!--如果是Container-->
      <PCLayout v-if="component.type === ComponentTypes.Container"
                v-bind="component.attrs"
                container
                :key="component.key"
                :layout="component"/>
      <!--如果是Header-->
      <PCLayout v-else-if="component.type === ComponentTypes.Header"
                v-bind="component.attrs"
                header
                :key="component.key"
                :layout="component"/>
      <!--如果是Aside-->
      <PCLayout v-else-if="component.type === ComponentTypes.Aside"
                v-bind="component.attrs"
                aside
                :key="component.key"
                :layout="component"/>
      <!--如果是Main-->
      <PCLayout v-else-if="component.type === ComponentTypes.Main"
                v-bind="component.attrs"
                main
                :key="component.key"
                :layout="component"/>
      <!--如果是Footer-->
      <PCLayout v-else-if="component.type === ComponentTypes.Footer"
                v-bind="component.attrs"
                footer
                :key="component.key"
                :layout="component"/>
      <!--如果是Row-->
      <PCLayout v-else-if="component.type === ComponentTypes.Row"
                v-bind="component.attrs"
                row
                :key="component.key"
                :layout="component"/>
      <!--如果是Col-->
      <PCLayout v-else-if="component.type === ComponentTypes.Col"
                v-bind="component.attrs"
                col
                :key="component.key"
                :layout="component"/>
      <!--如果是Group-->
      <PCLayout v-else-if="component.type === ComponentTypes.Group"
                v-bind="component.attrs"
                group
                @delete="deleteCurField(index)"
                @click.native.stop="updateCurrentField(component)"
                :key="component.key"
                :layout="component"/>
      <!--如果是Transition-->
      <PCLayout v-else-if="component.type === ComponentTypes.Transition"
                v-bind="component.attrs"
                transition
                :key="component.key"
                :layout="component"/>
      <!--如果是表头-->
      <fd-components-form-header v-else-if="component.type === ComponentTypes.FormHeader"
                                 @click.native="updateCurrentField(component)"
                                 :layout="component"
                                 v-bind="component.attrs"
                                 :key="component.key"
      />
      <!--如果是MobileAppBar-->
      <!--<fd-mobile-components-app-bar v-else-if="components.type === ComponentTypes.MobileAppBar"
                v-bind="components.attrs"
                @click.native.stop="updateCurrentField(components)"
                :key="components.key"
                :layout="components"/>-->
      <!--如果是Tabs-->
      <fd-components-tab v-else-if="component.type === ComponentTypes.InfoTab"
                         @click.native.stop="updateCurrentField(component)"
                         :key="component.key"
                         :layout="component"/>
      <!--如果是各种Form表单组件-->
      <fd-form-item v-else
                    @click.native.stop="updateCurrentField(component)"
                    @delete="deleteCurField(index)"
                    :layout="component"
                    :key="component.key"/>
    </template>
  </draggable>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import _ from 'lodash'
import ComponentTypes from '@/views/designer/config/ComponentTypes'
import FdComponentGroup from '@/views/designer/components/Group/index.vue'
import FdComponentTransition from '@/views/designer/components/Transition/index.vue'

import {
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Row,
  Col
} from 'element-ui'
import { IDraggableOptions, IField, fieldComponents } from '@/views/designer/config/components'
import nanoid from 'nanoid'
import updateCurrentField from '@/views/designer/mixins/updateCurrentField'
import DraggableGroupTypes from '@/views/designer/config/DraggableGroupTypes'
import DraggableClassNames from '@/views/designer/config/DraggableClassNames'
import { arrToMap } from '@/utils'
import {
  DESIGNER_EXEC_TYPES,
  DESIGNER_UI_TYPES,
  DESIGNER_USED_TYPES
} from '@/views/designer/config/Designer'
import { IDesigner } from '@/views/designer/types'

const COMPONENT_NAMES = {
  FdComponentGroup: 'FdComponentGroup',
  FdComponentTransition: 'FdComponentTransition'
}

Vue.component(COMPONENT_NAMES.FdComponentGroup, FdComponentGroup)
Vue.component(COMPONENT_NAMES.FdComponentTransition, FdComponentTransition)

@Component({
  name: 'PCLayout',
  components: {
    FdFormItem: () => import('@/views/designer/components/PCLayout/FdFormItem.vue'),
    FdComponentsTab: () => import('@/views/designer/components/Tab/index.vue'),
    FdComponentsFormHeader: () => import('@/views/designer/components/FormTitle/index.vue')
  },
  props: {
    ...(Container as any).props,
    ...(Main as any).props,
    ...(Aside as any).props,
    ...(Footer as any).props,
    ...(Header as any).props,
    ...(Row as any).props,
    ...(Col as any).props
  }
})

export default class PCLayout extends mixins(updateCurrentField) {
  @Prop({ required: true, type: Object }) readonly layout!: IField
  // @Prop({ type: String, default: 'horizontal' }) readonly direction!: string
  @Prop({ type: Boolean, default: false }) readonly row!: boolean
  @Prop({ type: Boolean, default: false }) readonly col!: boolean
  @Prop({ type: Boolean, default: false }) readonly group!: boolean
  @Prop({ type: Boolean, default: false }) readonly detailed!: boolean
  @Prop({ type: Boolean, default: false }) readonly transition!: boolean
  @Prop({ type: Boolean, default: false }) readonly container!: boolean
  @Prop({ type: Boolean, default: false }) readonly main!: boolean
  @Prop({ type: Boolean, default: false }) readonly header!: boolean
  @Prop({ type: Boolean, default: false }) readonly aside!: boolean
  @Prop({ type: Boolean, default: false }) readonly footer!: boolean
  @Prop({ type: Boolean, default: false }) readonly form!: boolean
  @Prop({ type: Boolean, default: false }) readonly draggable!: boolean
  @Prop({ type: Boolean, default: false }) readonly autoApiName!: boolean

  @Inject('designer') readonly designer!: IDesigner

  get draggableModel () {
    return this.layout.children
  }

  set draggableModel (val: any) {
    this.layout.children = val
  }

  get ComponentTypes () {
    return ComponentTypes
  }

  get curContainerName () {
    if (this.container) {
      return Container.name
    } else if (this.header) {
      return Header.name
    } else if (this.main) {
      return Main.name
    } else if (this.group) {
      return COMPONENT_NAMES.FdComponentGroup
    } else if (this.transition) {
      return COMPONENT_NAMES.FdComponentTransition
    } else if (this.aside) {
      return Aside.name
    } else if (this.footer) {
      return Footer.name
    } else if (this.row) {
      return Row.name
    } else if (this.col) {
      return Col.name
    }
    return 'div'
  }

  get curContainerProps () {
    if (this.container) {
      return this.getContainerProps(Container)
    } else if (this.header) {
      return this.getContainerProps(Header)
    } else if (this.main) {
      return this.getContainerProps(Main)
    } else if (this.group || this.transition) {
      return {
        ...this.getContainerProps(Main),
        layout: this.layout
      }
    } else if (this.aside) {
      return this.getContainerProps(Aside)
    } else if (this.footer) {
      return this.getContainerProps(Footer)
    } else if (this.row) {
      return this.getContainerProps(Row)
    } else if (this.col) {
      return this.getContainerProps(Col)
    }
    return {}
  }

  get draggableOptions () {
    if (this.designer.setting.execType !== DESIGNER_EXEC_TYPES.DESIGNER || !this.layout.draggable) {
      return {
        disabled: true
      }
    }
    const defaultOptions: IDraggableOptions = {
      group: '',
      ghostClass: '',
      animation: 200
    }
    const options = this.layout.draggable
    return {
      group: options.group || defaultOptions.group,
      ghostClass: options.ghostClass || defaultOptions.ghostClass,
      animation: options.animation || defaultOptions.animation,
      disabled: !!options.disabled
    }
  }

  get fieldComponentByType () {
    return arrToMap(fieldComponents, 'type')
  }

  getContainerProps (Components: any) {
    if (!Components.props) {
      return {}
    }
    return Object.keys(Components.props).reduce((pre: any, cur: string) => {
      pre[cur] = this.$props[cur]
      return pre
    }, {})
  }

  handleDraggableAdd (evt: any) {
    if (this.designer.setting.execType !== DESIGNER_EXEC_TYPES.DESIGNER) {
      return
    }
    const newIndex = evt.newIndex
    const curLayout = this.layout.children as IField[]
    const key = curLayout[newIndex].key + '_' + nanoid()

    let tempLayout = {}
    // 如果是分组容器 添加默认子元素
    if (curLayout[newIndex].type === ComponentTypes.Group) {
      // 如果是手机端
      // if (this.designer.setting.platform === DESIGNER_PLATFORMS.MOBILE) {
      if (this.designer.setting.uiType === DESIGNER_UI_TYPES.MOBILE) {
        tempLayout = {
          name: `分组_${nanoid(13)}`,
          children: [
            {
              type: ComponentTypes.Row,
              key: ComponentTypes.Row + '_' + nanoid(),
              children: [
                {
                  type: ComponentTypes.Col,
                  key: ComponentTypes.Col + '_' + nanoid(),
                  attrs: {
                    span: 24
                  },
                  draggable: {
                    group: DraggableGroupTypes.FormField,
                    ghostClass: DraggableClassNames.FormField
                  },
                  children: []
                }
              ]
            }
          ]
        }
      } else {
        tempLayout = {
          name: `分组_${nanoid(13)}`,
          children: [
            {
              type: ComponentTypes.Row,
              key: ComponentTypes.Row + '_' + nanoid(),
              attrs: {
                gutter: 70
              },
              children: [
                {
                  type: ComponentTypes.Col,
                  key: ComponentTypes.Col + '_' + nanoid(),
                  attrs: {
                    span: 12
                  },
                  draggable: {
                    group: DraggableGroupTypes.FormField,
                    ghostClass: DraggableClassNames.FormField
                  },
                  children: []
                },
                {
                  type: ComponentTypes.Col,
                  key: ComponentTypes.Col + '_' + nanoid(),
                  attrs: {
                    span: 12
                  },
                  draggable: {
                    group: DraggableGroupTypes.FormField,
                    ghostClass: DraggableClassNames.FormField
                  },
                  children: []
                }
              ]
            }
          ]
        }
      }
    }
    const newLayout = {
      ..._.cloneDeep(curLayout[newIndex]),
      ..._.cloneDeep(tempLayout),
      key,
      // 绑定键值
      // model: this.data.list[newIndex].type + '_' + key,
      rules: []
    }
    // TODO 提取公共函数
    if (!newLayout.id) {
      newLayout.apiName = this.designer.setting.usedType === DESIGNER_USED_TYPES.FORM
        ? `api_${nanoid(8)}` : ''
      // if (_.isObject(newLayout.attrs) && newLayout.attrs.hasOwnProperty('maxlength')) {
      //   newLayout.attrs.maxlength = this.fieldComponentByType[newLayout.type].attrs.maxlength
      // }
    }
    this.$set(curLayout, newIndex, newLayout)
    this.$bus.$emit('designer/updateSelectLayout', curLayout[newIndex])
  }

  handleDraggableUpdate (evt: any) {
    if (this.designer.setting.execType !== DESIGNER_EXEC_TYPES.DESIGNER) {
      return
    }
    const newIndex = evt.newIndex
    const curLayout = this.layout.children as IField[]
    this.$bus.$emit('designer/updateSelectLayout', curLayout[newIndex])
  }
}
</script>

<style lang="scss" scoped>
.pc-layout {
  overflow-x: hidden;

  &.el-row {
    /*width: 100%;*/
    height: 100%;
  }

  &.el-col {
  }
}
</style>
