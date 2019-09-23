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
import { Component, Vue, Provide } from 'vue-property-decorator'
import FdComponentsFormHeader from '@/views/form-designer/components/FormTitle/index.vue'
import FdComponentsTab from '@/views/form-designer/components/Tab/index.vue'
import PCLayout from '@/views/form-designer/components/PCLayout/index.vue'
import MOCK_LAYOUT from './mockLayouts'
import FormDesignSidebarLeft from '@/views/form-designer/layout/components/SidebarLeft/index.vue'
import FormDesignSidebarRight from '@/views/form-designer/layout/components/SidebarRight/index.vue'

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
export default class pc extends Vue {
  @Provide() designer = true
  layout = MOCK_LAYOUT
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
  }
}
</style>
