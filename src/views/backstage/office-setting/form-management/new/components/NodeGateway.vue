<!--Created by LiuLei on 2019/12/2-->
<template>
  <div class="gateway-node">
    <div
      @click="newCondition"
      class="gateway-node-add">添加条件
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { InodeExclusiveGateway } from '@/views/backstage/office-setting/form-management/types'
import { defaultCondition } from '@/views/backstage/office-setting/form-management/new/utils'

@Component({
  name: 'NodeGateway'
})
export default class NodeGateway extends Vue {
  @Prop({ required: true, type: Object }) readonly node !: InodeExclusiveGateway

  newCondition () {
    this.node.conditions.push(defaultCondition(this.node.conditions.length + 1))
  }
}
</script>

<style lang="scss" scoped>
.gateway-node {
  text-align: center;
  position: relative;
  z-index: 999;

  &-add {
    display: inline-block;
    width: 66px;
    height: 24px;
    line-height: 24px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 1px 10px 0 rgba(48, 48, 48, 0.13);
    border-radius: 4px;
    cursor: pointer;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -13px;
    font-size: 12px;
    color: $dd--info-color;
    user-select: none;
  }
}
</style>
