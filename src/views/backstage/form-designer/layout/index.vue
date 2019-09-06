<!--Created by LiuLei on 2019/9/5-->
<template>
  <div class="form-designer-layout">
    <form-design-nav-bar/>
    <div class="designer--content">
      <form-design-sidebar-left/>
      <form-designer-app-main/>
      <form-design-sidebar-right/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FormDesignNavBar from '@/views/backstage/form-designer/layout/components/Navbar/index.vue'
import FormDesignerAppMain from '@/views/backstage/form-designer/layout/components/AppMain.vue'
import FormDesignSidebarLeft from '@/views/backstage/form-designer/layout/components/SidebarLeft/index.vue'
import FormDesignSidebarRight from '@/views/backstage/form-designer/layout/components/SidebarRight/index.vue'

  @Component({
    name: 'index',
    components: { FormDesignSidebarRight, FormDesignSidebarLeft, FormDesignerAppMain, FormDesignNavBar }
  })
export default class Layout extends Vue {
}
</script>

<style lang="scss" scoped>
  .form-designer-layout{
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .designer--content{
    flex: 1;
    display: flex;
    justify-content: space-between;
  }
</style>
