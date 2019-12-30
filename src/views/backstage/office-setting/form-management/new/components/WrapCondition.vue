<!--Created by LiuLei on 2019/12/2-->
<template>
  <div class="condition-wrap">
    <node-condition
      class="workflow-group-handle-class"
      :condition="condition">
      <slot slot="close" name="close"/>
    </node-condition>
    <div class="condition-wrap__padding">
      <button-node-add @addNode="addNode"/>
    </div>
    <wrap-nodes
      v-if="condition.nodes && condition.nodes.length > 0"
      :nodes="condition.nodes"/>
    <div class="override—line"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import NodeCondition from '@/views/backstage/office-setting/form-management/new/components/NodeCondition.vue'
import { ICondition, WORKFLOW_TYPES } from '@/views/backstage/office-setting/form-management/types'
import ButtonNodeAdd from '@/views/backstage/office-setting/form-management/new/components/ButtonNodeAdd.vue'
import {
  defaultNodeExclusiveGateway,
  defaultNodePeople
} from '@/views/backstage/office-setting/form-management/new/utils'

@Component({
  name: 'WrapCondition',
  components: {
    ButtonNodeAdd,
    WrapNodes: () => import('@/views/backstage/office-setting/form-management/new/components/WrapNodes.vue'),
    NodeCondition
  }
})
export default class WrapCondition extends Vue {
  @Prop({ required: true, type: Object }) readonly condition !: ICondition

  addNode (type: WORKFLOW_TYPES) {
    switch (type) {
      case WORKFLOW_TYPES.APPROVAL:
      case WORKFLOW_TYPES.CC:
        this.condition.nodes.unshift(defaultNodePeople(type))
        break
      case WORKFLOW_TYPES.EXCLUSIVE_GATEWAY:
        this.condition.nodes.unshift(defaultNodeExclusiveGateway())
        break
      default:
    }
  }
}
</script>

<style lang="scss" scoped>
$paddingH: 75px;
.condition-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 24px $paddingH 0;
  border-top: 2px solid $dd-workflow-arrow;
  border-bottom: 2px solid $dd-workflow-arrow;
  background: $dd--background-color-base;
  z-index: 9;

  &.is-first, &.is-last {
    &::before, > .override—line {
      content: '';
      position: absolute;
      width: 50%;
      height: 2px;
      /*left: -($paddingH/2) - 1px;*/
      left: -1px;
      top: 0-2px;
      background-color: $dd--background-color-base;
    }

    > .override—line {
      top: auto;
      bottom: -2px;
    }
  }

  &.is-first {
    /*padding-left: 0;*/
  }

  &.is-last {
    /*padding-right: 0;*/

    &::before, > .override—line {
      /*right: -($paddingH/2)-1px;*/
      right: -1px;
      left: auto;
    }
  }

  &::after {
    content: '';
    position: absolute;
    width: 2px;
    height: 100%;
    background: $dd-workflow-arrow;
    top: 0;
  }

  &.dragging {
    overflow: hidden;
    border-bottom-color: transparent;
    border-top-color: transparent;
    /*padding-left: 75px;*/
    /*padding-right: 75px;*/
  }

  /*& + .condition-wrap {*/
  /*  margin-left: 150px;*/
  /*}*/

  &__padding {
    height: 80px;
    position: relative;
    z-index: 999;
  }
}
</style>
