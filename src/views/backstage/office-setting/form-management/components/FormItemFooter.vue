<!--Created by LiuLei on 2019/11/27-->
<template>
  <div class="FormItemFooter">
    <el-button
      v-if="form.enable"
      @click="edit"
      class="dd-button__text dd-button__text--info"
      type="text">编辑
    </el-button>
    <el-button
      v-if="!form.enable"
      @click="deleteForm"
      class="dd-button__text dd-button__text--info"
      type="text">删除
    </el-button>
    <el-button
      @click="toggleState"
      class="dd-button__text dd-button__text--info"
      type="text">
      {{form.enable ? '停用':'启用'}}
    </el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IForm } from '@/views/backstage/office-setting/form-management/types'

@Component({
  name: 'FormItemFooter'
})
export default class FormItemFooter extends Vue {
  @Prop({ required: true }) readonly form !: IForm

  edit () {
    this.$emit('edit')
  }

  toggleState () {
    this.$emit('toggleState')
  }

  deleteForm () {
    this.$emit('deleteForm')
  }
}
</script>

<style lang="scss" scoped>

</style>
