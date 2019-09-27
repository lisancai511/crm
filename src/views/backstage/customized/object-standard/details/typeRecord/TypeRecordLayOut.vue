<template>
  <div>
    <el-card>
      <div class="typeRecordAdd">
          <div @click="$router.go(-1)" class="close"><dd-icon name="close"/></div>
          <h3 style="margin:10px 0 25px">
            分配页面布局
          </h3>
          <el-table
            :data="tableData"
            :header-cell-style="{background:'#F8FAFC'}"
            border
            style="width: 80%;">
            <el-table-column
              prop="date"
              label="角色">
            </el-table-column>
            <el-table-column
              label="记录类型01">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.name"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column
              label="记录类型02">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.name"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column
              label="记录类型03">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.name"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column
              label="记录类型04">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.name"></el-checkbox>
              </template>
            </el-table-column>
          </el-table>
          <el-button @click="submit" style="width:68px;margin-top:30px;" type="primary">保存</el-button>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
@Component({
  name: 'FiledList',
  computed: {
    ...mapState('daoda/test', ['active'])
  }
})
export default class FiledList extends Vue {
  private tableData:any = [{
    name: '123', address: '顶顶顶顶', flag: false
  }, {
    name: '123', address: '顶顶顶顶', flag: false
  }]
  submit () {
    this.$router.push('/backstage/customized/standard-edit')
  }
}
</script>
<style lang="scss" scoped>
.dd-title {
  font-size:14px;
  font-family:'PingFangSC';
  font-weight:400;
  color:rgba(34,45,62,1);
  line-height:20px;
  margin:0 0 8px;
}
.typeRecordAdd {
  position: relative;
  display: flex;
  flex-direction: column;
}
.close {
  position: absolute;
  right: 0px;
  cursor: pointer;
}
</style>
