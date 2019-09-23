<template>
  <div>
    <el-card>
      <div class="typeRecordAdd">
          <h3 style="margin:10px 0 25px">
            新建记录类型
          </h3>
          <div class="dd-title">记录类型标签</div>
          <el-input style="width:500px" v-model="input" placeholder="请输入内容"></el-input>
          <el-checkbox style="margin-top:23px;" v-model="tableData">备选项</el-checkbox>
          <span style="margin:23px 0 8px">备注</span>
          <el-input type="textarea" style="width:1000px" :rows="6"></el-input>
          <h3 style="margin:30px 0 17px">设置可以使用的角色及页面布局</h3>
          <el-table
            :data="tableData"
            border
            style="width: 517px; margin: 16px 0 54px;">
            <el-table-column
              prop="date"
              label="角色"
              width="151px">
            </el-table-column>
            <el-table-column
              prop="name"
              label="启用"
              width="68px">
            </el-table-column>
            <el-table-column
              prop="address"
              label="默认设置"
              width="110px">
            </el-table-column>
            <el-table-column
              prop="address"
              label="请选择要使用的布局">
            </el-table-column>
          </el-table>
          <el-button @click="submit" style="width:68px;" type="primary">保存</el-button>
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
  private input:string = ''
  submit () {
    this.$router.go(-1)
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
  display: flex;
  flex-direction: column;
}
</style>
