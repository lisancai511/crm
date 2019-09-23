import LayoutTypes from '@/views/form-designer/config/LayoutTypes'

// TODO item add [key 、modal、rule]

export default {
  type: 'Container',
  name: '外层容器',
  children: [
    {
      type: LayoutTypes.Header,
      key: LayoutTypes.Header + '_aaa',
      name: '顶栏容器',
      attrs: {
        height: 'auto'
      },
      children: [
        {
          type: LayoutTypes.FormHeader,
          key: LayoutTypes.FormHeader + '_aaa',
          name: '表单标题',
          attrs: {
            title: '市场活动测试',
            subTitle: '2020年市场活动到达科技推荐会',
            // TODO get label and default value
            usedButtons: {
              type: LayoutTypes.FormHeaderButtons,
              key: LayoutTypes.FormHeaderButtons,
              children: [
                'edit', 'delete', 'modifyOwner', 'share', 'add'
              ]
            },
            // TODO get default value and label
            usedFields: {
              type: LayoutTypes.FormHeaderButtons,
              key: LayoutTypes.FormHeaderButtons,
              children: [
                'startTime', 'endTime', 'owner', 'status', 'budget'
              ]
            }
          }
        }
      ]
    },
    {
      type: LayoutTypes.Main,
      key: LayoutTypes.Main + '_aaa',
      name: '主要区域容器',
      children: [
        {
          type: LayoutTypes.InfoTab,
          key: LayoutTypes.InfoTab + '_aaa',
          name: 'Tab组件',
          children: [
            {
              type: LayoutTypes.InfoTabDetails,
              key: LayoutTypes.InfoTabDetails + '_aaa',
              name: '详情',
              children: [
                {
                  type: LayoutTypes.Container,
                  key: LayoutTypes.Container + '_aaa',
                  children: [
                    {
                      type: LayoutTypes.Main,
                      key: LayoutTypes.Main + '_aaa',
                      children: [
                        {
                          type: LayoutTypes.TextField,
                          key: LayoutTypes.TextField + '_aaa',
                          name: '测试字段A',
                          attrs: {
                            maxlength: null
                          }
                        },
                        {
                          type: LayoutTypes.TextField,
                          key: LayoutTypes.TextField + '_ccc',
                          name: '测试字段C',
                          attrs: {
                            maxlength: null
                          }
                        }
                      ]
                    }, {
                      type: LayoutTypes.Main,
                      key: LayoutTypes.Main + '_bbb',
                      children: [
                        {
                          type: LayoutTypes.TextField,
                          key: LayoutTypes.TextField + '_ddd',
                          name: '测试字段D',
                          attrs: {
                            maxlength: null
                          }
                        },
                        {
                          type: LayoutTypes.TextField,
                          key: LayoutTypes.TextField + '_eee',
                          name: '测试字段E',
                          attrs: {
                            maxlength: null
                          }
                        },
                        {
                          type: LayoutTypes.TextField,
                          key: LayoutTypes.TextField + '_fff',
                          name: '测试字段F',
                          attrs: {
                            maxlength: null
                          }
                        },
                        {
                          type: LayoutTypes.TextField,
                          key: LayoutTypes.TextField + '_ggg',
                          name: '测试字段G',
                          attrs: {
                            maxlength: null
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              type: LayoutTypes.InfoTabActivity,
              key: LayoutTypes.InfoTabActivity + '_aaa',
              name: '活动'
            },
            {
              type: LayoutTypes.InfoTabRelatedList,
              key: LayoutTypes.InfoTabRelatedList + '_aaa',
              name: '相关列表',
              // TODO 获取显示的相关列表和配置
              attrs: {
                usedFields: ['AAA', 'BBB']
              }
            },
            {
              type: LayoutTypes.InfoTabFile,
              key: LayoutTypes.InfoTabFile + '_aaa',
              name: '文件'
            },
            {
              type: LayoutTypes.InfoTabFollowUp,
              key: LayoutTypes.InfoTabFollowUp + '_aaa',
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
