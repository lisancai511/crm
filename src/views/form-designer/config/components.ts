import LayoutTypes from '@/views/form-designer/config/LayoutTypes'

export interface attrs {
  maxlength: number | string | null
}

export interface field {
  type: string,
  name: string,
  icon: string,
  key: string,
  apiName?: string,
  remark?: string,
  helpText?: string,
  defaultValue?: number | string | null,
  // 整数位数
  integerDigit?: number,
  // 小数位数
  decimalDigit?: number,
  attrs?: attrs
  rules?: [],
  children?: field[],
  isSelect?: boolean,
  show?: boolean,
}

export const layoutComponents: field[] = [
  {
    type: LayoutTypes.Container,
    key: LayoutTypes.Container,
    icon: 'edit',
    name: '外层容器',
    show: false
  },
  {
    type: LayoutTypes.Header,
    key: LayoutTypes.Header,
    icon: 'edit',
    name: '顶栏容器',
    show: false
  },
  {
    type: LayoutTypes.Aside,
    key: LayoutTypes.Aside,
    icon: 'edit',
    name: '侧边栏容器',
    show: false
  },
  {
    type: LayoutTypes.Main,
    key: LayoutTypes.Main,
    icon: 'edit',
    name: '主要区域容器',
    show: false
  },
  {
    type: LayoutTypes.Footer,
    key: LayoutTypes.Footer,
    icon: 'edit',
    name: '底栏容器',
    show: false
  },
  {
    type: LayoutTypes.Row,
    key: LayoutTypes.Row,
    icon: 'edit',
    name: 'Row',
    show: false
  },
  {
    type: LayoutTypes.Col,
    key: LayoutTypes.Col,
    icon: 'edit',
    name: 'Col',
    show: false
  }
]

export const tabDetailsComponents: field[] = [
  {
    type: LayoutTypes.InfoTabDetails,
    key: LayoutTypes.InfoTabDetails,
    icon: 'edit',
    name: '详情',
    show: false
  },
  {
    type: LayoutTypes.InfoTabActivity,
    key: LayoutTypes.InfoTabActivity,
    icon: 'edit',
    name: '活动',
    show: false
  },
  {
    type: LayoutTypes.InfoTabRelatedList,
    key: LayoutTypes.InfoTabRelatedList,
    icon: 'edit',
    name: '相关列表',
    show: false
  },
  {
    type: LayoutTypes.InfoTabFile,
    key: LayoutTypes.InfoTabFile,
    icon: 'edit',
    name: '文件',
    show: false
  }, {
    type: LayoutTypes.InfoTabFollowUp,
    key: LayoutTypes.InfoTabFollowUp,
    icon: 'edit',
    name: '跟进记录',
    show: false
  }

]

export const basicComponents: field[] = [
  {
    type: LayoutTypes.FormHeader,
    key: LayoutTypes.FormHeader,
    icon: 'Folder',
    name: '表单标题'
  },
  {
    type: LayoutTypes.InfoTab,
    key: LayoutTypes.InfoTab,
    icon: 'Bankcard',
    name: 'Tab页面'
  }
]

export const headerComponents: field[] = [
  {
    type: LayoutTypes.FormHeaderButtons,
    key: LayoutTypes.FormHeaderButtons,
    icon: 'Folder',
    name: '表单标题按钮'
  },
  {
    type: LayoutTypes.FormHeaderUsedFields,
    key: LayoutTypes.FormHeaderUsedFields,
    icon: 'Folder',
    name: '表单标题字段'
  }
]

export const fieldComponents: field[] = [
  {
    type: LayoutTypes.TextField,
    key: LayoutTypes.TextField,
    apiName: '',
    icon: 'edit',
    name: '单行文本',
    helpText: '',
    remark: '',
    defaultValue: '',
    attrs: {
      maxlength: null
    }
  },
  {
    type: LayoutTypes.LongTextField,
    key: LayoutTypes.LongTextField,
    icon: 'edit',
    name: '多行文本',
    helpText: '',
    remark: '',
    defaultValue: '',
    attrs: {
      maxlength: null
    }
  },
  {
    type: LayoutTypes.DateField,
    key: LayoutTypes.DateField,
    icon: 'edit',
    name: '日期',
    helpText: '',
    remark: '',
    defaultValue: ''
  },
  {
    type: LayoutTypes.DateTimeField,
    key: LayoutTypes.DateTimeField,
    icon: 'edit',
    name: '日期时间',
    helpText: '',
    remark: '',
    defaultValue: ''
  },
  {
    type: LayoutTypes.PhoneField,
    key: LayoutTypes.PhoneField,
    icon: 'edit',
    name: '电话',
    helpText: '',
    remark: ''
  }
]
