/**
 * Created by LiuLei on 2019/12/2
 */
import nanoid from 'nanoid'
import { ICondition, WORKFLOW_TYPES } from '@/views/backstage/office-setting/form-management/types'

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

export function defaultCondition (index: number): ICondition {
  return {
    id: nanoid(),
    type: WORKFLOW_TYPES.CONDITION,
    name: `条件${index}`,
    config: [],
    nodes: []
  }
}
