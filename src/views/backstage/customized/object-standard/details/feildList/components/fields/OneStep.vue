<template>
  <div class="singleLine">
    <div class="title">选择应包含该字段的页面布局</div>
    <div class="title_second">该字段将作为最后一个字段添加到这些页面布局的前 2 列。如果不选择布局，该字段在任何页面上都不会显示。</div>
    <el-table
      :data="tableData"
      :header-cell-style="{background:'#F8FAFC'}"
      border
      style="width: 700px;marginLeft:24px">
      <el-table-column
        prop="date"
        label="布局名称"
        width="379">
      </el-table-column>
      <el-table-column
        label="是否显示"
        width="160">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.name"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        label="必填"
        width="80">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.name"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        label="只读"
        width="80">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.name"></el-checkbox>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin:40px 0 0 24px">
      <el-button type="primary" @click="goBack">保存</el-button>
      <el-button>保存并继续添加</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'AutoNumber'
})
export default class AutoNumber extends Vue {
  @Prop() saveData:any
  private tableData:any =[{
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  }, {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
  }, {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
  }, {
    date: '2016-05-03',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1516 弄'
  }]
  created () {
  }
  goBack () {
    this.$router.go(-1)
  }
}
</script>
<style lang="scss" scoped>
.title {
  font-size:16px;
  font-family:'PingFangSC';
  font-weight:500;
  color:rgba(34,45,62,1);
  margin: 22px 0 3px 24px;
  &_second {
    margin: 0px 0 25px 24px;
    font-size:12px;
    font-family:'PingFangSC';
    font-weight:400;
    color:rgba(138,150,160,1);
  }
}
</style>
