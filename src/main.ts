import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import '@/styles/index.scss'
import '@/plugins/element'
import '@/plugins/draggable'
import '@/permission'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
