import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/styles/index.scss'
import '@/styles/reset-element.scss'
import '@/plugins/bus'
import '@/plugins/dd-components'
import '@/plugins/element'
import '@/plugins/moment'
import '@/plugins/draggable'
import '@/permission'
import store from './store'
Vue.config.productionTip = false
Vue.prototype.$store = store

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#daoda')
