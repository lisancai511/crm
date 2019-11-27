import { RouteConfig } from 'vue-router'

/**
 * Created by LiuLei on 2019/11/6
 */
export const appNavRouter: RouteConfig = {
  name: 'Application',
  path: '/backstage/customized/app',
  component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/application/index.vue'),
  meta: {
    title: '应用程序',
    inNav: true,
    keepAlive: true
  }
}

const appRouter: RouteConfig = {
  name: 'ApplicationLayout',
  path: '/backstage/customized/app',
  component: () => import(/* webpackChunkName: "dashboard" */ '@/layout/empty-router-view.vue'),
  meta: {
    title: '应用程序'
  },
  children: [
    {
      name: 'ApplicationNew',
      path: '/backstage/customized/app/new',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/application/new.vue'),
      meta: {
        title: '新建应用程序'
      }
    },
    {
      name: 'ApplicationEdit',
      path: '/backstage/customized/app/:appId/edit',
      props: true,
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/application/new.vue'),
      meta: {
        title: '编辑应用程序'
      }
    }
  ]
}

export default appRouter
