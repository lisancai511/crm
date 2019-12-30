<template>
  <div class="form-management">
    <div class="main m-b-20">
      <span class="m-r-20">允许加班</span>
      <el-switch v-model="data.allowOvertime">
      </el-switch>
    </div>
    <div v-if="data.allowOvertime">
      <div class="main m-b-20">
        <span class="m-r-20">计算方式</span>
        <div class="main_body">
          <el-radio class="m-b-20"
                    v-model="data.computeType"
                    label="ApprovalDuration">按审批时长计算</el-radio>
          <el-radio class="m-b-20"
                    v-model="data.computeType"
                    label="PunchInDurationWithApproval">按打卡时长计算，无需审批</el-radio>
          <el-radio v-model="data.computeType"
                    label="PunchInDurationWithoutApproval">按打卡时长计算，且需审批</el-radio>
          <div v-if="data.computeType !== 'ApprovalDuration'"
               class="goOffWork">
            <div>
              <div class="goOffWork_title m-t-20 m-r-5">下班</div>
              <el-input-number style="width:100px"
                               size="mini"
                               v-model="data.includeAfterOffWorkMinutes"
                               controls-position="right"
                               :min="1"
                               :max="720"></el-input-number>
              <div class="goOffWork_title m-l-5">分钟之后，计入加班
              </div>
            </div>
            <div>
              <div class="goOffWork_title m-t-20 m-r-5">当天加班少于</div>
              <el-input-number style="width:100px"
                               size="mini"
                               v-model="data.notIncludeLessThanMinutes"
                               controls-position="right"
                               :min="1"
                               :max="720"></el-input-number>
              <div class="goOffWork_title m-l-5">分钟,不计入加班
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main m-b-20">
        <span class="m-r-20">扣除休息时间</span>
        <div class="main_body">
          <el-switch v-model="data.deductRestTime">
          </el-switch>
          <div v-if="data.deductRestTime">
            <div class="m-t-20">
              <el-radio @change="chooseOne($event, 'setRestTimePeriod')"
                        v-model="data.setRestTimePeriod"
                        :label="true">设置休息时段</el-radio>
              <div class="m-t-20">
                <el-time-picker :disabled="!data.setRestTimePeriod"
                                is-range
                                size="mini"
                                format="HH:mm:ss"
                                value-format="HH:mm:ss"
                                v-model="value1"
                                range-separator="至"
                                start-placeholder="开始时间"
                                end-placeholder="结束时间"
                                placeholder="选择时间范围">
                </el-time-picker>
              </div>
            </div>
            <div class="m-t-20">
              <el-radio @change="chooseOne($event, 'deductByOvertime')"
                        :label="true"
                        v-model="data.deductByOvertime">按加班时长扣除</el-radio>
              <div class="m-t-20">
                每天满 <el-input-number :disabled="!data.deductByOvertime"
                                 style="width:100px"
                                 size="mini"
                                 v-model="data.deductByOvertimeBaseHours"
                                 controls-position="right"
                                 :min="1"
                                 :max="24"></el-input-number> 小时，扣除
                <el-input-number :disabled="!data.deductByOvertime"
                                 style="width:100px"
                                 size="mini"
                                 v-model="data.deductByOvertimeDeductHours"
                                 controls-position="right"
                                 :min="1"
                                 :max="24"></el-input-number>小时
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main m-b-20">
        <span class="m-r-20">记为调休或加班费</span>
        <div class="main_body">
          <el-switch v-model="data.setAsRestOrOvertimeFee">
          </el-switch>
          <div v-if="data.setAsRestOrOvertimeFee"
               class="m-t-20">
            <el-radio-group @change="changeRadio" v-model="radio">
              <div>
                <el-radio label="setAsRestRatioTo">按1: <el-input-number style="width:100px"
                                   size="mini"
                                   :disabled="radio !== 'setAsRestRatioTo'"
                                   v-model="data.setAsRestRatioTo"
                                   controls-position="right"
                                   :min="1"
                                   :max="24"></el-input-number> 计为“产假”时长 </el-radio>

              </div>
              <div class="m-t-20">
                <el-radio label="setOvertimeFee">计为加班费</el-radio>

              </div>
              <div class="m-t-20">
                <el-radio label="setAsRestToVoidAfterDays">按1: <el-input-number style="width:100px"
                                   size="mini"
                                   :disabled="radio !== 'setAsRestToVoidAfterDays'"
                                   v-model="data.setAsRestToVoidAfterDays"
                                   controls-position="right"
                                   :min="1"
                                   :max="24"></el-input-number> 计为“产假”时长 </el-radio>

              </div>
            </el-radio-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
// import Api from '@/api'

@Component({
  name: 'OvertimeRules'
})
export default class FormManagement extends Vue {
  @Prop() data: any
  value1: any = [this.data.restTimeFrom, this.data.restTimeTo]
  radio: any = 'setAsRestRatioTo'
  chooseOne (val: any, type: any) {
    if (type === 'deductByOvertime') {
      this.data.setRestTimePeriod = false
    } else {
      this.data.deductByOvertime = false
    }
  }

  changeRadio (val:any) {
    if (val === 'setAsRestRatioTo') {
      this.data.setAsRestToVoidAfterDays = null
      this.data.setOvertimeFee = null
    }
    if (val === 'setAsRestToVoidAfterDays') {
      this.data.setAsRestRatioTo = null
      this.data.setOvertimeFee = null
    }
    if (val === 'setOvertimeFee') {
      this.data.setOvertimeFee = true
      this.data.setAsRestToVoidAfterDays = null
      this.data.setAsRestRatioTo = null
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  color: #666;
  display: flex;
  > span {
    display: inline-block;
    width: 112px;
    text-align: right;
  }
  &_body {
    display: flex;
    flex-direction: column;
  }
}
.goOffWork {
  &_title {
    display: inline-block;
    height: 100%;
    line-height: 1;
  }
}
</style>
