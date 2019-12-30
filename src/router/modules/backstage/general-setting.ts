/**
 * Created by LiuLei on 2019/11/26
 */
import { RouteConfig } from 'vue-router'

const generalSettingRouter: RouteConfig = {
  name: 'GeneralSetting',
  path: '/backstage/general-setting',
  redirect: 'backstage/general-setting/personal',
  component: () => import(/* webpackChunkName: "dashboard" */ '@/layout/empty-router-view.vue'),
  meta: {
    title: '常规设置',
    icon: 'dd-icon-Setup'
  },
  children: [
    {
      name: 'PersonalSetting',
      path: '/backstage/general-setting/personal',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/general-setting/personal-setting.vue'),
      meta: {
        title: '个人设置',
        inNav: true
      }
    },
    {
      name: 'CompanySetting',
      path: '/backstage/general-setting/company',
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/general-setting/company-setting.vue'),
      meta: {
        title: '公司设置',
        breadcrumb: { title: '公司设置', path: '/backstage/general-setting/company' },
        inNav: true
      }
    }
  ]
}
export default generalSettingRouter
