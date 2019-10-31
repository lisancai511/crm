import router from './router'
import { Route } from 'vue-router'
import { UserModule } from '@/store/modules/user'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
import { getModule } from 'vuex-module-decorators'

const whiteList = ['/login', '/register', '/company-choose']
const userModule = getModule(UserModule, store)

router.beforeEach(async (to: Route, _: Route, next: any) => {
  Nprogress.start()
  const hasToken = userModule.token
  if (hasToken) {
    if (to.path === '/login') {
      Nprogress.done()
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
    Nprogress.done()
  }
})

router.afterEach(() => {
  Nprogress.done()
})
