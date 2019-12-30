<!--Created by LiuLei on 2019/12/2-->
<template>
  <div class="nodes-wrap">
    <template v-for="(node,index) in nodes">
      <template v-if="node.type === WORKFLOW_TYPES.EXCLUSIVE_GATEWAY">
        <wrap-gateway
          @removeNode="removeNode(index)"
          @addNode="addNode($event,index)"
          :key="node.id" :node="node"/>
      </template>
      <template v-else>
        <wrap-node
          @addNode="addNode($event,index)"
          :key="node.id" :node="node">
          <el-button
            slot="close"
            @click.stop="removeNode(index)"
            class="button__close"
            type="text">
            <i class="el-icon-close"/>
          </el-button>
        </wrap-node>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { INode, WORKFLOW_TYPES } from '@/views/backstage/office-setting/form-management/types'
import WrapNode from '@/views/backstage/office-setting/form-management/new/components/WrapNode.vue'
import WrapGateway from '@/views/backstage/office-setting/form-management/new/components/WrapGateway.vue'
import {
  defaultNodeExclusiveGateway,
  defaultNodePeople
} from '@/views/backstage/office-setting/form-management/new/utils'

@Component({
  name: 'WrapNodes',
  components: { WrapGateway, WrapNode }
})
export default class WrapNodes extends Vue {
  @Prop({ required: true, type: Array }) readonly nodes !: INode[]

  get WORKFLOW_TYPES () {
    return WORKFLOW_TYPES
  }

  addNode (type: WORKFLOW_TYPES, index: number) {
    switch (type) {
      case WORKFLOW_TYPES.APPROVAL:
      case WORKFLOW_TYPES.CC:
        this.nodes.splice(index + 1, 0, defaultNodePeople(type))
        break
      case WORKFLOW_TYPES.EXCLUSIVE_GATEWAY: {
        const spliceNode = this.nodes.splice(index + 1, this.nodes.length)
        this.nodes.push(defaultNodeExclusiveGateway(spliceNode))
      }
        break
      default:
    }
  }

  removeNode (index: number) {
    this.nodes.splice(index, 1)
  }
}
</script>

<style lang="scss" scoped>
.nodes-wrap {
  position: relative;
  z-index: 999;
  background-color: $dd--background-color-base;
  .button__close{
    color: #fff;
  }
}
</style>
