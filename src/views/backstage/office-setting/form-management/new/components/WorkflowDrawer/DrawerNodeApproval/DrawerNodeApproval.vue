<!--Created by LiuLei on 2019/12/5-->
<template>
  <div class="drawer-node-approval">
    <el-tabs v-model="activeTab">
      <el-tab-pane
        label="设置发起人"
        name="first">
        <div class="p-b-10">
          <div class="approval-list">
            <el-radio-group
              class="approval-type__wrap"
              v-model="approvalType">
              <el-radio
                class="approval-type"
                :key="item.type"
                v-for="item in APPROVAL_LIST"
                :label="item.type">{{item.name}}
              </el-radio>
            </el-radio-group>
          </div>
          <div class="approval-extra m-t-30">
            <template v-if="APPROVAL_TYPES.PROMOTER_CHOICE === approvalType">
              <div class="m-b-20">
                <el-select v-model="config.choiceType">
                  <el-option
                    :value="choice.type"
                    :label="choice.name"
                    v-for="choice in PROMOTER_CHOICE_LIST"
                    :key="choice.type"/>
                </el-select>
              </div>
              <div class="m-b-30">
                <div class="m-b-10">
                  <label>
                    <strong>选择范围</strong>
                  </label>
                </div>
                <el-row>
                  <el-col>
                    <el-select v-model="config._choiceRange">
                      <el-option
                        :value="choice.type"
                        :label="choice.name"
                        v-for="choice in PROMOTER_CHOICE_RANGE_LIST"
                        :key="choice.type"/>
                    </el-select>
                    <user-select-dialog
                      v-show="config._choiceRange === PROMOTER_CHOICE_RANGE_TYPES.USER"
                      :checked.sync="config._targets">
                      <el-button
                        class="m-l-10"
                        type="primary">
                        {{config.targets.length === 0 ? '添加':'修改'}}
                        成员
                      </el-button>
                      <div class="m-t-15">
                        <user-box
                          :users="workflowGlobal.users"
                          :roles="workflowGlobal.roles"
                          :departments="workflowGlobal.departments"
                          :targets.sync="config._targets"/>
                      </div>
                    </user-select-dialog>
                    <user-select-dialog
                      v-show="config._choiceRange === PROMOTER_CHOICE_RANGE_TYPES.ROLE"
                      mode="role"
                      :checked.sync="config._targets">
                      <el-button
                        class="m-l-10"
                        type="primary">
                        {{config.targets.length === 0 ? '添加':'修改'}}
                        角色
                      </el-button>
                      <div class="m-t-15">
                        <user-box
                          :roles="workflowGlobal.roles"
                          type="role" :targets.sync="config._targets"/>
                      </div>
                    </user-select-dialog>
                  </el-col>
                </el-row>
              </div>
              <approval-multi-method
                v-if="config.choiceType === PROMOTER_CHOICE_TYPES.MULTI"
                v-model="config.approvalType"/>
            </template>
            <template v-else-if="APPROVAL_TYPES.PROMOTER_SELF === approvalType">
              <span>发起人自己将作为审批人处理审批单</span>
            </template>
            <template v-else-if="APPROVAL_TYPES.DESIGNATE_USERS === approvalType">
              <div class="m-b-30">
                <user-select-dialog
                  :checked.sync="config._targets">
                  <el-button
                    type="primary">
                    {{config.targets.length === 0 ? '添加成员':'修改成员'}}
                  </el-button>
                </user-select-dialog>
                <div class="m-t-15">
                  <user-box
                    :users="workflowGlobal.users"
                    :targets.sync="config._targets"/>
                </div>
              </div>
              <approval-multi-method
                v-if="config.targets.length > 1"
                v-model="config.approvalType"/>
            </template>
            <template v-else-if="APPROVAL_TYPES.ROLE === approvalType">
              <div class="m-b-30">
                <el-select
                  clearable
                  v-model="config._targets"
                  filterable
                  placeholder="添加角色">
                  <el-option
                    v-for="role in workflowGlobal.roles"
                    :key="role.id"
                    :label="role.name"
                    :value="role.id">
                  </el-option>
                </el-select>
              </div>
              <approval-multi-method
                v-if="config.targets.length > 0"
                v-model="config.approvalType"/>
            </template>
            <template v-else-if="APPROVAL_TYPES.MANAGER === approvalType">
              <div>
                <div class="m-b-10">
                  <label class="m-r-10">发起人的</label>
                  <el-select v-model="config._targets">
                    <el-option
                      :key="i"
                      :value="i"
                      :label="`第${i}级主管`"
                      v-for="i in 10"/>
                  </el-select>
                </div>
                <div class="m-b-10">
                  <el-checkbox v-model="config.superManagerReplace">找不到主管时，由上级主管代审批</el-checkbox>
                </div>
              </div>
              <approval-multi-method v-model="config.approvalType"/>
            </template>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="表单操作权限"
        name="second">
        <drawer-node-form-auth
          :permissions.sync="permissions"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Inject, Vue, Watch } from 'vue-property-decorator'
import {
  APPROVAL_LIST,
  APPROVAL_METHOD_TYPES, APPROVAL_TARGET_TYPES,
  APPROVAL_TYPES,
  INodePeople,
  INodePeopleConfig,
  INodePermission,
  PROMOTER_CHOICE_LIST,
  PROMOTER_CHOICE_RANGE_LIST,
  PROMOTER_CHOICE_RANGE_TYPES,
  PROMOTER_CHOICE_TYPES
} from '@/views/backstage/office-setting/form-management/types'
import DrawerNodeFormAuth
  from '@/views/backstage/office-setting/form-management/new/components/WorkflowDrawer/DrawerNodeFormAuth.vue'
