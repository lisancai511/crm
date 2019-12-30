<template>
  <div class="form-management">
    <el-card :body-style="{padding:0}">
      <div slot="header">
        <strong class="fs-16">新建加班规则</strong>
      </div>
      <div class="main">
        <div class="main_item m-b-20">
          <span class="m-b-5">规则名称</span>
          <div>
            <el-input v-model="data.name"
                      size="small"
                      style="width: 200px;"
                      placeholder="请输入"></el-input>
            <span class="fs-12 m-l-20">最多10个字符</span>
          </div>
        </div>
        <div class="main_item m-b-20">
          <span class="m-b-5">适用范围</span>
          <el-select style="width: 200px;" v-model="data.targets"
                     multiple
                     placeholder="请选择">
            <el-option v-for="item in grounList"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div>
          <el-tabs v-model="activeName">
            <el-tab-pane label="工作日"
                         name="first">
              <OvertimeRules :data="data.overtimeRuleItems[0]"
                             class="tabs"></OvertimeRules>
            </el-tab-pane>
            <el-tab-pane label="休息日"
                         name="second">
              <OvertimeRules :data="data.overtimeRuleItems[1]"
                             class="tabs"></OvertimeRules>
            </el-tab-pane>
            <el-tab-pane label="节假日"
                         name="third">
              <OvertimeRules :data="data.overtimeRuleItems[2]"
                             class="tabs"></OvertimeRules>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="m-t-20 m-b-30">
          <el-button @click="saveData"
                     size="small"
                     type="primary">保存</el-button>
          <el-button @click="$router.go(-1)"
                     size="small">返回</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import OvertimeRules from './components/OvertimeRules.vue'
import Api from '@/api'

@Component({
  name: 'FormManagement',
  components: {
    OvertimeRules
  }
})
export default class FormManagement extends Vue {
  activeName: any = 'first'
  grounList: any = []
  data: any = {
    name: null, // 加班规则名称
    targets: [], // 适用范围
    overtimeRuleItems: [
      {
        dayType: 'WorkingDay', // 日期类型：WorkingDay(工作日), RestDay(休息日), Holiday(节假日)
        allowOvertime: true, // 是否允许加班
        computeType: 'ApprovalDuration', // 计算方式：ApprovalDuration(按审批时长计算), PunchInDurationWithApproval(在审批的时段内，按打卡时长计算), PunchInDurationWithoutApproval(无需审批，按打卡时长计算)
        includeAfterOffWorkMinutes: 30, // 下班多少分钟之后，计入加班
        notIncludeLessThanMinutes: 30, // 当天加班少于多少分钟，不计入加班
        deductRestTime: false, // 扣除休息时间
        setRestTimePeriod: true, // 设置休息时间段
        restTimeFrom: '11:00:00', // 休息时间段的开始时间
        restTimeTo: '13:00:00', // 休息时间段的结束时间
        deductByOvertime: false, // 按加班时长扣除
        deductByOvertimeBaseHours: 5, // 加班多少个小时
        deductByOvertimeDeductHours: 1, // 扣除多少个小时
        setAsRestOrOvertimeFee: true, // 计为调休或加班费
        setAsRestRatioTo: null, // 按多少比率记为调休时长
        setOvertimeFee: null, // 记为加班费
        setAsRestToVoidAfterDays: null // 员工申请加班时可选择，计为加班费或者按1：多少的记为调休
      },
      {
        dayType: 'RestDay', // 日期类型：WorkingDay(工作日), RestDay(休息日), Holiday(节假日)
        allowOvertime: true, // 是否允许加班
        computeType: 'ApprovalDuration', // 计算方式：ApprovalDuration(按审批时长计算), PunchInDurationWithApproval(在审批的时段内，按打卡时长计算), PunchInDurationWithoutApproval(无需审批，按打卡时长计算)
        includeAfterOffWorkMinutes: 30, // 下班多少分钟之后，计入加班
        notIncludeLessThanMinutes: 30, // 当天加班少于多少分钟，不计入加班
        deductRestTime: false, // 扣除休息时间
        setRestTimePeriod: true, // 设置休息时间段
        restTimeFrom: '11:00:00', // 休息时间段的开始时间
        restTimeTo: '13:00:00', // 休息时间段的结束时间
        deductByOvertime: false, // 按加班时长扣除
        deductByOvertimeBaseHours: 5, // 加班多少个小时
        deductByOvertimeDeductHours: 1, // 扣除多少个小时
        setAsRestOrOvertimeFee: true, // 计为调休或加班费
        setAsRestRatioTo: null, // 按多少比率记为调休时长
        setOvertimeFee: null, // 记为加班费
        setAsRestToVoidAfterDays: null // 员工申请加班时可选择，计为加班费或者按1：多少的记为调休
      },
      {
        dayType: 'Holiday', // 日期类型：WorkingDay(工作日), RestDay(休息日), Holiday(节假日)
        allowOvertime: true, // 是否允许加班
        computeType: 'ApprovalDuration', // 计算方式：ApprovalDuration(按审批时长计算), PunchInDurationWithApproval(在审批的时段内，按打卡时长计算), PunchInDurationWithoutApproval(无需审批，按打卡时长计算)
        includeAfterOffWorkMinutes: 30, // 下班多少分钟之后，计入加班
        notIncludeLessThanMinutes: 30, // 当天加班少于多少分钟，不计入加班
        deductRestTime: false, // 扣除休息时间
        setRestTimePeriod: true, // 设置休息时间段
        restTimeFrom: '11:00:00', // 休息时间段的开始时间
        restTimeTo: '13:00:00', // 休息时间段的结束时间
        deductByOvertime: false, // 按加班时长扣除
        deductByOvertimeBaseHours: 5, // 加班多少个小时
        deductByOvertimeDeductHours: 1, // 扣除多少个小时
        setAsRestOrOvertimeFee: true, // 计为调休或加班费
        setAsRestRatioTo: null, // 按多少比率记为调休时长
        setOvertimeFee: null, // 记为加班费
        setAsRestToVoidAfterDays: null // 员工申请加班时可选择，计为加班费或者按1：多少的记为调休
      }
    ]
  }

