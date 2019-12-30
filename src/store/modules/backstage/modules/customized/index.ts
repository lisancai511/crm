/**
 * Created by LiuLei on 2019/10/16
 */
import api from '@/api'
import { ActionTree, MutationTree, GetterTree } from 'vuex'
import { arrToMap } from '@/utils'
import { IDD } from '@/types/common'
import { Message, MessageBox } from 'element-ui'
import axios from 'axios'

const CancelToken = axios.CancelToken

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
  modules: IDD.ISModule[],
  apps: IDD.ISApplication[],
  loadingObject: { [prop: string]: any }
}

const state: IBackstageCustomizedState = {
  standardObjects: [],
  customObjects: [],
  modules: [],
  apps: [],
  loadingObject: {
    source: CancelToken.source(),
    loading: false,
    payload: null
  }
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
  },
  UPDATE_MODULES (state, modules: IDD.ISModule[]) {
    state.modules = modules
  },
  UPDATE_APPS (state, apps: IDD.ISApplication[]) {
    state.apps = apps
  }
}

const getters: GetterTree<IBackstageCustomizedState, any> = {
  objectById (state: IBackstageCustomizedState) {
    return arrToMap([...state.standardObjects, ...state.customObjects], 'id')
  },
  objects (stage: IBackstageCustomizedState) {
    return [...stage.customObjects, ...stage.standardObjects]
  },
  moduleById (stage) {
    return arrToMap(stage.modules, 'id')
  }
}

const actions: ActionTree<IBackstageCustomizedState, any> = {
  async getObjects ({ commit, state, dispatch }, isStandard?: boolean | undefined) {
    // TODO 暂时请求全部对象的接口
    isStandard = undefined
    try {
      if (state.loadingObject.loading && state.loadingObject.payload === isStandard) {
        state.loadingObject.source.cancel()
      }
      state.loadingObject.loading = true
      state.loadingObject.payload = isStandard
      state.loadingObject.source = CancelToken.source()
      const {
        data: {
          data
        }
      } = await api.bizObjects.getObjects(isStandard, state.loadingObject.source.token)
      commit('UPDATE_OBJECTS', data)
      // TODO 优化
      dispatch('getModules')
    } catch (e) {
      console.error(e)
    } finally {
      state.loadingObject.loading = false
    }
  },
  async getModules ({ commit, dispatch }, payload: { checkAuth: boolean } = { checkAuth: false }) {
    try {
      const {
        data: {
          data: modules
        }
      } = await api.metaData.getModules({ checkAuth: payload.checkAuth })
      commit('UPDATE_MODULES', modules)
      // 更新应用程序
      // TODO 优化
      dispatch('getApps')
    } catch (e) {
      console.error(e)
    }
  },
  async newModule ({ dispatch }, module: IDD.IModule) {
    try {
      await api.metaData.newModule(module)
      dispatch('getModules')
      Message.success('新建模块成功')
    } catch (e) {
      console.error(e)
    }
  },
  async putModule ({ dispatch }, module: IDD.ISModule) {
    try {
      await api.metaData.putModule(module.id as string, module)
      dispatch('getModules')
      Message.success('编辑模块成功')
    } catch (e) {
      console.error(e)
    }
  },
  async deleteModule ({ commit, state }, id: string) {
    return new Promise((resolve, reject) => {
      try {
        MessageBox.confirm('此操作将永久删除该模块, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await api.metaData.deleteModule(id)
          commit('UPDATE_MODULES', state.modules.filter((module: IDD.ISModule) => {
            return `${module.id}` !== `${id}`
          }))
          Message.success('删除模块成功')
          resolve()
        })
      } catch (e) {
        console.log(e)
        reject(e)
      }
    })
  },
  async getApps ({ commit }, payload: { checkAuth: boolean } = { checkAuth: false }) {
    try {
      const {
        data: {
          data: apps
        }
      } = await api.metaData.getApps({ checkAuth: payload.checkAuth })
      commit('UPDATE_APPS', apps)
    } catch (e) {
      console.error(e)
    }
  },
  async newApp ({ dispatch }, app: IDD.IApplication) {
    try {
      await api.metaData.newApp(app)
      dispatch('getApps')
      Message.success('新建应用程序成功')
    } catch (e) {
      console.error(e)
    }
  },
  async putApp ({ dispatch }, app: IDD.ISApplication) {
    try {
      await api.metaData.putApp(app)
      dispatch('getApps')
      Message.success('修改应用程序成功')
    } catch (e) {
      console.error(e)
    }
  },
  async deleteApp ({ commit, state }, id: string) {
    return new Promise((resolve, reject) => {
      try {
        MessageBox.confirm('此操作将永久删除该应用程序, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await api.metaData.deleteApp(id)
          commit('UPDATE_APPS', state.apps.filter((app: IDD.ISApplication) => {
            return `${app.id}` !== `${id}`
          }))
          Message.success('删除应用程序成功')
          resolve()
        })
      } catch (e) {
        console.log(e)
        reject(e)
      }
    })
  }
}

export default {
  namespaced: true,
  state () {
    return state
  },
  mutations,
  actions,
  getters
}
