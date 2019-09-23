<!--Created by LiuLei on 2019/9/17-->
<template>
  <draggable
    class="pc-layout"
    v-if="layout.children"
    :tag="curContainerName"
    :component-data="{props:curContainerProps}"
    @add="handleDraggableAdd"
    @update="handleDraggableUpdate"
    v-model="layout.children"
    v-bind="draggableOptions">
    <template v-for="(component,index) in layout.children">
      <!--如果是Container-->
      <PCLayout v-if="component.type === LayoutTypes.Container"
                v-bind="component.attr"
                container
                :key="component.key"
                :layout="component"/>
      <!--如果是Header-->
      <PCLayout v-else-if="component.type === LayoutTypes.Header"
                v-bind="component.attrs"
                header
                :key="component.key"
                :layout="component"/>
      <!--如果是Aside-->
      <PCLayout v-else-if="component.type === LayoutTypes.Aside"
                v-bind="component.attrs"
                aside
                :key="component.key"
                :layout="component"/>
      <!--如果是Main-->
      <PCLayout v-else-if="component.type === LayoutTypes.Main"
                v-bind="component.attrs"
                main
                :draggable="form"
                :key="component.key"
                :layout="component"/>
      <!--如果是Footer-->
      <PCLayout v-else-if="component.type === LayoutTypes.Footer"
                v-bind="component.attrs"
                footer
                :key="component.key"
                :layout="component"/>
      <!--如果是Row-->
      <PCLayout v-else-if="component.type === LayoutTypes.Row"
                v-bind="component.attrs"
                row
                :draggable="form"
                :key="component.key"
                :layout="component"/>
      <!--如果是Col-->
      <PCLayout v-else-if="component.type === LayoutTypes.Col"
                v-bind="component.attrs"
                col
                :draggable="form"
                :key="component.key"
                :layout="component"/>
      <!--如果是表头-->
      <fd-components-form-header v-else-if="component.type === LayoutTypes.FormHeader"
                                 @click.native="updateCurrentField(component)"
                                 :layout="component"
                                 v-bind="component.attrs"
                                 :key="component.key"
      />
      <!--如果是Tabs-->
      <fd-components-tab v-else-if="component.type === LayoutTypes.InfoTab"
                         @click.native.stop="updateCurrentField(component)"
                         :key="component.key"
                         :layout="component"/>
      <!--如果是各种Form表单组件-->
      <fd-form-item v-else
                    @click.native.stop="updateCurrentField(component)"
                    @delete="deleteCurField(component,index)"
                    :layout="component"
                    :key="component.key"/>
    </template>
  </draggable>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import FdComponentsFormHeader from '@/views/form-designer/components/FormTitle/index.vue'
import FdComponentsTab from '@/views/form-designer/components/Tab/index.vue'
import LayoutTypes from '@/views/form-designer/config/LayoutTypes'

import {
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Row,
  Col
} from 'element-ui'
import FdFormItem from '@/views/form-designer/components/PCLayout/FdFormItem.vue'
import { field } from '@/views/form-designer/config/components'
import nanoid from 'nanoid'
import updateCurrentField from '@/views/form-designer/mixins/updateCurrentField'

@Component({
  name: 'PCLayout',
  components: {
    FdFormItem,
    FdComponentsTab,
    FdComponentsFormHeader
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
  @Prop({ required: true, type: Object }) readonly layout!: field
  // @Prop({ type: String, default: 'horizontal' }) readonly direction!: string
  @Prop({ type: Boolean, default: false }) readonly row!: boolean
  @Prop({ type: Boolean, default: false }) readonly col!: boolean
  @Prop({ type: Boolean, default: false }) readonly container!: boolean
  @Prop({ type: Boolean, default: false }) readonly main!: boolean
  @Prop({ type: Boolean, default: false }) readonly header!: boolean
  @Prop({ type: Boolean, default: false }) readonly aside!: boolean
  @Prop({ type: Boolean, default: false }) readonly footer!: boolean
  @Prop({ type: Boolean, default: false }) readonly form!: boolean
  @Prop({ type: Boolean, default: false }) readonly draggable!: boolean

  @Inject('designer') readonly designer!: boolean

  get LayoutTypes () {
    return LayoutTypes
  }

  get curContainerName () {
    if (this.container) {
      return Container.name
    } else if (this.header) {
      return Header.name
    } else if (this.main) {
      return Main.name
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
    return {
      group: 'field',
      ghostClass: 'draggable-tab-details-ghost-class',
      animation: 200,
      disabled: !this.draggable
    }
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
    if (!this.designer) {
      return
    }
    const newIndex = evt.newIndex
    const curLayout = this.layout.children as field[]
    const key = curLayout[newIndex].key + '_' + Date.parse((new Date()) as any) + '_' + nanoid()
    this.$set(curLayout, newIndex, {
      ...curLayout[newIndex],
      attrs: {
        ...curLayout[newIndex].attrs
      },
      key,
      // 绑定键值
      // model: this.data.list[newIndex].type + '_' + key,
      rules: []
    })
    this.$bus.$emit('selectLayout', curLayout[newIndex])
  }

  handleDraggableUpdate (evt: any) {
    if (!this.designer) {
      return
    }
    const newIndex = evt.newIndex
    const curLayout = this.layout.children as field[]
    this.$bus.$emit('selectLayout', curLayout[newIndex])
  }
}
</script>

<style lang="scss" scoped>
.pc-layout {
}
</style>
