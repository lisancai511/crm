/**
 * Created by LiuLei on 2019/10/30
 */
import _ from 'lodash'
import fieldComponentByType from './fieldComponentByType'
import { FIELD, tabDetailsComponents } from '@/views/designer/config/components'
import ComponentTypes from '@/views/designer/config/ComponentTypes'
import { arrToMap } from '@/utils'
import containerComponentByType from './containerComponentByType'

const tabDetailsComponentByType = arrToMap(
  tabDetailsComponents,
  'type'
)
/**
 * @description 本地布局转服务端布局
 */
export default function localLayoutToServer (localLayout: any) {
  const cloneLocalLayout = _.cloneDeep(localLayout)

  function inner (layout: any) {
    const tempLayout: any = {}
    Object.keys(layout).forEach((key: any) => {
      tempLayout[key] = layout[key]
      Reflect.deleteProperty(layout, key)
    })
    // 如果是字段组件
    if (fieldComponentByType[tempLayout.type]) {
      // 新增组件不知道ID 只能先用apiName替代
      layout.apiName = tempLayout.apiName
      layout.type = FIELD
    } else if (tempLayout.type === ComponentTypes.InfoTabRelatedListItem) {
      // 如果是表单详情页面的相关列表
      layout.id = tempLayout.id
      layout.type = tempLayout.type
    } else {
      // 如果是其他组件
      layout.type = tempLayout.type
      if (tempLayout.version) {
        layout.version = tempLayout.version
      }
      if (tabDetailsComponentByType[tempLayout.type]) {
        layout.show = tempLayout.show
      }
      // 如果组件标签被修改
      if (tempLayout.name !== containerComponentByType[tempLayout.type].name) {
        layout.name = tempLayout.name
      }
      if (tempLayout.children) {
        layout.children = tempLayout.children
      }
      // 容器拖拽配置项
      if (tempLayout.draggable) {
        layout.draggable = tempLayout.draggable.name
      }
      // 添加默认字段的容器
      if (tempLayout.isDefaultFieldContainer) {
        layout.isDefaultFieldContainer = tempLayout.isDefaultFieldContainer
      }
    }
    if (_.isObject(tempLayout.attrs) && !fieldComponentByType[tempLayout.type]) {
      layout.attrs = tempLayout.attrs
      if (Array.isArray(layout.attrs.usedFields)) {
        layout.attrs.usedFields =
          layout.attrs.usedFields.map((item: any) => ({ apiName: item.apiName }))
      }
      if (Array.isArray(layout.attrs.usedButtons)) {
        layout.attrs.usedButtons =
          layout.attrs.usedButtons.map((item: any) => ({ apiName: item.apiName }))
      }
      if (Array.isArray(layout.attrs.usedOptions)) {
        layout.attrs.usedOptions =
          layout.attrs.usedOptions.map((item: any) => ({ id: item.id }))
      }
      // 如果是表单详情页面的相关列表
      if (tempLayout.type === ComponentTypes.InfoTabRelatedListItem) {
        Reflect.deleteProperty(layout.attrs, 'objectId')
        Reflect.deleteProperty(layout.attrs, 'relatedListTitle')
      }
    }
    if (Array.isArray(layout.children)) {
      layout.children.forEach((item: any) => {
        inner(item)
      })
    }
  }

  inner(cloneLocalLayout)
  return cloneLocalLayout
}
