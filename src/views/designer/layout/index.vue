<!--Created by LiuLei on 2019/9/5-->
<template>
  <div
    v-loading="loading"
    element-loading-text="正在加载中"
    class="form-designer-layout">
    <template v-if="showMain">
      <form-design-nav-bar/>
      <form-designer-app-main/>
    </template>
  </div>
</template>
<!--页面属性  字段属性-->
<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import FormDesignNavBar from '@/views/designer/layout/components/Navbar/index.vue'
import FormDesignerAppMain from '@/views/designer/layout/components/AppMain.vue'
import FormDesignSidebarLeft from '@/views/designer/layout/components/SidebarLeft/index.vue'
import FormDesignSidebarRight from '@/views/designer/layout/components/SidebarRight/index.vue'

import initLayoutBaseData from '@/views/designer/mixins/initLayoutBaseData'

@Component({
  name: 'FormDesignLayout',
  components: {
    FormDesignSidebarRight,
    FormDesignSidebarLeft,
    FormDesignerAppMain,
    FormDesignNavBar
  }
})
export default class Layout extends mixins(initLayoutBaseData) {
  showMain: boolean = false
  loading: boolean = false

  async created () {
    this.loading = true
    await this.initLayoutBaseData()
    this.loading = false
    this.showMain = true
  }
}
</script>

<style lang="scss" scoped>
.form-designer-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
