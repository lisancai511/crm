<!--Created by LiuLei on 2019/12/12-->
<template>
  <span class="UserSelectDialog">
    <el-dialog
      custom-class="user-select-dialog__body"
      z-index="99999"
      width="500px"
      append-to-body
      :visible="visible"
      close-on-click-modal>
      <div class="m-t-10">
        <user-select
          @submit="submit"
          @cancel="cancel"
          only-choose-people
          :mode="mode"
          :org-id-list="checkedOrdIds"
          :role-id-list="checkedRoleIds"
          :people-id-list="checkedUserIds"/>
      </div>
    </el-dialog>
    <span @click.stop="visible = true">
      <slot/>
    </span>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import UserSelect from '@/components/UserSelect/index.vue'
import { APPROVAL_TARGET_TYPES } from '@/views/backstage/office-setting/form-management/types'

enum MODE_TYPES {
  ORG = 'org',
  USER = 'user',
  ORG_USER = 'orguser',
  ROLE = 'role'
}

@Component({
  name: 'UserSelectDialog',
  components: { UserSelect }
})
export default class UserSelectDialog extends Vue {
  @Prop({
    type: Array,
    default () {
      return []
    }
  }) readonly checked!: {
    id: string,
    type: string
  }[]

  @Prop({ type: [String, Boolean], default: MODE_TYPES.USER }) readonly mode !: MODE_TYPES | boolean
  visible: boolean = false

  get checkedUserIds () {
    return this.checked.filter((target: any) => target.type === APPROVAL_TARGET_TYPES.USER)
      .map((target: any) => target.id)
  }

  get checkedRoleIds () {
    return this.checked.filter((target: any) => target.type === APPROVAL_TARGET_TYPES.ROLE)
      .map((target: any) => target.id)
  }

  get checkedOrdIds () {
    return this.checked.filter((target: any) => target.type === APPROVAL_TARGET_TYPES.ORG)
      .map((target: any) => target.id)
  }

  submit (val: any) {
    this.$emit('update:checkedUserIds', val.userIds)
    this.$emit('update:checkedRoleIds', val.roleIds)
    this.$emit('update:checkedOrdIds', val.orgIds)
    this.$emit('update:checked', [
      ...val.userIds.map((id: any) => ({
        id,
        type: APPROVAL_TARGET_TYPES.USER
      })),
      ...val.orgIds.map((id: any) => ({
        id,
        type: APPROVAL_TARGET_TYPES.ORG
      })),
      ...val.roleIds.map((id: any) => ({
        id,
        type: APPROVAL_TARGET_TYPES.ROLE
      }))
    ])
    this.visible = false
  }

  cancel () {
    this.visible = false
  }
}
</script>

<style lang="scss">
.user-select-dialog__body {
  .el-dialog {
    &__header {
      display: none;
    }

    &__body {
      padding: 0;
    }
  }
}
</style>
<style lang="scss" scoped>

</style>
