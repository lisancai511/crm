<!--Created by LiuLei on 2019/9/5-->
<template>
  <el-aside
    width="200px"
    class="form-design-sidebar--left">
    <el-container direction="vertical">
      <el-main class="section__wrap section__wrap section__components">
        <h6 class="section__title">组件</h6>
        <div class="section__body">
          <field v-for="field in basicComponents"
                 class="form-designer__field"
                 :icon="field.icon"
                 :title="field.name"
                 :key="field.name"/>
        </div>
      </el-main>
      <el-main class="section__wrap section__fields">
        <h6 class="section__title">字段</h6>
        <el-radio-group size="medium" v-model="curFieldTab">
          <el-radio-button
            v-for="type in fieldTabs"
            :key="type.key"
            :label="type.key"
          >{{type.name}}
          </el-radio-button>
        </el-radio-group>
        <div class="section__body">
          <draggable
            v-show="curFieldTab === 'base'"
            tag="div"
            v-bind="fieldDraggableProps"
            :list="fieldComponents"
            class="section__body">
            <field v-for="field in fieldComponents"
                   class="form-designer__field"
                   :class="[field.type]"
                   :icon="field.icon"
                   :title="field.name"
                   :key="field.name"/>
          </draggable>
          <draggable
            v-show="curFieldTab === 'base'"
            tag="div"
            v-bind="fictitiousDraggableProps"
            :list="fictitiousComponents"
            class="section__body">
            <field v-for="field in fictitiousComponents"
                   class="form-designer__field"
                   :class="[field.type]"
                   :icon="field.icon"
                   :title="field.name"
                   :key="field.name"/>
          </draggable>
        </div>
        <div class="section__body">
          <field v-show="curFieldTab === 'unUsed'" v-for="field in unusedFields"
                 class="form-designer__field"
                 :class="[field.type]"
                 :icon="field.icon"
                 :title="field.name"
                 :key="field.name"/>
        </div>
      </el-main>
    </el-container>
  </el-aside>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Field from './Field.vue'
import ComponentTypes from '@/views/designer/config/ComponentTypes'
import {
  basicComponents,
  layoutComponents,
  fieldComponents,
  fictitiousComponents,
  IField
} from '@/views/designer/config/components'
import DraggableClassNames from '@/views/designer/config/DraggableClassNames'
import DraggableGroupTypes from '@/views/designer/config/DraggableGroupTypes'

@Component({
  name: 'FormDesignSidebarLeft',
  components: { Field }
})
export default class SidebarLeft extends Vue {
  basicComponents: IField[] = basicComponents
  fieldComponents: IField[] = fieldComponents
  fictitiousComponents: IField[] = fictitiousComponents
  unusedFields: IField[] = [
    {
      name: '测试字段',
      icon: 'edit',
      type: ComponentTypes.TextField,
      key: ComponentTypes.TextField + 'asdkljaslkf',
      attrs: {
        maxlength: 20
      }
    }
  ]

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
}
</script>

<style lang="scss" scoped>
.form-design-sidebar--left {
  background: #fff;
  box-shadow: 0 7px 26px 0 rgba(48, 48, 48, 0.13);
  height: 100%;
  overflow: auto;

  .section {
    &__title {
      font-weight: bold;
      margin: 5px 0;
    }

    &__body {
      .form-designer__field {
        margin-top: 10px;
      }
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
  }

  .el-radio-button {
    /deep/ .el-radio-button__inner {
      width: 78px;
      padding-left: 0;
      padding-right: 0;
      font-size: 12px;
    }
  }
}
</style>
