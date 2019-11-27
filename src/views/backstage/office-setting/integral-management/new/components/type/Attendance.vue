<template>
  <div class="businessForm">
    <span class="subTitle">使用积励软件考勤打卡，考勤积分将根据以下规则自动计算</span>
    <div class="title">类型</div>
    <el-select style="width: 100%;"
               @change="()=>{this.$forceUpdate()}"
               v-model="data.eventType"
               placeholder="请选择">
      <el-option v-for="item in options"
                 :key="item.label"
                 :label="item.label"
                 :value="item.value">
      </el-option>
    </el-select>
    <div class="title">
      赋值目标：<span>操作人</span>
    </div>
    <div class="m-b-10"
         v-if="this.data.attendanceScoreMeasureConfig.define && this.data.attendanceScoreMeasureConfig.define.computeRules[0] && data.attendanceScoreMeasureConfig.define.computeRules[0].score">
      <span style="font-weight:600">单次计算：</span>{{this.data.attendanceScoreMeasureConfig.define.computeRules[0].direction==='Add'?'加':'减'}}
      {{this.data.attendanceScoreMeasureConfig.define.computeRules[0].score}} 分
    </div>
    <div class="m-b-10"
         v-if="this.data.attendanceScoreMeasureConfig.define && this.data.attendanceScoreMeasureConfig.define.computeRules[0]">
      <span style="font-weight:600">累计计算频次：</span>
      <el-select class="m-t-10 m-b-10"
                 style="width:100%;"
                 disabled
                 v-model="data.attendanceScoreMeasureConfig.define.computeRules[1].frequencyType"
                 placeholder="请选择">
        <el-option v-for="item in frequencyType"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
      <span style="font-weight:600">给分规则</span>
      <div>
        <div class="m-t-10"
             v-for="(item, index) in data.attendanceScoreMeasureConfig.define.computeRules[1].ruleItems"
             :key="item.seq+'_'+index">
          {{getRoles(item)}} 分
          <dd-icon class="dd-click"
                   @click.native="deleteRule(index)"
                   style="float:right"
                   name="delete"></dd-icon>
        </div>
      </div>

    </div>
    <div class="title">
      <el-button @click="drawer=true"
                 type="primary"
                 size="mini">＋ 添加积分规则</el-button>
    </div>

    <el-drawer title="我是标题"
               :visible.sync="drawer">
      <AttendanceRules :data="data"></AttendanceRules>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import AttendanceRules from './components/AttendanceRules.vue'

@Component({
  name: 'Attendance',
  components: {
    AttendanceRules
  }
})
export default class Attendance extends Vue {
  drawer: any = false
  frequencyType: any = [
    { label: '每天一次', value: 'ByDay' },
    { label: '每周一次', value: 'ByWeek' },
    { label: '每月一次', value: 'ByMounth' },
    { label: '每季度一次', value: 'BySeason' },
    { label: '每年一次', value: 'ByYear' }
  ]
  options: any = [
    { label: '迟到', value: 'Late' },
    { label: '早退', value: 'LeaveEarly' },
    { label: '满勤', value: 'FullAttendance' },
    { label: '缺卡', value: 'MissingCard' },
    { label: '旷工', value: 'Absenteeism' },
    { label: '外勤', value: 'OutsidePunchCards' },
    { label: '正常打卡', value: 'NormalPunchCards' },
    { label: '加班', value: 'Overtime' },
    { label: '请假', value: 'Leave' },
    { label: '出差', value: 'BusinessTravel' },
    { label: '外出', value: 'GoOut' }
  ]
  value: any = ''
  @Prop() private data: any
  deleteRule (index:any) {
    console.log(index)
    this.data.attendanceScoreMeasureConfig.define.computeRules[1].ruleItems.splice(index, 1)
  }
  getRoles (item: any) {
    let add = item.direction === 'Add' ? '加' : '减'
    if (item.seq !== '介于') {
      let str =
        item.condition[1].operator +
        item.condition[1].value +
        '天则' +
        add +
        item.score
      return str
    }
    let str1 =
      item.condition[0].operator +
      item.condition[0].value +
      '且' +
      item.condition[1].operator +
      item.condition[1].value +
      '天则' +
      add +
      item.score
    return str1
  }
}
</script>

<style lang="scss" scoped>
.businessForm {
  .title {
    margin: 20px 0 10px;
    font-weight: bold;
  }
}
.subTitle {
  color: #999;
  font-size: 12px;
  display: inline-block;
  margin: 5px 0;
}
/deep/.el-drawer {
  width: 700px !important;
  padding-top: 30px;
  overflow-y: scroll;
}
/deep/.el-drawer__header {
  display: none;
}
</style>
