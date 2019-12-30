import { RouteConfig } from 'vue-router'
import customizedRouter from '@/router/modules/backstage/customized'
import userSecuritySettingRouter from '@/router/modules/backstage/user-security-setting'
import dataManagementRouter from '@/router/modules/backstage/data-management'
import officeSettingRouter from '@/router/modules/backstage/office-setting'
import generalSettingRouter from '@/router/modules/backstage/general-setting'
import Layout from '@/layout/backstage/index.vue'

const router: RouteConfig = {
  path: '/backstage',
  component: Layout,
  children: [
    generalSettingRouter,
    userSecuritySettingRouter,
    customizedRouter,
    {
      name: 'Business',
      path: '/backstage/business-setting',
      meta: {
        title: '业务参数设置',
        icon: 'dd-icon-Bankcard'
      }
    },
    officeSettingRouter,
    dataManagementRouter,
    {
      name: 'Platform',
      path: '/backstage/platform-setting',
      meta: {
        title: '平台开发',
        icon: 'dd-icon-Development'
      }
    }
  ]
}

export default router
