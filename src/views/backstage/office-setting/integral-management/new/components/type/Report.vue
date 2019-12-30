<template>
  <div class="businessForm">
    <div class="title">类型</div>
    <el-select style="width: 100%;"
               @change="()=>{this.$forceUpdate()}"
               v-model="data.typeInSource"
               placeholder="请选择">
      <el-option v-for="item in options"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
      </el-option>
    </el-select>
    <div class="title">触发操作</div>
    <el-select @change="()=>{this.$forceUpdate()}"
               style="width: 100%;"
               v-model="data.eventType"
               placeholder="请选择">
      <el-option v-for="item in options1"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
      </el-option>
    </el-select>
    <div class="title">
      赋值目标：<span>操作人</span>
    </div>
    <div class="m-b-10"
         v-if="this.data.reportScoreMeasureConfig.define && this.data.reportScoreMeasureConfig.define.computeRules[0]">
      <span style="font-weight:600">单次计算：</span>{{this.data.reportScoreMeasureConfig.define.computeRules[0].direction==='Add'?'加':'减'}}
      {{this.data.reportScoreMeasureConfig.define.computeRules[0].score}} 分
    </div>
    <div class="m-b-10"
         v-if="this.data.reportScoreMeasureConfig.define.computeRules[1] && this.data.reportScoreMeasureConfig.define.computeRules[1].ruleItems.length>0">
      <span style="font-weight:600">累计计算频次：</span>
      <el-select class="m-t-10 m-b-10"
                 style="width:100%;"
                 disabled
                 v-model="data.reportScoreMeasureConfig.define.computeRules[1].frequencyType"
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
             v-for="(item, index) in data.reportScoreMeasureConfig.define.computeRules[1].ruleItems"
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
      <ReportRules :data="data"></ReportRules>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ReportRules from './components/ReportRules.vue'

@Component({
  name: 'EssentialInformation',
  components: {
    ReportRules
  }
})
export default class EssentialInformation extends Vue {
  flag: any = false
  drawer: any = false
  options: any = [
    { label: '日志', value: 'DailyReport' },
    { label: '周报', value: 'WeeklyReport' },
    { label: '月报', value: 'MonthlyReport' }
  ]

  options1: any = [
    { label: '创建', value: 'Created' },
    { label: '迟交', value: 'Delayed' },
    { label: '未创建', value: 'NotCreated' }
  ]

  frequencyType: any = [
    { label: '每天', value: 'ByDay' },
    { label: '每周', value: 'ByWeek' },
    { label: '每月', value: 'ByMounth' },
    { label: '每季度', value: 'BySeason' },
    { label: '每年', value: 'ByYear' }
  ]

  value: any = ''
  @Prop() private data: any
  getRoles (item: any) {
    const add = item.direction === 'Add' ? '加' : '减'
    if (item.seq !== '介于') {
      const str =
        item.condition[1].operator +
        item.condition[1].value +
        '天则' +
        add +
        item.score
      return str
    }
    const str1 =
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

  deleteRule (index:any) {
    this.data.reportScoreMeasureConfig.define.computeRules[1].ruleItems.splice(index, 1)
  }
}
</script>

<style lang="scss" scoped>
.businessForm {
  .title {
    margin: 20px 0 10px;
    font-weight: bold;
    span {
      color: #b8b8b8;
    }
  }
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
