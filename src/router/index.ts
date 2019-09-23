import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/index.vue'
import router from '@/router/modules/backstage/index'

import formDesignerRouter from '@/router/modules/backstage/formDesigner'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Layout,
      children: router
    },
    formDesignerRouter,
    {
      name: 'Login',
      path: '/login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
    },
    {
      name: 'Register',
      path: '/register',
      component: () => import(/* webpackChunkName: "register" */ '@/views/register/index.vue')
    }
  ]
})
