<template>
  <div class="main">
    <el-card class="m-b-20" :body-style="{padding:0}">
       <div slot="header" class="title">
         <span class="title_left">平台标准对象</span>
         <span class="title_right">合计共有9个平台标准对象</span>
       </div>
       <div>
             <el-table
              :header-cell-style="{background:'#F8FAFC'}"
              :data="tableData">
              <el-table-column
                label="对象名称">
                <template slot-scope="scope">
                   <span class="link" @click="goToEdit(scope.row)">{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="apiName"
                label="API">
              </el-table-column>
              <el-table-column
                prop="description"
                label="备注">
              </el-table-column>
              <el-table-column
                prop="creator"
                label="创建人">
              </el-table-column>
              <el-table-column
                prop="lastModifiedTime"
                label="最后修改日期">
              </el-table-column>
            </el-table>
       </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Api from '@/api'

@Component({
  name: 'Standard'
})
export default class Standard extends Vue {
  private tableData:any = []
  created () {
    this.getData()
    localStorage.setItem('activeName', 'first')
  }
  goToEdit (row:any) {
    this.$router.push({
      path: '/backstage/customized/standard-edit',
      query: {
        id: row.id
      }
    })
  }
  async getData () {
    const { data } = await Api.bizObjects.getBizObjects()
    this.tableData = data
  }
}
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
  &_left {
    font-size:16px;
    font-family:'PingFangSC';
    font-weight:600;
    color:rgba(0,0,0,1);
  }
  &_right {
    font-size:12px;
    font-family:'PingFangSC';
    font-weight:400;
    color:rgba(102,102,102,1);
  }
}
.link {
  cursor: pointer;
  color:#0061FF;
}
</style>
