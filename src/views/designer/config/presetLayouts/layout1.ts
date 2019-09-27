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
import { serverFieldToLocalField, version } from '.'
import { arrToMap, ILayout, ILayoutItem, initStandObject, IStandardObject } from '@/store/modules/designer'
import nanoid from 'nanoid'
import _ from 'lodash'
import DraggableGroupTypes from '@/views/designer/config/DraggableGroupTypes'
import DraggableClassNames from '@/views/designer/config/DraggableClassNames'
import { fieldComponents } from '@/views/designer/config/components'

const fieldComponentByType = arrToMap(fieldComponents, 'type')

// 1 初始化数据
// 2 旧的数据加载后更新
// TODO 是否可以拖拽字段定义到这个模板文件是否合适
interface ILayoutParams {
  buttons: any[],
  fields: any[],
  standObject: IStandardObject
}

function layout1 (options: ILayoutParams = {
  buttons: [],
  fields: [],
  standObject: {
    ..._.cloneDeep(initStandObject)
  }
}): ILayout {
  let { buttons, fields, standObject } = options
  // TODO 根据type格式化所有的FIELD
  fields = [...fields].filter(field => (!!field && !!fieldComponentByType[field.dataType]))
  // TODO 过滤掉迭代1不支持的类型
    .filter(field => [
      ComponentTypes.TextField,
      ComponentTypes.LongTextField,
      ComponentTypes.DateField,
      ComponentTypes.DateTimeField,
      ComponentTypes.PhoneField
    ].includes(field.dataType))
    .slice(0, 5)
    .map(serverFieldToLocalField)
  return {
    [LayoutTypes.PC]: {
      name: 'layout1_' + LayoutTypes.PC + '_' + nanoid(),
      apiName: 'api' + '_' + LayoutTypes.PC + '_' + nanoid(),
      description: '',
      type: LayoutTypes.PC,
      usedFields: [],
      needAddFields: [],
      needModifyFields: [],
      // TODO remove next LINE
      // @ts-ignore
      define: {
        version,
        type: ComponentTypes.Container,
        name: 'layout1_' + LayoutTypes.PC + '_' + nanoid(),
        apiName: 'api' + '_' + LayoutTypes.PC + '_' + nanoid(),
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
                  title: standObject.name,
                  subTitle: standObject.description,
                  // TODO 暂时显示全部按钮
                  usedButtons: buttons.map((button: { id: number, name: string }) => ({
                    key: button.id + '_' + nanoid(),
                    name: '' + button.name,
                    id: button.id
                  })),
                  // TODO 先默认显示5个字段
                  usedFields: fields.map((field: { id: number, name: string }) => ({
                    key: '' + field.id + '_' + nanoid(),
                    name: '' + field.name,
                    id: field.id
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
                defaultValue: ComponentTypes.InfoTabDetails,
                attrs: {
                  value: ComponentTypes.InfoTabDetails
                },
                children: [
                  {
                    type: ComponentTypes.InfoTabDetails,
                    key: ComponentTypes.InfoTabDetails + '_' + nanoid(),
                    name: '详情',
                    children: [
                      {
                        type: ComponentTypes.Container,
                        key: ComponentTypes.Container + '_' + nanoid(),
                        attrs: {
                          direction: 'vertical'
                        },
                        draggable: {
                          group: DraggableGroupTypes.FormGroup,
                          ghostClass: DraggableClassNames.FormGroup
                        },
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
                                      span: 12
                                    },
                                    draggable: {
                                      group: DraggableGroupTypes.FormField,
                                      ghostClass: DraggableClassNames.FormField
                                    },
                                    isDefaultFieldContainer: true,
                                    children: fields.filter((_, index) => index % 2 === 0)
                                    // children: [
                                    //   {
                                    //     type: ComponentTypes.TextField,
                                    //     key: ComponentTypes.TextField + '_' + nanoid(),
                                    //     name: '测试字段A',
                                    //     attrs: {
                                    //       maxlength: null,
                                    //       disabled: false
                                    //     }
                                    //   }
                                    // ]
                                  },
                                  {
                                    type: ComponentTypes.Col,
                                    key: ComponentTypes.Col + '_' + nanoid(),
                                    attrs: {
                                      span: 12
                                    },
                                    draggable: {
                                      group: DraggableGroupTypes.FormField,
                                      ghostClass: DraggableClassNames.FormField
                                    },
                                    isDefaultFieldContainer: true,
                                    children: fields.filter((_, index) => index % 2 !== 0)
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
                    name: '活动'
                  },
                  {
                    type: ComponentTypes.InfoTabRelatedList,
                    key: ComponentTypes.InfoTabRelatedList + '_' + nanoid(),
                    name: '相关列表',
                    // TODO 获取显示的相关列表和配置
                    attrs: {
                      usedFields: []
                    }
                  },
                  {
                    type: ComponentTypes.InfoTabFile,
                    key: ComponentTypes.InfoTabFile + '_' + nanoid(),
                    name: '文件'
                  },
                  {
                    type: ComponentTypes.InfoTabFollowUp,
                    key: ComponentTypes.InfoTabFollowUp + '_' + nanoid(),
                    name: '跟进记录',
                    attrs: {
                      usedButtons: [],
                      usedFields: []
                    }
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
