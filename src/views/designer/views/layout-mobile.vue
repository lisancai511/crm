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
    isBackstage: true,
    object: designerStore.object,
    isMobile: true
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

.form-design-mobile {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px 0 0 0;

  &__frame {
    height: 670px;
    width: 346px;
    margin: 0 auto;
    background-image: url("~@/assets/images/designer-mobile-bg.png");
    background-size: 346px 670px;
    padding: 50px 12px;
    display: flex;
    flex-direction: column;
  }

  &__inner {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    flex: 1;
    position: relative;
    //美化滚动条
    /*整体部分*/
    &::-webkit-scrollbar {
      width: 4px;
      height: 10px;
    }

    /*滑动轨道*/
    &::-webkit-scrollbar-track {
      border-radius: 0;
      background: rgba(200, 200, 200, .7);
    }

    /*滑块*/
    &::-webkit-scrollbar-thumb {
      border-radius: 2px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .2);
      background-color: rgba(85, 85, 85, 0.4);
    }

    /*滑块效果*/
    &::-webkit-scrollbar-thumb:hover {
      border-radius: 2px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .2);
      background-color: rgba(0, 0, 0, .45)
    }

    /deep/ .Ghost_FormField {
      border: 1px dashed $dd--primary-color;
      height: 46px;
      overflow: hidden;
      width: 100%;

      /*&.LongTextField {*/
      /*  height: 205px;*/
      /*}*/
    }

    /deep/ .Ghost_FormGroup {
      border: 1px dashed $dd--primary-color;

      &.Group {
        height: 242px;
        width: 100%;
        margin-bottom: 20px;
        border-radius: 12px;
      }
    }
  }
}
</style>
