<!--Created by LiuLei on 2019/11/5-->
<template>
  <div class="ApprovalProcess">
    <el-button @click="visibleDrawer=true">
      el-drawer
    </el-button>
    <el-drawer
      title="我是标题"
      append-to-body
      :visible.sync="visibleDrawer"
      :show-close="false"
      direction="rtl">
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import mockData from '@/views/backstage/office-setting/form-management/new/components/mockData'

@Component({
  name: 'ApprovalProcess'
})
export default class ApprovalProcess extends Vue {
  static title = '审批流设置'
  visibleDrawer: boolean = false
  processConfig: any = mockData
}
</script>

<style lang="scss" scoped>

</style>
