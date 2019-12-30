/**
 * Created by LiuLei on 2019/10/9
 */
import { IField } from '@/views/designer/config/components'
import ComponentTypes from '@/views/designer/config/ComponentTypes'
import { DESIGNER_EXEC_TYPES, DESIGNER_UI_TYPES, DESIGNER_USED_TYPES } from '@/views/designer/config/Designer'

// import { IField } from '@/views/designer/const/components'

export interface ILookup {
  id: string
  objectId: string
  relatedListTitle: string
  // checked: boolean
  // fields: IField[]
  // usedFields: any[]
  // usedFieldIds?: string[]
  // loadedFields: boolean
  // loadingFields: boolean
}

export interface IHoverLookup extends ILookup {
  checked: boolean
  fields: IField[]
  usedFields: any[]
  usedFieldIds?: string[]
  usedFieldApiNames?: string[]
  loadedFields: boolean
  loadingFields: boolean,
}

export interface IRelatedListLookup {
  type: ComponentTypes.InfoTabRelatedListItem
  id: string
  attrs: {
    usedFields: IField[]
    usedButtons: any[]
    relatedListTitle: string
    objectId: string,
    sortDirection: 'ASC' | 'DESC',
    sortOrderBy: string
  }
}

export interface IDesigner {
  setting: {
    uiType: DESIGNER_UI_TYPES,
    usedType: DESIGNER_USED_TYPES,
    execType: DESIGNER_EXEC_TYPES
  },
  recordTypeId?: string
  object: any
}
