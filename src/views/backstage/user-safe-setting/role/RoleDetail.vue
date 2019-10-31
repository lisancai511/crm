<template>
  <div class="main">
    <el-card class='m-b-20 card' :body-style="{padding:0}">
      <el-tabs>
        <el-tab-pane :lazy="true" label="对象操作权限">
           <ObjectRole></ObjectRole>
        </el-tab-pane>
        <el-tab-pane :lazy="true" label="记录类型权限">
          <TypeRecordRole></TypeRecordRole>
        </el-tab-pane>
        <el-tab-pane :lazy="true" label="菜单可见性">
          3
        </el-tab-pane>
        <el-tab-pane :lazy="true" label="数据权限">
          <DataRole></DataRole>
        </el-tab-pane>
        <el-tab-pane :lazy="true" label="管理权限">
          5
        </el-tab-pane>
        <el-tab-pane :lazy="true" label="应用程序权限">
          6
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ObjectRole from './components/ObjectRole.vue'
import TypeRecordRole from './components/TypeRecordRole.vue'
import DataRole from './components/DataRole.vue'
@Component({
  name: 'StandardDetails',
  components: {
    ObjectRole,
    TypeRecordRole,
    DataRole
  }
})
export default class StandardDetails extends Vue {
  created () {
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-tabs__nav-wrap::after {
  height: 0;
}

// /deep/ .el-tabs__active-bar {
//   background: linear-gradient(to right, #fff 25%, $dd--primary-color 25%, $dd--primary-color 75%, #fff 75%)
// }

/deep/ .el-tabs__header {
  margin: 20px 20px 10px;
}
.card {
  min-height: calc(100vh - 150px)
}
</style>
