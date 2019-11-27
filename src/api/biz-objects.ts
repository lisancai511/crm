import axios from '@/plugins/axios'
import { requestFail, requestSuccess, responseFail, responseSuccess } from '@/plugins/axios/interceptors'

const request = axios.create({
  baseURL: window.TENANT_REGION_ADDRESS + '/paas-metadata/api/v1/biz-objects'
})

request.interceptors.request.use(requestSuccess, requestFail)
request.interceptors.response.use(responseSuccess, responseFail)

// 获取标准对象列表
export function getObjects (
  isStandard?: boolean,
  cancelToken?: any
) {
  const params: { standard?: number } = {}
  if (isStandard !== undefined) {
    params.standard = isStandard ? 1 : 0
  }
  const data: any = { params }
  if (cancelToken) {
    data.cancelToken = cancelToken
  }
  return request.get('', data)
}

/**
 * @description 获得指定对象
 * @param {string} objectId
 */
export function getObjectById (objectId: string) {
  return request({
    method: 'get',
    url: `${objectId}`
  })
}

// 更新修改对象
export function updateObjects (data: any) {
  return request({
    method: 'put',
    url: `/${data.id}`,
    data
  })
}

// 创建对象
export function addObjects (data: any) {
  return request({
    method: 'post',
    url: `/`,
    data
  })
}

// 删除对象
export function deleteObjects (id: any) {
  return request({
    method: 'delete',
    url: `/${id}`
  })
}

// 获取所有记录类型
export function getAllRecordTypes (objectId: string) {
  return request({
    method: 'get',
    url: `/${objectId}/record-types`
  })
}

/**
 * @description 创建记录类型
 * @param {object} recordType
 * @param {string} objectId
 */
export function addRecordTypes (recordType: any, objectId: string) {
  return request({
    method: 'post',
    url: `/${objectId}/record-types`,
    data: recordType
  })
}

// 删除指定记录类型
export function deleteRecordTypes (objectId: any, recordTypeId: any) {
  return request({
    method: 'delete',
    url: `/${objectId}/record-types/${recordTypeId}`
  })
}

// 获取指定记录类型
export function getSingleRecordTypes (objectId: any, recordTypeId: any) {
  return request({
    method: 'get',
    url: `/${objectId}/record-types/${recordTypeId}`
  })
}

// 修改指定记录类型
export function updateRecordTypes (objectId: any, recordTypeId: any, data: any) {
  return request({
    method: 'put',
    url: `/${objectId}/record-types/${recordTypeId}`,
    data
  })
}

/**
 * @description 获取指定对象的所有字段
 * @param {string} objectId 对象id
 * @param {string} [fieldType] 字段类型
 * @param {string} [layoutId] 布局id
 * @param {string} [cancelToken]
 */
export function getFields (
  objectId: string,
  fieldType?: string | null,
  layoutId?: string | null,
  cancelToken?: any
) {
  const params: any = {}
  if (fieldType) {
    params.fieldType = fieldType
  }
  if (layoutId) {
    params.layoutId = layoutId
  }
  // TODO 暂时添加size
  params.size = 10000
  const data: any = { params }
  if (cancelToken) {
    data.cancelToken = cancelToken
  }
  return request.get(`/${objectId}/fields`, data)
}

// 获取单个字段
export function getFieldDetails (objectId: string | number, fieldId: any) {
  return request({
    method: 'get',
    url: `/${objectId}/fields/${fieldId}`
  })
}

// 创建字段
export function addFields (data: any, id: any) {
  return request({
    method: 'post',
    url: `/${id}/fields`,
    data
  })
}

// 修改字段
export function updateFields (objectId: any, fieldId: any, data: any) {
  return request({
    method: 'put',
    url: `/${objectId}/fields/${fieldId}`,
    data
  })
}

// 删除字段
export function deleteFields (objectId: any, fieldId: any) {
  return request({
    method: 'delete',
    url: `/${objectId}/fields/${fieldId}`
  })
}

/**
 * @description 获取对象全部布局
 * @param {string} objectId
 */
export function getLayouts (objectId: string) {
  return request({
    method: 'get',
    url: `/${objectId}/layouts`
  })
}

// 删除指定布局
export function deleteLayouts (objectId: any, layoutId: any) {
  return request({
    method: 'delete',
    url: `/${objectId}/layouts/${layoutId}`
  })
}

// 修改布局
export function updateLayouts (objectId: any, layoutId: any, data: any) {
  return request({
    method: 'put',
    url: `/${objectId}/layouts/${layoutId}`,
    data
  })
}

// 获取字段依赖关系
export function getFieldDependencies (id: any) {
  return request({
    method: 'get',
    url: `/${id}/field-dependencies`
  })
}

// interface IFieldValueCandidateFunc {
//   (objectId: string, fieldId: string): AxiosPromise<any>
// }
// interface IFieldValueCandidateFunc {
//   (objectApiName: string, fieldApi: string): AxiosPromise<any>
// }
/**
 * @description 获得指定对象指定字段候选值列表
 * @param {string} objectIdOrApiName
 * @param {string} fieldIdOrApiName
 */
export function getFieldValueCandidate (
  objectIdOrApiName: string,
  fieldIdOrApiName: string
) {
  return request({
    method: 'get',
    url: `/${objectIdOrApiName}/fields/${fieldIdOrApiName}/value-candidate`
  })
}

/**
 * @description 获得指定布局的UI列表
 * @param {number|string} layoutId
 * @param {number|string} objectId
 */
