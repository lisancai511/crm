<!--Created by LiuLei on 2019/12/4-->
<template>
  <div class="workflow-drawer">
    <div class="drawer-header">
      <h6 @click="editingName = true"
          v-if="!editingName"
          class="fs-16 drawer-header__title">
        {{updatedNode.name || node.name}}
        <dd-icon name="edit"/>
      </h6>
      <el-input v-else
                @blur="editingName = false"
                size="small"
                v-model="updatedNode.name"/>
    </div>
    <div :key="visible" class="drawer-body">
      <drawer-node-start
        @update="updateNode"
        v-if="WORKFLOW_TYPES.START === node.type"/>
      <drawer-node-approval
        @update="updateNode"
        v-else-if="WORKFLOW_TYPES.APPROVAL === node.type"/>
      <drawer-node-c-c
        @update="updateNode"
        v-else-if="WORKFLOW_TYPES.CC === node.type"/>
      <drawer-condition
        @update="updateNode"
        v-else-if="WORKFLOW_TYPES.CONDITION === node.type"/>
    </div>
    <div class="drawer-footer">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject } from 'vue-property-decorator'
import { ICondition, INode, WORKFLOW_TYPES } from '@/views/backstage/office-setting/form-management/types'
import DrawerCondition
  from '@/views/backstage/office-setting/form-management/new/components/WorkflowDrawer/DrawerCondition/DrawerCondition.vue'
import DrawerNodeStart
  from '@/views/backstage/office-setting/form-management/new/components/WorkflowDrawer/DrawerNodeStart.vue'
import DrawerNodeApproval
  from '@/views/backstage/office-setting/form-management/new/components/WorkflowDrawer/DrawerNodeApproval/DrawerNodeApproval.vue'
import DrawerNodeCC
  from '@/views/backstage/office-setting/form-management/new/components/WorkflowDrawer/DrawerNodeCC.vue'

@Component({
  name: 'WorkflowDrawer',
  components: {
    DrawerNodeCC,
    DrawerNodeApproval,
    DrawerNodeStart,
    DrawerCondition
  }
})
export default class WorkflowDrawer extends Vue {
  @Prop({ required: true, type: Object }) readonly node !: INode | ICondition
  @Prop({ required: true, type: Boolean }) readonly visible !: boolean
  @Inject() readonly workflowGlobal!: {
    users: any[],
    departments: any[],
    currentNode: ICondition | INode
  }

  updatedNode: any = {}
  editingName: boolean = false

  get WORKFLOW_TYPES () {
    return WORKFLOW_TYPES
  }

  updateNode (node: any) {
    // console.log('updateNode', node)
    this.updatedNode = node
  }

  save () {
    Object.keys(this.updatedNode).forEach((k: string) => {
      (this.workflowGlobal.currentNode as any)[k] = this.updatedNode[k]
    })
    this.$emit('update:visible', false)
  }

  cancel () {
    this.$emit('update:visible', false)
  }
}
</script>

<style lang="scss" scoped>
.workflow-drawer {
  height: 100%;
  display: flex;
  flex-direction: column;

  .drawer {
    &-header {
      /*background-color: #42b983;*/
      height: 70px;
      padding: 20px;

      &__title {
        margin: 20px 0 0;
        cursor: pointer;
      }
    }

    &-body {
      /*background-color: #778bff;*/
      flex: 1;
      padding: 0;
    }

    &-footer {
      /*background-color: #1E88FE;*/
      padding: 20px;
      text-align: right;
    }
  }

  /deep/ .el-tabs__nav-wrap {
    padding: 0 20px;
  }

  /deep/ .el-tabs__content {
    padding: 0 20px;
  }

  /*/deep/ .el-tabs__item {}*/

}
</style>
