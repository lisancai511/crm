<!--Created by LiuLei on 2019/11/28-->
<template>
  <div
    @click.stop="handleSelect"
    class="card-approval"
    :class="[`card-approval--${node.type}`,{'is-active':isActive}]">
    <div class="card-approval__header card-approval__header">
      {{node.name || defaultNodeNames[node.type]}}
    </div>
    <div class="card-approval__body">
      <div class="card-approval__main">
        <template v-if="WORKFLOW_TYPES.START === node.type">
          <template v-if="node.config.targets.length > 0">
            {{node.config.targets.map(target => (userById[target.id] || departmentById[target.id] || {}).name).join(',')}}
          </template>
          <template v-else>
            <span class="card-approval__tips">请选择发起人</span>
          </template>
        </template>
        <template v-if="WORKFLOW_TYPES.APPROVAL === node.type">
          <template v-if="APPROVAL_TYPES.PROMOTER_SELF === (node.config || {}).type">
            {{APPROVAL_MAPS[APPROVAL_TYPES.PROMOTER_SELF].name}}
          </template>
          <template v-else-if="APPROVAL_TYPES.PROMOTER_CHOICE === (node.config || {}).type">
            {{APPROVAL_MAPS[APPROVAL_TYPES.PROMOTER_CHOICE].name}}
          </template>
          <template v-else-if="APPROVAL_TYPES.DESIGNATE_USERS === (node.config || {}).type">
            <span v-if="node.config.targets.length === 0" class="card-approval__tips">请指定成员</span>
            <span v-else-if="node.config.targets.length === 1">
              {{(userById[node.config.targets[0].id] || {}).name}}
            </span>
            <span v-else>
              {{`${node.config.targets.length}人${APPROVAL_METHOD_MAP[node.config.approvalType].name}`}}
            </span>
          </template>
          <template v-else-if="APPROVAL_TYPES.ROLE === (node.config || {}).type">
            <span
              v-if="node.config.targets.length === 0 || (node.config.targets.length === 1 && !node.config.targets[0].id)"
              class="card-approval__tips">请选择角色</span>
            <span v-else>
              {{(roleById[node.config.targets[0].id] || {}).name  + ` ${APPROVAL_METHOD_MAP[node.config.approvalType].name}`}}
            </span>
          </template>
          <template v-else-if="APPROVAL_TYPES.MANAGER === (node.config || {}).type">
            <span
              v-if="node.config.targets.length === 0 || (node.config.targets.length === 1 && !node.config.targets[0].id)"
              class="card-approval__tips">请选择主管</span>
            <span v-else>
              第{{node.config.targets[0].id}}级主管{{`${APPROVAL_METHOD_MAP[node.config.approvalType].name}`}}
            </span>
          </template>
        </template>
        <template v-if="WORKFLOW_TYPES.CC === node.type">
          <template v-if="node.config.targets.length > 0">
            {{node.config.targets.map(target => (userById[target.id] || {}).name).join(',')}}
          </template>
          <template v-else>
            <span class="card-approval__tips">请选择抄送人</span>
          </template>
        </template>
      </div>
      <div class="card-approval__icon-wrap">
        <dd-icon class="card-approval__icon" name="Arrow"/>
      </div>
    </div>
    <span
      v-if="WORKFLOW_TYPES.START !== node.type"
      class="button__close--wrap">
      <slot name="close"/>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject } from 'vue-property-decorator'
import {
  APPROVAL_LIST,
  APPROVAL_METHOD_LIST,
  APPROVAL_TYPES,
  INode,
  WORKFLOW_TYPES
} from '@/views/backstage/office-setting/form-management/types'
import { arrToMap } from '@/utils'

@Component({
  name: 'NodeApproval'
})
export default class NodeApproval extends Vue {
  @Prop({ required: true, type: Object }) readonly node !: INode
  @Inject() readonly workflowGlobal!: {
    currentNode: INode,
    users: any[],
    departments: any[],
    roles: any[]
  }

  get APPROVAL_METHOD_MAP () {
    return arrToMap(APPROVAL_METHOD_LIST, 'type')
  }

  get WORKFLOW_TYPES () {
    return WORKFLOW_TYPES
  }

  get APPROVAL_TYPES () {
    return APPROVAL_TYPES
  }

  get APPROVAL_MAPS () {
    return arrToMap(APPROVAL_LIST, 'type')
  }

  get defaultNodeNames () {
    return {
      [WORKFLOW_TYPES.START]: '发起人',
      [WORKFLOW_TYPES.APPROVAL]: '审批人',
      [WORKFLOW_TYPES.CC]: '抄送人'
    }
  }

  get isActive () {
    return this.workflowGlobal.currentNode && this.workflowGlobal.currentNode.id === this.node.id
  }

  get userById () {
    return arrToMap(this.workflowGlobal.users, 'id')
  }

  get departmentById () {
    return arrToMap(this.workflowGlobal.departments, 'id')
  }

  get roleById () {
    return arrToMap(this.workflowGlobal.roles, 'id')
  }

  handleSelect () {
    this.$bus.$emit('form/management/workflow/selectNode', this.node)
  }
}
</script>

<style lang="scss" scoped>
.card-approval {
  @import "../styles/_var.scss";
  overflow: hidden;
  width: 222px;
  height: 80px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 1px 10px 0 rgba(48, 48, 48, 0.13);
  border-radius: 4px;
  cursor: pointer;
  position: relative;

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
    height: 25px;
    font-size: 12px;
    line-height: 25px;
    color: #fff;
    padding: 0 15px;
    text-align: left;
  }

  @each $colorKey in map_keys($colors) {
    $parent: &;
    &--#{$colorKey} {
      #{$parent}__header {
        background-color: map_get($colors, $colorKey);
      }

      &.is-border, &:hover, &.is-active {
        &::after {
          border: 1px solid map_get($colors, $colorKey);
          box-shadow: 0 0 6px 0 map_get($colors, $colorKey);
        }
      }
    }
  }

  &__body {
    line-height: 55px;
    padding: 0 15px;
    display: flex;
    align-items: center;
  }

  &__main {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
  }

  &__icon {
    &-wrap {
      height: 100%;
      color: #8A96A0;
    }
  }

  &__tips {
    color: $dd--color-text-placeholder;
  }

  .button__close--wrap {
    position: absolute;
    top: -7px;
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
