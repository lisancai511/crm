import router from './router'
import { Route } from 'vue-router'

router.beforeEach(async (to: Route, _: Route, next: any) => {
  next()
})

router.afterEach((to: Route) => {
})
