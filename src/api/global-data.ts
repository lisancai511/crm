/**
 * Created by LiuLei on 2019/11/1
 */
import axios from '@/plugins/axios'
import { requestFail, requestSuccess, responseFail, responseSuccess } from '@/plugins/axios/interceptors'

const request = axios.create({
  baseURL: window.TENANT_REGION_ADDRESS + '/paas-metadata/api/v1/'
  // todo 换成真实地址
  // baseURL: 'http://47.94.245.113:7300/mock/5d760ceb7bd0602ac8480cc5/paas-metadata/api/v1'
})

request.interceptors.request.use(requestSuccess, requestFail)
request.interceptors.response.use(responseSuccess, responseFail)

/**
 * @description 获得全部数据字典
 */
export function getDictionaries () {
  return request.get('/global-data-dicts')
}

/**
 * @description 获取单条字典数据详情
 * @param {string} dictionaryId
 */
export function getDictionary (dictionaryId: string) {
  return request.get(`/global-data-dicts/${dictionaryId}`)
}

/**
 * @description 修改数据字典
 * @param {string} dictionaryId
 * @param {object} data
 * @param {string} data.name
 * @param {string} data.description
 */
export function putDictionary (
  dictionaryId: string,
  data: {
    name: string,
    description: string
  }
) {
  return request.put(`/global-data-dicts/${dictionaryId}`, data)
}

/**
 * @description 删除单条字典数据详情
 * @param {string} dictionaryId
 */
export function deleteDictionary (dictionaryId: string) {
  return request.delete(`/global-data-dicts/${dictionaryId}`)
}

/**
 * @description 获取指定数据字典的值
 * @param {string} dictionaryId
 */
export function getDictionaryItems (dictionaryId: string) {
  return request.get(`global-data-dicts/${dictionaryId}/items`)
}

/**
 * 修改指定数据字典的值
 * @param dictionaryId
 * @param itemId
 * @param item
 */
export function putDictionaryItem (
  dictionaryId: string,
  itemId: string,
  item: { name: string, description: string }) {
  return request.put(`global-data-dicts/${dictionaryId}/items/${itemId}`, item)
}

/**
 * 删除指定数据字典的值
 * @param dictionaryId
 * @param itemId
 */
export function deleteDictionaryItem (
  dictionaryId: string,
  itemId: string
) {
  return request.delete(`global-data-dicts/${dictionaryId}/items/${itemId}`)
}

/**
 * 修改数据字典的值的state
 * @param dictionaryId
 * @param itemId
 * @param state
 */
export function putDictionaryItemState (
  dictionaryId: string,
  itemId: string,
  state: boolean
) {
  return request.put(`global-data-dicts/${dictionaryId}/items/${itemId}/state`, state)
}

export function putDictionaryItemDefault (
  dictionaryId: string,
  itemId: string
) {
  return request.put(`/global-data-dicts/${dictionaryId}/items/${itemId}/as-default`)
}

export function postDictionary (dictionary: {
  name: string,
  description: string,
  type: 'StandardApp',
  items: string[],
  firstItemAsDefault: boolean,
  letterOrder: boolean
}) {
  return request.post(`global-data-dicts`, dictionary)
}
