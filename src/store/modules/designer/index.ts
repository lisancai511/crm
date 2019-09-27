import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import api from '@/api'
import { IField } from '@/views/designer/config/components'
import LayoutTypes from '@/views/designer/config/LayoutTypes'
import _ from 'lodash'

export interface IStandardObject {
  id: string | number | null,
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
  name: string,
  apiName: string,
  description: string,
  type: string,
  version: string,
  needAddFields: any[],
  define: IField | {}
}

export interface ILayout {
  [LayoutTypes.PC]: ILayoutItem
}

export interface IDesignerState {
  // 布局Id
  layoutId: null | number,
  // 全部UI列表
  layout: ILayout
  // 对象内全部字段
  fields: any[],
  buttons: any[],
  // 对象基本信息
  object: IStandardObject,
}

export function arrToMap (arr: any[], prop: string) {
  return arr.reduce((pre: any, cur: any) => {
    pre[cur[prop]] = cur
    return pre
  }, {})
}

export const initStandObject = {
  id: null,
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

@Module({ dynamic: true, store, name: 'designer' })
class Designer extends VuexModule implements IDesignerState {
  public layoutId: null | number = null
  public layout: ILayout = {
    [LayoutTypes.PC]: {
      name: '',
      apiName: '',
      description: '',
      type: LayoutTypes.PC,
      version: '0.0.0',
      needAddFields: [],
      define: {}
    }
  }
  public fields: any[] = []
  public buttons: any[] = []
  public object: IStandardObject = {
    ..._.cloneDeep(initStandObject)
  }

  get fieldByKey (): any {
    return arrToMap(this.fields, 'key')
  }

  get fieldById (): any {
    return arrToMap(this.fields.filter(field => !!field.id), 'id')
  }

  get buttonByKey (): any {
    return arrToMap(this.buttons, 'key')
  }

  get buttonById (): any {
    return arrToMap(this.buttons.filter(button => !!button.id), 'id')
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
  private UPDATE_OBJECT (object: IStandardObject) {
    this.object = object
  }

  @Mutation
  private UPDATE_LAYOUT_ID (id: number) {
    this.layoutId = id
  }

  @Mutation
  private UPDATE_LAYOUT (layout: any[]) {
    layout.map(item => {
      (this.layout as any)[(item as ILayoutItem).type] = item
    })
  }

  @Mutation
  private UPDATE_LAYOUT_BY_TYPE (payload: { layout: ILayoutItem, type: string }) {
    (this.layout as any)[payload.type] = payload.layout
  }

  @Action
  async getAllFields (objectId: string) {
    try {
      const { data } = await api.bizObjects.getFields(objectId)
      this.UPDATE_FIELDS(data.map((item: any) => ({ key: '' + item.id, ...item })))
    } catch (e) {
      console.error(e)
    }
  }

  @Action
  async getAllButtons (objectId: string) {
    try {
      const { data } = await api.bizObjects.getButtons(objectId)
      this.UPDATE_BUTTONS(data.map((item: any) => ({ key: '' + item.id, ...item })))
    } catch (e) {
      console.error(e)
    }
  }

  @Action
  updateObject (object: IStandardObject) {
    this.UPDATE_OBJECT(object)
  }

  @Action
  updateLayoutId (id: number) {
    this.UPDATE_LAYOUT_ID(id)
  }

  @Action
  updateLayout (layout: any[]) {
    this.UPDATE_LAYOUT(layout)
  }

  @Action({ commit: 'UPDATE_LAYOUT_BY_TYPE' })
  updateLayoutByType (layout: ILayoutItem, type: string) {
    this.UPDATE_LAYOUT_BY_TYPE(
      {
        layout,
        type
      }
    )
  }
}

export default getModule(Designer)
