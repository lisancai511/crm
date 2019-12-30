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
    icon: 'dd-icon-security'
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
    },
    {
      name: 'DictionaryLayout',
      path: '/backstage/data-management/dictionaries',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/layout/empty-router-view.vue'),
      meta: {
        title: '数据字段'
      },
      children: [
        {
          name: 'DictionaryNew',
          path: '/backstage/data-management/dictionaries/add',
          component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/data-management/dictionaries/new.vue'),
          meta: {
            title: '新建数据字段'
          }
        },
        {
          name: 'DictionaryDetails',
          path: '/backstage/data-management/dictionaries/:dictionaryId',
          props: true,
          component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/data-management/dictionaries/details.vue'),
          meta: {
            title: '数据字段详情'
          }
        }
      ]
    }
  ]
}

export default dataManagementRouter
