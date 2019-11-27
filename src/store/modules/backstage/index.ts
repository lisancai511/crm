/**
 * Created by LiuLei on 2019/10/17
 */
import BackstageCustomized from '@/store/modules/backstage/modules/customized'
import { ActionTree, MutationTree } from 'vuex'
import api from '@/api'

export interface ISRole {
  id: string,
  name: string,
  stardard: boolean,
  tenantId: string,
  bizObjOpAuthEntitieDTOs: any,
  createdTime: string,
  creator: string,
  description: string,
  lastModifiedTime: string,
  lastModifier: string
}

interface IBackstageStage {
  roles: ISRole[]
}

const state: IBackstageStage = {
  roles: []
}

const mutations: MutationTree<IBackstageStage> = {
  UPDATE_ROLES (state, roles: ISRole[]) {
    state.roles = roles
  }
}

const actions: ActionTree<IBackstageStage, any> = {
  async getRoles ({ commit }) {
    try {
      const {
        data: {
          data: roles
        }
      } = await api.mainData.getRoles()
      commit('UPDATE_ROLES', roles)
    } catch (e) {
      console.error(e)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  modules: {
    customized: BackstageCustomized
  }
}
