import axios from '@/plugins/axios'
import { requestFail, requestSuccess, responseFail, responseSuccess } from '@/plugins/axios/interceptors'

const request = axios.create({
  baseURL: window.TENANT_REGION_ADDRESS + '/jili-score/api/v1/'
})

request.interceptors.request.use(requestSuccess, requestFail)
request.interceptors.response.use(responseSuccess, responseFail)

/**
 * @description 批量添加积分指标
 */
export function addScoreMeasureImport (data:any) {
  return request({
    method: 'POST',
    url: '/score-measure-import',
    data
  })
}

/**
 * @description 添加各种积分指标
 */
export function addDataScore (data:any, type:any) {
  return request({
    method: 'POST',
    url: `/score-measures?dataSource=${type}`,
    data
  })
}

/**
 * @description 修改积分指标
 */
export function updateDataScore (data:any, type:any, id:any) {
  return request({
    method: 'put',
    url: `/score-measures/${id}?dataSource=${type}`,
    data
  })
}

/**
 * @description 修改积分指标可用性
 */
export function updateDataScoreUsability (data:any, id:any) {
  return request({
    method: 'put',
    url: `/score-measures/${id}/aviliable`,
    data
  })
}

/**
 * @description 批量修改积分指标可用性
 */
export function updateDataScoreUsabilityAll (data:any) {
  return request({
    method: 'put',
    url: '/score-measures/batch/aviliable',
    data
  })
}

/**
 * @description 获取积分分类下的指标树
 */
export function getDataScoreTree () {
  return request({
    method: 'get',
    url: '/score-measure-types/score-measures'
  })
}

/**
 * @description 获得从指定父节点开始行业树，不传parentId表示从根节点开始
 */
export function getIndustryTree (parentId:any) {
  return request({
    method: 'get',
    url: `/industries?parentId=${parentId}`
  })
}

/**
 * @description 删除积分管理类型
 */
export function deleteScoreMeasureTypes (id:any, params:any) {
  return request({
    method: 'delete',
    url: `/score-measure-tree/nodes/${id}`,
    params
  })
}

/**
 * @description 添加积分管理类
 */
export function addScoreMeasureTypes (data:any) {
  return request({
    method: 'post',
    url: '/score-measure-types',
    data
  })
}

/**
 * @description 修改积分管理类
 */
export function updateScoreMeasureTypes (params:any, id:any) {
  return request({
    method: 'put',
    url: `/score-measure-types/${id}`,
    params
  })
}

/**
 * @description 获取积分管理类型
 */
export function getScoreMeasureTypes () {
  return request({
    method: 'get',
    url: '/score-measure-types'
  })
}

/**
 * @description 获得租户积分规则列表
 */
export function getScoreMeasureList (params?:any) {
  return request({
    method: 'get',
    url: '/score-measures',
    params
  })
}

/**
 * @description 删除积分
 */
export function deleteScoreMeasure (id:any) {
  return request({
    method: 'delete',
    url: `/score-measures/${id}`
  })
}

export function addScoreMeasureNodes (data:any) {
  return request({
    method: 'post',
    url: '/score-measure-tree/nodes',
    data
  })
}

/**
 * @description 获得单个指标
 */
export function getScoreMeasure (id:any) {
  return request({
    method: 'get',
    url: `/score-measures/${id}`
  })
}

/**
 * @description 修改单个指标
 */
export function updateScoreMeasure (id:any, type:any, data:any) {
  return request({
    method: 'put',
    url: `/score-measures/${id}?dataSource=${type}`,
    data
  })
}

/**
 * @description 修改指标可用性
 */
export function updateScoreMeasureAviliable (data:any) {
  return request({
    method: 'put',
    url: '/score-measures/batch/aviliable',
    data
  })
}

/**
 * @description 获得用户基础分值状况
 */
export function getUserScore (params:any) {
  if (params.userIds.length > 0) {
    params.userIds = params.userIds.join(',')
  }
  if (params.orgIds.length > 0) {
    params.orgIds = params.orgIds.join(',')
  }
  if (params.roleIds.length > 0) {
    params.roleIds = params.roleIds.join(',')
  }
  return request({
    method: 'get',
    url: '/base-scores',
    params
  })
}

/**
 * @description 添加用户基础分值状况
 */
export function addUserScore (data:any) {
  return request({
    method: 'post',
    url: '/base-scores',
    data
  })
}

/**
 * @description 批量添加用户基础分值状况
 */
export function addUsersScore (data:any) {
  return request({
    method: 'post',
    url: '/base-scores/batch',
    data
  })
}

/**
 * @description 获得行业库
 */
export function getIndustries () {
  return request({
    method: 'get',
    url: '/industries'
  })
}

/**
 * @description 获得行业库下的指标库
 */
export function getIndustriesMeasures (parentIndustryId:any) {
  return request({
    method: 'get',
    url: `/score-measure-packs?parentIndustryId=${parentIndustryId}`
  })
}

/**
 * @description 获得指标库下的积分库
 */
export function getScoreMeasures (packId:any, params:any) {
  return request({
    method: 'get',
    url: `/score-measure-packs/${packId}/score-measures`,
    params
  })
}

/**
 * @description 批量添加默认积分指标
 */
export function addScoreMeasures (data:any) {
  return request({
    method: 'post',
    url: '/score-measure-import',
    data
  })
}

/**
 * @description 积分指标-创建积分指标基础设置
 */
export function addScoreBaseSetting (data:any) {
  return request({
    method: 'post',
    url: '/score-measure-configs',
    data
  })
}

/**
 * @description 积分指标-修改积分指标基础设置
 */
export function updateScoreBaseSetting (data:any) {
  return request({
    method: 'put',
    url: `/score-measure-configs/${data.id}`,
    data
  })
}

/**
 * @description 积分指标-获取积分指标基础设置
 */
export function getScoreBaseSetting () {
  return request({
    method: 'get',
    url: '/score-measure-configs'
  })
}
