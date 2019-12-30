import ComponentTypes from '@/views/designer/config/ComponentTypes'

/**
 * Created by LiuLei on 2019/12/25
 */
export function toFormApiName (apiName: string, type: ComponentTypes) {
  switch (type) {
    case ComponentTypes.OptionListField:
    case ComponentTypes.LookUpField:
      return apiName + '__id'
    default:
      return apiName
  }
}

export function toNormalApiName (apiName: string) {
  if (apiName.endsWith('__id')) {
    apiName = apiName.replace('__id', '')
  }
  return apiName
}
