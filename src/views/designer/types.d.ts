/**
 * Created by LiuLei on 2019/10/9
 */
import { IField } from '@/views/designer/config/components'
import ComponentTypes from '@/views/designer/config/ComponentTypes'

// import { IField } from '@/views/designer/config/components'

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
  loadedFields: boolean
  loadingFields: boolean
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