export function getLayoutUIs (
  objectId: string | number,
  layoutId: string | number
) {
  return request({
    method: 'get',
    url: `/${objectId}/layouts/${layoutId}/uis`
  })
}

/**
 * @description创建布局UI
 * @param {number|string} layoutId
 * @param {number|string} objectId
 * @param {object} layout
 */
export function createLayoutUIs (
  objectId: string | number,
  layoutId: string | number,
  layout: any
) {
  return request({
    method: 'post',
    url: `/${objectId}/layouts/${layoutId}/uis`,
    data: layout
  })
}

/**
 * @description修改布局UI
 * @param {number|string} uiId
 * @param {number|string} layoutId
 * @param {number|string} objectId
 * @param {object} layout
 */
export function updateLayoutUIs (
  uiId: string | number,
  objectId: string | number,
  layoutId: string | number,
  layout: any
) {
  return request({
    method: 'put',
    url: `/${objectId}/layouts/${layoutId}/uis/${uiId}`,
    data: layout
  })
}

/**
 * @description 获得指定的UI
 * @param {number|string} uiId
 * @param {number|string} layoutId
 * @param {number|string} objectId
 */
export function getLayoutUIDetails (
  uiId: string | number,
  objectId: string | number,
  layoutId: string | number
) {
  return request({
    method: 'get',
    url: `/${objectId}/layouts/${layoutId}/uis/${uiId}`
  })
}

// 创建依赖
export function addFieldDependence (objectId: string, data: any) {
  return request({
    method: 'post',
    url: `/${objectId}/field-dependencies`,
    data
  })
}

// 修改依赖
export function updateFieldDependence (objectId: string, dependencyId: string, data: any) {
  return request({
    method: 'put',
    url: `/${objectId}/field-dependencies/${dependencyId}`,
    data
  })
}

// 删除依赖
export function deleteFieldDependence (objectId: string, dependencyId: any) {
  return request({
    method: 'delete',
    url: `/${objectId}/field-dependencies/${dependencyId}`
  })
}

// 获取依赖
export function getFieldDependence (objectId: string, dependencyId: any) {
  return request({
    method: 'get',
    url: `/${objectId}/field-dependencies/${dependencyId}`
  })
}

// 创建布局
export function addLayouts (objectId: string, data: any) {
  return request({
    method: 'post',
    url: `/${objectId}/layouts`,
    data
  })
}

/**
 * @description 获取对象相关列表
 * @param {string} objectId 对象ID
 */
export function getLookups (objectId: string) {
  return request({
    method: 'get',
    url: `/${objectId}/lookup`
  })
}

/**
 * @description 修改布局分配
 * @param {string} objectId 对象ID
 * @param {any} data
 */
export function updateLayoutDistribution (data: any, objectId: string) {
  return request({
    method: 'put',
    url: `/${objectId}/layout-assignments`,
    data
  })
}

/**
 * @description 获取指定对象布局分配
 * @param {string} objectId 对象ID
 */
export function getLayoutDistribution (objectId: string) {
  return request({
    method: 'get',
    url: `/${objectId}/layout-assignments`
  })
}

/**
 * @description 获得指定对象全部操作列表
 * @param {string} objectId 对象ID
 * @param {string} type
 * @param {string} [cancelToken]
 */
export function getOperators (
  objectId: string,
  type?: 'Button' | '',
  cancelToken?: any
):any {
  // // TODO objectId 暂时只能为1
  // objectId = '1'
  const params: any = {}
  if (type) {
    params.type = type
  }
  const data: any = { params }
  if (cancelToken) {
    data.cancelToken = cancelToken
  }
  return new Promise((resolve, reject) => {
    request({
      method: 'get',
      url: `/${objectId}/operators`,
      data
    }).then((res: any) => {
      res.data.data = res.data.data.map((item: any) => {
        return {
          ...item,
          position: item.position.split(',')
        }
      })
      resolve(res)
    }).catch(reject)
  })
}

/**
 * 获取应用视图
 * @param objectId
 * @param appId
 * @param cancelToken
 */
export function getAppListView (
  objectId: string,
  appId: string,
  cancelToken?: any
) {
  const data: any = {}
  if (cancelToken) {
    data.cancelToken = cancelToken
  }
  return request.get(`/${objectId}/app/${appId}/list-views`, data)
}

/**
 * 修改应用视图
 * @param objectId
 * @param appId
 * @param viewId
 * @param view
 */
export function putAppListView (
  objectId: string,
  appId: String,
  viewId: string,
  view: {
    standard?: boolean,
    showAll?: boolean,
    name?: string,
    sed?: number,
    listConfig?: {
      fieldWidthConfig?: string,
      showFieldConfig?: string,
      orderByConfig?: string,
    },
    fields?: { apiName: string }[]
  }
) {
  return request.put(`/${objectId}/app/${appId}/list-views/${viewId}`, view)
}

/**
 * @param objectId
 * @param appId
 * @param view
 */
export function newAppListView (
  objectId: string,
  appId: String,
  view: {
    standard: boolean,
    showAll: boolean,
    name: string,
    conditions: {
      fieldApiName: string,
      operator: 'EQ' | 'NOT_EQ' | 'GT' | 'GTE' | 'LT' | 'LTE' | 'LIKE' | 'NOT_LIKE' | 'IN' | 'NOT_IN' | 'START_WITH' | 'END_WITH' | 'IS_NULL' | 'IS_NOT_NULL',
      values: []
    }[],
    listConfig: {
      fieldWidthConfig?: string,
      showFieldConfig?: string,
      orderByConfig?: string
    }
  }
) {
  return request.post(`/${objectId}/app/${appId}/list-views`, view)
}
