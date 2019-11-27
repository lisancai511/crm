import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import api from '@/api'
import { IField } from '@/views/designer/config/components'
import LayoutTypes from '@/views/designer/config/LayoutTypes'
import _ from 'lodash'
import {
  getLocalLayoutUnusedFields,
  serverFieldToLocalField
} from '@/views/designer/utils'

import { arrToMap } from '@/utils'
import { ILookup } from '@/views/designer/types'
import PredefinedObjectApiNames, { PredefinedFollowUpFieldApiNames } from '@/views/designer/config/PredefinedObjectApiNames'

const name = 'designer'
if (store.state[name]) {
  store.unregisterModule(name)
}

export interface IStandardObject {
  id: string,
  name: string,
  type: string,
  standard: boolean,
  iconUrl: string | null,
  description: string,
  apiName: null,
  nameFieldName: string,
  nameFieldType: string,
  // createdTime: string,
  // creator: number | null,
  // creatorName: string,
  // lastModifiedTime: string,
  // lastModifier: number | null,
  // lastModifierName: string,
  [propName: string]: any;
}

export interface ILayoutItem {
  id: string,
  name: string,
  apiName: string,
  description: string,
  type: string,
  version: string,
  needAddFields?: any[],
  usedFields?: any[],
  needModifyFields?: any[],
  define: IField | {},
  // isSimple: boolean
  isInit: boolean
}

export interface IHoverLayoutItem extends ILayoutItem {
  define: {
    usedFields: any[]
    lookups: any[]
  }
}

export interface ILayout {
  [LayoutTypes.PC]: ILayoutItem
  [LayoutTypes.Mobile]: ILayoutItem
  [LayoutTypes.Linear]: ILayoutItem
  [LayoutTypes.Hover]: IHoverLayoutItem
}

export interface IDesignerState {
  // 布局Id
  layoutId: string,
  // 全部UI列表
  layout: ILayout
  // 对象内全部字段
  fields: any[],
  buttons: any[],
  // 对象基本信息
  object: IStandardObject,
  // 是否暂时停止观察布局变化
  isStopWatchingLayout: boolean,
  lookups: ILookup[],
  fieldsByObjectId: {
    [propName: string]: any[]
  }
  curRoute: any
  followUpTypes: any[]
}

export const initStandObject = {
  // id: '',
  // TODO DELETE NEXT LINE AFTER DEV
  id: '',
  name: '',
  type: '',
  standard: true,
  iconUrl: '',
  description: '',
  apiName: null,
  nameFieldName: '',
  nameFieldType: '',
  createdTime: '',
  creator: null,
  creatorName: '',
  lastModifiedTime: '',
  lastModifier: null,
  lastModifierName: ''
}

const InitLayout: ILayout = {
  [LayoutTypes.PC]: {
    id: '',
    name: '',
    apiName: '',
    description: '',
    type: LayoutTypes.PC,
    version: '0.0.0',
    needAddFields: [],
    usedFields: [],
    needModifyFields: [],
    define: {},
    isInit: true
    // isSimple: true
  },
  [LayoutTypes.Mobile]: {
    id: '',
    name: '',
    apiName: '',
    description: '',
    type: LayoutTypes.Mobile,
    version: '0.0.0',
    needAddFields: [],
    usedFields: [],
    needModifyFields: [],
    define: {},
    isInit: true
    // isSimple: true
  },
  [LayoutTypes.Linear]: {
    id: '',
    name: '',
    apiName: '',
    description: '',
    type: LayoutTypes.Linear,
    version: '0.0.0',
    define: [],
    isInit: true
  },
  [LayoutTypes.Hover]: {
    id: '',
    name: '',
    apiName: '',
    description: '',
    type: LayoutTypes.Hover,
    version: '0.0.0',
    define: {
      usedFields: [],
      lookups: []
    },
    isInit: true
  }
}

