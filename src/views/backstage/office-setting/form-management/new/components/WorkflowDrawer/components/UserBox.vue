<!--Created by LiuLei on 2019/12/13-->
<template>
  <div class="user-box">
    <el-tag
      :key="target.type+target.id"
      :closable="closable"
      size="medium"
      @close="close(target)"
      v-for="target in targets">
      <span v-if="APPROVAL_TARGET_TYPES.USER === target.type">{{(userById[target.id] || {}).name}}</span>
      <span v-if="APPROVAL_TARGET_TYPES.ORG === target.type">{{(departmentById[target.id] || {}).name}}</span>
      <span v-if="APPROVAL_TARGET_TYPES.ROLE === target.type">{{(roleById[target.id] || {}).name}}</span>
    </el-tag>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { arrToMap } from '@/utils'
import { APPROVAL_TARGET_TYPES } from '@/views/backstage/office-setting/form-management/types'

@Component({
  name: 'UserBox'
})
export default class UserBox extends Vue {
  @Prop({ type: Boolean, default: true }) readonly closable !: boolean
  @Prop({ required: true, type: Array }) readonly targets !: string[]
  @Prop({
    type: Array,
    default () {
      return []
    }
  }) readonly users !: any[]

  @Prop({
    type: Array,
    default () {
      return []
    }
  }) readonly departments !: any[]

  @Prop({
    type: Array,
    default () {
      return []
    }
  }) readonly roles !: any[]

  get APPROVAL_TARGET_TYPES () {
    return APPROVAL_TARGET_TYPES
  }

  get userById () {
    return arrToMap(this.users, 'id')
  }

  get roleById () {
    return arrToMap(this.roles, 'id')
  }

  get departmentById () {
    return arrToMap(this.departments, 'id')
  }

  close (sTarget: any) {
    this.$emit('update:targets', this.targets.filter((target: any) => target !== sTarget))
  }
}
</script>

<style lang="scss" scoped>
.user-box {
  .el-tag {
    margin-right: 5px;
    margin-bottom: 5px;
  }
}
</style>
