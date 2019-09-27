import ComponentTypes from '@/views/designer/config/ComponentTypes'
import DraggableClassNames from '@/views/designer/config/DraggableClassNames'
import DraggableGroupTypes from '@/views/designer/config/DraggableGroupTypes'

// TODO item add [key 、modal、rule]

export default {
  type: 'Container',
  name: '外层容器',
  children: [
    {
      type: ComponentTypes.Header,
      key: ComponentTypes.Header + '_aaa',
      name: '顶栏容器',
      attrs: {
        height: 'auto'
      },
      children: [
        {
          type: ComponentTypes.FormHeader,
          key: ComponentTypes.FormHeader + '_aaa',
          name: '表单标题',
          attrs: {
            // TODO get label and default value
            usedButtons: [{
              key: '1',
              name: '名称'
            }, {
              key: '2',
              name: '电话号码'
            }, {
              key: '3',
              name: '客户'
            }, {
              key: '4',
              name: '大类'
            }, {
              key: '5',
              name: '小类'
            }],
            // TODO get default value and label
            usedFields: [{
              key: 'startTime',
              name: '开始时间'
            }, {
              key: 'endTime',
              name: '结束时间'
            }, {
              key: 'owner',
              name: '所有人'
            }, {
              key: 'status',
              name: '状态'
            }, {
              key: 'budget',
              name: '预算'
            }]
          }
        }
      ]
    },
    {
      type: ComponentTypes.Main,
      key: ComponentTypes.Main + '_aaa',
      name: '主要区域容器',
      children: [
        {
          type: ComponentTypes.InfoTab,
          key: ComponentTypes.InfoTab + '_aaa',
          name: 'Tab组件',
          defaultValue: ComponentTypes.InfoTabDetails,
          attrs: {
            value: ComponentTypes.InfoTabDetails
          },
          children: [
            {
              type: ComponentTypes.InfoTabDetails,
              key: ComponentTypes.InfoTabDetails + '_aaa',
              name: '详情',
              children: [
                {
                  type: ComponentTypes.Container,
                  key: ComponentTypes.Container + '_aaa',
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
                      key: ComponentTypes.Group + '_aaa',
                      name: '基本信息',
                      children: [
                        {
                          type: ComponentTypes.Row,
                          key: ComponentTypes.Row + '_aaa',
                          children: [
                            {
                              type: ComponentTypes.Col,
                              key: ComponentTypes.Col + '_aaa',
                              attrs: {
                                span: 12
                              },
                              draggable: {
                                group: DraggableGroupTypes.FormField,
                                ghostClass: DraggableClassNames.FormField
                              },
                              children: [
                                {
                                  type: ComponentTypes.TextField,
                                  key: ComponentTypes.TextField + '_aaa',
                                  name: '测试字段A',
                                  attrs: {
                                    maxlength: null,
                                    disabled: false,
                                    required: false
                                  }
                                },
                                {
                                  type: ComponentTypes.TextField,
                                  key: ComponentTypes.TextField + '_ccc',
                                  name: '测试字段C',
                                  attrs: {
                                    maxlength: null,
                                    disabled: false,
                                    required: false
                                  }
                                }
                              ]
                            },
                            {
                              type: ComponentTypes.Col,
                              key: ComponentTypes.Col + '_bbb',
                              attrs: {
                                span: 12
                              },
                              draggable: {
                                group: DraggableGroupTypes.FormField,
                                ghostClass: DraggableClassNames.FormField
                              },
                              children: [
                                {
                                  type: ComponentTypes.TextField,
                                  key: ComponentTypes.TextField + '_ddd',
                                  name: '测试字段D',
                                  attrs: {
                                    maxlength: null,
                                    disabled: false,
                                    required: false
                                  }
                                },
                                {
                                  type: ComponentTypes.TextField,
                                  key: ComponentTypes.TextField + '_eee',
                                  name: '测试字段E',
                                  attrs: {
                                    maxlength: null,
                                    disabled: false,
                                    required: false
                                  }
                                },
                                {
                                  type: ComponentTypes.TextField,
                                  key: ComponentTypes.TextField + '_fff',
                                  name: '测试字段F',
                                  attrs: {
                                    maxlength: null,
                                    disabled: false,
                                    required: false
                                  }
                                },
                                {
                                  type: ComponentTypes.TextField,
                                  key: ComponentTypes.TextField + '_ggg',
                                  name: '测试字段G',
                                  attrs: {
                                    maxlength: null,
                                    disabled: false,
                                    required: false
                                  }
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      type: ComponentTypes.Group,
                      key: ComponentTypes.Group + '_bbb',
                      name: '系统信息',
                      children: [
                        {
                          type: ComponentTypes.Row,
                          key: ComponentTypes.Row + '_bbb',
                          children: [
                            {
                              type: ComponentTypes.Col,
                              key: ComponentTypes.Col + '_ccc',
                              attrs: {
                                span: 12
                              },
                              draggable: {
                                group: DraggableGroupTypes.FormField,
                                ghostClass: DraggableClassNames.FormField
                              },
                              children: [
                                {
                                  type: ComponentTypes.TextField,
                                  key: ComponentTypes.TextField + '_aaa',
                                  name: '测试字段X',
                                  attrs: {
                                    maxlength: null,
                                    disabled: false,
                                    required: false
                                  }
                                },
                                {
                                  type: ComponentTypes.TextField,
                                  key: ComponentTypes.TextField + '_ccc',
                                  name: '测试字段Z',
                                  attrs: {
                                    maxlength: null,
                                    disabled: false,
                                    required: false
                                  }
                                }
                              ]
                            },
                            {
                              type: ComponentTypes.Col,
                              key: ComponentTypes.Col + '_ddd',
                              attrs: {
                                span: 12
                              },
                              draggable: {
                                group: DraggableGroupTypes.FormField,
                                ghostClass: DraggableClassNames.FormField
                              },
                              children: [
                                {
                                  type: ComponentTypes.TextField,
                                  key: ComponentTypes.TextField + '_ddd',
                                  name: '测试字段FG',
                                  attrs: {
                                    maxlength: null,
                                    disabled: false,
                                    required: false
                                  }
                                },
                                {
                                  type: ComponentTypes.TextField,
                                  key: ComponentTypes.TextField + '_eee',
                                  name: '测试字段JJ',
                                  attrs: {
                                    maxlength: null,
                                    disabled: false,
                                    required: false
                                  }
                                },
                                {
                                  type: ComponentTypes.TextField,
                                  key: ComponentTypes.TextField + '_fff',
                                  name: '测试字段LL',
                                  attrs: {
                                    maxlength: null,
                                    disabled: false,
                                    required: false
                                  }
                                },
                                {
                                  type: ComponentTypes.TextField,
                                  key: ComponentTypes.TextField + '_ggg',
                                  name: '测试字段PP',
                                  attrs: {
                                    maxlength: null,
                                    disabled: false,
                                    required: false
                                  }
                                }
                              ]
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
              key: ComponentTypes.InfoTabActivity + '_aaa',
              name: '活动'
            },
            {
              type: ComponentTypes.InfoTabRelatedList,
              key: ComponentTypes.InfoTabRelatedList + '_aaa',
              name: '相关列表',
              // TODO 获取显示的相关列表和配置
              attrs: {
                usedFields: ['AAA', 'BBB']
              }
            },
            {
              type: ComponentTypes.InfoTabFile,
              key: ComponentTypes.InfoTabFile + '_aaa',
              name: '文件'
            },
            {
              type: ComponentTypes.InfoTabFollowUp,
              key: ComponentTypes.InfoTabFollowUp + '_aaa',
              name: '跟进记录',
              attrs: {
                usedButtons: ['aaa', 'bbb', 'ccc'],
                usedFields: ['add', 'edit', 'delete']
              }
            }
          ]
        }
      ]
    }
  ],
  attrs: {
    direction: 'vertical'
  }
}
