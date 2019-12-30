import axios from '@/plugins/axios'
import { requestFail, requestSuccess, responseFail, responseSuccess } from '@/plugins/axios/interceptors'

const request = axios.create({
  baseURL: window.TENANT_REGION_ADDRESS + '/jili-oa/api/v1/'
})

request.interceptors.request.use(requestSuccess, requestFail)
request.interceptors.response.use(responseSuccess, responseFail)

/**
 * @description 验证链接是否过期
 */
export function linkIsTimeout (id:any) {
  return request({
    method: 'get',
    url: `/join-invites/${id}/expired`
  })
}

/**
 * @description 获取邀请人信息
 */
export function getInfo (id:any) {
  return request({
    method: 'get',
    url: `/join-invites/${id}/inviter-info`
  })
}

/**
 * @description 被邀请人加入
 */
export function joinCompany (data:any) {
  return request({
    method: 'get',
    url: '/join-applies',
    data
  })
}

/**
 * @description 获取假期列表
 */
export function getVacationsList (params:any) {
  return request({
    method: 'get',
    url: '/vacations',
    params
  })
}

/**
 * @description 获取单个假期
 */
export function getVacation (id:any) {
  return request({
    method: 'get',
    url: `/vacations/${id}`
  })
}

/**
 * @description 新增假期
 */
export function addVacations (data:any) {
  return request({
    method: 'post',
    url: '/vacations',
    data
  })
}

/**
 * @description 修改假期
 */
export function updateVacations (data:any) {
  return request({
    method: 'put',
    url: `/vacations/${data.id}`,
    data
  })
}

/**
 * @description 删除假期
 */
export function deleteVacations (id:any) {
  return request({
    method: 'delete',
    url: `/vacations/${id}`
  })
}

/**
 * @description 获取加班规则列表
 */
export function getOvertimeRules (params:any) {
  return request({
    method: 'get',
    url: '/overtime-rules',
    params
  })
}

/**
 * @description 新建加班规则
 */
export function addOvertimeRules (data:any) {
  return request({
    method: 'post',
    url: '/overtime-rules',
    data
  })
}

/**
 * @description 修改加班规则
 */
export function updateOvertimeRules (data:any) {
  return request({
    method: 'put',
    url: `/overtime-rules/${data.id}`,
    data
  })
}

/**
 * @description 删除加班规则
 */
export function deleteOvertimeRules (id:any) {
  return request({
    method: 'delete',
    url: `/overtime-rules/${id}`
  })
}

/**
 * @description 获取单个加班规则
 */
export function getOvertimeRule (id:any) {
  return request({
    method: 'get',
    url: `/overtime-rules/${id}`
  })
}

/**
 * @description 获得加班规则的基础设置
 */
export function getOvertimeRulesBaseConfig (params?:any) {
  return request({
    method: 'get',
    url: '/overtime-rules/base-config',
    params
  })
}

/**
 * @description 新建加班规则的基础设置
 */
export function addOvertimeRulesBaseConfig (data:any) {
  return request({
    method: 'post',
    url: '/overtime-rules/base-config',
    data
  })
}

/**
 * @description 修改加班规则的基础设置
 */
export function updateOvertimeRulesBaseConfig (data:any) {
  return request({
    method: 'put',
    url: `/overtime-rules/base-config/${data.id}`,
    data
  })
}

/**
 * @description 获取假期余额列表
 */
export function getVacationsBalances (params?:any) {
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
    url: '/vacations/balances',
    params
  })
}

/**
 * @description 获取考勤列表
 */
export function getShiftsList (params?:any) {
  return request({
    method: 'get',
    url: '/shifts',
    params
  })
}

/**
 * @description 获取考勤组列表
 */
export function getAttendanceGroupsList (params?:any) {
  return request({
    method: 'get',
    url: '/attendance-groups',
    params
  })
}

/**
 * @description 手动修改假期余额
 */
export function updateVacationRemaining (data?:any) {
  return request({
    method: 'put',
    url: '/vacations/balances',
    data
  })
}

/**
 * @description 假期-余额变动列表服务
 */
export function getVacationRemainingChange (userId?:any, params?:any) {
  return request({
    method: 'get',
    url: `/vacation-remaining-changes/${userId}`,
    params
  })
}
