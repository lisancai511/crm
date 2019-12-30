import ComponentTypes from '@/views/designer/config/ComponentTypes'
import DraggableGroupTypes from '@/views/designer/config/DraggableGroupTypes'
import DraggableClassNames from '@/views/designer/config/DraggableClassNames'

export interface IButton {
  id: string,
  key: string,
  name: string,
  apiName: string
}

// export interface IRelated {
//   id: string,
//   usedFields: IButton[],
//   usedButtons: IButton[],
//   sort: {}
// }

export enum WATERMARK_TYPES {
  // 用户名
  USERNAME = 'USERNAME',
  // 系统时间
  SYS_TIME = 'SYS_TIME',
  // 用户定位
  LOCATION = 'LOCATION',
  // 手机号码
  PHONE_NUMBER = 'PHONE_NUMBER'
}

export const WATERMARK_LIST = [
  {
    type: WATERMARK_TYPES.USERNAME,
    name: '水印显示用户名'
  },
  {
    type: WATERMARK_TYPES.SYS_TIME,
    name: '水印显示系统时间'
  },
  {
    type: WATERMARK_TYPES.LOCATION,
    name: '水印显示用户定位'
  },
  {
    type: WATERMARK_TYPES.PHONE_NUMBER,
    name: '水印显示用户手机号'
  }
]

export interface IAttrs {
  maxlength?: number | string | null
  // 容器组件的默认值
  tabValue?: any
  disabled?: boolean
  required?: boolean
  usedButtons?: IButton[]
  usedFields?: IButton[]
  usedOptions?: any[]
  direction?: string
  height?: string
  title?: string
  subTitle?: string
  isDefaultFieldContainer?: boolean
  // 整数位数
  integerDigit?: number,
  // 小数位数
  decimalDigit?: number,
  // 网址模式
  urlModel?: string
  valueCandidates?: any,
  valueCandidateConfig?: any,
  lookupConfig?: {
    lookupObjectId: string,
    moduleId: string,
    relatedListTitle: string,
    canCreateRelatedObject: boolean
  }
  // 相关列表对象ID
  relatedListTitle?: string
  objectId?: string
  sortOrderBy?: string
  sortDirection?: 'DESC' | 'ASC'

  // 金额大小写
  capital?: boolean

  // 数字单位
  unit?: string

  // 图片
  // 图片最大文件数量
  limitNumber?: number
  // 图片水印
  watermarks?: WATERMARK_TYPES[]
  // 只能通过手机拍照
  onlyUsedCellPhoneCamera?: boolean

  // 明细
  // 按钮名称
  actionName?: string

  // defaultValue?: number | string | null,
  [propName: string]: any
}

export interface IDraggableOptions {
  group: string,
  ghostClass?: string,
  animation?: number,
  disabled?: boolean
}

export interface IBasicComponent {
  type: string,
  name: string,
  icon?: string,
  key: string,
  attrs: IAttrs,
  children?: IField[],
  draggable?: IDraggableOptions
}

export interface ILayoutComponent extends IBasicComponent {
  show: boolean
}

export interface IField extends IBasicComponent {
  id: string,
  apiName: string,
  remark: string,
  helpText: string,
  model: any,
  rules?: [],
  // 配置规则
  configRules?: { [propName: string]: any },
  // 动态配置规则
  dynamicConfigRules?: (payload: {
    otherUsedFieldNames: string[],
    otherUsedFieldApiNames: string[]
  }) => {},
  show?: boolean,
  isEdit?: boolean
  isSelect?: boolean,
  isError?: boolean,
  autoNumberConfig?: any,
  addToLayouts?: any,
  description?: string
}

