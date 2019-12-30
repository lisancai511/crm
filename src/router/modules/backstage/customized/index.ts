import { RouteConfig } from 'vue-router'
import objectStandardRouter, { objectStandardNavRouter } from './object-standard'
import objectCustomRouter, { objectCustomNavRouter } from './object-custom'
import appRouter, { appNavRouter } from './application'
import packAppRouter, { packAppNavRouter } from './packApplication'
import menuRouter, { menuNavRouter } from './module'

const customizedRouter: RouteConfig = {
  name: 'Customized',
  path: '/backstage/customized',
  component: () => import(/* webpackChunkName: "dashboard" */ '@/layout/empty-router-view.vue'),
  meta: {
    title: '定制',
    icon: 'dd-icon-label'
  },
  children: [
    objectStandardNavRouter,
    objectStandardRouter,
    objectCustomNavRouter,
    objectCustomRouter,
    menuNavRouter,
    menuRouter,
    appNavRouter,
    appRouter,
    packAppNavRouter,
    packAppRouter
  ]
}

export default customizedRouter
