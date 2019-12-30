<!--Created by LiuLei on 2019/11/11-->
<template>
  <side-bar :menus="menus"/>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import SideBar from '@/layout/components/SideBar/index.vue'
import api from '@/api'
import { IDD } from '@/types/common'
import axios from 'axios'

const CancelToken = axios.CancelToken

@Component({
  name: 'AppSideBar',
  components: { SideBar }
})
export default class AppSideBar extends Vue {
  plainMenus: IDD.IMenu[] = []
  source = CancelToken.source()
  loadingMenus: boolean = false

  get appId (): string {
    return this.$route.params.appId
  }

  get menus () {
    return this.plainMenus.map((node: IDD.ISMenu, index) => {
      if (node.group && node.children) {
        return {
          name: node.name + '_' + index,
          path: `/app/${this.appId}`,
          meta: {
            title: node.name,
            icon: node.iconUrl
          },
          children: node.children.map((menu: IDD.ISMenu) => {
            const name = (this.moduleById[menu.moduleId as string] || {}).name
            const path = menu.moduleId + '_' + (menu.module && menu.module.bizObjectId)
            return {
              name: name + '_' + path,
              path: `/app/${this.appId}/${path}`,
              meta: {
                title: name,
                icon: menu.module && menu.module.iconUrl,
                inNav: true
              }
            }
          })
        }
      }
      const name = (this.moduleById[node.moduleId as string] || {}).name
      const path = node.moduleId + '_' + (node.module && node.module.bizObjectId)
      return {
        name: name + '_' + path,
        path: `/app/${this.appId}/${path}`,
        meta: {
          title: name,
          icon: node.module && node.module.iconUrl
        }
      }
    })
  }

  get moduleById () {
    return this.$store.getters['app/moduleById']
  }

  @Watch('appId', { immediate: true })
  onAppIdChange (newAppId: string) {
    if (!newAppId) {
      return
    }
    if (this.loadingMenus) {
      this.source.cancel()
    }
    this.loadingMenus = true
    this.source = CancelToken.source()
    //  TODO 取消正在请求中的接口
    this.plainMenus = []
    api.metaData.getApp(
      newAppId,
      this.source.token,
      { checkAuth: true }
    ).then((res: any) => {
      this.plainMenus = res.data.data.menus
    }).finally(() => {
      this.loadingMenus = false
    })
  }

  created () {
    if (this.$store.state.app.modules.length === 0) {
      this.$store.dispatch('app/getModules', { checkAuth: true })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
