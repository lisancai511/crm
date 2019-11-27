<!--Created by LiuLei on 2019/11/4-->
<template>
  <header-tab-steps
    :tabs="tabs"
    v-model="activeTabName"
    back-title="表单管理"
    back-path="/backstage/office-setting/form-management">
    <template slot="right">
      <el-button
        plain
        type="primary">预览
      </el-button>
      <el-button
        type="primary">保存
      </el-button>
    </template>
    <component :is="activeTabName"></component>
  </header-tab-steps>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HeaderTabSteps from '@/layout/header-tab-steps.vue'
import FormDesign from '@/views/backstage/office-setting/form-management/new/components/FormDesign.vue'
import BasicSetting from '@/views/backstage/office-setting/form-management/new/components/BasicSetting.vue'
import ApprovalProcess from '@/views/backstage/office-setting/form-management/new/components/ApprovalProcess.vue'

@Component({
  name: 'FormManagementNew',
  components: {
    ApprovalProcess,
    BasicSetting,
    FormDesign,
    HeaderTabSteps
  }
})
export default class FormManagementNew extends Vue {
  activeTabName = ''

  get tabs () {
    return [
      {
        label: (BasicSetting as any).title,
        name: BasicSetting.name
      },
      {
        label: (FormDesign as any).title,
        name: FormDesign.name
      },
      {
        label: (ApprovalProcess as any).title,
        name: ApprovalProcess.name
      }
    ]
  }
}
</script>

<style lang="scss" scoped>
</style>
