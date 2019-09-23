import request from '@/plugins/axios'

// 获取标准对象列表
export function getBizObjects () {
  return request({
    method: 'get',
    url: '/biz-objects'
  })
}

// 获取单个对象
export function getSingleBizObjects (id:any) {
  return request({
    method: 'get',
    url: `/biz-objects/${id}`
  })
}

// 更新修改对象
export function updateBizObjects (data:any) {
  return request({
    method: 'put',
    url: `/biz-objects/${data.id}`,
    data
  })
}

// 删除对象
export function deleteBizObjects (id:any) {
  return request({
    method: 'delete',
    url: `/biz-objects/${id}`
  })
}

// 获取所有记录类型
export function getAllRecordTypes (id:any) {
  return request({
    method: 'get',
    url: `/biz-objects/${id}/record-types`
  })
}


// 创建记录类型
export function addRecordTypes (data:any) {
  return request({
    method: 'post',
    url: `/biz-objects/${data.id}/record-types`,
    data
  })
}

// 删除指定记录类型
export function deleteRecordTypes (data:any) {
  return request({
    method: 'delete',
    url: `/biz-objects/${data.objectId}/record-types/${data.recordTypeId}`,
    data
  })
}

// 获得指定对象所有的字段
export function getFields (id:any) {
  return request({
    method: 'get',
    url: `/biz-objects/${id}/fields`
  })
}

// 创建字段
export function addFields (data:any) {
  return request({
    method: 'post',
    url: `/biz-objects/${data.id}/fields`,
    data
  })
}

// 修改字段
export function updateFields(data:any) {
  return request({
    method: 'put',
    url: `/biz-objects/${data.objectId}/fields/${data.fieldId}`,
    data
  })
}

// 删除字段
export function deleteFields (data:any) {
  return request({
    method: 'delete',
    url: `/biz-objects/${data.objectId}/fields/${data.fieldId}`
  })
}

// 