import Vue from 'vue'
import Vuex from 'vuex'

import { IDesignerState } from '@/store/modules/designer'
import backstageStore from '@/store/modules/backstage'
import user from '@/store/modules/user'

Vue.use(Vuex)

export interface IRootState {
  designer: IDesignerState
}

export default new Vuex.Store<IRootState>({
  modules: {
    backstage: backstageStore,
    user
  }
})
