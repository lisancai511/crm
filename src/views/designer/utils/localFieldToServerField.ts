/**
 * Created by LiuLei on 2019/10/30
 */
import { IField } from '@/views/designer/config/components'
import ComponentTypes from '@/views/designer/config/ComponentTypes'
import _ from 'lodash'

/**
 * @description 本地字段转服务端字段
 */
export default function localFieldToServerField (field: IField) {
  const baseField = {
    id: field.id,
    name: field.name,
    apiName: field.apiName,
    dataType: field.type,
    description: field.remark,
    tooltip: field.helpText,
    defaultValue: field.model,
    addToLayouts: field.addToLayouts
    //  TODO 提示文字 and 其他属性
  }
  switch (field.type) {
    case ComponentTypes.TextField:
    case ComponentTypes.LongTextField:
      return {
        ..._.cloneDeep(baseField),
        maxLength: field.attrs.maxlength
        // TODO 其他属性
      }
    case ComponentTypes.DateField:
    case ComponentTypes.DateTimeField:
    case ComponentTypes.PhoneField:
    case ComponentTypes.CheckBoxField:
    case ComponentTypes.EmailField:
      return {
        ..._.cloneDeep(baseField)
      }
    case ComponentTypes.NumberField:
      return {
        ..._.cloneDeep(baseField),
        decimalDigit: field.attrs.decimalDigit,
        integerDigit: field.attrs.integerDigit,
        unit: field.attrs.unit
        // TODO 其他属性
      }
    case ComponentTypes.MoneyField:
      return {
        ..._.cloneDeep(baseField),
        decimalDigit: field.attrs.decimalDigit,
        capital: field.attrs.capital,
        unit: field.attrs.unit
        // TODO 其他属性
      }
    case ComponentTypes.WebsiteField:
      return {
        urlModel: field.attrs.urlModel,
        maxLength: field.attrs.maxlength,
        ..._.cloneDeep(baseField)
      }
    case ComponentTypes.AutoNumberField:
      return {
        ..._.cloneDeep(baseField),
        maxLength: field.attrs.maxlength,
        autoNumberConfig: field.autoNumberConfig
      }
    case ComponentTypes.OptionListField:
      return {
        ..._.cloneDeep(baseField),
        valueCandidateConfig: field.attrs.valueCandidateConfig,
        valueCandidates: field.attrs.valueCandidates
          .split('\n')
          .map((v: string) => ({ v }))
      }
    case ComponentTypes.MoreOptionListField:
    case ComponentTypes.LookUpField:
      return {
        ..._.cloneDeep(baseField),
        lookupConfig: field.attrs.lookupConfig
      }
    case ComponentTypes.ImageField:
      return {
        ..._.cloneDeep(baseField),
        limitNumber: field.attrs.limitNumber,
        watermarks: field.attrs.watermarks,
        onlyUsedCellPhoneCamera: field.attrs.onlyUsedCellPhoneCamera
      }
    case ComponentTypes.LookUpMoreField:
    default:
      return {
        ..._.cloneDeep(baseField)
      }
  }
}
