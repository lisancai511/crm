import { RouteConfig } from 'vue-router'
import LayoutTypes from '@/views/designer/config/LayoutTypes'

const officeSettingRouter: RouteConfig = {
  name: 'Office',
  path: '/backstage/office-setting',
  component: () => import(/* webpackChunkName: "dashboard" */ '@/layout/empty-router-view.vue'),
  meta: {
    title: '办公参数设置',
    icon: 'Folder'
  },
  children: [
    {
      name: 'formManagement',
      path: '/backstage/office-setting/form-management',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/office-setting/form-management/index.vue'),
      meta: {
        title: '表单管理',
        inNav: true
      }
    },
    {
      name: 'integral-management',
      path: '/backstage/office-setting/integral-management',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/layout/empty-router-view.vue'),
      meta: {
        title: '积分管理',
        inNav: true
      },
      children: [
        {
          name: 'basicSubManagement',
          path: '/backstage/office-setting/integral-management/basic-sub-management',
          component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/office-setting/integral-management/basic-sub-management.vue'),
          meta: {
            title: '基础分管理',
            inNav: true,
            icon: 'security'
          }
        },
        {
          name: 'pointIndexManagement',
          path: '/backstage/office-setting/integral-management/point-index-management',
          component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/office-setting/integral-management/point-index-management.vue'),
          meta: {
            title: '积分指标管理',
            inNav: true
          }
        },
        {
          name: 'pointIndexManagementLayout',
          path: '/backstage/office-setting/integral-management/point-index-management',
          component: () => import(/* webpackChunkName: "dashboard" */ '@/layout/empty-router-view.vue'),
          meta: {
            title: '积分指标管理'
          },
          children: [
            {
              name: 'importDefaultIndicatorLibrary',
              path: '/backstage/office-setting/integral-management/point-index-management/import-default-indicator-library',
              component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/office-setting/integral-management/import-default-indicator-library.vue'),
              meta: {
                title: '导入默认指标库'
              }
            },
            {
              name: 'importFromIndustryLibrary',
              path: '/backstage/office-setting/integral-management/point-index-management/import-from-industry-library',
              component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/office-setting/integral-management/import-from-industry-library.vue'),
              meta: {
                title: '从行业库添加指标'
              }
            }
          ]
        }
      ]
    },
    {
      name: 'attendanceManagement',
      path: '/backstage/office-setting/attendance-management',
      meta: {
        title: '考勤管理',
        inNav: true
      }
    }
  ]
}

export default officeSettingRouter

export const newFormRouter: RouteConfig = {
  name: 'FormManagementNew',
  path: '/backstage/office-setting/form-management/new',
  component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/office-setting/form-management/new/index.vue'),
  meta: {
    title: '新建表单',
    type: LayoutTypes.Mobile
  }
}

export const newIndexRouter: RouteConfig = {
  name: 'PointIndexManagementNew',
  path: '/backstage/office-setting/integral-management/point-index-management/new',
  component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/office-setting/integral-management/new/index.vue'),
  meta: {
    title: '新建表单',
    type: LayoutTypes.Mobile
  }
}
