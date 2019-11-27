<!--Created by LiuLei on 2019/11/21-->
<template>
  <span class="IconSelectDialog">
    <span
      style="cursor: pointer"
      @click="dialogVisible=!dialogVisible">
      <slot/>
    </span>
     <el-dialog
       append-to-body
       title="请选择图标"
       :visible.sync="dialogVisible"
       width="36%">
       <div class="icon-button__wrap">
         <el-button
           :type="selectedName === iconName ? 'primary' : ''"
           @click="selectedName = iconName"
           class="icon-button"
           v-for="iconName in iconNames"
           :key="iconName"
           circle>
           <dd-icon :full-name="iconName"/>
         </el-button>
       </div>
    <div class="dd-text-center m-t-20">
      <el-button
        size="normal"
        @click="dialogVisible = false">取消</el-button>
      <el-button
        @click="submit"
        size="normal"
        type="primary">确定</el-button>
    </div>
  </el-dialog>
  </span>

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'IconSelectDialog'
})
export default class IconSelectDialog extends Vue {
  @Prop({ required: true, type: Array }) readonly iconNames!: string[]
  @Prop({ required: true, type: String }) readonly value!: string
  dialogVisible: boolean = false
  selectedName: string = ''

  created () {
    this.selectedName = this.value
  }

  submit () {
    this.$emit('input', this.selectedName)
    this.dialogVisible = false
  }
}
</script>

<style lang="scss" scoped>
.IconSelectDialog {
  .icon-button {
    margin-left: 10px !important;
    margin-bottom: 10px;
  }
}

</style>
