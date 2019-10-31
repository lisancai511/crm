<template>
  <div>
      <el-tabs v-model="activeName" class="tabs" tab-position="left">
        <el-tab-pane label="单行文本"></el-tab-pane>
        <el-tab-pane label="长文本"></el-tab-pane>
        <el-tab-pane label="长文本"></el-tab-pane>
      </el-tabs>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'NewField'
})

export default class NewField extends Vue {
  private activeName:any = ''
  private saveData:any = ''
  changeTabs (item:any) {
    this.saveData = item
    this.activeName = 'ten'
  }
}
</script>
<style lang="scss" scoped>
.tabs {
  margin-top: 20px;
  border-top: 1px solid #F1F2F6;
}
/deep/.el-tabs--left .el-tabs__active-bar.is-left {
  left: 0;
  width: 4px;
}
/deep/.el-tabs__item.is-active {
  background: #E8F1FF;
}
/deep/.el-tabs--left .el-tabs__item.is-left {
  text-align: left;
}
/deep/.el-tabs__item {
  padding: 0 100px 0 60px !important;
}
/deep/.el-tabs__content {
  border-left: 1px solid #F1F2F6;
  background: #F8FAFC;
  min-height: calc(100vh - 150px)
}
/deep/.el-tabs--left .el-tabs__header.is-left {
  margin: 0;
}
/deep/.el-tabs__nav-wrap::after {
  height: 0px;
  background-color: transparent !important;
}
</style>
