import LayoutTypes from '@/views/designer/config/LayoutTypes'
<!--Created by LiuLei on 2019/9/5-->
<template>
  <div class="designer--content">
    <el-container>
      <form-design-sidebar-left/>
      <el-main class="form-design-pc">
        <div class="form-design-pc__inner">
          <PCLayout
            class="pc-layout"
            v-bind="layout.attrs"
            container
            :layout="layout"/>
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
import initLayout from '@/views/designer/mixins/initLayout'
import {
  DESIGNER_EXEC_TYPES,
  DESIGNER_UI_TYPES,
  DESIGNER_USED_TYPES
} from '@/views/designer/config/Designer'
import { IDesigner } from '@/views/designer/types'

@Component({
  name: 'FormDesignPC',
  components: {
    FormDesignSidebarRight,
    FormDesignSidebarLeft,
    PCLayout,
    FdComponentsTab,
    FdComponentsFormHeader
  }
})

export default class FormDesignPC extends mixins(initLayout) {
  @Provide() designer: IDesigner = {
    setting: {
      // type: DESIGNER_TYPES.PASS,
      // platform: DESIGNER_PLATFORMS.PC
      uiType: DESIGNER_UI_TYPES.PC,
      usedType: DESIGNER_USED_TYPES.PAAS,
      execType: DESIGNER_EXEC_TYPES.DESIGNER
    },
    object: designerStore.object
  }

  get layoutType () {
    return LayoutTypes.PC
  }

  // get layout () {
  //   return designerStore.layout[LayoutTypes.PC].define
  // }
}
</script>

<style lang="scss" scoped>
.designer--content {
  height: 100%;
  display: flex;
  justify-content: space-between;
}

.form-design-pc {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px 0 0 0;

  &__inner {
    flex: 1;
    display: flex;

    /deep/ .Ghost_FormField {
      border: 1px dashed $dd--primary-color;
      height: 102px;
      overflow: hidden;
      width: 100%;

      &.LongTextField {
        height: 205px;
      }
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
