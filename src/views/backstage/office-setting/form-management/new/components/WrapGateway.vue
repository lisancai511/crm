<!--Created by LiuLei on 2019/12/2-->
<template>
  <div class="gateway-wrap">
    <node-gateway :node="node"/>
    <warp-conditions
      @removeGateway="removeGateway"
      v-if="node.conditions"
      :conditions="node.conditions"/>
    <div class="gateway-wrap__padding">
      <button-node-add @addNode="addNode"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { INode, WORKFLOW_TYPES } from '@/views/backstage/office-setting/form-management/types'
import NodeGateway from '@/views/backstage/office-setting/form-management/new/components/NodeGateway.vue'
import WarpConditions from '@/views/backstage/office-setting/form-management/new/components/WarpConditions.vue'
import ButtonNodeAdd from '@/views/backstage/office-setting/form-management/new/components/ButtonNodeAdd.vue'

@Component({
  name: 'WrapGateway',
  components: { ButtonNodeAdd, WarpConditions, NodeGateway }
})
export default class WrapGateway extends Vue {
  @Prop({ required: true, type: Object }) readonly node !: INode

  addNode (type: WORKFLOW_TYPES) {
    this.$emit('addNode', type)
  }

  removeGateway () {
    this.$emit('removeNode')
  }
}
</script>

<style lang="scss" scoped>
.gateway-wrap {
  /*border-top: 2px solid $dd-workflow-arrow;*/
  margin-top: 12px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 2px;
    background-color: $dd-workflow-arrow;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
  }

  &__padding {
    height: 80px;
    position: relative;
    z-index: 999;
    /*border: 1px dashed red;*/
  }
}
</style>
