<!--Created by LiuLei on 2019/12/2-->
<template>
  <div class="node-wrap" :class="[`node-wrap--${node.type}`]">
    <template>
      <template v-if="node.type === WORKFLOW_TYPES.START">
        <node-approval :node="node">
          <slot slot="close" name="close"/>
        </node-approval>
      </template>
      <template v-else-if="node.type === WORKFLOW_TYPES.APPROVAL">
        <node-approval :node="node">
          <slot slot="close" name="close"/>
        </node-approval>
      </template>
      <template v-else-if="node.type === WORKFLOW_TYPES.CC">
        <node-approval :node="node">
          <slot slot="close" name="close"/>
        </node-approval>
      </template>
    </template>
    <div class="node-wrap__padding">
      <button-node-add @addNode="addNode"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { INode, WORKFLOW_TYPES } from '@/views/backstage/office-setting/form-management/types'
import NodeApproval from '@/views/backstage/office-setting/form-management/new/components/NodeApproval.vue'
import NodeGateway from '@/views/backstage/office-setting/form-management/new/components/NodeGateway.vue'
import ButtonNodeAdd from '@/views/backstage/office-setting/form-management/new/components/ButtonNodeAdd.vue'

@Component({
  name: 'WrapNode',
  components: { ButtonNodeAdd, NodeGateway, NodeApproval }
})
export default class WrapNode extends Vue {
  @Prop({ required: true, type: Object }) readonly node !: INode

  get WORKFLOW_TYPES () {
    return WORKFLOW_TYPES
  }

  addNode (type: WORKFLOW_TYPES) {
    this.$emit('addNode', type)
  }
}
</script>

<style lang="scss" scoped>
$paddingHeight: 80px;
.node-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 2px;
    height: $paddingHeight;
    background: $dd-workflow-arrow;
    bottom: 0;
  }

  &::before {
    content: "";
    position: absolute;
    top: -12px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    width: 0;
    height: 4px;
    border-style: solid;
    border-width: 8px 6px 4px;
    border-color: $dd-workflow-arrow transparent transparent;
    background: $dd--background-color-base;
  }

  &--Start {
    &::before {
      display: none;
    }
  }

  &__padding {
    height: $paddingHeight;
    position: relative;
    z-index: 999;
  }
}
</style>
