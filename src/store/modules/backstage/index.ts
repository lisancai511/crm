/**
 * Created by LiuLei on 2019/10/17
 */
// import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import BackstageCustomized from '@/store/modules/backstage/modules/customized'

// const name = 'backstage'

// export interface IBackstageState {
//   customized: IBackstageCustomizedState
// }

// @Module({
//   name,
//   namespaced: true
// })
// export default class Vehicle extends VuexModule {
//   public aaass = 12344
// }

export default {
  name,
  namespaced: true,
  modules: {
    customized: BackstageCustomized
  }
}