// 布局组件
export const layoutComponents: ILayoutComponent[] = [
  {
    type: ComponentTypes.Container,
    key: ComponentTypes.Container,
    icon: 'edit',
    name: '外层容器',
    attrs: {},
    show: false
  },
  {
    type: ComponentTypes.Header,
    key: ComponentTypes.Header,
    icon: 'edit',
    name: '顶栏容器',
    attrs: {},
    show: false
  },
  {
    type: ComponentTypes.Aside,
    key: ComponentTypes.Aside,
    icon: 'edit',
    name: '侧边栏容器',
    attrs: {},
    show: false
  },
  {
    type: ComponentTypes.Main,
    key: ComponentTypes.Main,
    icon: 'edit',
    name: '主要区域容器',
    attrs: {},
    show: false
  },
  {
    type: ComponentTypes.Footer,
    key: ComponentTypes.Footer,
    icon: 'edit',
    name: '底栏容器',
    attrs: {},
    show: false
  },
  {
    type: ComponentTypes.Row,
    key: ComponentTypes.Row,
    icon: 'edit',
    name: 'Row',
    attrs: {},
    show: false
  },
  {
    type: ComponentTypes.Col,
    key: ComponentTypes.Col,
    icon: 'edit',
    name: 'Col',
    attrs: {},
    show: false
  }
]
// 虚拟组件
export const fictitiousComponents: ILayoutComponent[] = [
  {
    type: ComponentTypes.Group,
    key: ComponentTypes.Group,
    icon: 'edit',
    name: '分组',
    attrs: {},
    show: true
  }
]
// 动画组件
export const TransitionComponents: ILayoutComponent[] = [
  {
    type: ComponentTypes.Transition,
    key: ComponentTypes.Transition,
    icon: 'edit',
    name: '动画容器',
    attrs: {
      // objectId: '',
      relatedListTitle: '',
      usedFields: [],
      usedButtons: []
    },
    show: true
  }
]
// 详情页Tab组件
export const tabDetailsComponents: ILayoutComponent[] = [
  {
    type: ComponentTypes.InfoTabDetails,
    key: ComponentTypes.InfoTabDetails,
    icon: 'edit',
    name: '详情',
    attrs: {},
    show: true
  },
  {
    type: ComponentTypes.InfoTabActivity,
    key: ComponentTypes.InfoTabActivity,
    icon: 'edit',
    name: '活动',
    attrs: {},
    show: true
  },
  {
    type: ComponentTypes.InfoTabRelatedList,
    key: ComponentTypes.InfoTabRelatedList,
    icon: 'edit',
    name: '相关列表',
    attrs: {
      relatedList: []
    },
    show: true
  },
  {
    type: ComponentTypes.InfoTabFile,
    key: ComponentTypes.InfoTabFile,
    icon: 'edit',
    name: '文件',
    attrs: {},
    show: true
  }, {
    type: ComponentTypes.InfoTabFollowUp,
    key: ComponentTypes.InfoTabFollowUp,
    icon: 'edit',
    name: '跟进记录',
    attrs: {},
    show: true
  }

]
// 详情页Tab相关列表组件
export const tabDetailsRelatedListComponents: ILayoutComponent[] = [
  {
    type: ComponentTypes.InfoTabRelatedListItem,
    key: ComponentTypes.InfoTabRelatedListItem,
    icon: 'edit',
    name: '相关列表项',
    attrs: {
      usedButtons: [],
      usedFields: [],
      relatedListTitle: '',
      objectId: '',
      sortDirection: 'ASC',
      sortOrderBy: ''
    },
    show: false
  }
]
// 基础组件
export const basicComponents: ILayoutComponent[] = [
  {
    type: ComponentTypes.FormHeader,
    key: ComponentTypes.FormHeader,
    icon: 'Folder',
    name: '表单标题',
    attrs: {
      usedFields: [],
      usedButtons: []
    },
    show: true
  },
  {
    type: ComponentTypes.InfoTab,
    key: ComponentTypes.InfoTab,
    icon: 'Bankcard',
    name: 'Tab页面',
    attrs: {},
    show: true
  }
]
// 明细组件
export const detailedComponents: ILayoutComponent[] = [
  {
    type: ComponentTypes.Detailed,
    key: ComponentTypes.Detailed,
    icon: 'Bankcard',
    name: '明细',
    show: true,
    draggable: {
      group: DraggableGroupTypes.FormField,
      ghostClass: DraggableClassNames.FormField,
      animation: 200,
      disabled: false
    },
    children: [],
    attrs: {
      actionName: '增加明细'
    }
  }
]

