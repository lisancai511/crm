<!--Created by LiuLei on 2019/9/5-->
<template>
  <div class="form-designer-layout">
    <form-design-nav-bar/>
    <form-designer-app-main/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FormDesignNavBar from '@/views/form-designer/layout/components/Navbar/index.vue'
import FormDesignerAppMain from '@/views/form-designer/layout/components/AppMain.vue'
import FormDesignSidebarLeft from '@/views/form-designer/layout/components/SidebarLeft/index.vue'
import FormDesignSidebarRight from '@/views/form-designer/layout/components/SidebarRight/index.vue'

  @Component({
    name: 'FormDesignLayout',
    components: {
      FormDesignSidebarRight,
      FormDesignSidebarLeft,
      FormDesignerAppMain,
      FormDesignNavBar
    }
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
</style>
