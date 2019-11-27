/**
 * Created by LiuLei on 2019/11/6
 */
import { RouteConfig } from 'vue-router'

/**
 * Created by LiuLei on 2019/11/6
 */
export const menuNavRouter: RouteConfig = {
  name: 'Module',
  path: '/backstage/customized/module',
  component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/module/index.vue'),
  meta: {
    title: '模块',
    inNav: true,
    keepAlive: true
  }
}

const menuRouter: RouteConfig = {
  name: 'ModuleLayout',
  path: '/backstage/customized/module',
  component: () => import(/* webpackChunkName: "dashboard" */ '@/layout/empty-router-view.vue'),
  meta: {
    title: '模块'
  },
  children: [
    {
      name: 'ModuleNew',
      path: '/backstage/customized/module/new',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/module/new.vue'),
      meta: {
        title: '新建模块'
      }
    },
    {
      name: 'ModuleEdit',
      path: '/backstage/customized/module/:id/edit',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/module/new.vue'),
      props: true,
      meta: {
        title: '编辑模块'
      }
    }
  ]
}

export default menuRouter
