/**
 * Created by LiuLei on 2019/11/7
 */
import axios from '@/plugins/axios'
import { requestFail, requestSuccess, responseFail, responseSuccess } from '@/plugins/axios/interceptors'
import { IDD } from '@/types/common'

const request = axios.create({
  baseURL: window.TENANT_REGION_ADDRESS + '/paas-metadata/api/v1'
  // todo 换成真实地址
  // baseURL: 'http://47.94.245.113:7300/mock/5d760ceb7bd0602ac8480cc5/paas-metadata/api/v1'
  // baseURL: '/paas-metadata/api/v1'
})

request.interceptors.request.use(requestSuccess, requestFail)
request.interceptors.response.use(responseSuccess, responseFail)

/**
 * 新建模块
 * @param {object} module
 */
export function newModule (module: IDD.IModule) {
  return request.post('/modules', module)
}

/**
 * 编辑模块
 * @param {string} moduleId
 * @param {object} module
 */
export function putModule (moduleId: string, module: IDD.IModule) {
  return request.put(`/modules/${moduleId}`, module)
}

/**
 * 删除模块
 * @param {string} moduleId
 */
export function deleteModule (moduleId: string) {
  return request.delete(`/modules/${moduleId}`)
}

/**
 * 获取全部模块
 */
export function getModules (params: { checkAuth: boolean | string } = { checkAuth: false }) {
  return request.get('/modules', { params })
}

/**
 * 获取全部apps
 */
export function getApps (params: { checkAuth: boolean | string } = { checkAuth: false }) {
  return request.get('/apps', { params })
}

/**
 * 创建app
 * @param {object} app
 */
export function newApp (app: IDD.IApplication) {
  return request.post('apps', app)
}

/**
 * 更新应用程序
 * @param {object} app
 */
export function putApp (app: IDD.ISApplication) {
  return request.put(`apps/${app.id}`, app)
}

/**
 * 删除应用程序
 * @param {string} id
 */
export function deleteApp (id: string) {
  return request.delete(`apps/${id}`)
}

/**
 * 获取单个app详情
 * @param {string} appId
 * @param cancelToken
 * @param params
 */
export function getApp (
  appId: string,
  cancelToken?: any,
  params: { checkAuth: boolean | string } = { checkAuth: false }
) {
  const data: any = { params }
  if (cancelToken) {
    data.cancelToken = cancelToken
  }
  return request.get(`apps/${appId}`, data)
}

/**
 * 获取布局UI
 * @param objectId
 * @param layoutType
 * @param recordTypeId
 */
export function getLayoutUi (
  objectId: string,
  layoutType: string,
  recordTypeId: number|string
) {
  const params: any = {}
  if (recordTypeId) {
    params.recordTypeId = recordTypeId
  }
  return request.get(`/biz-objects/${objectId}/layouts/type/${layoutType}`, { params })
}
