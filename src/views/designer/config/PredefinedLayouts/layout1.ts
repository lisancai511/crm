// ////////////////////////////////////////////////////////////////////1
//                         LAYOUT1                                   //1
// ////////////////////////////////////////////////////////////////////1
// ////////////////////////////////////////////////////////////////////1
//                                                                   //1
//                                                                   //1
//                                                                   //1
//                                                                   //1
//                                                                   //1
//                                                                   //1
//                                                                   //1
//                                                                   //1
//                                                                   //1
// ////////////////////////////////////////////////////////////////////1

import LayoutTypes from '@/views/designer/config/LayoutTypes'
import ComponentTypes from '@/views/designer/config/ComponentTypes'
import { version } from '.'
import { serverFieldToLocalField } from '@/views/designer/utils'
import { ILayout } from '@/store/modules/designer'
import { arrToMap } from '@/utils'
import nanoid from 'nanoid'
import { fieldComponents } from '@/views/designer/config/components'
import { DraggableOptionsFormField, DraggableOptionsFormFieldGroup } from '@/views/designer/config/DraggableOptions'
import { ButtonPositions } from '@/sdk/button-sdk/PredefinedButton'

const fieldComponentByType = arrToMap(fieldComponents, 'type')

// 1 初始化数据
// 2 旧的数据加载后更新
// TODO 是否可以拖拽字段定义到这个模板文件是否合适
interface ILayoutParams {
  buttons: any[],
  fields: any[],
  exceptApiNames?: string[],
  exceptFieldTypes?: string[]
  // standObject: IStandardObject
}

