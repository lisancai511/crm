<!--Created by LiuLei on 2019/12/12-->
<template>
  <div class="ApprovalMultiMethod">
    <div class="p-b-10">
      <strong>
        多人审批采用的审批方式
      </strong>
    </div>
    <el-radio-group v-model="model">
      <el-radio
        :label="method.type"
        v-for="method in APPROVAL_METHOD_LIST"
        :key="method.type">{{method.name}}
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { APPROVAL_METHOD_LIST } from '@/views/backstage/office-setting/form-management/types'

@Component({
  name: 'ApprovalMultiMethod'
})
export default class ApprovalMultiMethod extends Vue {
  @Prop({ required: true }) readonly value!: any

  get APPROVAL_METHOD_LIST () {
    return APPROVAL_METHOD_LIST
  }

  get model (): any {
    return this.value
  }

  set model (v: any) {
    this.$emit('input', v)
  }
}
</script>

<style lang="scss" scoped>
.ApprovalMultiMethod {
  .el-radio-group {
    display: flex;
    flex-direction: column;

    .el-radio {
      margin-bottom: 5px;
    }
  }
}
</style>
