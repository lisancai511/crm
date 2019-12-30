/**
 * Created by LiuLei on 2019/10/21
 */
// TODO 考虑要不要合成一个函数，一次递归获取全部数据

// import pako from 'pako'

import { Vue } from 'vue/types/vue'
import allSettled from 'promise.allsettled'
import { fieldComponents, IField } from '@/views/designer/config/components'
import _ from 'lodash'
import AsyncValidator from 'async-validator'
import getLocalLayoutFields from '@/views/designer/utils/getLocalLayoutFields'
import { arrToMap } from '@/utils'

export { default as fieldComponentByType } from '@/views/designer/utils/fieldComponentByType'
export { default as serverFieldToLocalField } from '@/views/designer/utils/serverFieldToLocalField'
export { default as localFieldToServerField } from '@/views/designer/utils/localFieldToServerField'
export { default as getLocalLayoutFields } from '@/views/designer/utils/getLocalLayoutFields'
export { default as getLocalLayoutUsedFields } from '@/views/designer/utils/getLocalLayoutUsedFields'
export { default as getLocalLayoutUsedFieldIds } from '@/views/designer/utils/getLocalLayoutUsedFieldIds'
export { default as getLocalLayoutUsedFieldApiNames } from '@/views/designer/utils/getLocalLayoutUsedFieldApiNames'
export { default as getLocalLayoutUnusedFields } from '@/views/designer/utils/getLocalLayoutUnusedFields'
export { default as getLocalLayoutNeedAddFields } from '@/views/designer/utils/getLocalLayoutNeedAddFields'
export { default as getLocalLayoutNeedModifyFields } from '@/views/designer/utils/getLocalLayoutNeedModifyFields'
export { default as serverLayoutToLocal } from '@/views/designer/utils/serverLayoutToLocal'
export { default as localLayoutToServer } from '@/views/designer/utils/localLayoutToServer'

/**
 * @description string压缩成string并转 base64
 */
export function compressStringToBase64 (plainString: string): string {
  return plainString
  // return window.btoa(pako.deflate(plainString, { to: 'string' }))
}

/**
 * @description base64转string并解压缩string
 */
export function decompressBase64ToString (base64: string): string {
  return base64
  // return pako.inflate(window.atob(base64), { to: 'string' })
}

const fieldComponentByType: { [prop: string]: IField } = arrToMap(fieldComponents, 'type')

function flatRules (rules: any): void {
  Object.entries(rules).forEach(([k, v]: [string, any]) => {
    if (_.isPlainObject(v)) {
      rules[k] = {
        type: 'object',
        required: true,
        options:
          { first: true },
        fields: v
      }
      flatRules(v)
    }
  })
}

export function validLocalLayout (
  payload: {
    vm: Vue,
    uiDefine: any,
    serverFields?: any
  }) {
  const { vm, uiDefine, serverFields = [] } = payload
  const allUsedFields: IField[] = getLocalLayoutFields(uiDefine)
  const allFields = [...new Set([...serverFields, ...allUsedFields])]
  vm.$bus.$emit('designer/layout/valid')
  return allSettled(allUsedFields.map((field: IField) => {
    const configRules: any = fieldComponentByType[field.type].configRules
    // TODO 递归格式化验证规则
    const copyRules = _.cloneDeep(configRules)
    flatRules(copyRules)
    // console.log(copyRules)
    // 验证name和apiName重复
    // TODO 优化算法
    const otherUsedFieldNames: string[] = []
    const otherUsedFieldApiNames: string[] = []
    allFields.forEach((_field: IField) => {
      if (_field.id) {
        if (_field.id === field.id) {
          return
        }
      } else {
        if (_field === field) {
          return
        }
      }
      otherUsedFieldNames.push(_field.name)
      otherUsedFieldApiNames.push(_field.apiName)
    })
    const dynamicConfigRules: any = ((fieldComponentByType[field.type] || {}) as IField).dynamicConfigRules
    const dynamicRules: any = dynamicConfigRules({
      otherUsedFieldNames: otherUsedFieldNames,
      otherUsedFieldApiNames: otherUsedFieldApiNames
    })
    // console.log(dynamicRules)
    Object.entries(copyRules as any).forEach(([k, v]) => {
      if (dynamicRules[k]) {
        (v as any[]).push(dynamicRules[k])
      }
    })
    // console.log(field)
    const validator = new AsyncValidator(copyRules)
    return new Promise((resolve, reject) => {
      validator.validate(field, { firstFields: true })
        .then((data) => {
          vm.$set(field, 'isError', false)
          resolve(data)
        })
        .catch((err: any) => {
          vm.$set(field, 'isError', true)
          reject(err)
        })
    })
  }))
}
