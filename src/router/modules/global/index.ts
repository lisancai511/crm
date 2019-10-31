import { RouteConfig } from 'vue-router'
import Login from '@/layout/account.vue'

const globalRouter: RouteConfig =
  {
    path: '/',
    component: Login,
    children: [
      {
        name: 'SingIn',
        path: '/login',
        meta: {
          title: '登录'
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/global/login/index.vue')
      },
      {
        name: 'register',
        path: '/register',
        meta: {
          title: '注册'
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/global/register/index.vue')
      },
      {
        name: 'CompanyChoose',
        path: '/company-choose',
        meta: {
          title: '选择公司'
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/global/choose-company/index.vue')
      }
    ]
  }

export default globalRouter
