<!--Created by LiuLei on 2019/12/5-->
<template>
  <div class="drawer-node-start">
    <el-tabs v-model="activeTab">
      <el-tab-pane
        label="设置发起人"
        name="first">
        <div>
          <div class="p-b-10 p-t-5">谁可以提交</div>
          <user-select-dialog
            mode="orguser"
            :checked.sync="selectList">
            <div class="submit__user">
              <user-box
                :users="workflowGlobal.users"
                :roles="workflowGlobal.roles"
                :departments="workflowGlobal.departments"
                :closable="false"
                :targets="selectList"/>
            </div>
          </user-select-dialog>
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="表单操作权限"
        name="second">
        <drawer-node-form-auth :permissions.sync="permissions"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Inject, Vue, Watch } from 'vue-property-decorator'
import DrawerNodeFormAuth
  from '@/views/backstage/office-setting/form-management/new/components/WorkflowDrawer/DrawerNodeFormAuth.vue'
import {
  APPROVAL_TYPES,
  INodePeople,
  INodePermission
  // WORKFLOW_TYPES
} from '@/views/backstage/office-setting/form-management/types'
import UserSelectDialog
  from '@/components/UserSelectDialog.vue'
import UserBox
  from '@/views/backstage/office-setting/form-management/new/components/WorkflowDrawer/components/UserBox.vue'

@Component({
  name: 'DrawerNodeStart',
  components: { UserBox, UserSelectDialog, DrawerNodeFormAuth }
})
export default class DrawerNodeStart extends Vue {
  @Inject() readonly workflowGlobal!: {
    users: any[],
    roles: any[],
    departments: any[],
    currentNode: INodePeople
  }

  activeTab: string = ''

  // node: InodePeople = {
  //   id: '',
  //   type: WORKFLOW_TYPES.START,
  //   name: '',
  //   config: {
  //     type: APPROVAL_TYPES.PROMOTER_SELF,
  //     targets: []
  //   }
  // }

  selectList: any[] = []
  permissions: INodePermission[] = []

  get newNode (): INodePeople {
    return {
      ...this.workflowGlobal.currentNode,
      config: {
        ...this.workflowGlobal.currentNode.config,
        type: APPROVAL_TYPES.DESIGNATE_USERS,
        targets: [...this.selectList]
        // targets: this.selectList.map((item: any) => {
        //   return {
        //     id: item,
        //     type: APPROVAL_TARGET_TYPES.USER
        //   }
        // })
      },
      permissions: [...this.permissions]
    }
  }

  @Watch('newNode')
  onNewNodeChange (node: INodePeople) {
    this.$emit('update', node)
  }

  created () {
    setTimeout(() => {
      this.activeTab = 'first'
    }, 0)
    this.permissions = [...this.workflowGlobal.currentNode.permissions]
    // this.selectList = this.workflowGlobal.currentNode.config.targets.map((target: any) => target.id)
    this.selectList = [...this.workflowGlobal.currentNode.config.targets]
    // this.node = this.workflowGlobal.currentNode
  }
}
</script>

<style lang="scss" scoped>
.drawer-node-start {
  .submit__user {
    width: 100%;
    border: 1px solid $dd--border-color-base;
    min-height: 40px;
    border-radius: 4px;
    display: flex;
    align-content: center;
    padding: 5px 5px 0;
    cursor: pointer;
  }
}
</style>
