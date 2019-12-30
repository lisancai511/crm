import axios from '@/plugins/axios'
import { requestFail, requestSuccess, responseFail, responseSuccess } from '@/plugins/axios/interceptors'

const request = axios.create({
  baseURL: window.TENANT_REGION_ADDRESS + '/paas-package/api/v1'
})

request.interceptors.request.use(requestSuccess, requestFail)
request.interceptors.response.use(responseSuccess, responseFail)

// 上传
export function uploadPackage () {
  return {
    url: `${request.defaults.baseURL}/app/deploy`
  }
}

// 下载
export function downloadPackage (applicationId: any) {
  return request.get(`/app/package/${applicationId}`, {
    params: { version: 1 },
    responseType: 'blob'
  })
}
