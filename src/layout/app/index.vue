<template>
  <div class="dd-layout">
    <nav-bar class="header">
      <div slot="menu"
           class="nav__app">
        <el-menu
          class="app-header-menu"
          v-if="curApp"
          @select="selectApp"
          mode="horizontal">
          <el-submenu index="app">
            <template slot="title">
              <span>{{curApp.name}}</span>
            </template>
            <el-menu-item
              v-for="app in apps"
              :key="app.id"
              :index="`${app.id}`">{{app.name}}
            </el-menu-item>
            <el-menu-item :key="123">激励
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </nav-bar>
    <router-view name="sideBar"/>
    <side-bar/>
    <div class="dd-main__wrap">
      <div class="dd-main">
        <bread-crumb/>
        <app-main/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import NavBar from './components/Navbar/index.vue'
import SideBar from './components/Sidbar.vue'
import AppMain from '@/layout/components/AppMain.vue'
import { IDD } from '@/types/common'
import { arrToMap } from '@/utils'
import pathToRegexp from 'path-to-regexp'
import BreadCrumb from '@/layout/components/Breadcrumb.vue'

@Component({
  name: 'ApplicationLayout',
  components: {
    BreadCrumb,
    AppMain,
    NavBar,
    SideBar
  }
})
export default class ApplicationLayout extends Vue {
  get apps (): IDD.ISApplication[] {
    return this.$store.state.app.apps
  }

  // curApp: IDD.ISApplication = { ...initApp }

  get appById () {
    return arrToMap(this.apps, 'id')
  }

  get curApp (): IDD.ISApplication {
    return this.appById[this.appId]
  }

  get appId () {
    return this.$route.params.appId
  }

  created () {
    this.initApp()
  }

  async initApp () {
    await this.$store.dispatch('app/getApps', { checkAuth: true })
    if (!this.appId && this.apps.length > 0) {
      await this.$router.push(`${this.$route.path}/${(this.apps[0] || {}).id || ''}`)
    }
  }

  selectApp (appId: string) {
    if (appId === this.appId) {
      return
    }
    debugger
    this.$router.push(pathToRegexp.compile(
      '/app/:appId/'
    )({ appId }))
  }
}
</script>

<style lang="scss" scoped>
.dd-layout {
  position: relative;
  height: 100%;
  background-color: #EEF3F7;

  .dd-main {
    height: 100%;
    overflow: auto;

    &__wrap {
      position: absolute;
      width: 100%;
      top: $dd--nav-bar-height;
      bottom: 0;
      padding-left: $dd--side-bar-width;
    }
  }

  .app-header-menu {
    /deep/ .el-submenu__title {
      border-bottom: none !important;
      font-size: 16px;

      .el-icon-arrow-down {
        font-size: 16px;
      }
    }
  }
}
</style>
