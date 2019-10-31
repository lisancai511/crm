/**
 * Created by LiuLei on 2019/10/21
 */
import Vue from 'vue'
const momentPlugin = {
  install (Vue: any, options: any) {
    const moment = options && options.moment ? options.moment : require('moment')
    Object.defineProperties(Vue.prototype, {
      $moment: {
        get () {
          return moment
        }
      }
    })
  }
}
Vue.use(momentPlugin)
export default momentPlugin
