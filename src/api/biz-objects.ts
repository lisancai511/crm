import request from '@/plugins/axios'

// 获取标准对象列表
export function getBizObjects () {
  return request({
    method: 'get',
    url: '/biz-objects'
  })
}

// 获取单个对象
export function getSingleBizObjects (id: any) {
  return request({
    method: 'get',
    url: `/biz-objects/${id}`
  })
}

// 更新修改对象
export function updateBizObjects (data: any) {
  return request({
    method: 'put',
    url: `/biz-objects/${data.id}`,
    data
  })
}

// 删除对象
export function deleteBizObjects (id: any) {
  return request({
    method: 'delete',
    url: `/biz-objects/${id}`
  })
}

// 获取所有记录类型
export function getAllRecordTypes (id: any) {
  return request({
    method: 'get',
    url: `/biz-objects/${id}/record-types`
  })
}

// 创建记录类型
export function addRecordTypes (data: any, id:any) {
  return request({
    method: 'post',
    url: `/biz-objects/${id}/record-types`,
    data
  })
}

// 删除指定记录类型
export function deleteRecordTypes (objectId:any, recordTypeId:any) {
  return request({
    method: 'delete',
    url: `/biz-objects/${objectId}/record-types/${recordTypeId}`
  })
}

/**
 * @description 获取指定对象的所有字段
 * @param {number|string} id 对象id
 */
export function getFields (id: string | number) {
  return request({
    method: 'get',
    url: `/biz-objects/${id}/fields`
  })
}

// 获取单个字段
export function getSingleFields (objectId: string | number, fieldId: any) {
  return request({
    method: 'get',
    url: `/biz-objects/${objectId}/fields/${fieldId}`
  })
}

/**
 * @description 获取指定对象的所有按钮
 * @param {number|string} id 对象id
 */
export function getButtons (id: string | number) {
  // TODO 暂时不支持此接口
  return { data: [] }
  // return request({
  //   method: 'get',
  //   url: `/biz-objects/${id}/buttons`
  // })
}

// 创建字段
export function addFields (data: any, id:any) {
  return request({
    method: 'post',
    url: `/biz-objects/${id}/fields`,
    data
  })
}

// 修改字段
export function updateFields (objectId:any, fieldId:any, data:any) {
  return request({
    method: 'put',
    url: `/biz-objects/${objectId}/fields/${fieldId}`,
    data
  })
}

// 删除字段
export function deleteFields (objectId:any, fieldId:any) {
  return request({
    method: 'delete',
    url: `/biz-objects/${objectId}/fields/${fieldId}`
  })
}

// 获取所有布局
export function getLayouts (id:any) {
  return request({
    method: 'get',
    url: `/biz-objects/${id}/layouts`
  })
}

// 获取字段依赖关系
export function getFieldDependencies (id:any) {
  return request({
    method: 'get',
    url: `/biz-objects/${id}/field-dependencies`
  })
}

// 获得指定对象指定字段候选值列表
export function getObjDepend (objectId:any, fieldId:any) {
  return request({
    method: 'get',
    url: `/biz-objects/${objectId}/fields/${fieldId}/value-candidate`
  })
}

/**
 * 创建布局UI
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
    url: `/biz-objects/${objectId}/layouts/${layoutId}/uis`,
    data: layout
  })
}

// 创建依赖
export function addDepend (objectId:any, data:any) {
  return request({
    method: 'post',
    url: `/biz-objects/${objectId}/field-dependencies`,
    data
  })
}

// 创建布局
export function addLayots (objectId:any, data:any) {
  return request({
    method: 'post',
    url: `/biz-objects/${objectId}/layouts`,
    data
  })
}
