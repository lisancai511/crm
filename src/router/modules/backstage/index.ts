import { RouteConfig } from 'vue-router'
import customizedRouter from '@/router/modules/backstage/customized'
import userSecuritySettingRouter from '@/router/modules/backstage/user-security-setting'
import dataManagementRouter from '@/router/modules/backstage/data-management'
import Layout from '@/layout/backstage/index.vue'

const router: RouteConfig = {
  path: '/',
  component: Layout,
  children: [
    {
      name: 'GeneralSetting',
      path: '/backstage/general-setting',
      redirect: 'backstage/general-setting/personalSetting',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/layout/empty-router-view.vue'),
      meta: {
        title: '常规设置',
        breadcrumb: { title: '常规设置', path: '/' },
        icon: 'Setup'
      },
      children: [
        {
          name: 'PersonalSetting',
          path: '/backstage/general-setting/personalSetting',
          component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/general-setting/personal-setting.vue'),
          meta: {
            title: '个人设置',
            breadcrumb: { title: '个人设置', path: '/backstage/general-setting/personalSetting' },
            inNav: true
          }
        },
        {
          name: 'CompanySetting',
          path: '/backstage/general-setting/companySetting',
          component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/general-setting/company-setting.vue'),
          meta: {
            title: '公司设置',
            breadcrumb: { title: '公司设置', path: '/backstage/general-setting/companySetting' },
            inNav: true
          }
        }
      ]
    },
    userSecuritySettingRouter,
    customizedRouter,
    {
      name: 'Business',
      path: '/backstage/business-setting',
      meta: {
        title: '业务参数设置',
        icon: 'Bankcard'
      }
    },
    {
      name: 'Office',
      path: '/backstage/office-setting',
      meta: {
        title: '办公参数设置',
        icon: 'Folder'
      }
    },
    dataManagementRouter,
    {
      name: 'Platform',
      path: '/backstage/platform-setting',
      meta: {
        title: '平台开发',
        icon: 'Development'
      }
    }
  ]
}

export default router
