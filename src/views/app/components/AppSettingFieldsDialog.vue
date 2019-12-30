<!--Created by LiuLei on 2019/11/12-->
<template>
  <span class="AppSettingFieldsDialog">
    <span @click="dialogVisible=!dialogVisible">
      <slot/>
    </span>
    <el-dialog
      title="设置"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-checkbox-group v-model="checkList">
        <el-checkbox
          :disabled="disabledCheckedList.includes(field.apiName)"
          v-for="field in editableFields"
          :key="field.apiName"
          :label="field.apiName">
          {{field.name}}
        </el-checkbox>
      </el-checkbox-group>
      <div class="dd-text-center">
        <el-button
          :loading="saving"
          type="primary"
          @click="submit">确定</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component({
  name: 'AppSettingFieldsDialog'
})
export default class AppSettingFieldsDialog extends Vue {
  @Prop({ required: true, type: Array }) readonly fields !: any[]
  @Prop({ required: true, type: Array }) readonly checkedList !: string[]
  @Prop({
    default () {
      return []
    },
    type: Array
  }) readonly disabledCheckedList !: string[]

  dialogVisible: boolean = false
  checkList: string[] = []
  editableFields: any[] = []
  saving: boolean = false

  @Watch('dialogVisible', { immediate: true })
  onDialogVisibleChange (val: boolean) {
    if (val) {
      this.editableFields = this.fields
      this.checkList = [...this.checkedList]
    }
  }

  submit () {
    this.saving = true
    this.$emit('update', this.checkList, () => {
      this.dialogVisible = false
      this.saving = false
    })
  }
}
</script>

<style lang="scss" scoped>
.AppSettingFieldsDialog {
  /deep/ .el-checkbox-group {
    display: flex;
    flex-direction: column;
  }
}
</style>
