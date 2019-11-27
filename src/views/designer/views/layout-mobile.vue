import LayoutTypes from '@/views/designer/config/LayoutTypes'
<!--Created by LiuLei on 2019/9/5-->
<template>
  <div class="designer--content">
    <el-container>
      <form-design-sidebar-left/>
      <el-main class="form-design-mobile">
        <div class="form-design-mobile__frame">
          <fd-mobile-components-app-bar/>
          <div class="form-design-mobile__inner">
            <PCLayout
              class="pc-layout"
              v-bind="layout.attrs"
              container
              :layout="layout"/>
          </div>
        </div>
      </el-main>
      <form-design-sidebar-right/>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Provide } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import FdComponentsFormHeader from '@/views/designer/components/FormTitle/index.vue'
import FdComponentsTab from '@/views/designer/components/Tab/index.vue'
import PCLayout from '@/views/designer/components/PCLayout/index.vue'
import FormDesignSidebarLeft from '@/views/designer/layout/components/SidebarLeft/index.vue'
import FormDesignSidebarRight from '@/views/designer/layout/components/SidebarRight/index.vue'
import designerStore from '@/store/modules/designer'
import LayoutTypes from '@/views/designer/config/LayoutTypes'
import FdMobileComponentsAppBar from '@/views/designer/components/Mobile/AppBar/index.vue'
import initLayout from '@/views/designer/mixins/initLayout'
import { DESIGNER_PLATFORMS, DESIGNER_TYPES } from '@/views/designer/config/Designer'

@Component({
  name: 'FormDesignMobile',
  components: {
    FormDesignSidebarRight,
    FormDesignSidebarLeft,
    PCLayout,
    FdComponentsTab,
    FdComponentsFormHeader,
    FdMobileComponentsAppBar
  }
})

export default class FormDesignMobile extends mixins(initLayout) {
  @Provide() designer = {
    setting: {
      type: DESIGNER_TYPES.PASS,
      platform: DESIGNER_PLATFORMS.MOBILE
    },
    object: designerStore.object
  }

  get layoutType () {
    return LayoutTypes.Mobile
  }
}
</script>

<style lang="scss" scoped>
.designer--content {
  height: 100%;
  display: flex;
  justify-content: space-between;
}

@import "~@/styles/designer-mobile";
</style>
