<template>
  <div class="NewIntegralRule">

    <div class="mainTitle">
      添加积分规则
    </div>
    <div class="subTitle m-t-10">
      您可以为一个指标同时设置单次计算规则和累计计算规则或仅设置其中一种。
    </div>
    <div class="subTitle">
      例：单次：加班1次给10分；累计：每周加班3次的，再每次加班给10分的基础上再给20分
    </div>

    <div class="m-t-30">
      <el-radio v-model="isShowSingle"
                label="0">单次计算</el-radio>
      <el-radio v-model="isShowSingle"
                label="1">累计计算</el-radio>
    </div>
    <div v-if="isShowSingle === '0'"
         class="num m-t-30">
      积分分值
      <el-input class="m-t-10"
                v-model="computeRules[0].score"
                style="width:100%;"></el-input>
      <div class="m-t-30">
        加减分
        <el-radio class="m-l-20"
                  v-model="computeRules[0].direction"
                  label="Add">加分</el-radio>
        <el-radio v-model="computeRules[0].direction"
                  label="Reduce">减分</el-radio>
      </div>
    </div>
    <div v-else
         class="num m-t-30">
      累计计算频率
      <el-select class="m-t-10 m-b-30"
                 style="width:100%;"
                 v-model="computeRules[1].frequencyType"
                 placeholder="请选择">
        <el-option v-for="item in frequencyType"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
      <div>
        给分规则
      </div>
      <div v-for="(item,index) in computeRules[1].ruleItems"
           :key="item.seq+'_'+index">
        <div class="m-t-20">
          <el-input-number v-if="item.seq==='介于'"
                           v-model="item.condition[0].value"
                           style="width:86px;"
                           size="mini"
                           controls-position="right"></el-input-number>
          <el-select v-if="item.seq==='介于'"
                     style="width:60px;"
                     size="mini"
                     v-model="item.condition[0].operator"
                     placeholder="请选择">
            <el-option v-for="item in options2"
                       :key="item.label"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          <el-select style="width:80px;"
                     size="mini"
                     v-model="item.seq"
                     placeholder="请选择">
            <el-option v-for="item in options"
                       :key="item.label"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          <el-select v-if="item.seq==='介于'"
                     style="width:60px;"
                     size="mini"
                     v-model="item.condition[1].operator"
                     placeholder="请选择">
            <el-option v-for="item in options2"
                       :key="item.label"
                       :label="item.label"
                       :value="item.label">
            </el-option>
          </el-select>
          <el-input-number v-model="item.condition[1].value"
                           style="width:86px;"
                           size="mini"
                           controls-position="right"></el-input-number>
          <span class="m-l-10 m-r-10">天则</span>
          <el-select style="width:80px;"
                     size="mini"
                     v-model="item.direction">
            <el-option v-for="item in options1"
                       :key="item.label"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          <el-input-number v-model="item.score"
                           style="width:86px;"
                           size="mini"
                           controls-position="right"></el-input-number>
          <span class="m-l-10 m-r-10">分</span>
          <dd-icon @click.native="deleteRules(index)"
                   class="dd-click"
                   name="delete"></dd-icon>
        </div>
      </div>
      <div class="m-t-20">
        <el-button type="primary"
                   @click="addRules"
                   size="mini">＋ 添加积分规则</el-button>
      </div>
    </div>
    <div class="m-t-20 m-b-30">
        <el-button @click="saveData" style="float:right"
                   type="primary">确认添加</el-button>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import lodash from 'lodash'

@Component({
  name: 'EssentialInformation'
})
export default class EssentialInformation extends Vue {
  isShowSingle: any = '0'
  computeRules: any = [
    {
      computeType: 'SingleTime',
      score: '',
      direction: 'Add'
    },
    {
      computeType: 'ByTrigger',
      eventType: 'Created',
      frequencyType: 'ByDay',
      ruleItems: [
        {
          seq: '<',
          condition: [
            {
              operator: '<',
              value: '3'
            },
            {
              operator: '<',
              value: '8'
            }
          ],
          direction: 'Add',
          score: 100
        }
      ]
    }
  ]
  drawer: any = false
  choose: any = false
  less: any = '小于'
  options: any = [
    { label: '<', value: '<' },
    { label: '≤', value: '≤' },
    { label: '=', value: '=' },
    { label: '>', value: '>' },
    { label: '≥', value: '≥' },
    { label: '介于', value: '介于' }
  ]
  frequencyType: any = [
    { label: '每天一次', value: 'ByDay' },
    { label: '每周一次', value: 'ByWeek' },
    { label: '每月一次', value: 'ByMounth' },
    { label: '每季度一次', value: 'BySeason' },
    { label: '每年一次', value: 'ByYear' }
  ]
  option: any = [{ label: '合同' }, { label: '迟到' }, { label: '早退' }]
  value: any = ''
  options1: any = [
    { label: '加', value: 'Add' },
    { label: '减', value: 'Reduce' }
  ]
  options2: any = [{ label: '<' }, { label: '≤' }]
  @Prop() private data: any
  deleteRules (index: any) {
    this.computeRules[1].ruleItems.splice(index, 1)
  }
  addRules () {
    this.computeRules[1].ruleItems.push({
      seq: '<',
      condition: [
        {
          operator: '<',
          value: '1'
        },
        {
          operator: '<',
          value: '100'
        }
      ],
      direction: 'Add',
      score: 100
    })
  }
  saveData () {
    this.data.attendanceScoreMeasureConfig.define.computeRules = lodash.cloneDeep(this.computeRules)
    console.log(this.computeRules)
  }
}
</script>

<style lang="scss" scoped>
.NewIntegralRule {
  padding: 0 20px;
  .mainTitle {
    font-size: 18px;
    font-weight: bold;
    margin-top: -10px;
  }
  .subTitle {
    font-size: 12px;
    color: rgba(153, 153, 153, 1);
    line-height: 16px;
  }
  .num {
    font-weight: bold;
  }
}
.littleTitle {
  font-weight: normal;
}
/deep/.el-input-number__increase {
  opacity: 0;
}
/deep/.el-input-number__decrease {
  opacity: 0;
}
/deep/.el-input-number:hover /deep/.el-input-number__decrease {
  opacity: 1 !important;
}
/deep/.el-input-number:hover /deep/.el-input-number__increase {
  opacity: 1 !important;
}
</style>
