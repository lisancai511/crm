import { RouteConfig } from 'vue-router'
import objectStandardRouter, { objectStandardNavRouter } from './object-standard'
import objectCustomRouter, { objectCustomNavRouter } from './object-custom'

const customizedRouter: RouteConfig = {
  name: 'Customized',
  path: '/backstage/customized',
  component: () => import(/* webpackChunkName: "dashboard" */ '@/layout/empty-router-view.vue'),
  meta: {
    title: '定制',
    icon: 'label'
  },
  children: [
    objectStandardNavRouter,
    objectStandardRouter,
    objectCustomNavRouter,
    objectCustomRouter,
    {
      name: 'Menu',
      path: '/backstage/customized/menu',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/menu/index.vue'),
      meta: {
        title: '菜单',
        inNav: true
      }
    },
    {
      name: 'Application',
      path: '/backstage/customized/application',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/application/index.vue'),
      meta: {
        title: '应用程序',
        inNav: true
      }
    }
  ]
}

export default customizedRouter
