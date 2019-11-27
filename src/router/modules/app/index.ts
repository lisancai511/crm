import { RouteConfig } from 'vue-router'

/**
 * Created by LiuLei on 2019/11/7
 */
const router: RouteConfig = {
  path: '/app',
  component: () => import(/* webpackChunkName: "dashboard" */ '@/layout/app/index.vue'),
  props: true,
  meta: {
    title: '应用'
  },
  children: [
    {
      name: 'App',
      path: '/app',
      components: {
        default: () => import(/* webpackChunkName: "dashboard" */ '@/views/app/empty.vue')
      },
      props: true,
      meta: {
        title: '应用'
      }
    },
    {
      name: 'AppHome',
      path: '/app/:appId',
      components: {
        default: () => import(/* webpackChunkName: "dashboard" */ '@/views/app/index.vue')
      },
      props: true,
      meta: {
        title: '应用主页'
      }
    },
    // {
    //   name: 'AppHome',
    //   path: '/app/:appId/:menuId',
    //   components: {
    //     default: () => import(/* webpackChunkName: "dashboard" */ '@/views/app/index.vue')
    //   },
    //   props: true,
    //   meta: {
    //     title: '应用菜单主页'
    //   }
    // },
    {
      name: 'AppList',
      path: '/app/:appId/:moduleId_objectId',
      components: {
        default: () => import(/* webpackChunkName: "dashboard" */ '@/views/app/records.vue')
      },
      props: true,
      meta: {
        title: '记录',
        keepAlive: true
      }
    },
    {
      name: 'AppListEmptyView',
      path: '/app/:appId/:moduleId_objectId',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/layout/empty-router-view.vue'),
      props: true,
      meta: {
        title: '记录'
      },
      children: [
        {
          name: 'NewAppRecord',
          path: '/app/:appId/:moduleId_objectId/records/new',
          components: {
            default: () => import(/* webpackChunkName: "dashboard" */ '@/views/app/new.vue')
          },
          props: true,
          meta: {
            title: '新建'
          }
        },
        {
          name: 'AppDetails',
          path: '/app/:appId/:moduleId_objectId/records/:recordId',
          components: {
            default: () => import(/* webpackChunkName: "dashboard" */ '@/views/app/details.vue')
          },
          props: true,
          meta: {
            title: '详情'
          }
        },
        {
          name: 'EditAppRecord',
          path: '/app/:appId/:moduleId_objectId/records/:recordId/edit',
          components: {
            default: () => import(/* webpackChunkName: "dashboard" */ '@/views/app/new.vue')
          },
          props: true,
          meta: {
            title: '编辑'
          }
        }
      ]
    }
  ]
}
export default router
