import { RouteConfig } from 'vue-router'

/**
 * Created by LiuLei on 2019/11/6
 */
export const packAppNavRouter: RouteConfig = {
  name: 'PackApplication',
  path: '/backstage/customized/pack-app',
  component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/application/index.vue'),
  meta: {
    title: '打包应用程序',
    inNav: true,
    keepAlive: true
  }
}

const packAppRouter: RouteConfig = {
  name: 'PackApplicationLayout',
  path: '/backstage/customized/pack-app',
  component: () => import(/* webpackChunkName: "dashboard" */ '@/layout/empty-router-view.vue'),
  meta: {
    title: '打包应用程序'
  },
  children: [
    {
      name: 'PackApplicationNew',
      path: '/backstage/customized/pack-app/new',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/application/new.vue'),
      meta: {
        title: '新建打包应用程序'
      }
    },
    {
      name: 'PackApplicationEdit',
      path: '/backstage/customized/pack-app/:appId/edit',
      props: true,
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/application/new.vue'),
      meta: {
        title: '编辑打包应用程序'
      }
    }
  ]
}

export default packAppRouter
