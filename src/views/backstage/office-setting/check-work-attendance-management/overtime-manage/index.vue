<template>
  <div class="form-management">
    <el-card style="min-height: calc(100vh - 70px);" :body-style="{padding:0}">
      <div slot="header">
        <strong class="fs-16">加班规则</strong>
      </div>
      <div class="m-l-20 m-b-20">
        <el-button @click="goToAddCacation"
                   type="primary"
                   size="mini">新增加班规则</el-button>
      </div>
      <div class="m-b-30">
        <el-table :header-cell-style="{background:'#F8FAFC'}"
                  class="dd-table--card"
                  :data="vacationsData.content">
          <el-table-column prop="name"
                           label="加班规则名称"></el-table-column>
          <el-table-column label="规则内容">
            <template slot-scope="scope">
              <div>
                {{getWorkingDay(scope.row)}}
              </div>
              <div>
                {{getRestDay(scope.row)}}
              </div>
              <div>
                {{getHoliday(scope.row)}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
                           label="适用范围">
             <template slot-scope="scope">
                {{ scope.row.targets | filterTargets }}
            </template>
          </el-table-column>
          <el-table-column width="200px"
                           align="center"
                           label="操作">
            <template slot-scope="scope">
              <el-button class="p-v-0 dd-button__text dd-button__text--info"
                         @click="goToAddCacation(scope.row)"
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
      </div>
      <div class="m-l-20 m-b-30">
        <strong class="fs-16">加班规则 <span @click="()=>{$router.push(this.$route.path+'/update-overtime-rule')}"
                class="edit fs-12 m-l-10">
            <dd-icon name="edit"></dd-icon> 修改
          </span></strong>
        <div class="foot">
          <span class="m-t-20 m-b-10">最小加班单位：{{baseConfig.minOvertimeUnit | filterMinOvertimeUnit}}</span>
          <span>日折算时长：{{baseConfig.overtimeHoursToOneDay}}小时 = 1天</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Api from '@/api'

@Component({
  name: 'FormManagement',
  filters: {
    filterMinOvertimeUnit (val: any) {
      switch (val) {
        case 'HalfDay':
          return '按半天加班'
        case 'Day':
          return '按天加班'
        case 'Minute':
          return '按分钟加班'
        case 'Hour':
          return '按小时加班'
        case 'HalfHour':
          return '按半小时加班'
      }
    },
    filterTargets (val:any) {
      if (val) {
        return val.length === 1 ? val[0].attendanceGroupName : `${val[0].attendanceGroupName}等${val.length}个考勤组`
      } else {
        return '未使用'
      }
    }
  }
})
export default class FormManagement extends Vue {
  filter: any = {
    pageSize: 10,
    pageNo: 1
  }

  baseConfig: any = {}
  vacationsData: any = []

  created () {
    this.getData()
  }

  async getData () {
    try {
      const [
        {
          data: { data: vacationsData }
        },
        {
          data: { data: baseConfig }
        }
      ] = await Promise.all([
        Api.jiliOa.getOvertimeRules(this.filter),
        Api.jiliOa.getOvertimeRulesBaseConfig()
      ])
      this.vacationsData = vacationsData
      this.baseConfig = baseConfig
    } catch (e) {
      console.log(e)
    }
  }

  getWorkingDay (row: any) {
    let str: any
    if (row.overtimeRuleItems) {
      if (row.overtimeRuleItems[0].allowOvertime) {
        switch (row.overtimeRuleItems[0].computeType) {
          case 'ApprovalDuration':
            str = '按审批时长计算'
            break
          case 'PunchInDurationWithApproval':
            str = '在审批的时段内，按打卡时长计算'
            break
          case 'PunchInDurationWithoutApproval':
            str = '无需审批，按打卡时长计算'
        }
      } else {
        str = '不允许加班'
      }
    }
    return '工作日：' + str
  }

  getRestDay (row: any) {
    let str: any
    if (row.overtimeRuleItems) {
      if (row.overtimeRuleItems[1].allowOvertime) {
        switch (row.overtimeRuleItems[1].computeType) {
          case 'ApprovalDuration':
            str = '按审批时长计算'
            break
          case 'PunchInDurationWithApproval':
            str = '在审批的时段内，按打卡时长计算'
            break
          case 'PunchInDurationWithoutApproval':
            str = '无需审批，按打卡时长计算'
        }
      } else {
        str = '不允许加班'
      }
    }
    return '休息日：' + str
  }

  getHoliday (row: any) {
    let str: any
    if (row.overtimeRuleItems) {
      if (row.overtimeRuleItems[2].allowOvertime) {
        switch (row.overtimeRuleItems[2].computeType) {
          case 'ApprovalDuration':
            str = '按审批时长计算'
            break
          case 'PunchInDurationWithApproval':
            str = '在审批的时段内，按打卡时长计算'
            break
          case 'PunchInDurationWithoutApproval':
            str = '无需审批，按打卡时长计算'
        }
      } else {
        str = '不允许加班'
      }
    }
    return '节假日：' + str
  }

  async deleteData (row: any) {
    this.$confirm('此操作将永久删除该假期, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        await Api.jiliOa.deleteOvertimeRules(row.id)
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

  goToAddCacation (row?: any) {
    if (row.id) {
      this.$router.push(this.$route.path + `/${row.id}/edit-overtime`)
    } else {
      this.$router.push(this.$route.path + '/add-overtime')
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-card__header {
  border: none;
}
.foot {
  display: flex;
  flex-direction: column;
}
.edit {
  font-weight: normal;
  color: $dd--info-color;
  cursor: pointer;
}
</style>
