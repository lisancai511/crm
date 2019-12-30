import Vue from 'vue'
import Vuex from 'vuex'

import { IDesignerState } from '@/store/modules/designer'
import { RoleState } from '@/store/modules/role'
import backstageStore from '@/store/modules/backstage'
import user from '@/store/modules/user'
import app from '@/store/modules/app'
// import role from '@/store/modules/role'

Vue.use(Vuex)

export interface IRootState {
  designer: IDesignerState,
  roleModule: RoleState
}

export default new Vuex.Store<IRootState>({
  modules: {
    backstage: backstageStore,
    user,
    app
  }
})
