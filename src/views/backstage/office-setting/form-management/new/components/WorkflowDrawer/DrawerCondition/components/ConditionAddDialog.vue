<!--Created by LiuLei on 2019/12/10-->
<template>
  <span class="condition-add-dialog">
    <el-dialog
      :visible.sync="visibleDialog"
      append-to-body
      lock-scroll
      destroy-on-close
      modal-append-to-body
      modal
      z-index="1000"
      width="500px"
      title="选择条件">
      <div>
        <el-checkbox-group v-model="checkedList">
          <el-checkbox
            v-for="field in conditionFields"
            :label="field.apiName"
            :key="field.apiName">{{field.name}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="m-t-30 dd-text-center">
        <el-button @click="visibleDialog = false">取消</el-button>
        <el-button @click="submit" type="primary">确定</el-button>
      </div>
    </el-dialog>
    <span @click="showDialog">
      <slot/>
    </span>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IField } from '@/views/designer/config/components'

@Component({
  name: 'ConditionAddDialog'
})
export default class ConditionAddDialog extends Vue {
  @Prop({ required: true, type: Array }) readonly conditionFields !: IField[]
  @Prop({ required: true, type: Array }) readonly value !: string[]
  visibleDialog: boolean = false

  checkedList: string[] = []

  showDialog () {
    this.checkedList = [...this.value]
    this.visibleDialog = true
  }

  submit () {
    this.$emit('input', [...this.checkedList])
    this.visibleDialog = false
  }
}
</script>

<style lang="scss" scoped>

</style>
