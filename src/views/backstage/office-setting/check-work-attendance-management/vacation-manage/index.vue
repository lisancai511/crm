<template>
  <div class="form-management">
    <el-card style="min-height: calc(100vh - 70px);"
             :body-style="{padding:0}">
      <div slot="header">
        <strong class="fs-16">假期管理</strong>
      </div>
      <div class="m-l-20 m-b-20">
        <el-button @click="goToAddCacation"
                   type="primary"
                   size="mini">添加假期</el-button>
      </div>
      <div>
        <el-table :header-cell-style="{background:'#F8FAFC'}"
                  class="dd-table--card"
                  :data="vacationsData">
          <el-table-column prop="name"
                           label="假期类型"></el-table-column>
          <el-table-column label="请假单位">
            <template slot-scope="scope">
              {{ scope.row.minUnit | filterMinUnit }}
            </template></el-table-column>
          <el-table-column label="请假计算方式">
            <template slot-scope="scope">
              {{ scope.row.dayType | filterDayType }}
            </template>
          </el-table-column>
          <el-table-column label="余额规则">
            <template slot-scope="scope">
              {{canSetBalanceRule(scope.row)}}
            </template>
          </el-table-column>
          <el-table-column label="适用范围">
            <template slot-scope="scope">
              <span v-if="!scope.row.targets">全公司</span>
              <div v-else>
                <span v-if="scope.row.targets.orgIdList.length">{{scope.row.targets.orgIdList.length}}个组织，</span>
                <span v-if="scope.row.targets.roleIdList.length">{{scope.row.targets.roleIdList.length}}个角色，</span>
                <span v-if="scope.row.targets.peopleIdList.length">{{scope.row.targets.peopleIdList.length}}个人</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="200px"
                           align="center"
                           label="操作">
            <template slot-scope="scope">
              <el-button class="p-v-0 dd-button__text dd-button__text--info"
                         @click="editMenu(scope.row)"
                         type="text">
                <dd-icon name='edit'></dd-icon> 编辑
              </el-button>
              <el-button class="p-v-0 dd-button__text dd-button__text--info"
                         @click="deleteData(scope.row)"
                         type="text">
                <dd-icon name='delete'></dd-icon> 删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block m-t-20">
          <el-pagination class="m-b-30"
                         style="float:right"
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Api from '@/api'
import ChoosePeople from '@/components/UserSelect/index.vue'

@Component({
  name: 'FormManagement',
  components: {
    ChoosePeople
  },
  filters: {
    filterMinUnit (val: any) {
      switch (val) {
        case 'Hour':
          return '按小时请假'
        case 'HalfDay':
          return '按半天请假'
        case 'Day':
          return '按天请假'
      }
    },
    filterDayType (val: any) {
      switch (val) {
        case 'NaturalDay':
          return '按自然日计算请假时长'
        case 'WorkingDay':
          return '按工作日计算请假时长'
      }
    }
  }
})
export default class FormManagement extends Vue {
  filter: any = {
    pageSize: 10,
    pageNo: 1
  }

  total: number = 10

  currentPage2: any = 1

  showChooseRole: any = true
  peopleIdList: any = []
  roleIdList: any = []
  orgIdList: any = []
  data: any = {
    peopleIdList: [],
    roleIdList: [],
    orgIdList: []
  }

  scopeOfApplication (row: any) {
    if (row.targets) {
      return `${row.targets.orgIdList.length}个组织`
    } else {
      return '全公司'
    }
  }

  async handleSizeChange (val: any) {
    this.filter.pageSize = val
    this.getData()
  }

  async handleCurrentChange (val: any) {
    this.filter.pageNo = val
    this.getData()
  }

  vacationsData: any = []
  created () {
    this.getData()
  }

  canSetBalanceRule (row: any) {
    if (row.canSetBalance) {
      if (row.balanceAddingType === 'ManualAdding') {
        return '手动发放'
      } else if (row.balanceAddingType === 'AddingOneTimePerYear') {
        let str:string = ''
        str = row.minUnit === 'Hour' ? '小时' : '天'
        return row.addingDate === 'EmployeeEntryDay' ? `每年的入职日自动发放,${row.quota}${str}` : `每年的1月1日自动发放,${row.quota}${str}`
      } else {
        return '加班时长自动计入余额'
      }
    } else {
      return '不限制余额'
    }
  }

  editMenu (row: any) {
    this.$router.push({
      path: this.$route.path + `/${row.id}/edit-vacation`
    })
  }

  async deleteData (row: any) {
    this.$confirm('此操作将永久删除该假期, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        await Api.jiliOa.deleteVacations(row.id)
        this.getData()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
  }

  async getData () {
    const data = await Api.jiliOa.getVacationsList(this.filter)
    this.vacationsData = data.data.data.content
    this.total = data.data.data.total
    this.vacationsData.forEach((item: any) => {
      if (item.targets) {
        const arr = item.targets
        item.targets = {
          peopleIdList: [],
          roleIdList: [],
          orgIdList: []
        }
        arr.forEach((item0: any) => {
          if (item0.targetType === 'Org') {
            item.targets.orgIdList.push(item0.targetId)
          }
          if (item0.targetType === 'User') {
            item.targets.peopleIdList.push(item0.targetId)
          }
          if (item0.targetType === 'Role') {
            item.targets.roleIdList.push(item0.targetId)
          }
        })
      }
    })
  }

  goToAddCacation () {
    this.$router.push(this.$route.path + '/add-vacation')
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-card__header {
  border: none;
}
</style>
