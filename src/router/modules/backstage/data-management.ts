/**
 * Created by LiuLei on 2019/10/31
 */
import { RouteConfig } from 'vue-router'

const dataManagementRouter: RouteConfig = {
  name: 'DataManagement',
  path: '/backstage/data-management',
  component: () => import(/* webpackChunkName: "dashboard" */ '@/layout/empty-router-view.vue'),
  meta: {
    title: '数据管理',
    icon: 'security'
  },
  children: [
    {
      name: 'Dictionary',
      path: '/backstage/data-management/dictionaries',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/data-management/dictionaries/index.vue'),
      meta: {
        title: '数据字段',
        inNav: true
      }
    }
  ]
}

export default dataManagementRouter
