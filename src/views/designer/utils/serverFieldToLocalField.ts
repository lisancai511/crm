/**
 * Created by LiuLei on 2019/10/30
 */
import _ from 'lodash'
import nanoid from 'nanoid'
import { IField } from '@/views/designer/config/components'
import ComponentTypes from '@/views/designer/config/ComponentTypes'
import { arrToMap } from '@/utils'

/**
 * @description 服务端字段转本地字段
 */
export default function serverFieldToLocalField (
  field: any,
  uiId?: string | number,
  auth?: boolean): IField {
  const baseField = {
    id: field.id,
    type: field.dataType,
    key: field.dataType + '_' + nanoid(),
    apiName: field.apiName,
    model: field.defaultValue,
    name: field.name,
    // TODO 接口未定义
    helpText: field.tooltip,
    remark: field.description
    // configRules: fieldComponentByType[field.dataType].configRules
  }
  const baseAttrs = {
    disabled: false,
    required: false,
    show: true
  }
  // console.log(field.layoutUiConfigById)
  if (uiId && field.layoutUiConfig) {
    // TODO 优化
    const layoutUiConfigById = arrToMap(field.layoutUiConfig || [], 'layoutUiId')
    const curLayoutUiConfig = layoutUiConfigById[uiId] || { ...baseAttrs }
    const roleToFieldConfig: {
      invisible: boolean
      readOnly: boolean
      readWrite: boolean
    } = field.roleToFieldConfig || {
      invisible: false,
      readOnly: false,
      readWrite: false
    }
    if (curLayoutUiConfig) {
      baseAttrs.disabled = curLayoutUiConfig.readOnly
      if (auth) {
        baseAttrs.disabled = baseAttrs.disabled || roleToFieldConfig.readOnly
      }
      baseAttrs.required = curLayoutUiConfig.required
      baseAttrs.show = !auth || (curLayoutUiConfig.show && !roleToFieldConfig.invisible)
    }
  }
  switch (field.dataType) {
    case ComponentTypes.TextField:
    case ComponentTypes.LongTextField:
      return {
        ..._.cloneDeep(baseField),
        attrs: {
          ..._.cloneDeep(baseAttrs),
          maxlength: field.maxLength
        }
      }
    case ComponentTypes.DateField:
    case ComponentTypes.DateTimeField:
    case ComponentTypes.PhoneField:
    case ComponentTypes.EmailField:
      return {
        ..._.cloneDeep(baseField),
        // TODO 接口未定义
        attrs: {
          ..._.cloneDeep(baseAttrs)
        }
      }
    case ComponentTypes.CheckBoxField: {
      return {
        ..._.cloneDeep(baseField),
        model: +baseField.model,
        // TODO 接口未定义
        attrs: {
          ..._.cloneDeep(baseAttrs)
        }
      }
    }
    case ComponentTypes.NumberField:
      return {
        ..._.cloneDeep(baseField),
        attrs: {
          ..._.cloneDeep(baseAttrs),
          decimalDigit: field.decimalDigit,
          integerDigit: field.integerDigit,
          unit: field.unit
        }
      }
    case ComponentTypes.MoneyField:
      return {
        ..._.cloneDeep(baseField),
        attrs: {
          ..._.cloneDeep(baseAttrs),
          decimalDigit: field.decimalDigit,
          capital: field.capital,
          unit: field.unit
        }
      }
    case ComponentTypes.WebsiteField:
      return {
        ..._.cloneDeep(baseField),
        attrs: {
          ..._.cloneDeep(baseAttrs),
          maxlength: field.maxLength,
          urlModel: field.urlModel
        }
      }
    case ComponentTypes.OptionListField:
      return {
        ..._.cloneDeep(baseField),
        attrs: {
          ..._.cloneDeep(baseAttrs),
          valueCandidateConfig: field.valueCandidateConfig,
          sValueCandidates: field.valueCandidates,
          valueCandidates: field.valueCandidates
            .map((item: any) => item.v)
            .join('\n')
        }
      }
    case ComponentTypes.AutoNumberField:
      return {
        ..._.cloneDeep(baseField),
        // TODO 接口未定义
        autoNumberConfig: field.autoNumberConfig,
        attrs: {
          ..._.cloneDeep(baseAttrs),
          maxlength: field.maxLength
        }
      }
    case ComponentTypes.LookUpField:
      return {
        ..._.cloneDeep(baseField),
        attrs: {
          ..._.cloneDeep(baseAttrs),
          lookupConfig: field.lookupConfig
        }
      }
    case ComponentTypes.ImageField:
      return {
        ..._.cloneDeep(baseField),
        attrs: {
          ..._.cloneDeep(baseAttrs),
          limitNumber: field.limitNumber,
          watermarks: field.watermarks,
          onlyUsedCellPhoneCamera: field.onlyUsedCellPhoneCamera
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
