import axios from '@/plugins/axios'
import { requestFail, requestSuccess, responseFail, responseSuccess } from '@/plugins/axios/interceptors'

const request = axios.create({
  baseURL: window.TENANT_REGION_ADDRESS + '/paas-maindata/api/v1/'
})

request.interceptors.request.use(requestSuccess, requestFail)
request.interceptors.response.use(responseSuccess, responseFail)

/**
 * @description 获取所有角色
 */
export function getRoles () {
  return request({
    method: 'get',
    url: '/roles'
  })
}

/**
 * @description 修改角色
 * @param {object} data
 */
export function updateRole (data: any) {
  return request({
    method: 'put',
    url: `/roles`,
    data
  })
}

/**
 * @description 删除角色
 * @param {string | number} roleId
 */
export function deleteRole (roleId: string | number) {
  return request({
    method: 'delete',
    url: `/roles/${roleId}`
  })
}

/**
 * @description 获取指定角色
 * @param {string | number} roleId
 */
export function getRole (roleId: string | number) {
  return request({
    method: 'get',
    url: `/roles/${roleId}`
  })
}

/**
 * @description 创建角色
 * @param {object} data
 */
export function addRole (data:any) {
  return request({
    method: 'post',
    url: '/roles',
    data
  })
}

/**
 * @description 获得角色指定一个或多个对象的权限。不传objectId表示全部
 * @param {string | number} roleId
 * @param {string | number} objectId
 */
export function getObjectOperateAuthsByRole (
  roleId:string | number,
  objectId:string | number
) {
  return request({
    method: 'get',
    url: `/roles/:${roleId}/biz-object-operate-auths?objectId=${objectId}`
  })
}

/**
 * @description 修改角色对应指定对象的字段权限
 * @param {string | number} roleId
 * @param {object} data
 */
export function updateRoleObejctField (roleId: string | number, data:any) {
  return request({
    method: 'put',
    url: `/roles/${roleId}/field-auths`,
    data
  })
}

/**
 * @description 获取角色对应指定对象的字段权限
 * @param {string | number} roleId
 * @param {string | number} objectId
 */
export function getRoleObejctField (roleId: string | number, objectId:any) {
  return request({
    method: 'get',
    url: `/roles/${roleId}/field-auths?objectId=${objectId}`
  })
}

/**
 * @description 创建组织
 * @param {object} data
 */
export function addOrganization (data: any) {
  return request({
    method: 'post',
    url: `/organizations`,
    data
  })
}

/**
 * @description 获取组织
 */
export function getOrganizations (type:boolean) {
  return request({
    method: 'get',
    url: `/organizations?all=${type}`
  })
}

/**
 * @description 获取组织列表
 */
export function getOrganizationsList () {
  return request({
    method: 'get',
    url: `/organizations/list`
  })
}

/**
 * @description 修改组织位置
 * @param {string} firstOrgId
 * @param {string} secondOrgId
 */
export function sortOrganizations (firstOrgId: string, secondOrgId: boolean) {
  return request({
    method: 'put',
    url: `/organizations/${firstOrgId}/seq?secondOrgId=${secondOrgId}`
  })
}

/**
 * @description 获取所有用户
 * @param {boolean} isActive
 */
export function getUsersList (isActive?: boolean) {
  let newUrl
  if (typeof isActive === 'boolean') {
    newUrl = `/users/activity?activity=${isActive}`
  } else {
    newUrl = `/users/activity?activity=`
  }
  return request({
    method: 'get',
    url: newUrl
  })
}

/**
 * @description 删除用户
 * @param {string | number} userId
 */
export function deleteUser (userId: string | number) {
  return request({
    method: 'delete',
    url: `/users/${userId}`
  })
}

/**
 * @description 启用用户
 * @param {string | number} userId
 */
export function enableUser (userId: string | number) {
  return request({
    method: 'put',
    url: `/users/enable/${userId}`
  })
}

/**
 * @description 获取指定用户
 * @param {string | number} userId
 */
export function getUser (userId: string | number) {
  return request({
    method: 'get',
    url: `users/${userId}`
  })
}

/**
 * @description 创建用户
 * @param {object} data
 */
export function addUser (data:any) {
  return request({
    method: 'post',
    url: '/users/createUser',
    data
  })
}

/**
 * @description 修改用户
 * @param {object} data
 */
export function updateUser (data: any) {
  return request({
    method: 'put',
    url: `/users/${data.id}`,
    data
  })
}

/**
 * @description 获得角色对应的记录类型权限
 * @param {string} roleId
 */
export function getRoleRecordTypeAuths (roleId:any) {
  return request({
    method: 'get',
    url: `/roles/${roleId}/record-type-auths`
  })
}

/**
 * @description 获得组织下的所有用户
 * @param {string} roleId
 */
export function getUsersFromOrg () {
  return request({
    method: 'get',
    url: `/users?orgId=111&all=true`
  })
}

// /**
//  * @description 获得角色指定一个或多个对象的权限。不传objectId表示全部
//  * @param {string} roleId
//  */
// export function getRoleObjectOperateAuths (roleId:any) {
//   return request({
//     method: 'get',
//     url: `/roles/${roleId}/biz-object-operate-auths?objectId= `
//   })
// }

/**
 * 修改角色对应的权限
 * @param objectId
 */
export function updateRoleObejctAuth (data:any, roleId:any) {
  return request({
    method: 'put',
    url: `/roles/${roleId}/biz-object-operate-auths`,
    data
  })
}

/**
 * 修改角色对应的app权限
 * @param objectId
 */
export function updateRoleAppAuth (data:any, roleId:any) {
  return request({
    method: 'put',
    url: `/roles/${roleId}/biz-object-operate-auths`,
    data
  })
}

/**
 * 获取角色对应的app权限
 * @param objectId
 */
export function getRoleAppAuth (roleId:any) {
  return request({
    method: 'get',
    url: `/roles/${roleId}/biz-object-operate-auths`
  })
}

/**
 * 获取角色对应的菜单权限
 * @param objectId
 */
export function getRoleModuleAuth (roleId:any) {
  return request({
    method: 'get',
    url: `/roles/${roleId}/menu-visibility-conf`
  })
}
/**
 * 获取角色对应的权限
 * @param objectId
 */
export function getRoleObejctAuth (roleId:any, objectIds?:any) {
  let str:any
  if (objectIds) {
    str = `/roles/${roleId}/biz-object-operate-auths?objectId=${objectIds}`
  } else {
    str = `/roles/${roleId}/biz-object-operate-auths`
  }
  return request({
    method: 'get',
    url: str
  })
}

/**
 * 修改角色对应的权限的记录类型
 * @param objectId
 */
export function updateRoleObejctRecordTypesAuth (data:any, roleId:any) {
  return request({
    method: 'put',
    url: `/roles/${roleId}/record-type-auths?objectId=${roleId}`,
    data
  })
}

/**
 * 获得角色拥有的对象数据范围权限（数据权限）
 * @param objectId
 */
export function getObjDataScopAuths (roleId:any) {
  return request({
    method: 'get',
    url: `/roles/${roleId}/obj-data-scop-auths`
  })
}