@Module({
  dynamic: true,
  store,
  name,
  namespaced: true
})
class Designer extends VuexModule implements IDesignerState {
  // public layoutId: string = ''
  // TODO DELETE NEXT LINE AFTER DEV
  public layoutId: string = ''
  public layout: ILayout = _.cloneDeep(InitLayout)
  public fields: any[] = []
  public buttons: any[] = []
  public object: IStandardObject = _.cloneDeep(initStandObject)
  public isStopWatchingLayout: boolean = false
  public lookups: ILookup[] = []
  public curRoute: any = {
    meta: {
      type: 'PC'
    }
  }
  public fieldsByObjectId: { [propName: string]: any[] } = {}
  public followUpTypes: any[] = []

  get fieldById (): any {
    return arrToMap(this.fields.filter(field => !!field.id), 'id')
  }

  get fieldByApiNameByObjectId () {
    return Object.entries(this.fieldsByObjectId).reduce((pre: any, cur: any) => {
      pre[cur[0]] = arrToMap(cur[1], 'apiName')
      return pre
    }, {})
  }

  get lookupById (): any {
    return arrToMap(this.lookups, 'id')
  }

  get followUpTypeById () {
    return arrToMap(this.followUpTypes, 'id')
  }

  get fieldByApiName (): any {
    return arrToMap(this.fields.filter(field => !!field.id), 'apiName')
  }

  get unusedFields (): any {
    return getLocalLayoutUnusedFields(
      this.fields.map(field => serverFieldToLocalField(field)),
      this.layout[this.curRoute.meta.type as LayoutTypes].define
      // , true
    )
  }

  get buttonById (): any {
    return arrToMap(this.buttons.filter(button => !!button.id), 'id')
  }
  get buttonByApiName (): any {
    return arrToMap(this.buttons.filter(button => !!button.id), 'apiName')
  }

  @Mutation
  private INIT_STAGE (objectId: string) {
    this.layoutId = ''
    this.layout = _.cloneDeep(InitLayout)
    this.fields = []
    this.buttons = []
    this.object = {
      ...initStandObject,
      id: objectId
    }
    this.isStopWatchingLayout = false
    this.fieldsByObjectId = {}
  }

  @Mutation
  private UPDATE_CUR_ROUTE (router: any) {
    this.curRoute = router
  }

  @Mutation
  private UPDATE_FIELDS (fields: any[]) {
    this.fields = fields
  }

  @Mutation
  private UPDATE_BUTTONS (buttons: any[]) {
    this.buttons = buttons
  }

  @Mutation
  private UPDATE_LOOKUPS (lookups: ILookup[]) {
    this.lookups = lookups
  }

  @Mutation
  private UPDATE_OBJECT (object: IStandardObject) {
    this.object = object
  }

  @Mutation
  private UPDATE_LAYOUT_ID (id: string) {
    this.layoutId = id
  }

  // @Mutation
  // private UPDATE_LAYOUT (layout: any[]) {
  //   layout.map(item => {
  //     (this.layout as any)[(item as ILayoutItem).type] = {
  //       ...item,
  //       isSimple: false
  //     }
  //   })
  // }

  @Mutation
  private UPDATE_LAYOUT_SIMPLE (layout: any[]) {
    layout.map((item: ILayoutItem) => {
      const curUI: ILayoutItem = (this.layout as any)[(item as ILayoutItem).type]
      curUI.apiName = item.apiName
      curUI.description = item.description
      curUI.id = item.id
      curUI.name = item.name
      curUI.isInit = true
    })
  }

  @Mutation
  private UPDATE_LAYOUT_BY_TYPE (payload: { layout: ILayoutItem, type: string }) {
    (this.layout as any)[payload.type] = {
      ...payload.layout,
      isInit: false
    }
  }

  @Mutation
  private INIT_LAYOUT_BY_TYPE (type: LayoutTypes) {
    this.layout[type].isInit = true
  }

  @Mutation
  private UPDATE_IS_STOP_WATCHING_LAYOUT (isStop: boolean) {
    this.isStopWatchingLayout = isStop
  }

