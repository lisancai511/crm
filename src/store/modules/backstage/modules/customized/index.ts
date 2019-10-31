/**
 * Created by LiuLei on 2019/10/16
 */
import api from '@/api'
import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { arrToMap } from '@/utils'

export interface IServerObject {
  apiName: string,
  createTime: string,
  creator: string,
  creatorName: string,
  description: string,
  enable: boolean,
  iconUrl: string,
  id: string,
  lastModifiedTime: string,
  lastModifier: string,
  lastModifierName: string,
  name: string,
  nameFieldName: string,
  nameFieldType: string,
  repeatable: boolean,
  standard: boolean,
  type: boolean
}

export interface IBackstageCustomizedState {
  standardObjects: IServerObject[]
  customObjects: IServerObject[]
  menus: any[]
}

const state: IBackstageCustomizedState = {
  standardObjects: [],
  customObjects: [],
  menus: []
}

const mutations: MutationTree<IBackstageCustomizedState> = {
  UPDATE_OBJECTS (state, objects: IServerObject[]) {
    const standardObjects: IServerObject[] = []
    const customObjects: IServerObject[] = []

    objects.forEach((object: IServerObject) => {
      if (object.standard) {
        standardObjects.push(object)
      } else {
        customObjects.push(object)
      }
    })
    state.standardObjects = standardObjects
    state.customObjects = customObjects
  }
}

const getters: GetterTree<IBackstageCustomizedState, any> = {
  objectById (state: IBackstageCustomizedState) {
    return arrToMap([...state.standardObjects, ...state.customObjects], 'id')
  },
  objects (stage: IBackstageCustomizedState) {
    return [...stage.customObjects, ...stage.standardObjects]
  }
}

const actions: ActionTree<IBackstageCustomizedState, any> = {
  async getObjects ({ commit }, isStandard?: boolean) {
    try {
      const {
        data: {
          data
        }
      } = await api.bizObjects.getObjects(isStandard)
      commit('UPDATE_OBJECTS', data)
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
  getters
}
