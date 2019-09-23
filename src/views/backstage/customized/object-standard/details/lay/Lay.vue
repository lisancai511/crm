<template>
  <div class="details">
    <div style="margin-left:10px">
      <el-button @click="goToNewField" type="primary">新建</el-button>
    </div>
    <div style="margin-top:15px">
      <el-table
        :header-cell-style="{background:'#F8FAFC',borderTop:'1px solid #EBEEF5'}"
        @cell-mouse-enter="mouseEnter"
        @cell-mouse-leave="mouseLeave"
        :data="tableData">
        <el-table-column
          label="名称">
          <template slot-scope="scope">
              <span @click="goToEdit(scope.row)">{{scope.row.date}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="address"
          label="创建人">
        </el-table-column>
        <el-table-column
          prop="pelple"
          label="最后修改人">
        </el-table-column>
        <el-table-column
          prop="time">
          <template slot-scope="scope">
            <div v-show="scope.row.flag">
               <span class="dd-click" @click="handleClick(scope.row)"><dd-icon name="edit"></dd-icon> 编辑 </span>
               <span class="dd-click"> <dd-icon name="delete"></dd-icon> 删除</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
@Component({
  name: 'Lay'
})
export default class Lay extends Vue {
  private tableData:any = [{
    name: '123', address: '顶顶顶顶', flag: false
  }, {
    name: '123', address: '顶顶顶顶', flag: false
  }]
  goToNewField () {
    this.$router.push('/backstage/customized/standard-edit/newLay')
  }
  mouseEnter (a:any, b:any, c:any) {
    a.flag = true
  }
  mouseLeave (a:any) {
    a.flag = false
  }
  handleClick () {
    this.$router.push('/backstage/customized/standard-edit/newField')
  }
}
</script>

<style lang="scss" scoped>
.details {
  margin-top: 10px;
  padding: 15px 0;
  border-top: 1px solid rgba(241,242,246,1);
}
</style>