// export const headerComponents: IField[] = [
//   {
//     type: ComponentTypes.FormHeaderButtons,
//     key: ComponentTypes.FormHeaderButtons,
//     icon: 'Folder',
//     name: '表单标题按钮',
//     attrs: {}
//   },
//   {
//     type: ComponentTypes.FormHeaderUsedFields,
//     key: ComponentTypes.FormHeaderUsedFields,
//     icon: 'Folder',
//     name: '表单标题字段',
//     attrs: {}
//   }
// ]

function dynamicConfigRules (
  payload: {
    otherUsedFieldNames: string[],
    otherUsedFieldApiNames: string[]
  }
) {
  const {
    otherUsedFieldApiNames,
    otherUsedFieldNames
  } = payload
  return {
    name: {
      validator: (rule: any, value: any, callback: any) => {
        if (otherUsedFieldNames.includes(value)) {
          callback(new Error('存在相同名称的字段'))
        } else {
          callback()
        }
      }
    },
    apiName: {
      validator: (rule: any, value: any, callback: any) => {
        if (otherUsedFieldApiNames.includes(value)) {
          callback(new Error('存在相同名称的ApiName'))
        } else {
          callback()
        }
      }
    }
  }
}

const basicConfigRules = {
  name: [
    { required: true, message: '请输入字段名称' }
  ],
  apiName: [
    { required: true, message: '请输入API名称' }
  ]
}

