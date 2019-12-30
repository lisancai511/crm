/**
 * Created by LiuLei on 2019/12/9
 */
import axios from '@/plugins/axios'
import { requestFail, requestSuccess, responseFail, responseSuccess } from '@/plugins/axios/interceptors'
import { IForm, IWorkflow } from '@/views/backstage/office-setting/form-management/types'

const request = axios.create({
  baseURL: window.TENANT_REGION_ADDRESS + '/paas-approval-flow/api/v1'
})

request.interceptors.request.use(requestSuccess, requestFail)
request.interceptors.response.use(responseSuccess, responseFail)

/**
 * 获取全部表单分类
 */
export function getCategories () {
  return request.get('/categories')
}

/**
 * 获取全部表单
 */
export function getForms () {
  return request.get('/forms')
}

export function getForm (formId: string) {
  return request.get(`/forms/${formId}`)
}

/**
 * 创建表单分类
 * @param payload
 */
export function newFormCategories (payload: { name: string, description: string }) {
  return request.post('/categories', payload)
}

/**
 * 删除表单分类
 * @param categoryId
 */
export function deleteCategory (categoryId: string) {
  return request.delete(`/categories/${categoryId}`)
}

/**
 * 表单分类排序
 * @param categoryIds
 */
export function sortCategories (categoryIds: string[]) {
  return request.put('/category/order', categoryIds)
}

/**
 * 修改表单分组信息
 * @param categoryId
 * @param newCategory
 */
export function putCategory (categoryId: string, newCategory: { name: string }) {
  return request.put(`/categories/${categoryId}`, newCategory)
}

/**
 * 创建表单
 * @param form
 */
export function newForm (form: { form: IForm, workflow: IWorkflow }) {
  return request.post('/forms', form)
}

export function putForm (formId: string, form: { form: IForm, workflow: IWorkflow }) {
  return request.put(`/forms/${formId}`, form)
}

/**
 * 更新表单状态
 * @param payload
 */
export function putFormEnable (payload: {
  formId: string,
  enable: boolean
}) {
  return request.put(`/form/enable/${payload.formId}`, { enable: payload.enable })
}

/**
 * 表单组内的表单排序
 * @param payload
 */
export function sortForms (payload: {
  categoryId: string,
  formIds: string[]
}) {
  return request.put(`/forms/${payload.categoryId}/order`, payload.formIds)
}

/**
 * 删除表单
 * @param formId
 */
export function deleteForm (formId: string) {
  return request.delete(`/forms/${formId}`)
}
