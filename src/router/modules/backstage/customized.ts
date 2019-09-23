import { RouteConfig } from 'vue-router'
import customizedChild from './customizedChild'

const customized: RouteConfig = {
  name: 'Customized',
  path: '/',
  component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/index.vue'),
  meta: {
    title: '定制',
    breadcrumb: { title: '定制', path: '/backstage/customized/standard-object' }
  },
  children: [
    {
      name: 'StandardObject',
      path: '/backstage/customized/standard-object',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/object-standard/index.vue'),
      meta: {
        title: '平台标准对象',
        breadcrumb: { title: '平台标准对象', path: '/backstage/customized/standard-object' }
      }
    },
    ...customizedChild,
    {
      name: 'CustomObject',
      path: '/backstage/customized/custom-object-object',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/object-custom/index.vue'),
      meta: {
        title: '组织自定义对象',
        breadcrumb: { title: '组织自定义对象', path: '/backstage/customized/custom-object-object' }
      }
    },
    {
      name: 'Menu',
      path: '/backstage/customized/menu',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/menu/index.vue'),
      meta: {
        title: '菜单',
        breadcrumb: { title: '菜单', path: '/backstage/customized/menu' }
      }
    },
    {
      name: 'Application',
      path: '/backstage/customized/application',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/customized/application/index.vue'),
      meta: {
        title: '应用程序',
        breadcrumb: { title: '应用程序', path: '/backstage/customized/application' }
      }
    }
  ]
}

export default customized