function layout1 (options: ILayoutParams = {
  buttons: [],
  fields: [],
  exceptApiNames: [],
  exceptFieldTypes: []
  // standObject: {
  //   ..._.cloneDeep(initStandObject)
  // }
}): ILayout {
  let { buttons, fields, exceptApiNames = [], exceptFieldTypes = [] } = options

  interface IButton {
    id: number,
    name: string,
    apiName: string,
    position: string
  }

  const usedButtons: any[] = buttons
    .filter((button: IButton) => {
      return button.position.includes(ButtonPositions.detail)
    })
    .map((button: IButton) => ({
      // key: button.id + '_' + nanoid(),
      // name: '' + button.name,
      // id: button.id,
      apiName: button.apiName
    })).slice(0, 5)
  // TODO 根据type格式化所有的FIELD
  fields = [...fields].filter(field =>
    (!!field && !!fieldComponentByType[field.dataType || field.type]) &&
    !exceptApiNames.includes(field.apiName) &&
    !exceptFieldTypes.includes(field.dataType || field.type)
  )
    .slice(0, 5)
    .map(field => serverFieldToLocalField(field))

  return {
    [LayoutTypes.PC]: {
      name: 'layout1_' + LayoutTypes.PC + '_' + nanoid(),
      apiName: 'api' + '_' + LayoutTypes.PC + '_' + nanoid(),
      description: '',
      type: LayoutTypes.PC,
      usedFields: [],
      needAddFields: [],
      needModifyFields: [],
      version,
      // TODO remove next LINE
      // @ts-ignore
      define: {
        version,
        type: ComponentTypes.Container,
        name: 'layout1_' + LayoutTypes.PC + '_' + nanoid(),
        // apiName: 'api' + '_' + LayoutTypes.PC + '_' + nanoid(),
        attrs: {
          direction: 'vertical'
        },
        children: [
          {
            type: ComponentTypes.Header,
            key: ComponentTypes.Header + '_' + nanoid(),
            name: '顶栏容器',
            attrs: {
              height: 'auto'
            },
            children: [
              {
                type: ComponentTypes.FormHeader,
                key: ComponentTypes.FormHeader + '_' + nanoid(),
                name: '表单标题',
                attrs: {
                  // TODO 暂时显示全部按钮
                  usedButtons,
                  // TODO 先默认显示5个字段
                  usedFields: fields.map((field: { id: number, name: string, apiName: string }) => ({
                    key: '' + field.id + '_' + nanoid(),
                    name: '' + field.name,
                    id: field.id,
                    apiName: field.apiName
                  }))
                }
              }
            ]
          },
          {
            type: ComponentTypes.Main,
            key: ComponentTypes.Main + '_' + nanoid(),
            name: '主要区域容器',
            children: [
              {
                type: ComponentTypes.InfoTab,
                key: ComponentTypes.InfoTab + '_' + nanoid(),
                name: 'Tab组件',
                attrs: {
                  // TODO change next line after dev
                  tabValue: ComponentTypes.InfoTabDetails
                },
                children: [
                  {
                    type: ComponentTypes.InfoTabDetails,
                    key: ComponentTypes.InfoTabDetails + '_' + nanoid(),
                    name: '详情',
                    show: true,
                    children: [
                      {
                        type: ComponentTypes.Container,
                        key: ComponentTypes.Container + '_' + nanoid(),
                        attrs: {
                          direction: 'vertical'
                        },
                        draggable: DraggableOptionsFormFieldGroup,
                        children: [
                          {
                            type: ComponentTypes.Group,
                            key: ComponentTypes.Group + '_' + nanoid(),
                            name: '基本信息',
                            children: [
                              {
                                type: ComponentTypes.Row,
                                key: ComponentTypes.Row + '_' + nanoid(),
                                attrs: {
                                  gutter: 70
                                },
                                children: [
                                  {
                                    type: ComponentTypes.Col,
                                    key: ComponentTypes.Col + '_' + nanoid(),
                                    attrs: {
                                      span: 12
                                    },
                                    draggable: DraggableOptionsFormField,
                                    isDefaultFieldContainer: true,
                                    children: fields.filter((_, index) => index % 2 === 0)
                                    // children: [
                                    //   {
                                    //     type: ComponentTypes.Transition,
                                    //     key: ComponentTypes.Transition + '_' + nanoid(),
                                    //     isDefaultFieldContainer: true,
                                    //     children: fields.filter((_, index) => index % 2 === 0)
                                    //   }
                                    // ]
                                  },
                                  {
                                    type: ComponentTypes.Col,
                                    key: ComponentTypes.Col + '_' + nanoid(),
                                    attrs: {
                                      span: 12
                                    },
                                    draggable: DraggableOptionsFormField,
                                    isDefaultFieldContainer: true,
                                    children: fields.filter((_, index) => index % 2 !== 0)
                                    // children: [
                                    //   {
                                    //     type: ComponentTypes.Transition,
                                    //     key: ComponentTypes.Transition + '_' + nanoid(),
                                    //     isDefaultFieldContainer: true,
                                    //     children: fields.filter((_, index) => index % 2 !== 0)
                                    //   }
                                    // ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: ComponentTypes.InfoTabActivity,
                    key: ComponentTypes.InfoTabActivity + '_' + nanoid(),
                    name: '活动',
                    show: true
                  },
                  {
                    type: ComponentTypes.InfoTabRelatedList,
                    key: ComponentTypes.InfoTabRelatedList + '_' + nanoid(),
                    name: '相关列表',
                    // TODO 获取显示的相关列表和配置
                    attrs: {},
                    children: [],
                    show: true
                  },
                  {
                    type: ComponentTypes.InfoTabFile,
                    key: ComponentTypes.InfoTabFile + '_' + nanoid(),
                    name: '文件',
                    show: true
                  },
                  {
                    type: ComponentTypes.InfoTabFollowUp,
                    key: ComponentTypes.InfoTabFollowUp + '_' + nanoid(),
                    name: '跟进记录',
                    attrs: {
                      usedButtons: [],
                      usedOptions: []
                    },
                    show: true
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    [LayoutTypes.Mobile]: {
      name: 'layout1_' + LayoutTypes.Mobile + '_' + nanoid(),
      apiName: 'api' + '_' + LayoutTypes.Mobile + '_' + nanoid(),
      description: '',
      type: LayoutTypes.Mobile,
      usedFields: [],
      needAddFields: [],
      needModifyFields: [],
      version,
      // TODO remove next LINE
      // @ts-ignore
      define: {
        version,
        type: ComponentTypes.Container,
        name: 'layout1_' + LayoutTypes.Mobile + '_' + nanoid(),
        // apiName: 'api' + '_' + LayoutTypes.PC + '_' + nanoid(),
        attrs: {
          direction: 'vertical',
          usedButtons
        },
        children: [
          {
            type: ComponentTypes.Header,
            key: ComponentTypes.Header + '_' + nanoid(),
            name: '顶栏容器',
            attrs: {
              height: 'auto',
              style: {
                padding: 0
              }
            },
            children: [
              {
                type: ComponentTypes.FormHeader,
                key: ComponentTypes.FormHeader + '_' + nanoid(),
                name: '表单标题',
                attrs: {
                  // TODO 暂时显示全部按钮
                  usedButtons,
                  // TODO 先默认显示5个字段
                  usedFields: fields.map((field: { id: number, name: string, apiName: string }) => ({
                    key: '' + field.id + '_' + nanoid(),
                    name: '' + field.name,
                    id: field.id,
                    apiName: field.apiName
                  }))
                }
              }
            ]
          },
          {
            type: ComponentTypes.Main,
            key: ComponentTypes.Main + '_' + nanoid(),
            name: '主要区域容器',
            attrs: {
              style: {
                padding: 0,
                flex: 'none'
              }
            },
            children: [
              {
                type: ComponentTypes.InfoTab,
                key: ComponentTypes.InfoTab + '_' + nanoid(),
                name: 'Tab组件',
                attrs: {
                  tabValue: ComponentTypes.InfoTabDetails
                },
                children: [
                  {
                    type: ComponentTypes.InfoTabDetails,
                    key: ComponentTypes.InfoTabDetails + '_' + nanoid(),
                    name: '详情',
                    show: true,
                    children: [
                      {
                        type: ComponentTypes.Container,
                        key: ComponentTypes.Container + '_' + nanoid(),
                        attrs: {
                          direction: 'vertical'
                        },
                        draggable: DraggableOptionsFormFieldGroup,
                        children: [
                          {
                            type: ComponentTypes.Group,
                            key: ComponentTypes.Group + '_' + nanoid(),
                            name: '基本信息',
                            children: [
                              {
                                type: ComponentTypes.Row,
                                key: ComponentTypes.Row + '_' + nanoid(),
                                children: [
                                  {
                                    type: ComponentTypes.Col,
                                    key: ComponentTypes.Col + '_' + nanoid(),
                                    attrs: {
                                      span: 24
                                    },
                                    draggable: DraggableOptionsFormField,
                                    isDefaultFieldContainer: true,
                                    children: fields
                                    // children: [
                                    //   {
                                    //     type: ComponentTypes.Transition,
                                    //     key: ComponentTypes.Transition + '_' + nanoid(),
                                    //     isDefaultFieldContainer: true,
                                    //     children: fields.filter((_, index) => index % 2 === 0)
                                    //   }
                                    // ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: ComponentTypes.InfoTabActivity,
                    key: ComponentTypes.InfoTabActivity + '_' + nanoid(),
                    name: '活动',
                    show: true
                  },
                  {
                    type: ComponentTypes.InfoTabRelatedList,
                    key: ComponentTypes.InfoTabRelatedList + '_' + nanoid(),
                    name: '相关列表',
                    // TODO 获取显示的相关列表和配置
                    attrs: {},
                    children: [],
                    show: true
                  },
                  {
                    type: ComponentTypes.InfoTabFile,
                    key: ComponentTypes.InfoTabFile + '_' + nanoid(),
                    name: '文件',
                    show: true
                  },
                  {
                    type: ComponentTypes.InfoTabFollowUp,
                    key: ComponentTypes.InfoTabFollowUp + '_' + nanoid(),
                    name: '跟进记录',
                    attrs: {
                      usedButtons: [],
                      usedOptions: []
                    },
                    show: true
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  }
}

export default layout1
