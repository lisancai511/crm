import { RouteConfig } from 'vue-router'
import LayoutTypes from '@/views/designer/config/LayoutTypes'

const officeSettingRouter: RouteConfig = {
  name: 'Office',
  path: '/backstage/office-setting',
  component: () => import(/* webpackChunkName: "dashboard" */ '@/layout/empty-router-view.vue'),
  meta: {
    title: '办公参数设置',
    icon: 'dd-icon-Folder'
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
            inNav: true
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
            },
            {
              name: 'BaseSetting',
              path: '/backstage/office-setting/integral-management/point-index-management/base-setting',
              component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/office-setting/integral-management/base-setting/index.vue'),
              meta: {
                title: '基础设置'
              }
            }
          ]
        }
      ]
    },
    {
      name: 'attendanceManagement',
      path: '/backstage/office-setting/attendance-management',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/layout/empty-router-view.vue'),
      meta: {
        title: '考勤管理',
        inNav: true
      },
      children: [
        {
          name: 'vacationRuleSetting',
          path: '/backstage/office-setting/attendance-management/vacation-manage',
          component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/office-setting/check-work-attendance-management/vacation-manage/index.vue'),
          meta: {
            title: '假期管理',
            inNav: true
          }
        },
        {
          name: 'vacationRuleSettingLayout',
          path: '/backstage/office-setting/attendance-management/vacation-manage',
          component: () => import(/* webpackChunkName: "dashboard" */ '@/layout/empty-router-view.vue'),
          meta: {
            title: '假期管理'
          },
          children: [
            {
              name: 'AddVacation',
              path: '/backstage/office-setting/attendance-management/vacation-manage/add-vacation',
              component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/office-setting/check-work-attendance-management/vacation-manage/add-vacation.vue'),
              meta: {
                title: '添加假期'
              }
            },
            {
              name: 'editVacation',
              path: '/backstage/office-setting/attendance-management/vacation-manage/:id?/edit-vacation',
              component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/office-setting/check-work-attendance-management/vacation-manage/add-vacation.vue'),
              meta: {
                title: '假期编辑'
              }
            }
          ]
        },
        {
          name: 'vacationBalance',
          path: '/backstage/office-setting/attendance-management/vacation-balance',
          component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/office-setting/check-work-attendance-management/vacation-balance/index.vue'),
          meta: {
            title: '假期余额',
            inNav: true
          }
        },
        {
          name: 'vacationBalanceLayout',
          path: '/backstage/office-setting/attendance-management/vacation-balance',
          component: () => import(/* webpackChunkName: "dashboard" */ '@/layout/empty-router-view.vue'),
          meta: {
            title: '假期余额'
          },
          children: [
            {
              name: 'vacationEdit',
              path: '/backstage/office-setting/attendance-management/vacation-balance/:id?/edit',
              component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/office-setting/check-work-attendance-management/vacation-balance/edit-vacation.vue'),
              meta: {
                title: '假期详情'
              }
            }
          ]
        },
        {
          name: 'overtimeManageSetting',
          path: '/backstage/office-setting/attendance-management/overtime-manage',
          component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/office-setting/check-work-attendance-management/overtime-manage/index.vue'),
          meta: {
            title: '加班管理',
            inNav: true
          }
        },
        {
          name: 'OvertimeManageEmpty',
          path: '/backstage/office-setting/attendance-management/overtime-manage',
          component: () => import(/* webpackChunkName: "dashboard" */ '@/layout/empty-router-view.vue'),
          meta: {
            title: '加班管理'
          },
          children: [
            {
              name: 'addOvertimeManage',
              path: '/backstage/office-setting/attendance-management/overtime-manage/add-overtime',
              component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/office-setting/check-work-attendance-management/overtime-manage/add-overtime.vue'),
              meta: {
                title: '添加加班规则'
              }
            },
            {
              name: 'editOvertimeManage',
              path: '/backstage/office-setting/attendance-management/overtime-manage/:id?/edit-overtime',
              component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/office-setting/check-work-attendance-management/overtime-manage/add-overtime.vue'),
              meta: {
                title: '修改加班规则'
              }
            },
            {
              name: 'updateOvertimeRule',
              path: '/backstage/office-setting/attendance-management/overtime-manage/update-overtime-rule',
              component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/office-setting/check-work-attendance-management/overtime-manage/update-overtime-rule.vue'),
              meta: {
                title: '修改加班基础设置'
              }
            }
          ]
        },
        {
          name: 'attendanceStatistics',
          path: '/backstage/office-setting/attendance-management/attendance-statistics',
          component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/office-setting/check-work-attendance-management/attendance-statistics/index.vue'),
          meta: {
            title: '考勤统计',
            inNav: true
          }
        }
      ]
    }
  ]
}

export default officeSettingRouter

export const newFormRouter: RouteConfig = {
  name: 'FormManagementNew',
  path: '/backstage/office-setting/form-management/design',
  component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/office-setting/form-management/new/index.vue'),
  meta: {
    title: '表单管理',
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
