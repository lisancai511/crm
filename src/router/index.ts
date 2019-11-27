import Vue from 'vue'
import Router from 'vue-router'
import globalRouter from '@/router/modules/global'
import backstageRouter from '@/router/modules/backstage'
import designerRouter from '@/router/modules/designer'
import { newFormRouter, newIndexRouter } from '@/router/modules/backstage/office-setting'
import appRouter from '@/router/modules/app'
import Error404 from '@/layout/error-404.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'HOME',
      path: '/',
      redirect: '/app'
    },
    backstageRouter,
    designerRouter,
    globalRouter,
    newFormRouter,
    appRouter,
    newIndexRouter,
    { path: '*', component: Error404 },
    {
      name: 'share',
      path: '/share',
      meta: {
        title: '邀请成员'
      },
      component: () => import(/* webpackChunkName: "dashboard" */ '@/views/share/index.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = '到答云'
  }
  next()
})

export default router
