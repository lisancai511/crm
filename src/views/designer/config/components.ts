import ComponentTypes from '@/views/designer/config/ComponentTypes'

export interface IButton {
  key: string,
  name: string
}

export interface IAttrs {
  maxlength?: number | string | null
  value?: any
  disabled?: boolean
  required?: boolean
  usedButtons?: IButton[]
  usedFields?: IButton[]
  direction?: string
  height?: string
  title?: string
  subTitle?: string
  isDefaultFieldContainer?: boolean
}

export interface IDraggableOptions {
  group: string,
  ghostClass?: string,
  animation?: number,
  disabled?: boolean
}

export interface IField {
  id?: number,
  type: string,
  name: string,
  icon?: string,
  key?: string,
  apiName?: string,
  remark?: string,
  helpText?: string,
  defaultValue?: number | string | null,
  // 整数位数
  integerDigit?: number,
  // 小数位数
  decimalDigit?: number,
  attrs: IAttrs
  draggable?: IDraggableOptions,
  rules?: [],
  children?: IField[],
  isSelect?: boolean,
  show?: boolean,
  valueCandidates?: any,
}

export const layoutComponents: IField[] = [
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

export const fictitiousComponents: IField[] = [
  {
    type: ComponentTypes.Group,
    key: ComponentTypes.Group,
    icon: 'edit',
    name: '分组',
    attrs: {},
    show: true
  }
]

export const tabDetailsComponents: IField[] = [
  {
    type: ComponentTypes.InfoTabDetails,
    key: ComponentTypes.InfoTabDetails,
    icon: 'edit',
    name: '详情',
    attrs: {},
    show: false
  },
  {
    type: ComponentTypes.InfoTabActivity,
    key: ComponentTypes.InfoTabActivity,
    icon: 'edit',
    name: '活动',
    attrs: {},
    show: false
  },
  {
    type: ComponentTypes.InfoTabRelatedList,
    key: ComponentTypes.InfoTabRelatedList,
    icon: 'edit',
    name: '相关列表',
    attrs: {},
    show: false
  },
  {
    type: ComponentTypes.InfoTabFile,
    key: ComponentTypes.InfoTabFile,
    icon: 'edit',
    name: '文件',
    attrs: {},
    show: false
  }, {
    type: ComponentTypes.InfoTabFollowUp,
    key: ComponentTypes.InfoTabFollowUp,
    icon: 'edit',
    name: '跟进记录',
    attrs: {},
    show: false
  }

]

export const basicComponents: IField[] = [
  {
    type: ComponentTypes.FormHeader,
    key: ComponentTypes.FormHeader,
    icon: 'Folder',
    name: '表单标题',
    attrs: {}
  },
  {
    type: ComponentTypes.InfoTab,
    key: ComponentTypes.InfoTab,
    icon: 'Bankcard',
    name: 'Tab页面',
    attrs: {}
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

export const fieldComponents: IField[] = [
  {
    type: ComponentTypes.TextField,
    key: ComponentTypes.TextField,
    apiName: '',
    icon: 'edit',
    name: '单行文本',
    helpText: '',
    remark: '',
    defaultValue: '',
    attrs: {
      maxlength: null,
      disabled: false,
      required: false
    }
  },
  {
    type: ComponentTypes.LongTextField,
    key: ComponentTypes.LongTextField,
    icon: 'edit',
    name: '多行文本',
    helpText: '',
    remark: '',
    defaultValue: '',
    attrs: {
      maxlength: null,
      disabled: false,
      required: false
    }
  },
  {
    type: ComponentTypes.NumberField,
    key: ComponentTypes.NumberField,
    icon: 'edit',
    name: '数字',
    helpText: '',
    remark: '',
    defaultValue: '',
    attrs: {
      maxlength: null
    }
  },
  {
    type: ComponentTypes.DateField,
    key: ComponentTypes.DateField,
    icon: 'edit',
    name: '日期',
    helpText: '',
    remark: '',
    defaultValue: '',
    attrs: {
      disabled: false,
      required: false
    }
  },
  {
    type: ComponentTypes.DateTimeField,
    key: ComponentTypes.DateTimeField,
    icon: 'edit',
    name: '日期时间',
    helpText: '',
    remark: '',
    defaultValue: '',
    attrs: {
      disabled: false,
      required: false
    }
  },
  {
    type: ComponentTypes.PhoneField,
    key: ComponentTypes.PhoneField,
    icon: 'edit',
    name: '电话',
    helpText: '',
    remark: '',
    attrs: {
      disabled: false,
      required: false
    }
  },

  {
    type: ComponentTypes.EmailField,
    key: ComponentTypes.EmailField,
    apiName: '',
    icon: 'edit',
    name: '电子邮件',
    helpText: '',
    remark: '',
    defaultValue: '',
    attrs: {
      maxlength: null,
      disabled: false,
      required: false
    }
  },
  {
    type: ComponentTypes.WebsiteField,
    key: ComponentTypes.WebsiteField,
    apiName: '',
    icon: 'edit',
    name: '网址',
    helpText: '',
    remark: '',
    defaultValue: '',
    attrs: {
      maxlength: null,
      disabled: false,
      required: false
    }
  },
  {
    type: ComponentTypes.CheckBoxField,
    key: ComponentTypes.CheckBoxField,
    apiName: '',
    icon: 'edit',
    name: '复选框',
    helpText: '',
    remark: '',
    defaultValue: '',
    attrs: {
      disabled: false,
      required: false
    }
  },
  {
    type: ComponentTypes.LookUpField,
    key: ComponentTypes.LookUpField,
    apiName: '',
    icon: 'edit',
    name: '查找',
    helpText: '',
    remark: '',
    defaultValue: '',
    attrs: {
      disabled: false,
      required: false
    }
  },
  {
    type: ComponentTypes.LookUpMoreField,
    key: ComponentTypes.LookUpMoreField,
    apiName: '',
    icon: 'edit',
    name: '查找多选',
    helpText: '',
    remark: '',
    defaultValue: '',
    attrs: {
      disabled: false,
      required: false
    }
  },
  {
    type: ComponentTypes.OptionListField,
    key: ComponentTypes.OptionListField,
    apiName: '',
    icon: 'edit',
    name: '选项列表',
    helpText: '',
    remark: '',
    defaultValue: '',
    attrs: {
      disabled: false,
      required: false
    },
    valueCandidates: []
  },
  {
    type: ComponentTypes.MoreOptionListField,
    key: ComponentTypes.MoreOptionListField,
    apiName: '',
    icon: 'edit',
    name: '选项列表（多选）',
    helpText: '',
    remark: '',
    defaultValue: '',
    attrs: {
      disabled: false,
      required: false
    },
    valueCandidates: []
  },
  {
    type: ComponentTypes.AutoNumberField,
    key: ComponentTypes.AutoNumberField,
    apiName: '',
    icon: 'edit',
    name: '自动编号',
    helpText: '',
    remark: '',
    defaultValue: '',
    attrs: {
      disabled: false,
      required: false
    }
  }
]
