import router from './router'
import { Route } from 'vue-router'
import { UserModule } from '@/store/modules/user'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
import { getModule } from 'vuex-module-decorators'
import roleModule from '@/store/modules/role'
import { Message } from 'element-ui'

const whiteList = ['/login', '/register', '/company-choose', '/invitation']
const userModule = getModule(UserModule, store)

router.beforeEach(async (to: Route, _: Route, next: any) => {
  Nprogress.start()
  const hasToken = userModule.token
  if (hasToken) {
    if (to.path === '/login') {
      Nprogress.done()
      next('/')
    } else {
      if (!roleModule.initAuth) {
        try {
          await roleModule.getRole()
          router.addRoutes(roleModule.authList)
          next({ ...to, replace: true })
        } catch (e) {
          next()
        }
      } else {
        if (to.name) {
          next()
        } else {
          next()
          Message.error('页面不存在或者您没有权限')
          Nprogress.done()
        }
      }
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
