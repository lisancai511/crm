import axios from '@/plugins/axios'
import { requestFail, requestSuccess, responseFail, responseSuccess } from '@/plugins/axios/interceptors'

const request = axios.create({
  baseURL: window.TENANT_REGION_ADDRESS + '/paas-maindata/api/v1'
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
    url: '/roles',
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
export function addRole (data: any) {
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
  roleId: string | number,
  objectId: string | number
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
export function updateRoleObjectField (roleId: string | number, data: any) {
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
export function getRoleObjectField (roleId: string | number, objectId: any) {
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
    url: '/organizations',
    data
  })
}

/**
 * @description 删除组织
 * @param {object} data
 */
export function deleteOrganization (orgId: any) {
  return request({
    method: 'delete',
    url: `/organizations/${orgId}`
  })
}

/**
 * @description 获取组织
 */
export function getOrganizations (type: boolean) {
  return request({
    method: 'get',
    url: `/organizations?all=${type}`
  })
}

/**
 * @description 修改组织名称
 */
export function updateOrganizations (data: any, id:any) {
  return request({
    method: 'put',
    url: `/organizations/${id}`,
    data
  })
}

/**
 * @description 获取组织列表
 */
export function getOrganizationsList () {
  return request({
    method: 'get',
    url: '/organizations/list'
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
  return request.get('/users/activity', { params: { isActive } })
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
export function addUser (data: any) {
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
export function getRoleRecordTypeAuths (roleId: any, objectId?: any) {
  let str
  if (objectId) {
    str = `/roles/${roleId}/record-type-auths?objectId=${objectId}`
  } else {
    str = `/roles/${roleId}/record-type-auths`
  }
  return request({
    method: 'get',
    url: str
  })
}

/**
 * @description 获得组织下的所有用户
 * @param {string} roleId
 */
export function getUsersFromOrg (params: any) {
  return request({
    method: 'get',
    url: '/users',
    params
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
export function updateRoleObjectAuth (data: any, roleId: any) {
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
export function updateRoleAppAuth (data: any, roleId: any) {
  return request({
    method: 'put',
    url: `/roles/${roleId}/app-auths`,
    data
  })
}

/**
 * 获取角色对应的app权限
 * @param objectId
 */
export function getRoleAppAuth (roleId: any) {
  return request({
    method: 'get',
    url: `/roles/${roleId}/app-auths`
  })
}

/**
 * 获取角色对应的菜单权限
 * @param objectId
 */
export function getRoleModuleAuth (roleId: any) {
  return request({
    method: 'get',
    url: `/roles/${roleId}/menu-visibility-conf`
  })
}

/**
 * 修改角色对应的菜单权限
 * @param objectId
 */
export function updateRoleModuleAuth (data: any, roleId: any) {
  return request({
    method: 'put',
    url: `/roles/${roleId}/menu-visibility-conf`,
    data
  })
}

/**
 * 获取角色对应的权限
 * @param objectId
 */
export function getRoleObejctAuth (roleId: any, objectIds?: any) {
  let str: any
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
export function updateRoleObejctRecordTypesAuth (data: any, roleId: any) {
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
export function getObjDataScopAuths (roleId: any) {
  return request({
    method: 'get',
    url: `/roles/${roleId}/obj-data-scop-auths`
  })
}

/**
 * 修改角色拥有的对象数据范围权限（数据权限）
 * @param objectId
 */
export function updateObjDataScopAuths (roleId: any, data: any) {
  return request({
    method: 'put',
    url: `/roles/${roleId}/obj-data-scop-auths`,
    data
  })
}

/**
 * 获得当前用户
 */
export function getCurrentUser () {
  return request.get('/current-user')
  // return Promise.reject(new Error('121221'))
}

export function uploadUserAvatar (userId: string) {
  return {
    url: `${request.defaults.baseURL}/users/${userId}/head-img`
  }
}

export function uploadCompanyLogo (tenantId: string) {
  return {
    url: `${request.defaults.baseURL}/tenant/${tenantId}/log-img`
  }
}

/**
 * 更新当前用户信息
 * @param user
 */
export function putCurrentUser (user: { name: string, email: string }) {
  return request.put('/current-user', user)
}

/**
 * 获取当前租户
 */
export function getCurrentTenant () {
  return request.get('/current-tenant')
}

/**
 * 修改当前租户
 * @param tenant
 */
export function putCurrentTenant (
  tenant: {
    name: string,
    shortName: string,
    contactUserId: string,
    telephone: string
  }
) {
  return request.put('current-tenant', tenant)
}

/**
 * 获取角色的用户管理权限
 * @param roleId
 */
export function getRoleManageAuth (roleId: any) {
  return request({
    method: 'get',
    url: `/roles/${roleId}/manage-func-auths`
  })
}

/**
 * 修改角色的用户管理权限
 * @param roleId
 * @param data
 */
export function updateRoleManageAuth (roleId: any, data: any) {
  return request({
    method: 'put',
    url: `/roles/${roleId}/manage-func-auths`,
    data
  })
}

/**
 * 获取用户的路由权限
 */
export function getCurrentUserAuths () {
  return request({
    method: 'get',
    url: '/current-user/manage-func-auths'
  })
}