  @Mutation
  private UPDATE_FIELDS_BY_OBJECT_ID (payload: {
    fields: any[],
    objectId: string
  }) {
    this.fieldsByObjectId = {
      ...this.fieldsByObjectId,
      [payload.objectId]: payload.fields
    }
  }

  @Mutation
  private UPDATE_FOLLOW_UP_TYPES (payload: any[]) {
    this.followUpTypes = payload
  }

  @Action
  initStage (objectId: string) {
    this.INIT_STAGE(objectId)
  }

  @Action
  updateCurRoute (router: any) {
    this.UPDATE_CUR_ROUTE(router)
  }

  @Action
  async getAllFields () {
    try {
      const { data: { data } } = await api.bizObjects.getFields(this.object.id, null, this.layoutId)
      this.UPDATE_FIELDS(
        data.map((item: any) => ({
          key: '' + item.id,
          ...item,
          layoutUiConfigById: arrToMap(item.layoutUiConfig || [], 'layoutUiId')
        }))
      )
    } catch (e) {
      console.error(e)
    }
  }

  @Action
  async getAllButtons () {
    try {
      // @ts-ignore
      const { data: { data } } = await api.bizObjects.getOperators(this.object.id, 'Button')
      this.UPDATE_BUTTONS((data).map((item: any) => ({ key: '' + item.id, ...item })))
    } catch (e) {
      console.error(e)
    }
  }

  @Action
  async getAllLookups () {
    try {
      const {
        data: {
          data
        }
      } = await api.bizObjects.getLookups(this.object.id)
      this.UPDATE_LOOKUPS(data)
    } catch (e) {
      console.log(e)
    }
  }

  @Action
  updateObject (object: IStandardObject) {
    this.UPDATE_OBJECT(object)
  }

  @Action
  updateLayoutId (id: string) {
    this.UPDATE_LAYOUT_ID(id)
  }

  // @Action
  // updateLayout (layout: any[]) {
  //   this.UPDATE_LAYOUT(layout)
  // }

  @Action
  updateLayoutByType (payload: { layout: ILayoutItem, type: string }) {
    this.UPDATE_LAYOUT_BY_TYPE(payload)
  }

  @Action
  initLayoutByType (type: LayoutTypes) {
    this.INIT_LAYOUT_BY_TYPE(type)
  }

  @Action
  updateIsStopWatchingLayout (isStop: boolean) {
    this.UPDATE_IS_STOP_WATCHING_LAYOUT(isStop)
  }

  @Action
  async getLayoutSimple () {
    try {
      const { data: { data } } = await api.bizObjects.getLayoutUIs(this.object.id, this.layoutId)
      const layoutTypesVal = Object.values(LayoutTypes)
      this.UPDATE_LAYOUT_SIMPLE(
        data.filter((item: any) => {
          return layoutTypesVal.includes(item.type)
        })
      )
    } catch (e) {
      console.error(e)
    }
  }

  @Action
  async getFieldsByObjectId (payload: {
    objectId: string,
    force?: boolean
  }) {
    const {
      objectId,
      force
    } = payload
    if (this.fieldsByObjectId[objectId] && !force) {
      return
    }
    // 初始化
    // this.UPDATE_FIELDS_BY_OBJECT_ID({
    //   fields: [],
    //   objectId
    // })
    try {
      const { data: { data } } = await api.bizObjects.getFields(objectId)
      this.UPDATE_FIELDS_BY_OBJECT_ID({
        fields: data,
        objectId
      })
    } catch (e) {
      console.error(e)
    }
  }

  @Action
  async getFollowUpTypes (force: boolean = false) {
    if (this.followUpTypes.length > 0 && !force) {
      return
    }
    try {
      const {
        data: {
          data: {
            items
          }
        }
      } = await api.bizObjects.getFieldValueCandidate(
        PredefinedObjectApiNames.followUp,
        PredefinedFollowUpFieldApiNames.type
      )
      this.UPDATE_FOLLOW_UP_TYPES(items)
    } catch (e) {
      console.error(e)
    }
  }
}

export default getModule(Designer)