import ApprovalMultiMethod
  from '@/views/backstage/office-setting/form-management/new/components/WorkflowDrawer/DrawerNodeApproval/components/ApprovalMultiMethod.vue'
import UserSelect from '@/components/UserSelect/index.vue'
import UserSelectDialog from '@/components/UserSelectDialog.vue'
import UserBox
  from '@/views/backstage/office-setting/form-management/new/components/WorkflowDrawer/components/UserBox.vue'

@Component({
  name: 'DrawerNodeApproval',
  components: { UserBox, UserSelectDialog, UserSelect, ApprovalMultiMethod, DrawerNodeFormAuth }
})
export default class DrawerNodeApproval extends Vue {
  @Inject() readonly workflowGlobal!: {
    users: any[],
    roles: any[],
    departments: any[],
    currentNode: INodePeople
  }

  activeTab: string = ''
  permissions: INodePermission[] = []
  config: INodePeopleConfig = {
    type: APPROVAL_TYPES.PROMOTER_SELF,
    targets: []
  }

  get approvalType () {
    return this.config.type
  }

  set approvalType (type: APPROVAL_TYPES) {
    this.config = this.getDefaultConfig(type)
  }

  get APPROVAL_LIST () {
    return APPROVAL_LIST
  }

  get APPROVAL_TYPES () {
    return APPROVAL_TYPES
  }

  get PROMOTER_CHOICE_LIST () {
    return PROMOTER_CHOICE_LIST
  }

  get PROMOTER_CHOICE_TYPES () {
    return PROMOTER_CHOICE_TYPES
  }

  get PROMOTER_CHOICE_RANGE_LIST () {
    return PROMOTER_CHOICE_RANGE_LIST
  }

  get PROMOTER_CHOICE_RANGE_TYPES () {
    return PROMOTER_CHOICE_RANGE_TYPES
  }

  get newNode (): INodePeople {
    return {
      ...this.workflowGlobal.currentNode,
      config: {
        ...this.config,
        type: this.approvalType as APPROVAL_TYPES
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
    this.config = {
      ...this.workflowGlobal.currentNode.config
    }
    this.watchTarget(this.config)
    this.permissions = [...this.workflowGlobal.currentNode.permissions]
  }

  watchTarget (config: INodePeopleConfig, type?: string) {
    switch (config.type) {
      case APPROVAL_TYPES.MANAGER:
      case APPROVAL_TYPES.ROLE:
        Object.defineProperty(config, '_targets', {
          get () {
            if (this.targets.length === 0) {
              this.targets = [{
                id: '',
                type: config.type
              }]
            }
            return this.targets[0].id
          },
          set (v: string[]): void {
            this.targets = [{
              id: v,
              type
            }]
          }
        })
        break
      case APPROVAL_TYPES.PROMOTER_CHOICE:
        Object.defineProperty(config, '_targets', {
          get () {
            return [...this.targets]
            // return this.targets.map((target: any) => target.id)
          },
          set (v: string[]): void {
            this.targets = [...v]
            // this.targets = v.map((id: string) => {
            //   return {
            //     id,
            //     type: config.choiceRange
            //   }
            // })
          }
        })
        Object.defineProperty(config, '_choiceRange', {
          get (): PROMOTER_CHOICE_RANGE_TYPES {
            return this.choiceRange
          },
          set (v: PROMOTER_CHOICE_RANGE_TYPES): void {
            this.targets = []
            this.choiceRange = v
          }
        })
        break
      case APPROVAL_TYPES.DESIGNATE_USERS:
        Object.defineProperty(config, '_targets', {
          get () {
            return [...this.targets]
            // return this.targets.map((target: any) => target.id)
          },
          set (v: string[]): void {
            this.targets = [...v]
            // this.targets = v.map((item: string) => {
            //   return {
            //     id: item,
            //     type: APPROVAL_TARGET_TYPES.USER
            //   }
            // })
          }
        })
        break
      default:
      // Object.defineProperty(config, '_targets', {
      //   get () {
      //     return this.targets.map((target: any) => target.id)
      //   },
      //   set (v: string[]): void {
      //     console.log('set (v: string[]): void {')
      //     this.targets = v.map((id: string) => ({
      //       id,
      //       type
      //     }))
      //   }
      // })
    }
  }

  getDefaultConfig (type: APPROVAL_TYPES): INodePeopleConfig {
    const config: INodePeopleConfig = {
      type,
      targets: []
    }
    switch (type) {
      case APPROVAL_TYPES.PROMOTER_CHOICE:
        config.approvalType = APPROVAL_METHOD_TYPES.ORDER
        config.choiceRange = PROMOTER_CHOICE_RANGE_TYPES.ALL
        config.choiceType = PROMOTER_CHOICE_TYPES.ONE
        config.targets = []
        this.watchTarget(config)
        break
      case APPROVAL_TYPES.DESIGNATE_USERS:
        config.approvalType = APPROVAL_METHOD_TYPES.ORDER
        config.targets = []
        this.watchTarget(config)
        break
      case APPROVAL_TYPES.ROLE:
        config.approvalType = APPROVAL_METHOD_TYPES.ORDER
        config.targets = []
        this.watchTarget(config)
        break
      case APPROVAL_TYPES.MANAGER:
        config.approvalType = APPROVAL_METHOD_TYPES.ORDER
        config.superManagerReplace = false
        config.targets = [
          {
            id: 1,
            type: APPROVAL_TARGET_TYPES.MANAGER
          }
        ]
        this.watchTarget(config)
        break
      case APPROVAL_TYPES.PROMOTER_SELF:
      default:
    }
    return config
  }
}
</script>

<style lang="scss" scoped>
.drawer-node-approval {
  .approval-type {
    width: 33.3%;
    margin: 10px 0 0;

    &__wrap {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>
