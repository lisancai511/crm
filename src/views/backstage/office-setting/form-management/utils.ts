/**
 * Created by LiuLei on 2019/12/16
 */
import {
  CONDITION_RANGE_OPERATOR_TYPES,
  CONDITION_TYPES, INodePeople,
  IWorkflow,
  WORKFLOW_TYPES
} from '@/views/backstage/office-setting/form-management/types'
import _ from 'lodash'
import { IField } from '@/views/designer/config/components'
import { arrToMap } from '@/utils'
import { getNodes } from '@/views/backstage/office-setting/form-management/new/utils'

export function localWorkflowToServer (workflow: IWorkflow): IWorkflow {
  const cWorkflow = _.cloneDeep(workflow)

  function inner (workflow: IWorkflow) {
    workflow.forEach((node) => {
      if (node.type === WORKFLOW_TYPES.EXCLUSIVE_GATEWAY) {
        node.conditions.forEach((condition) => {
          condition.config.forEach((cfg) => {
            if (cfg.type === CONDITION_TYPES.RANGE) {
              if (cfg.values.length === 2) {
                // @ts-ignore
                cfg.values[0].operator = cfg.values[0].operator === CONDITION_RANGE_OPERATOR_TYPES.LT
                  ? CONDITION_RANGE_OPERATOR_TYPES.GT : CONDITION_RANGE_OPERATOR_TYPES.GE
              }
            }
          })
          if (condition.nodes) {
            inner(condition.nodes)
          }
        })
      }
    })
  }

  inner(cWorkflow)
  return cWorkflow
}

export function serverWorkflowToLocal (workflow: IWorkflow): IWorkflow {
  const cWorkflow = _.cloneDeep(workflow)

  function inner (workflow: IWorkflow) {
    workflow.forEach((node) => {
      if (node.type === WORKFLOW_TYPES.EXCLUSIVE_GATEWAY) {
        node.conditions.forEach((condition) => {
          condition.config.forEach((cfg) => {
            if (cfg.type === CONDITION_TYPES.RANGE) {
              if (cfg.values.length === 2) {
                // @ts-ignore
                cfg.values[0].operator = cfg.values[0].operator === CONDITION_RANGE_OPERATOR_TYPES.GT
                  ? CONDITION_RANGE_OPERATOR_TYPES.LT : CONDITION_RANGE_OPERATOR_TYPES.LE
              }
            }
          })
          if (condition.nodes) {
            inner(condition.nodes)
          }
        })
      }
    })
  }

  inner(cWorkflow)
  return cWorkflow
}

export function removeDeletedConditions (payload: {
  workflow: IWorkflow,
  fields: IField[]
}): IWorkflow {
  const { workflow, fields } = payload
  const fieldByApiName = arrToMap(fields, 'apiName')
  const cWorkflow = _.cloneDeep(workflow)

  function inner (workflow: IWorkflow) {
    workflow.forEach((node) => {
      if (node.type === WORKFLOW_TYPES.EXCLUSIVE_GATEWAY) {
        node.conditions.forEach((condition) => {
          condition.config = condition.config.filter((cfg) => {
            if (cfg.type === CONDITION_TYPES.CREATOR) {
              return true
            }
            return fieldByApiName[cfg.fieldApiName]
          })
          if (condition.nodes) {
            inner(condition.nodes)
          }
        })
      }
    })
  }

  inner(cWorkflow)
  return cWorkflow
}

export function getPermissionNodes (workflow: IWorkflow): INodePeople[] {
  return getNodes(
    workflow, [
      WORKFLOW_TYPES.START,
      WORKFLOW_TYPES.APPROVAL
    ]) as INodePeople[]
}
