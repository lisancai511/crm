<template>
  <div>
    <el-card
      style="min-height: calc(100vh - 70px); padding: 20px;"
      class="m-b-10"
      :body-style="{padding:0}">
      <div v-if="data.length!==0">
        <strong class="fs-16">基础分管理</strong>
      </div>
      <div class="main m-t-20 m-b-20">
        <div>
          <el-button type="primary">批量设置</el-button>
        </div>

        <div class="main_right">
           <div>
              <span class="m-r-10">部门/人员</span>
              <el-select v-model="orgnization" placeholder="请选择">
                <el-option
                  v-for="item in organizationsList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
          </div>
          <div class="m-l-20">
              <span class="m-r-10">角色</span>
              <el-select v-model="role" placeholder="请选择">
                <el-option
                  v-for="item in roleList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
          </div>
        </div>
      </div>

      <el-table
        v-if="data.length!==0"
        ref="multipleTable"
        :header-cell-style="{background:'#F8FAFC'}"
        :data="data"
        border
        tooltip-effect="dark"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="姓名">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="分数">
        </el-table-column>
        <el-table-column
          prop="address"
          label="给分频率">
        </el-table-column>
        <el-table-column
          prop="address"
          label="设置时间">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
        </el-table-column>
      </el-table>

      <div v-else class="emptyTable">
        <img src="~@/assets/images/emptyTable.png" alt="">
        <span class="m-t-30">
          暂无数据
        </span>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Api from '@/api'

@Component({
  name: 'CustomizedApplication'
})
export default class CustomizedApplication extends Vue {
  private organizationsList = [
  ]
  orgnization:any = ''
  multipleSelection:any = []
  value:any = ''
  data:any = [
    {}
  ]
  roleList:any = []
  role:any = ''
  created () {
    this.getData()
  }
  handleSelectionChange (val:any) {
    this.multipleSelection = val
    console.log(this.multipleSelection)
  }
  async getData () {
    try {
      [{ data: { data: this.roleList } }, { data: { data: this.organizationsList } }] = await Promise.all([
        Api.mainData.getRoles(),
        Api.mainData.getOrganizationsList()
      ])
    } catch (err) {
      throw err
    }
  }
}
</script>

<style lang="scss" scoped>
.customized-application {
  .application-header {
    &__tips {
      color: #9D9D9E;
      margin: 5px 0 10px;
      line-height: 17px;
    }
  }
}
/deep/.el-card__header{
  border: 0 !important;
}
.emptyTable {
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 200px);
  span {
    color:#b9b5b5d4;
  }
}
.main{
  display: flex;
  justify-content: space-between;
  &_right{
    display: flex;
  }
}
</style>
