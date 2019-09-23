import Vue from 'vue'
import Vuex from 'vuex'

import daoda from './modules/daoda/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    daoda
  }
})
