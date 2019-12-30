<!--Created by LiuLei on 2019/12/5-->
<template>
  <div class="drawer-node-cc">
    <div>
      <div class="p-b-10 p-t-30">抄送人</div>
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
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject, Watch } from 'vue-property-decorator'
import {
  APPROVAL_TYPES,
  INodePeople
} from '@/views/backstage/office-setting/form-management/types'
import UserSelectDialog from '@/components/UserSelectDialog.vue'
import UserBox
  from '@/views/backstage/office-setting/form-management/new/components/WorkflowDrawer/components/UserBox.vue'

@Component({
  name: 'DrawerNodeCC',
  components: { UserBox, UserSelectDialog }
})
export default class DrawerNodeCC extends Vue {
  @Inject() readonly workflowGlobal!: {
    users: any[],
    roles: any[],
    departments: any[],
    currentNode: INodePeople
  }

  selectList: any[] = []

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
      }
    }
  }

  @Watch('newNode')
  onNewNodeChange (node: INodePeople) {
    this.$emit('update', node)
  }

  created () {
    this.selectList = [...this.workflowGlobal.currentNode.config.targets]
    // this.selectList = this.workflowGlobal.currentNode.config.targets.map((target: any) => target.id)
  }
}
</script>

<style lang="scss" scoped>
.drawer-node-cc {
  padding: 0 20px;

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
