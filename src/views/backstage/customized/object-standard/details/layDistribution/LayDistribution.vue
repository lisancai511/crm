<template>
  <div class="details">
    <el-table
      :data="tableData"
      :header-cell-style="{background:'#F8FAFC'}"
      border
      style="width: 1500px; margin: 0 0 0 0px;">
      <el-table-column
        prop="date"
        label="角色">
      </el-table-column>
      <el-table-column
        prop="name"
        label="启用">
      </el-table-column>
      <el-table-column
        prop="address"
        label="默认设置">
      </el-table-column>
      <el-table-column
        prop="address"
        label="请选择要使用的布局">
      </el-table-column>
      <el-table-column
        prop="address"
        label="请选择要使用的布局">
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'LayDistribution'
})
export default class LayDistribution extends Vue {
  private tableData:any = [{
    name: '123', address: '顶顶顶顶', flag: false
  }, {
    name: '123', address: '顶顶顶顶', flag: false
  }]
}
</script>

<style lang="scss" scoped>
.details {
  margin-top: 10px;
  padding: 20px 20px;
  border-top: 1px solid rgba(241,242,246,1);
}
</style>
