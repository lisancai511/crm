/**
 * Created by LiuLei on 2019/10/30
 */
import _ from 'lodash'
import nanoid from 'nanoid'
import { IField } from '@/views/designer/config/components'
import ComponentTypes from '@/views/designer/config/ComponentTypes'

/**
 * @description 服务端字段转本地字段
 */
export default function serverFieldToLocalField (field: any, uiId?: string): IField {
  const baseField = {
    id: field.id,
    type: field.dataType,
    key: field.dataType + '_' + nanoid(),
    apiName: field.apiName,
    modal: field.defaultValue,
    name: field.name,
    // TODO 接口未定义
    helpText: field.tooltip,
    remark: field.description
    // configRules: fieldComponentByType[field.dataType].configRules
  }
  const baseAttrs = {
    disabled: false,
    required: false
  }
  // console.log(field.layoutUiConfigById)
  if (uiId && field.layoutUiConfig && field.layoutUiConfigById[uiId]) {
    const curLayoutUiConfig = field.layoutUiConfigById[uiId]
    baseAttrs.disabled = curLayoutUiConfig.readOnly
    baseAttrs.required = curLayoutUiConfig.required
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
        modal: +baseField.modal,
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
          integerDigit: field.integerDigit
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
          maxlength: field.maxLength - field.autoNumberConfig.prefix.length
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
    default:
      return {
        ..._.cloneDeep(baseField),
        attrs: {
          ..._.cloneDeep(baseAttrs)
        }
      }
  }
}
