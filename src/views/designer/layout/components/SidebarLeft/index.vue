<!--Created by LiuLei on 2019/9/5-->
<template>
  <el-aside
    width="200px"
    :class="{'form-design-sidebar--left--form':isForm}"
    class="form-design-sidebar--left">
    <el-container direction="vertical">
      <el-main
        v-if="!isForm"
        class="section__wrap section__wrap section__components">
        <h6 class="section__title">组件</h6>
        <div class="section__body">
          <field-button
            v-for="field in basicComponents"
            class="form-designer__field"
            :icon="field.icon"
            :title="field.name"
            :key="field.key"/>
        </div>
      </el-main>
      <el-main class="section__wrap section__fields">
        <h6 class="section__title">字段</h6>
        <el-radio-group
          v-if="!isForm"
          size="medium"
          v-model="curFieldTab">
          <el-radio-button
            v-for="type in fieldTabs"
            :key="type.key"
            :label="type.key"
          >{{type.name}}
          </el-radio-button>
        </el-radio-group>
        <div
          v-show="curFieldTab === 'base'"
          class="section__body">
          <draggable
            tag="div"
            v-bind="fieldDraggableProps"
            :list="fieldComponents"
            class="section__body">
            <field-button
              v-for="field in fieldComponents"
              class="form-designer__field"
              :class="[field.type]"
              :icon="field.icon"
              :title="field.name"
              :key="field.key"/>
          </draggable>
          <draggable
            v-if="!isForm"
            tag="div"
            v-bind="fictitiousDraggableProps"
            :list="fictitiousComponents"
            class="section__body">
            <field-button
              v-for="field in fictitiousComponents"
              class="form-designer__field"
              :class="[field.type]"
              :icon="field.icon"
              :title="field.name"
              :key="field.key"/>
          </draggable>
          <draggable
            v-if="isForm"
            tag="div"
            :move="moveDetailedComponents"
            v-bind="fieldDraggableProps"
            :list="detailedComponents"
            class="section__body">
            <field-button
              v-for="field in detailedComponents"
              class="form-designer__field"
              :class="[field.type]"
              :icon="field.icon"
              :title="field.name"
              :key="field.key"/>
          </draggable>
        </div>
        <draggable
          v-show="curFieldTab === 'unUsed'"
          tag="div"
          v-bind="fieldDraggableProps"
          :list="unusedFields"
          class="section__body">
          <field-button v-for="field in unusedFields"
                        class="form-designer__field"
                        :class="[field.type]"
                        :icon="field.icon"
                        :title="field.name"
                        :key="field.key"/>
        </draggable>
      </el-main>
    </el-container>
  </el-aside>
</template>

<script lang="ts">
import { Component, Vue, Inject } from 'vue-property-decorator'
import FieldButton from './FieldButton.vue'
import {
  basicComponents,
  fieldComponents,
  fictitiousComponents,
  detailedComponents,
  IField, ILayoutComponent
} from '@/views/designer/config/components'
import DraggableClassNames from '@/views/designer/config/DraggableClassNames'
import DraggableGroupTypes from '@/views/designer/config/DraggableGroupTypes'
import designerStore from '@/store/modules/designer'
import { DESIGNER_USED_TYPES } from '@/views/designer/config/Designer'
import ComponentTypes from '@/views/designer/config/ComponentTypes'

const FORM_EXCLUDE_TYPES: string[] = [
  ComponentTypes.TagField
]
const OBJECT_EXCLUDE_TYPES: string[] = []

@Component({
  name: 'FormDesignSidebarLeft',
  components: { FieldButton }
})
export default class SidebarLeft extends Vue {
  @Inject('designer') readonly designer!: any
  basicComponents: ILayoutComponent[] = basicComponents
  fictitiousComponents: ILayoutComponent[] = fictitiousComponents
  detailedComponents: ILayoutComponent[] = detailedComponents
  fieldTabs = [
    {
      key: 'base',
      name: '添加字段'
    },
    {
      key: 'unUsed',
      name: '未使用字段'
    }
  ]

  curFieldTab = this.fieldTabs[0].key

  get fieldComponents (): IField[] {
    return fieldComponents.filter((field) => {
      if (this.isForm) {
        return !FORM_EXCLUDE_TYPES.includes(field.type)
      }
      return !OBJECT_EXCLUDE_TYPES.includes(field.type)
    })
  }

  get isForm () {
    return this.designer?.setting?.usedType === DESIGNER_USED_TYPES.FORM
  }

  get unusedFields (): any[] {
    return designerStore.unusedFields
  }

  get fieldDraggableProps () {
    return {
      group: {
        name: DraggableGroupTypes.FormField,
        pull: 'clone',
        put: false
      },
      ghostClass: DraggableClassNames.FormField,
      sort: false
    }
  }

  get fictitiousDraggableProps () {
    return {
      group: {
        name: DraggableGroupTypes.FormGroup,
        pull: 'clone',
        put: false
      },
      ghostClass: DraggableClassNames.FormGroup,
      sort: false
    }
  }

  moveDetailedComponents (evt: any) {
    // const componentType = evt.draggedContext.element.type
    if (evt.to.className.includes(ComponentTypes.Detailed)) {
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.form-design-sidebar--left {
  background: #fff;
  box-shadow: 0 7px 26px 0 rgba(48, 48, 48, 0.13);
  height: 100%;
  overflow: auto;

  /*&--form {*/
  width: 330px !important;
  /* }*/

  .section {
    &__title {
      font-weight: bold;
      margin: 5px 0;
    }

    &__body {
      .form-designer__field {
        margin-top: 10px;
      }

      /* &--form {*/
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .form-designer__field {
      }

      /*}*/
    }

    &__wrap {

    }

    &__components {

    }

    &__fields {

    }
  }

  .el-radio-group {
    margin-top: 5px;
    width: 100%;
  }

  .el-radio-button {
    width: 50%;

    /deep/ .el-radio-button__inner {
      width: 100%;
      /*width: 78px;*/
      /*padding-left: 0;*/
      /*padding-right: 0;*/
      font-size: 12px;
    }
  }
}
</style>
