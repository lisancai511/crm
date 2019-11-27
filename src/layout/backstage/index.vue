<template>
  <div class="dd-layout">
    <!--        <nav-bar class="header"/>-->
    <router-view name="sideBar"></router-view>
    <side-bar :menus="backstageRouter.children"/>
    <div class="dd-main__wrap">
      <div class="dd-main">
        <bread-crumb :cut-out-length="2"/>
        <app-main/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SideBar from '../components/SideBar/index.vue'
import BreadCrumb from '../components/Breadcrumb.vue'
import AppMain from '../components/AppMain.vue'
import backstageRouter from '@/router/modules/backstage'

@Component({
  name: 'Layout',
  components: {
    AppMain,
    BreadCrumb,
    SideBar
  }
})
export default class Layout extends Vue {
  get backstageRouter () {
    return backstageRouter
  }
}
</script>

<style lang="scss" scoped>
.dd-layout {
  position: relative;
  height: 100%;
  background-color: #EEF3F7;

  .header {
  }

  .dd-main {
    height: 100%;
    overflow: auto;

    &__wrap {
      position: absolute;
      width: 100%;
      top: 0;
      bottom: 0;
      padding-left: $dd--side-bar-width;
    }
  }
}
</style>
