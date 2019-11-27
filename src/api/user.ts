import axios from '@/plugins/axios'
import { requestFail, requestSuccess, responseFail, responseSuccess } from '@/plugins/axios/interceptors'

const request = axios.create({
  baseURL: window.GLOBAL_REGION_ADDRESS + '/paas-portal/api/v1'
})

request.interceptors.request.use(requestSuccess, requestFail)
request.interceptors.response.use(responseSuccess, responseFail)

// 获取标准对象列表
export function getCode (data: any) {
  return request({
    method: 'post',
    url: '/register/verify-code',
    data
  })
}

// 注册
export function register (data: any) {
  return request({
    method: 'post',
    url: '/register',
    data
  })
}

// 登录
export function login (data: any) {
  return request({
    method: 'post',
    url: '/login',
    data
  })
}

// 登出
export function Logout () {
  return request({
    method: 'post',
    url: '/Logout'
  })
}

// 获取所有公司
export function getCompany (type: any) {
  return request({
    method: 'get',
    url: `tenants?type=${type}`
  })
}

// 验证电话是否可用
export function surePhoneNumber () {
  return request({
    method: 'get',
    url: '/register/check-usability'
  })
}
