<!--Created by LiuLei on 2019/11/5-->
<template>
  <div class="FormDesign">
    <el-container>
      <form-design-sidebar-left/>
      <el-main class="form-design-mobile">
        <div class="form-design-mobile__frame">
          <div class="form__name">
            <strong>{{form.name}}</strong>
          </div>
          <div
            v-if="allUsedFields.length === 0"
            class="field-empty-tips">
            请从左侧选择组件拖动到上方
          </div>
          <fd-mobile-components-app-bar/>
          <el-form
            label-position="left"
            class="form-design-mobile__inner form__wrap">
            <PCLayout
              class="pc-layout"
              v-bind="layout.attrs"
              container
              :layout="layout"/>
          </el-form>
        </div>
      </el-main>
      <form-design-sidebar-right class="field-attrs"/>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Provide, Watch } from 'vue-property-decorator'
import FormDesignSidebarLeft from '@/views/designer/layout/components/SidebarLeft/index.vue'
import FormDesignSidebarRight from '@/views/designer/layout/components/SidebarRight/index.vue'
import PCLayout from '@/views/designer/components/PCLayout/index.vue'
import LayoutTypes from '@/views/designer/config/LayoutTypes'
import FdMobileComponentsAppBar from '@/views/designer/components/Mobile/AppBar/index.vue'
import designerStore from '@/store/modules/designer'
import {
  DESIGNER_EXEC_TYPES,
  DESIGNER_UI_TYPES,
  DESIGNER_USED_TYPES
} from '@/views/designer/config/Designer'
import getLocalLayoutFields from '@/views/designer/utils/getLocalLayoutFields'
import { mixins } from 'vue-class-component'
import FormDataStore from '../mixins/form-data-store'
import { IField } from '@/views/designer/config/components'
import PredefinedFormLayouts from '@/views/designer/config/PredefinedFormLayouts'
import { IDesigner } from '@/views/designer/types'

@Component({
  name: 'FormDesign',
  components: { FdMobileComponentsAppBar, PCLayout, FormDesignSidebarRight, FormDesignSidebarLeft }
})
export default class FormDesign extends mixins(FormDataStore) {
  static title = '表单设计'
  @Provide() designer: IDesigner = {
    setting: {
      // type: DESIGNER_TYPES.FORM,
      // platform: DESIGNER_PLATFORMS.MOBILE
      uiType: DESIGNER_UI_TYPES.MOBILE,
      usedType: DESIGNER_USED_TYPES.FORM,
      execType: DESIGNER_EXEC_TYPES.DESIGNER
    },
    object: {}
  }

  get layout () {
    return designerStore.layout[LayoutTypes.Mobile].define
  }

  get allUsedFields () {
    if (this.layout) {
      return getLocalLayoutFields(this.layout)
    } else {
      return []
    }
  }

  @Watch('allUsedFields')
  onAllUsedFieldsChange (newFields: IField[]) {
    this.$store.dispatch('backstage/form/updateFormFields', newFields)
  }

  @Watch('$route', { deep: true, immediate: true })
  on$routeChange (val: any) {
    designerStore.updateCurRoute(val)
  }

  created () {
    designerStore.updateLayoutByType({
      layout: {
        ...PredefinedFormLayouts()[LayoutTypes.Mobile] as any,
        define: this.form.uiDefine
      },
      type: LayoutTypes.Mobile
    })
  }
}
</script>

<style lang="scss" scoped>
.FormDesign {
  height: 100%;
  display: flex;
  justify-content: space-between;

  .form-design-mobile__frame {
    position: relative;
  }

  .field-empty-tips {
    position: absolute;
    left: 0;
    right: 0;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
    z-index: 999;
  }

  .field-attrs {
    /deep/ .el-form-item__label[for='apiName'] {
      display: none !important;

      & + .el-form-item__content {
        display: none;
      }
    }
  }

  .form__name {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 6px;
    font-size: 15px;
  }
}

@import "~@/styles/designer-mobile";
@import "~@/styles/designer-mobile-form-wrap";
.form-design-mobile__inner {
  background-color: #fff;
}
</style>
