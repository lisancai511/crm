import { RouteConfig } from 'vue-router'
import customized from '@/router/modules/backstage/customized'

const router: RouteConfig[] = [
  {
    name: 'GeneralSetting',
    path: '/',
    redirect: 'backstage/general-setting/personalSetting',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/general-setting/index.vue'),
    meta: {
      title: '常规设置',
      breadcrumb: { title: '常规设置', path: '/' }
    },
    children: [
      {
        name: 'PersonalSetting',
        path: '/backstage/general-setting/personalSetting',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/general-setting/personal-setting.vue'),
        meta: {
          title: '个人设置',
          breadcrumb: { title: '个人设置', path: '/backstage/general-setting/personalSetting' }
        }
      },
      {
        name: 'CompanySetting',
        path: '/backstage/general-setting/companySetting',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/general-setting/company-setting.vue'),
        meta: {
          title: '公司设置',
          breadcrumb: { title: '公司设置', path: '/backstage/general-setting/companySetting' }
        }
      }
    ]
  },
  {
    name: 'UserAndSecuritySetting',
    path: '/c',
    meta: {
      title: '用户及安全设置'
    },
    children: [
      {
        name: 'User',
        path: '/user',
        meta: {
          title: '用户'
        }
      },
      {
        name: 'Role',
        path: '/role',
        meta: {
          title: '角色'
        }
      },
      {
        name: 'Department',
        path: '/department',
        meta: {
          title: '公司部门'
        }
      },
      {
        name: 'ObjectSecurity',
        path: '/role',
        meta: {
          title: '对象安全性'
        }
      }
    ]
  },
  customized,
  {
    name: 'c',
    path: '/c',
    meta: {
      title: '业务参数设置'
    }
  },
  {
    name: 'd',
    path: '/d',
    meta: {
      title: '办公参数设置'
    }
  },
  {
    name: 'e',
    path: '/e',
    meta: {
      title: '平台开发'
    }
  }
]

export default router
