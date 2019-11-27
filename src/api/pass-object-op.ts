/**
 * Created by LiuLei on 2019/11/13
 */
import axios from '@/plugins/axios'
import { requestFail, requestSuccess, responseFail, responseSuccess } from '@/plugins/axios/interceptors'

const request = axios.create({
  baseURL: window.TENANT_REGION_ADDRESS + '/paas-object-op/api/v1/'
})

request.interceptors.request.use(requestSuccess, requestFail)
request.interceptors.response.use(responseSuccess, responseFail)

/**
 * 获取app记录
 * @param {string} objApiName
 * @param {object} params
 * @param {string} cancelToken
 */
export function getAppRecords (
  objApiName: string,
  params?: {
    size?: number,
    info?: {
      colApiName?: string[],
      filters?: {
        fieldApiName: string,
        values: string[],
        operator: any
      }[],
      orders?: {
        fieldApiName: string
        asc: boolean
      }[]
    }
  },
  cancelToken?: any
) {
  const config: any = {}
  if (params) {
    config.params = params
  }
  if (cancelToken) {
    config.cancelToken = cancelToken
  }
  return request.get(`/biz-objects/${objApiName}`, config)
}

/**
 * 获取记录详情
 * @param objApiName
 * @param recordId
 */
export function getAppRecord (
  objApiName: string,
  recordId: string
) {
  return request.get(`/biz-objects/${objApiName}/${recordId}`)
}

/**
 * 删除app记录
 * @param {string} objApiName
 * @param {array} ids
 */
export function deleteAppRecords (
  objApiName: string,
  ids: string[]
) {
  return request.delete(`/biz-objects/${objApiName}/${ids.join(',')}`)
}

/**
 * 新建记录
 * @param {string} objectApiName
 * @param {object} data
 */
export function newAppRecord (
  objectApiName: string,
  data: { [propName: string]: any }
) {
  return request.post(`/biz-objects/${objectApiName}`, data)
}

/**
 * 修改记录
 * @param{string} recordId
 * @param{string} objectApiName
 * @param{object} data
 */
export function putAppRecord (
  recordId: string,
  objectApiName: string,
  data: any
) {
  return request.put(`/biz-objects/${objectApiName}/${recordId}`, data)
}

/**
 * 修改所有人
 * @param {object} payload
 */
export function putAppRecordOwner (payload: {
  objectApiName: string,
  recordId: string,
  data: {
    ownerId: string
  }
}) {
  return request.put(`/biz-objects/${payload.objectApiName}/${payload.recordId}/owner`, payload.data)
}

/**
 * 修改记录类型
 * @param {object} payload
 */
export function putAppRecordRecordType (payload: {
  objectApiName: string,
  recordId: string,
  data: {
    recordTypeId: string
  }
}) {
  return request.put(`/biz-objects/${payload.objectApiName}/${payload.recordId}/record-type`, payload.data)
}

/**
 * 批量编辑
 */
export function putAppRecordField (
  payload: {
    objectApiName: string,
    recordId: string,
    data: {
      [propName: string]: string
    }
  }
) {
  return request.put(`/biz-objects/${payload.objectApiName}/${payload.recordId}`, payload.data)
}
