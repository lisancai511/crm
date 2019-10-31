/**
 * Created by LiuLei on 2019/10/10
 */

import { Message } from 'element-ui'
import { UserModule } from '@/store/modules/user'
import Vue from 'vue'
import { getModule } from 'vuex-module-decorators'

export function requestSuccess (config: any) {
  const userModule = getModule(UserModule, Vue.prototype.$store)
  // Do something before request is
  if (userModule.token) {
    config.headers.Authorization = 'Bearer ' + userModule.token
  }
  if (userModule.tenantId) {
    config.headers['X-tenant-id'] = userModule.tenantId
  }
  return config
}

export function requestFail (error: any) {
  // Do something with request error
  return Promise.reject(error)
}

export function responseSuccess (response: any) {
// Do something with response data
  const { data } = response
  if (!data.success && response.status !== 204) {
    Message({
      message: data.message,
      duration: 1000,
      type: 'error'
    })
  }
  return response
}

export function responseFail (error: any) {
// Do something with response error
  try {
    Message({
      message: error.response.data.message,
      duration: 1000,
      type: 'error'
    })
  } catch (e) {
    console.error(e)
    Message({
      message: '未知错误',
      duration: 1000,
      type: 'error'
    })
  }
  return Promise.reject(error)
}
