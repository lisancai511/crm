<template>
  <div class="form-management">
    <el-card style="min-height: calc(100vh - 70px);"
             :body-style="{padding:0, paddingBottom: '30px'}">
      <div slot="header">
        <strong class="fs-16">假期余额</strong>
      </div>

      <div class="p-l-20 p-b-20">
        <div>
          <span class="m-r-10">部门/人员/角色</span>
          <el-select size="small"
                     @focus="dialogVisible=true"
                     v-model="value"
                     placeholder="请选择">
            <el-option v-for="item in 1"
                       :key="item"
                       :label="item"
                       :value="item">
            </el-option>
          </el-select>
        </div>
      </div>

      <div v-if="tableData[0]">
        <el-table :header-cell-style="{background:'#F8FAFC'}"
                  class="dd-table--card"
                  style="width: 100%"
                  :data="tableData">
          <el-table-column min-width="200" height="90%"
                           prop="userName"
                           fixed
                           label="姓名"></el-table-column>
          <el-table-column min-width="200"
                           label="部门">
            <template slot-scope="scope">
              <el-tag class="m-r-5"
                      size="mini"
                      v-for="item in scope.row.orgNames"
                      :key="item">{{item}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column min-width="200"
                           label="角色">
            <template slot-scope="scope">
              <el-tag class="m-r-5"
                      size="mini"
                      v-for="(item, index) in scope.row.roleNames"
                      :key="item+'_'+ index">{{item}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column  align="center" min-width="150" v-for="(item, index) in tableData[0].vacationBalances"
                           :key="item.vacationRuleId + index"
                           :label="item.minUnit==='Hour'?`${item.vacationRuleName}(小时)`:`${item.vacationRuleName}(天)`">
            <template slot-scope="scope">
              <div @click="gotoEdit(scope.row, item, index)">
                <span :class="scope.row.vacationBalances[index].isTarget?'active':null">
                  {{filterRule(scope.row.vacationBalances[index])}}
                </span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="block m-t-20">
          <el-pagination style="float:right"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page.sync="currentPage2"
                         :page-sizes="[10, 20, 30, 40]"
                         :page-size="10"
                         layout="sizes, prev, pager, next"
                         :total="total">
          </el-pagination>
        </div>
      </div>
    </el-card>

    <el-dialog :visible.sync="dialogVisible"
               width="600px">
      <ChoosePeople mode='orguser'
                    @cancel='cancel'
                    :peopleIdList="filter.userIds"
                    :roleIdList="filter.roleIds"
                    :orgIdList="filter.orgIds"
                    @chooseDone="chooseDone"></ChoosePeople>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Api from '@/api'
import ChoosePeople from '@/components/UserSelect/index.vue'
import lodash from 'lodash'

@Component({
  name: 'FormManagement',
  components: {
    ChoosePeople
  }
})
export default class FormManagement extends Vue {
  filter: any = {
    pageNo: 1,
    pageSize: 10,
    userIds: [],
    orgIds: [],
    roleIds: []
  }

  value: any = null

  dialogVisible: any = false

  total: number = 10

  currentPage2: any = 1

  tableData: any = []

  created () {
    this.getData()
  }

  gotoEdit (row: any, item: any, index:any) {
    if (row.vacationBalances[index].isTarget) {
      this.$router.push(
        this.$route.path +
          `/${row.userId}/edit?vacationRuleId=${item.vacationRuleId}`
      )
    } else {
      this.$message.error('该假期不适用于该用户')
    }
  }

  chooseDone (val: any) {
    if (val.value) {
      this.filter.userIds = val.peopleIdList
      this.filter.orgIds = val.orgIdList
      this.filter.roleIds = val.roleIdList
      this.getData()
    }
    this.dialogVisible = false
  }

  cancel () {
    this.dialogVisible = false
  }

  async handleSizeChange (val: any) {
    this.filter.pageSize = val
    this.getData()
  }

  async handleCurrentChange (val: any) {
    this.filter.pageNo = val
    this.getData()
  }

  filterRule (data: any) {
    if (!data.isTarget) {
      return '不适用'
    }
    if (data.isTarget && !data.canSetBalance) {
      return '不限制余额'
    } else {
      return data.vacationDay ? data.vacationDay : 0
    }
  }

  async getData () {
    const params = lodash.cloneDeep(this.filter)
    const data = await Api.jiliOa.getVacationsBalances(params)
    this.tableData = data.data.data.content
    this.total = data.data.data.total
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-card__header {
  border: none;
}
/deep/::-webkit-scrollbar {
  height: 8px;
}
/deep/::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: rgba(139, 137, 137, 0.1);
}
/deep/.el-table .cell {
  line-height: 26px;
}
.main {
  padding: 0 20px;
  &_right {
    display: flex;
  }
}
/deep/.el-dialog__header {
  padding: 0;
}
/deep/.el-dialog__body {
  padding: 0 !important;
}
.active {
  cursor: pointer;
  color: $dd--info-color;
  text-decoration: underline;
}
</style>