  created () {
    if (this.id) {
      this.getData()
    }
  }

  get id () {
    return this.$route.params.id
  }

  async saveData () {
    if (!this.data.name) {
      this.$message.error('请输入加班规则名称')
    } else {
      if (this.id) {
        // this.data.targets = this.data.targets.map((item: any) => {
        //   return item.attendanceGroupId
        // })
        const data = await Api.jiliOa.updateOvertimeRules(this.data)
        if (data.data.success) {
          this.$message.success('修改成功')
          this.$router.go(-1)
        }
      } else {
        const data = await Api.jiliOa.addOvertimeRules(this.data)
        if (data.data.success) {
          this.$message.success('添加成功')
          this.$router.go(-1)
        }
      }
    }
  }

  async getData () {
    const data = await Api.jiliOa.getOvertimeRule(this.id)
    this.data = data.data.data
    if (this.data.targets) {
      this.data.targets = this.data.targets.map((item: any) => {
        return item.attendanceGroupId
      })
    }
    const res = await Api.jiliOa.getAttendanceGroupsList()
    this.grounList = res.data.data.page.content
    console.log(res.data.data.page.content, 79)
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-card__header {
  border: none;
}
.main {
  padding: 0 20px;
  &_item {
    display: flex;
    flex-direction: column;
    span {
      color: #666;
    }
  }
  &_subTitle {
    font-weight: bold;
    span {
      color: $dd--color-text-placeholder;
    }
  }
}
.tabs {
  width: 100%;
  border: 1px solid #e4e7ed;
  padding: 20px;
}
/deep/.el-tabs__header {
  margin: 0;
}
/deep/.el-tabs__nav-wrap::after {
  height: 0;
}
</style>
