import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index.vue'

import formDesignerRouter from '@/router/modules/backstage/formDesigner'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          name: 'Dashboard',
          path: '/',
          component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Home.vue')
        },
        {
          name: 'personalSetting',
          path: '/personalSetting',
          component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/general-setting/personal-setting.vue')
        },
        {
          name: 'companySetting',
          path: '/companySetting',
          component: () => import(/* webpackChunkName: "dashboard" */ '@/views/backstage/general-setting/company-setting.vue')
        },
        {
          name: 'About',
          path: '/about',
          component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
        }
      ]
    },
    {
      name: 'Login',
      path: '/login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
    },
    {
      name: 'Register',
      path: '/register',
      component: () => import(/* webpackChunkName: "register" */ '@/views/register/index.vue')
    },
    {
      name: 'Test',
      path: '/test',
      component: () => import(/* webpackChunkName: "test" */ '@/views/test.vue')
    },
    {
      name: 'Test1',
      path: '/test1',
      component: () => import(/* webpackChunkName: "test" */ '@/views/test1.vue')
    },
    formDesignerRouter
  ]
})
