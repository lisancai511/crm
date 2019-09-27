import Vue from 'vue'
import Vuex from 'vuex'

import { IDesignerState } from '@/store/modules/designer'

Vue.use(Vuex)

export interface IRootState {
  designer: IDesignerState
}

export default new Vuex.Store<IRootState>({})
