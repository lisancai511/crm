import Vue from 'vue'
import Router from 'vue-router'
import globalRouter from '@/router/modules/global'
import backstageRouter from '@/router/modules/backstage'
import designerRouter from '@/router/modules/designer'
import portalRouter from '@/router/modules/portal'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    portalRouter,
    backstageRouter,
    designerRouter,
    globalRouter
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
