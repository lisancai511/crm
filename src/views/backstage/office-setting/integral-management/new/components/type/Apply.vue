<template>
  <div class="businessForm m-b-30">
    <div class="title">分值</div>
    <div class="title">
      <el-row>
        <el-col style="line-height:28px;"
                :span="5">
          <el-radio @change="changeRadio" v-model="data.applyScoreMeasureConfig.scoreType"
                    label="Fixed">固定分支</el-radio>
        </el-col>
        <el-col :span="18">
          <el-input size="mini"
                    style="width:100px;"
                    v-model.number="input"
                    placeholder="请输入内容"></el-input>
          <el-radio class="m-l-30" @change="changeRadio"
                    v-model="data.applyScoreMeasureConfig.scoreType"
                    label="Unlimited">不限制</el-radio>
        </el-col>
      </el-row>

    </div>
    <div class="title">
      <el-row>
        <el-col style="line-height:28px;"
                :span="5">
          <el-radio @change="changeRadio" v-model="data.applyScoreMeasureConfig.scoreType"
                    label="Range">区 间</el-radio>
        </el-col>
        <el-col :span="18">
          <el-input size="mini"
                    style="width:100px;"
                    v-model.number="data.applyScoreMeasureConfig.rangeScoreFrom"
                    placeholder="请输入内容"></el-input>
          <span> 分 至 </span>
          <el-input size="mini"
                    style="width:100px;"
                    v-model.number="data.applyScoreMeasureConfig.rangeScoreTo"
                    placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="title">
      加减分
      <el-radio class="m-l-20"
                v-model="data.applyScoreMeasureConfig.direction"
                label="add">加 分</el-radio>
      <el-radio v-model="data.applyScoreMeasureConfig.direction"
                label="reduce">减 分</el-radio>
    </div>
    <div class="title">
      积分申请原因
      <el-radio class="m-l-20"
                v-model="data.applyScoreMeasureConfig.reasonRequired"
                :label="true">必 填</el-radio>
      <el-radio v-model="data.applyScoreMeasureConfig.reasonRequired"
                :label="false">选 填</el-radio>
    </div>
    <div class="title">
      积分事件发生时间
      <el-radio class="m-l-20"
                v-model="data.applyScoreMeasureConfig.timeRequired"
                :label="true">必 填</el-radio>
      <el-radio v-model="data.applyScoreMeasureConfig.timeRequired"
                :label="false">选 填</el-radio>
    </div>
    <div class="title">
      赋值目标：<span>被申请人</span>
    </div>
    <div class="title">
      上传照片
      <el-checkbox class="m-l-20"
                   v-model="data.applyScoreMeasureConfig.needPhoto">申请时需上传照片</el-checkbox>
    </div>
    <div class="title">
      配置审批流
     <!-- TODO 选择一个审批流 -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'EssentialInformation'
})
export default class EssentialInformation extends Vue {
  @Prop() private data: any
  input: any = 0
  value: any = ''
  latestApplyTimeValue:any = ''
  created () {
  }

  changeRadio (val:any) {
    this.data.applyScoreMeasureConfig.scoreType = val
  }
}
</script>

<style lang="scss" scoped>
.businessForm {
  .title {
    margin: 20px 0 10px;
    font-weight: bold;
    span {
      font-weight: normal;
      color: #666;
    }
  }
}
</style>
