/**
 * Created by LiuLei on 2019/12/2
 */

export enum WORKFLOW_TYPES {
  // 起始节点
  START = 'Start',
  // 审批节点
  APPROVAL = 'Approval',
  // 条件网关节点
  EXCLUSIVE_GATEWAY = 'ExclusiveGateway',
  // 条件节点
  CONDITION = 'Condition',
  // 审批人节点
  CC = 'CC'
}

export enum APPROVAL_TYPES {
  // 发起人自选
  PROMOTER_CHOICE = 'PromoterChoice',
  // 发起人自己
  PROMOTER_SELF = 'PromoterSelf',
  // 指定成员
  DESIGNATE_USERS = 'DesignateUsers',
  //  角色
  ROLE = 'Role',
  //  主管
  MANAGER = 'Manager'
}

export enum APPROVAL_METHOD_TYPES {
  // 依次
  ORDER,
  // 会签
  AND,
  // 或签
  OR
}

export const APPROVAL_METHOD_LIST = [
  {
    type: APPROVAL_METHOD_TYPES.ORDER,
    name: '依次审批'
  },
  {
    type: APPROVAL_METHOD_TYPES.AND,
    name: '会签（须所有审批人同意）'
  },
  {
    type: APPROVAL_METHOD_TYPES.OR,
    name: '或签（一名审批人同意或拒绝即可）'
  }
]

export const APPROVAL_LIST: {
  type: APPROVAL_TYPES,
  name: string
}[] = [
  {
    type: APPROVAL_TYPES.PROMOTER_CHOICE,
    name: '发起人自选'
  },
  {
    type: APPROVAL_TYPES.PROMOTER_SELF,
    name: '发起人自己'
  },
  {
    type: APPROVAL_TYPES.DESIGNATE_USERS,
    name: '指定成员'
  },
  {
    type: APPROVAL_TYPES.ROLE,
    name: '角色'
  },
  {
    type: APPROVAL_TYPES.MANAGER,
    name: '主管'
  }
]

export enum PERMISSION_TYPES {
  READONLY = 'readonly',
  HIDDEN = 'hidden',
  EDITABLE = 'editable'
}

export const PERMISSION_LIST: {
  type: PERMISSION_TYPES,
  name: string
}[] = [
  {
    type: PERMISSION_TYPES.EDITABLE,
    name: '可编辑'
  },
  {
    type: PERMISSION_TYPES.READONLY,
    name: '只读'
  },
  {
    type: PERMISSION_TYPES.HIDDEN,
    name: '隐藏'
  }
]

export enum APPROVAL_TARGET_TYPES {
  // 用户
  USER = 'User',
  // 组织
  ORG = 'Org',
  // 角色
  ROLE = 'Role',
  // 主管
  MANAGER = 'Manager'
}

// export enum WORKFLOW_ADD_TYPES {
//   // 审批节点
//   APPROVAL = WORKFLOW_TYPES.APPROVAL,
//   // 条件网关节点
//   EXCLUSIVE_GATEWAY = WORKFLOW_TYPES.EXCLUSIVE_GATEWAY,
//   // 审批人节点
//   CC = WORKFLOW_TYPES.CC,
// }

export interface INodePermission {
  readonly: boolean
  hidden: boolean
  editable: boolean
  fieldApiName: string
}

export enum PROMOTER_CHOICE_TYPES {
  ONE = 'One',
  MULTI = 'Multi'
}

export const PROMOTER_CHOICE_LIST = [
  {
    type: PROMOTER_CHOICE_TYPES.ONE,
    name: '自选一个人'
  },
  {
    type: PROMOTER_CHOICE_TYPES.MULTI,
    name: '自选多个人'
  }
]

export enum PROMOTER_CHOICE_RANGE_TYPES {
  ALL = 'All',
  USER = 'User',
  ROLE = 'Role'
}

export const PROMOTER_CHOICE_RANGE_LIST = [
  {
    type: PROMOTER_CHOICE_RANGE_TYPES.ALL,
    name: '全公司'
  },
  {
    type: PROMOTER_CHOICE_RANGE_TYPES.USER,
    name: '指定成员'
  },
  {
    type: PROMOTER_CHOICE_RANGE_TYPES.ROLE,
    name: '指定角色'
  }
]

export interface INodePeopleConfig {
  type: APPROVAL_TYPES,
  targets: {
    id: string | number,
    type: APPROVAL_TARGET_TYPES
  }[],
  _targets?: any,
  approvalType?: APPROVAL_METHOD_TYPES,
  superManagerReplace?: boolean
  choiceType?: PROMOTER_CHOICE_TYPES
  choiceRange?: PROMOTER_CHOICE_RANGE_TYPES
  _choiceRange?: PROMOTER_CHOICE_RANGE_TYPES
}

export interface INodePeople {
  id: string,
  type: WORKFLOW_TYPES.START | WORKFLOW_TYPES.APPROVAL | WORKFLOW_TYPES.CC,
  name: string,
  config: INodePeopleConfig,
  permissions: INodePermission[]
}

export interface InodeExclusiveGateway {
  id: string,
  type: WORKFLOW_TYPES.EXCLUSIVE_GATEWAY,
  name: string,
  conditions: ICondition[]
}

export type INode = INodePeople | InodeExclusiveGateway

export interface IConditionConfig {
  values: { value: string, operator: CONDITION_RANGE_OPERATOR_TYPES }[] | { id: string, type: APPROVAL_TARGET_TYPES | APPROVAL_TYPES }[],
  fieldApiName: string,
  type: CONDITION_TYPES
}

export interface ICondition {
  id: string,
  type: WORKFLOW_TYPES.CONDITION,
  name: string,
  config: IConditionConfig[],
  nodes: INode[]
}

export enum CONDITION_TYPES {
  CREATOR = 'Creator',
  CHOICE = 'Choice',
  RANGE = 'Range'
}

export enum CONDITION_RANGE_OPERATOR_TYPES {
  GT = '>',
  GE = '>=',
  EQ = '=',
  LT = '<',
  LE = '<=',
  BETWEEN = 'BETWEEN'
}

export const CONDITION_RANGE_OPERATOR_LIST: {
  operator: CONDITION_RANGE_OPERATOR_TYPES,
  name: string
}[] = [
  {
    operator: CONDITION_RANGE_OPERATOR_TYPES.GT,
    name: '大于'
  },
  {
    operator: CONDITION_RANGE_OPERATOR_TYPES.GE,
    name: '大于等于'
  },
  {
    operator: CONDITION_RANGE_OPERATOR_TYPES.EQ,
    name: '等于'
  },
  {
    operator: CONDITION_RANGE_OPERATOR_TYPES.LT,
    name: '小于'
  },
  {
    operator: CONDITION_RANGE_OPERATOR_TYPES.LE,
    name: '小于等于'
  },
  {
    operator: CONDITION_RANGE_OPERATOR_TYPES.BETWEEN,
    name: '介于（两个数之间）'
  }
]

export enum FORM_ACTION_TYPES {
  EDIT,
  NEW
}

export interface IForm {
  id: string,
  name: string,
  description: string,
  enable: boolean,
  iconUrl: string,
  standard: boolean
  categoryId: string,
  fieldsDefine: any[],
  uiDefine: any
}

export type IWorkflow = INode[]
