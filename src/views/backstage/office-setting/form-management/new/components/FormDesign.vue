<!--Created by LiuLei on 2019/11/5-->
<template>
  <div class="FormDesign">
    <el-container>
      <form-design-sidebar-left/>
      <el-main class="form-design-mobile">
        <div class="form-design-mobile__frame">
          <fd-mobile-components-app-bar/>
          <el-form label-position="left"
                   class="form-design-mobile__inner form__wrap">
            <PCLayout
              class="pc-layout"
              v-bind="layout.attrs"
              container
              :layout="layout"/>
          </el-form>
        </div>
      </el-main>
      <form-design-sidebar-right/>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Watch } from 'vue-property-decorator'
import FormDesignSidebarLeft from '@/views/designer/layout/components/SidebarLeft/index.vue'
import FormDesignSidebarRight from '@/views/designer/layout/components/SidebarRight/index.vue'
import PCLayout from '@/views/designer/components/PCLayout/index.vue'
import PredefinedFormLayouts from '@/views/designer/config/PredefinedFormLayouts'
import LayoutTypes from '@/views/designer/config/LayoutTypes'
import FdMobileComponentsAppBar from '@/views/designer/components/Mobile/AppBar/index.vue'
import designerStore from '@/store/modules/designer'
import { DESIGNER_PLATFORMS, DESIGNER_TYPES } from '@/views/designer/config/Designer'

@Component({
  name: 'FormDesign',
  components: { FdMobileComponentsAppBar, PCLayout, FormDesignSidebarRight, FormDesignSidebarLeft }
})
export default class FormDesign extends Vue {
  static title = '表单设计'
  @Provide() designer = {
    setting: {
      type: DESIGNER_TYPES.FORM,
      platform: DESIGNER_PLATFORMS.MOBILE
    },
    object: {}
  }

  get layout () {
    return PredefinedFormLayouts[LayoutTypes.Mobile].define
  }

  @Watch('$route', { deep: true, immediate: true })
  on$routeChange (val: any) {
    designerStore.updateCurRoute(val)
  }

  created () {
    designerStore.updateLayoutByType({
      layout: PredefinedFormLayouts[LayoutTypes.Mobile] as any,
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
}

@import "~@/styles/designer-mobile";
@import "~@/styles/designer-mobile-form-wrap";
.form-design-mobile__inner {
  background-color: #fff;
}
</style>
