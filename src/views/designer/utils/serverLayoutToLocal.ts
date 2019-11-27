import _ from 'lodash'
import nanoid from 'nanoid'
import * as DraggableOptions from '@/views/designer/config/DraggableOptions'
import ComponentTypes from '@/views/designer/config/ComponentTypes'
import PredefinedFieldApiNames from '@/views/designer/config/PredefinedFieldApiNames'
import serverFieldToLocalField from './serverFieldToLocalField'
import containerComponentByType from './containerComponentByType'
import { FIELD } from '@/views/designer/config/components'
import { arrToMap } from '@/utils'

/**
 * Created by LiuLei on 2019/10/30
 */
interface IServerLayoutToLocalPayload {
  serverLayout: any,
  needAddFields?: any[],
  uiId: string,
  fields: any[],
  lookups?: any[],
  exceptApiNames?: string[]
  exceptFieldTypes?: string[]
}

/**
 * @description 服务端布局转本地布局
 */
export default function serverLayoutToLocal (payload: IServerLayoutToLocalPayload) {
  const {
    serverLayout,
    needAddFields = [],
    lookups = [],
    fields = [],
    exceptApiNames = [],
    exceptFieldTypes = [],
    uiId
  } = payload

  const fieldById = arrToMap(fields.filter(field => !!field.id), 'id')
  const fieldByApiName = arrToMap(fields.filter(field => !!field.id), 'apiName')
  const lookupById = arrToMap(lookups as any[], 'id')

  const cloneServerLayout = _.cloneDeep(serverLayout)
  const defaultFieldContainer: any[] = []

  function inner (layout: any) {
    // 如果是字段组件
    if (layout.type === FIELD) {
      Object.entries(
        serverFieldToLocalField(fieldByApiName[layout.apiName], uiId))
        .forEach(([key, value]) => {
          layout[key] = value
        })
    } else {
      // 如果是其他组件
      layout.key = layout.type + '_' + nanoid()
      layout.name = layout.name || containerComponentByType[layout.type].name
      if (layout.draggable) {
        layout.draggable = (<any>DraggableOptions)[layout.draggable]
      }
      if (!layout.attrs) {
        layout.attrs = {}
      }
      // console.log(JSON.stringify(layout))
      switch (layout.type) {
        case ComponentTypes.FormHeader:
          if (!_.isPlainObject(layout.attrs)) {
            layout.attrs = {}
          }
          if (Array.isArray(layout.attrs.usedFields)) {
            layout.attrs.usedFields = layout.attrs.usedFields.map((usedField: any) => {
              if (!fieldByApiName[usedField.apiName]) {
                return false
              }
              return serverFieldToLocalField(fieldByApiName[usedField.apiName], uiId)
            }).filter((usedField: any) => !!usedField)
          } else {
            layout.attrs.usedFields = []
          }
          if (Array.isArray(layout.attrs.usedButtons)) {
            layout.attrs.usedButtons = layout.attrs.usedButtons.map((button: any) => {
              // TODO  改成真实button数据结构
              return button
            })
          } else {
            layout.attrs.usedButtons = []
          }
          break
        case ComponentTypes.InfoTabRelatedList:
          if (!layout.children) {
            layout.children = []
          }
          break
        case ComponentTypes.InfoTabRelatedListItem:
          if (!_.isPlainObject(layout.attrs)) {
            layout.attrs = {}
          }
          if (!Array.isArray(layout.attrs.usedFields)) {
            layout.attrs.usedFields = []
          }
          if (!Array.isArray(layout.attrs.usedButtons)) {
            layout.attrs.usedButtons = []
          }

          // ////////////////////
          const curLookup = lookupById[layout.id] || {}
          layout.attrs.relatedListTitle = curLookup.relatedListTitle
          layout.attrs.objectId = curLookup.objectId
          layout.attrs.sortDirection = layout.attrs.sortDirection || 'ASC'
          // TODO 确认 name字段的apiName
          layout.attrs.sortOrderBy = layout.attrs.sortOrderBy || PredefinedFieldApiNames.name
          break
        case ComponentTypes.InfoTabFollowUp:
          if (!_.isPlainObject(layout.attrs)) {
            layout.attrs = {}
          }
          if (!Array.isArray(layout.attrs.usedOptions)) {
            layout.attrs.usedOptions = []
          }
          break
        default:
      }
      /*
            if (layout.type === ComponentTypes.InfoTabRelatedListItem) {
              if (!Array.isArray(layout.attrs.usedFields)) {
                layout.attrs.usedFields = []
              }
              if (!Array.isArray(layout.attrs.usedButtons)) {
                layout.attrs.usedButtons = []
              }

              // ////////////////////
              const curLookup = lookupById[layout.id] || {}
              layout.attrs.relatedListTitle = curLookup.relatedListTitle
              layout.attrs.objectId = curLookup.objectId
              layout.attrs.sortDirection = layout.attrs.sortDirection || 'ASC'
              // TODO 确认 name字段的apiName
              layout.attrs.sortOrderBy = layout.attrs.sortOrderBy || PredefinedFieldApiNames.name
            }
      */

      // 如果是默认增加组件的容器
      if (layout.isDefaultFieldContainer) {
        defaultFieldContainer.push(layout)
      }
    }

    if (Array.isArray(layout.children)) {
      layout.children = layout.children.filter((item: any) => {
        // 如果是字段 且已经被删除或者被排除掉
        return item.type !== FIELD ||
          (fieldByApiName[item.apiName] &&
            !exceptApiNames.includes(item.apiName) &&
            !exceptFieldTypes.includes(fieldByApiName[item.apiName].dataType))
      })
      layout.children.forEach((item: any) => {
        inner(item)
      })
    }
  }

  inner(cloneServerLayout)
  // 增加其他渠道添加的布局的字段
  const defaultFieldContainerLength = defaultFieldContainer.length
  needAddFields.forEach((item, index) => {
    const curLayoutIndex = index % defaultFieldContainerLength
    const curLayout = defaultFieldContainer[curLayoutIndex]
    if (!curLayout.children) {
      curLayout.children = []
    }
    // console.log(item)
    // console.log(serverFieldToLocalField(item, uiId))
    // TODO 以后换成apiName
    const localField = fieldById[item.id]
    if (!exceptApiNames.includes(localField.apiName) && !exceptFieldTypes.includes(localField.dataType)) {
      curLayout.children.push(serverFieldToLocalField(localField, uiId))
    }
  })
  // console.log(cloneServerLayout)
  return cloneServerLayout
}
