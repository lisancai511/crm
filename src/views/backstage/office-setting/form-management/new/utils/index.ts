/**
 * Created by LiuLei on 2019/12/2
 */
import generate from 'nanoid/generate'
import {
  APPROVAL_TYPES,
  ICondition,
  INode,
  InodeExclusiveGateway,
  INodePeople,
  INodePermission,
  WORKFLOW_TYPES
} from '@/views/backstage/office-setting/form-management/types'
import { IField } from '@/views/designer/config/components'
import { arrToMap } from '@/utils'

const API_NAME_STRING = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const API_NAME_LENGTH = 12

function generateNodeId () {
  return generate(API_NAME_STRING, API_NAME_LENGTH)
}

// export const WORKFLOW_TYPES = {
//   // 起始节点
//   START: 'Start',
//   // 审批节点
//   APPROVAL: 'Approval',
//   // 条件网关节点
//   EXCLUSIVE_GATEWAY: 'ExclusiveGateway',
//   // 条件节点
//   CONDITION: 'Condition',
//   // 审批人节点
//   CC: 'CC'
// }

const DEFAULT_WORKFLOW_NODE_NAMES = {
  [WORKFLOW_TYPES.START]: '发起人',
  [WORKFLOW_TYPES.APPROVAL]: '审批人',
  [WORKFLOW_TYPES.CC]: '抄送人'
}

export function defaultCondition (index: number, nodes?: INode[]): ICondition {
  return {
    id: generateNodeId(),
    type: WORKFLOW_TYPES.CONDITION,
    name: `条件${index}`,
    config: [],
    nodes: nodes || []
  }
}

export function defaultNodePeople (type: WORKFLOW_TYPES.START | WORKFLOW_TYPES.APPROVAL | WORKFLOW_TYPES.CC): INodePeople {
  return {
    id: generateNodeId(),
    type: type,
    name: DEFAULT_WORKFLOW_NODE_NAMES[type],
    config: {
      type: type === WORKFLOW_TYPES.START ? APPROVAL_TYPES.DESIGNATE_USERS : APPROVAL_TYPES.PROMOTER_SELF,
      targets: []
    },
    permissions: []
  }
}

export function defaultNodeExclusiveGateway (spliceNode?: INode[]): InodeExclusiveGateway {
  return {
    id: generateNodeId(),
    type: WORKFLOW_TYPES.EXCLUSIVE_GATEWAY,
    name: '',
    conditions: [
      defaultCondition(1, spliceNode),
      defaultCondition(2)
    ]
  }
}

export function defaultWorkflow () {
  return [
    defaultNodePeople(WORKFLOW_TYPES.START),
    // defaultNodeExclusiveGateway(),
    defaultNodePeople(WORKFLOW_TYPES.APPROVAL),
    defaultNodePeople(WORKFLOW_TYPES.CC)
  ]
}

/**
 * 获取流程图内全部节点
 * @param workflow
 * @param [types]
 */
export function getNodes (workflow: INode[], types?: WORKFLOW_TYPES[]): INode[] {
  const nodes: INode[] = []

  function recursion (workflow: INode[]) {
    workflow.forEach((node: INode) => {
      if (!types || types.includes(node.type)) {
        nodes.push(node)
      }
      if (node.type === WORKFLOW_TYPES.EXCLUSIVE_GATEWAY) {
        node.conditions.forEach((condition: ICondition) => {
          recursion(condition.nodes)
        })
      }
    })
  }

  recursion(workflow)
  return nodes
}

/**
 * 获得流程图内全部条件
 * @param workflow
 */
export function getConditions (workflow: INode[]): ICondition[] {
  const conditions: ICondition[] = []

  function recursion (workflow: INode[]) {
    workflow.forEach((node: INode) => {
      if (node.type === WORKFLOW_TYPES.EXCLUSIVE_GATEWAY) {
        conditions.push(...node.conditions)
        node.conditions.forEach((condition: ICondition) => {
          recursion(condition.nodes)
        })
      }
    })
  }

  recursion(workflow)
  return conditions
}

export function defaultNodePermission (apiName: string): INodePermission {
  return {
    fieldApiName: apiName,
    readonly: true,
    hidden: false,
    editable: false
  }
}

export function handleNodePermissions (
  nodes: INodePeople[],
  fields: IField[]
) {
  nodes.forEach((node: INodePeople) => {
    const permissionByApiName = arrToMap(node.permissions, 'fieldApiName')
    node.permissions = fields.map((field: IField): INodePermission => ({
      fieldApiName: field.apiName,
      ...(permissionByApiName[field.apiName] || defaultNodePermission(field.apiName))
    }))
  })
}
