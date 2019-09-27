import layout1 from '@/views/designer/config/presetLayouts/layout1'
import layout2 from '@/views/designer/config/presetLayouts/layout2'
import layout3 from '@/views/designer/config/presetLayouts/layout3'

import { fieldComponents, IField } from '@/views/designer/config/components'
import { arrToMap } from '@/store/modules/designer'
import ComponentTypes from '@/views/designer/config/ComponentTypes'

import nanoid from 'nanoid'
import _ from 'lodash'

const fieldComponentByType = arrToMap(fieldComponents, 'type')

// 布局版本
export const version = '0.0.1'

// TODO 考虑要不要合成一个函数，一次递归获取全部数据

/**
 * @description 服务端字段转本地字段
 */
export function serverFieldToLocalField (field: any): IField {
  const baseField = {
    type: field.dataType,
    id: field.id,
    key: field.type + '_' + nanoid(),
    apiName: field.apiName,
    name: field.name,
    // TODO 接口未定义
    helpText: field.tooltip,
    remark: field.description
  }
  const baseAttrs = {
    disabled: false,
    required: false
  }
  switch (field.dataType) {
    case ComponentTypes.TextField:
    case ComponentTypes.LongTextField:
      return {
        ..._.cloneDeep(baseField),
        // TODO 接口未定义
        defaultValue: '',
        attrs: {
          ..._.cloneDeep(baseAttrs),
          maxlength: field.maxLength
        }
      }
    case ComponentTypes.DateField:
    case ComponentTypes.DateTimeField:
    case ComponentTypes.PhoneField:
      return {
        ..._.cloneDeep(baseField),
        // TODO 接口未定义
        defaultValue: '',
        attrs: {
          ..._.cloneDeep(baseAttrs)
        }
      }
    default:
      return {
        ..._.cloneDeep(baseField),
        attrs: {
          ..._.cloneDeep(baseAttrs)
        }
      }
  }
}

/**
 * @description 本地字段转服务端字段
 */
export function localFieldToServerField (field: IField) {
  const baseField = {
    name: field.name,
    apiName: field.apiName,
    dataType: field.type,
    description: field.remark,
    maxLength: field.attrs.maxlength,
    tooltip: field.helpText
    //  TODO 帮助文本 and 其他属性
  }
  switch (field.type) {
    case ComponentTypes.TextField:
    case ComponentTypes.LongTextField:
      return {
        ..._.cloneDeep(baseField)
        // TODO 其他属性
      }
    case ComponentTypes.DateField:
    case ComponentTypes.DateTimeField:
    case ComponentTypes.PhoneField:
      return {
        ..._.cloneDeep(baseField)
        // TODO 其他属性
      }
    case ComponentTypes.AutoNumberField:
    case ComponentTypes.NumberField:
    case ComponentTypes.OptionListField:
    case ComponentTypes.MoreOptionListField:
    case ComponentTypes.LookUpField:
    case ComponentTypes.LookUpMoreField:
    case ComponentTypes.WebsiteField:
    case ComponentTypes.CheckBoxField:
    case ComponentTypes.EmailField:
      return {
        ..._.cloneDeep(baseField)
      }
    default:
      return {}
  }
}

/**
 * @description 获取布局内使用的全部字段
 */
export function getUsedFieldIds (layout: any): any[] {
  const usedFields: any[] = []

  function inner (layout: any) {
    if (fieldComponentByType[layout.type] && layout.id) {
      usedFields.push(layout.id)
    }
    if (layout.usedFields) {
      usedFields.push(...layout.usedFields.map((field: any) => field.id))
    }
    if (Array.isArray(layout.children)) {
      layout.children.forEach((item: any) => inner(item))
    }
  }

  inner(layout)
  return usedFields
}

/**
 * @description 获取新增加的字段
 */
export function getNeedAddFields (layout: any) {
  const needAddFields: any[] = []

  function inner (layout: any) {
    if (fieldComponentByType[layout.type] && !layout.id) {
      needAddFields.push(layout)
    }
    if (Array.isArray(layout.children)) {
      layout.children.forEach((item: any) => inner(item))
    }
  }

  inner(layout)
  return needAddFields
}

/**
 * @description 获取编辑过的字段
 */
export function getNeedModifyFields () {

}

/**
 * @description 获取未使用的字段
 */
export function getUnusedFields () {
}

/**
 * @description 服务端布局转本地布局
 */
export function serverLayoutToLocal () {

}

/**
 * @description 本地布局转服务端布局
 */
export function localLayoutToServer () {

}

export default {
  layout1,
  layout2,
  layout3
}
