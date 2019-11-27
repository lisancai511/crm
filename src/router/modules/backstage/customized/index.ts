import { RouteConfig } from 'vue-router'
import objectStandardRouter, { objectStandardNavRouter } from './object-standard'
import objectCustomRouter, { objectCustomNavRouter } from './object-custom'
import appRouter, { appNavRouter } from './application'
import menuRouter, { menuNavRouter } from './module'

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
    menuNavRouter,
    menuRouter,
    appNavRouter,
    appRouter
  ]
}

export default customizedRouter
