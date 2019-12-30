<!--Created by LiuLei on 2019/11/28-->
<template>
  <div
    @click.stop="handleSelect"
    :class="{'is-active':isActive}"
    class="card-condition">
    <div class="card-condition__header">
      <span class="card-condition__title">{{condition.name}}</span>
    </div>
    <div class="card-condition__body">
      <div class="card-condition__main">
        {{stringConditions || '请设置条件'}}
      </div>
    </div>
    <span class="button__close--wrap">
      <slot name="close"/>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject } from 'vue-property-decorator'
import {
  APPROVAL_TARGET_TYPES,
  CONDITION_TYPES,
  ICondition,
  INode
} from '@/views/backstage/office-setting/form-management/types'
import { arrToMap } from '@/utils'

@Component({
  name: 'NodeCondition'
})
export default class NodeCondition extends Vue {
  @Prop({ required: true, type: Object }) readonly condition !: ICondition
  @Inject() readonly workflowGlobal!: {
    currentNode: null | ICondition | INode
    users: any[],
    roles: any[],
    departments: any[],
    fields: any[]
  }

  handleSelect () {
    this.$bus.$emit('form/management/workflow/selectNode', this.condition)
  }

  // get CONDITION_RANGE_OPERATOR_MAP () {
  //   return arrToMap(CONDITION_RANGE_OPERATOR_LIST, 'operator')
  // }

  get userById () {
    return arrToMap(this.workflowGlobal.users, 'id')
  }

  get roleById () {
    return arrToMap(this.workflowGlobal.roles, 'id')
  }

  get departmentById () {
    return arrToMap(this.workflowGlobal.departments, 'id')
  }

  get fieldByApiName () {
    return arrToMap(this.workflowGlobal.fields, 'apiName')
  }

  get isActive () {
    return this.workflowGlobal.currentNode && this.workflowGlobal.currentNode.id === this.condition.id
  }

  get stringConditions (): string {
    const { config } = this.condition
    const stringConditionArr = config.map((item: any) => {
      switch (item.type) {
        case CONDITION_TYPES.CREATOR:
          return '发起人属于：' +
            item.values.map((value: any) => {
              if (value.type === APPROVAL_TARGET_TYPES.USER) {
                return this.userById[value.id]?.name
              } else if (value.type === APPROVAL_TARGET_TYPES.ORG) {
                return this.departmentById[value.id]?.name
              } else if (value.type === APPROVAL_TARGET_TYPES.ROLE) {
                return this.roleById[value.id]?.name
              }
              return ''
            }).join('或')
        case CONDITION_TYPES.RANGE: {
          const fieldName = this.fieldByApiName[item.fieldApiName]?.name
          if (item.values.length === 1) {
            return `${fieldName} ${item.values[0].operator} ${item.values[0].value}`
          } else if (item.values.length === 2) {
            return `${item.values[0].value} ${item.values[0].operator} ${fieldName} ${item.values[1].operator} ${item.values[1].value}`
          }
          return ''
        }
        case CONDITION_TYPES.CHOICE: {
          const field = this.fieldByApiName[item.fieldApiName]
          return `${field.name}属于：${item.values.join('或')}`
        }
        default:
      }
    })
    return stringConditionArr.join(' 并且 ')
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/_var.scss";

.card-condition {
  width: 222px;
  min-height: 80px;
  max-height: 120px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 1px 10px 0 rgba(48, 48, 48, 0.13);
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  z-index: 999;

  &.is-border, &:hover, &.is-active {
    &::after {
      border: 1px solid #3296fa;
      box-shadow: 0 0 6px 0 rgba(50, 150, 250, .3);
    }
  }

  &::after {
    pointer-events: none;
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    border-radius: 4px;
  }

  &__header {
    font-size: 12px;
    padding: 10px 15px;
    text-align: left;
  }

  &__title {
    color: $color-condition;
  }

  &__body {
    padding: 5px 15px 15px;
    line-height: 1.4;
  }

  &__main {
    text-align: justify;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .button__close--wrap {
    position: absolute;
    top: -5px;
    right: 10px;
    display: none;
  }

  &:hover {
    .button__close--wrap {
      display: inline-block;
    }
  }
}
</style>