// 字段组件
export const fieldComponents: IField[] = [
  {
    id: '',
    type: ComponentTypes.TextField,
    key: ComponentTypes.TextField,
    apiName: '',
    model: '',
    icon: 'text',
    name: '单行文本',
    helpText: '',
    remark: '',
    attrs: {
      maxlength: 50,
      disabled: false,
      required: false
    },
    configRules: {
      ...basicConfigRules,
      attrs: {
        maxlength: [
          { type: 'number', required: true, message: '请输入数字类型的长度' }
        ]
      }
    },
    dynamicConfigRules,
    description: '适用于填写简短的文字，如“姓名”'
  },
  {
    id: '',
    apiName: '',
    model: '',
    type: ComponentTypes.LongTextField,
    key: ComponentTypes.LongTextField,
    icon: 'mtext-copy',
    name: '多行文本',
    helpText: '',
    remark: '',
    attrs: {
      maxlength: 200,
      disabled: false,
      required: false
    },
    configRules: {
      ...basicConfigRules,
      attrs: {
        maxlength: [
          { type: 'number', required: true, message: '请输入数字类型的长度' }
        ]
      }
    },
    dynamicConfigRules,
    description: '用于填写大段的文字，如“备注”、“建议”'
  },
  {
    id: '',
    apiName: '',
    model: '',
    type: ComponentTypes.NumberField,
    key: ComponentTypes.NumberField,
    icon: 'number',
    name: '数字',
    helpText: '',
    remark: '',
    attrs: {
      integerDigit: 8,
      decimalDigit: 2,
      unit: ''
    },
    configRules: {
      ...basicConfigRules,
      attrs: {
        integerDigit: [
          { type: 'number', required: true, message: '请输入数字类型的整数位数' }
        ],
        decimalDigit: [
          { type: 'number', required: true, message: '请输入数字类型的小数位数' }
        ]
      }
    },
    dynamicConfigRules
  },
  {
    id: '',
    apiName: '',
    model: '',
    type: ComponentTypes.DateField,
    key: ComponentTypes.DateField,
    icon: 'date',
    name: '日期',
    helpText: '',
    remark: '',
    attrs: {
      disabled: false,
      required: false
    },
    configRules: {
      ...basicConfigRules
    },
    dynamicConfigRules,
    description: '用于选择特定的日期，比如2088-08-08'
  },
  {
    id: '',
    apiName: '',
    model: '',
    type: ComponentTypes.DateTimeField,
    key: ComponentTypes.DateTimeField,
    icon: 'time',
    name: '日期时间',
    helpText: '',
    remark: '',
    attrs: {
      disabled: false,
      required: false
    },
    configRules: {
      ...basicConfigRules
    },
    dynamicConfigRules,
    description: '用于选择特定的时间，比如2088-08-08 18:08:08'
  },
  {
    id: '',
    apiName: '',
    model: '',
    type: ComponentTypes.PhoneField,
    key: ComponentTypes.PhoneField,
    icon: 'phone',
    name: '电话',
    helpText: '',
    remark: '',
    attrs: {
      disabled: false,
      required: false
    },
    configRules: {
      ...basicConfigRules
    },
    dynamicConfigRules,
    description: '允许用户输入任何电话号码，可直接拨打。'
  },

  {
    id: '',
    type: ComponentTypes.EmailField,
    key: ComponentTypes.EmailField,
    apiName: '',
    model: '',
    icon: 'mail1',
    name: '电子邮件',
    helpText: '',
    remark: '',
    attrs: {
      maxlength: null,
      disabled: false,
      required: false
    },
    configRules: {
      ...basicConfigRules
    },
    dynamicConfigRules
  },
  {
    id: '',
    type: ComponentTypes.WebsiteField,
    key: ComponentTypes.WebsiteField,
    apiName: '',
    model: '',
    icon: 'website',
    name: '网址',
    helpText: '',
    remark: '',
    attrs: {
      maxlength: null,
      disabled: false,
      required: false,
      urlModel: '_self'
    },
    configRules: {
      ...basicConfigRules,
      attrs: {
        maxlength: [
          { type: 'number', required: true, message: '请输入数字类型的长度' }
        ]
      }
    },
    dynamicConfigRules
  },
  {
    id: '',
    type: ComponentTypes.CheckBoxField,
    key: ComponentTypes.CheckBoxField,
    apiName: '',
    model: 1,
    icon: 'checkbox',
    name: '复选框',
    helpText: '',
    remark: '',
    attrs: {
      disabled: false,
      required: false
    },
    configRules: {
      ...basicConfigRules
    },
    dynamicConfigRules
  },
  {
    id: '',
    type: ComponentTypes.LookUpField,
    key: ComponentTypes.LookUpField,
    apiName: '',
    model: '',
    icon: 'searchfor',
    name: '查找',
    helpText: '',
    remark: '',
    attrs: {
      disabled: false,
      required: false,
      lookupConfig: {
        moduleId: '',
        lookupObjectId: '',
        relatedListTitle: '',
        canCreateRelatedObject: true
      }
    },
    configRules: {
      ...basicConfigRules,
      attrs: {
        lookupConfig: {
          lookupObjectId: [
            { required: true, message: '请选择相关项' }
          ],
          relatedListTitle: [
            { required: true, message: '请输入相关列表标签' }
          ]
        }
      }
    },
    dynamicConfigRules
  },
  // {
  //   type: ComponentTypes.LookUpMoreField,
  //   key: ComponentTypes.LookUpMoreField,
  //   apiName: '',
  //   icon: 'edit',
  //   name: '查找多选',
  //   helpText: '',
  //   remark: '',
  //   attrs: {
  //     disabled: false,
  //     required: false,
  //     lookupConfig: {
  //       lookupObjectId: '',
  //       relatedListTitle: '',
  //       canCreateRelatedObject: true
  //     }
  //   }
  // },
  {
    id: '',
    type: ComponentTypes.OptionListField,
    key: ComponentTypes.OptionListField,
    apiName: '',
    model: '',
    icon: 'multipleselectlist',
    name: '选项列表',
    helpText: '',
    remark: '',
    attrs: {
      disabled: false,
      required: false,
      valueCandidates: ''
    },
    configRules: {
      ...basicConfigRules,
      attrs: {
        valueCandidates: [
          { required: true, message: '请输入选项列表值' }
        ]
      }
    },
    dynamicConfigRules
  },
  // {
  //   id: '',
  //   type: ComponentTypes.MoreOptionListField,
  //   key: ComponentTypes.MoreOptionListField,
  //   apiName: '',
  //   model: '',
  //   icon: 'multipleselectlist',
  //   name: '选项列表（多选）',
  //   helpText: '',
  //   remark: '',
  //   attrs: {
  //     disabled: false,
  //     required: false
  //   },
  //   valueCandidates: '',
  //   configRules: {},
  //   dynamicConfigRules
  // },
  {
    id: '',
    type: ComponentTypes.AutoNumberField,
    key: ComponentTypes.AutoNumberField,
    apiName: '',
    model: '',
    icon: 'serialnumber',
    name: '自动编号',
    helpText: '',
    remark: '',
    attrs: {
      disabled: false,
      required: false,
      maxlength: 3
    },
    autoNumberConfig: {
      prefix: '',
      beginNumber: 1
    },
    configRules: {
      ...basicConfigRules,
      attrs: {
        maxlength: [
          { type: 'number', required: true, message: '请输入数字类型的长度' }
        ]
      },
      autoNumberConfig: {
        prefix: [
          {
            required: true,
            message: '请选择编号格式'
          }
        ],
        beginNumber: [
          {
            type: 'number',
            required: true,
            message: '请输入数字类型的起始编号'
          }
        ]
      }
    },
    dynamicConfigRules
  },
  {
    id: '',
    apiName: '',
    model: '',
    type: ComponentTypes.MoneyField,
    key: ComponentTypes.MoneyField,
    // TODO 更换图标
    icon: 'number',
    name: '金额',
    helpText: '',
    remark: '',
    attrs: {
      disabled: false,
      required: false,
      decimalDigit: 8,
      capital: true,
      unit: ''
    },
    configRules: {
      ...basicConfigRules,
      attrs: {
        decimalDigit: [
          { type: 'number', required: true, message: '请输入数字类型的小数位数' }
        ]
      }
    },
    dynamicConfigRules
  },
  {
    id: '',
    apiName: '',
    model: '',
    type: ComponentTypes.ImageField,
    key: ComponentTypes.ImageField,
    // TODO 更换图标
    icon: 'number',
    name: '图片',
    helpText: '',
    remark: '',
    attrs: {
      disabled: false,
      required: false,
      onlyUsedCellPhoneCamera: false,
      watermarks: [],
      limitNumber: 5
    },
    configRules: {
      ...basicConfigRules
    },
    dynamicConfigRules
  },
  {
    id: '',
    apiName: '',
    model: '',
    type: ComponentTypes.LocationField,
    key: ComponentTypes.LocationField,
    // TODO 更换图标
    icon: 'number',
    name: '定位',
    helpText: '',
    remark: '',
    attrs: {},
    configRules: {
      ...basicConfigRules
    },
    dynamicConfigRules
  },
  {
    id: '',
    apiName: '',
    model: '',
    type: ComponentTypes.TagField,
    key: ComponentTypes.TagField,
    // TODO 更换图标
    icon: 'number',
    name: '标签',
    helpText: '',
    remark: '',
    description: '可以给数据添加标签，并支持按照标签搜索',
    attrs: {
      disabled: false,
      required: false
    },
    configRules: {
      ...basicConfigRules
    },
    dynamicConfigRules
  }
]

export const FIELD = 'FIELD'
