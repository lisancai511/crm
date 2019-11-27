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
    url: `/score-measures/batch/aviliable`,
    data
  })
}

/**
 * @description 获取积分分类下的指标树
 */
export function getDataScoreTree () {
  return request({
    method: 'get',
    url: `/score-measure-types/score-measures`
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
    url: `/score-measure-types`,
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
    url: `/score-measure-types`
  })
}

/**
 * @description 获得租户积分规则列表
 */
export function getScoreMeasureList (params?:any) {
  return request({
    method: 'get',
    url: `/score-measures`,
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
    url: `/score-measure-tree/nodes`,
    data
  })
}
