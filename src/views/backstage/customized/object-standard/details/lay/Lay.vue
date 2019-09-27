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
          prop="name"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="creator"
          label="创建人">
        </el-table-column>
        <el-table-column
          prop="lastModifier"
          label="最后修改人">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div v-show="scope.row.flag">
               <span class="dd-click m-r-10" @click="handleClick(scope.row)"><dd-icon name="edit"></dd-icon> 编辑 </span>
               <span class="dd-click m-r-10"> <dd-icon name="delete"></dd-icon> 删除</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Api from '@/api'
@Component({
  name: 'Lay'
})
export default class Lay extends Vue {
  private tableData:any = []
  private mounted () {
    this.getData()
  }
  goToNewField () {
    this.$router.push({
      path: '/backstage/customized/standard-edit/newLay',
      query: {
        id: this.$route.query.id
      }
    })
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
  async getData () {
    const { data } = await Api.bizObjects.getLayouts(this.$route.query.id)
    this.tableData = data
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
