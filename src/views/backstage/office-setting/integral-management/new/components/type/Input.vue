<template>
  <div class="businessForm">
    <div class="title">录入频率</div>
    <el-select style="width: 100%;"
               v-model="data.inputScoreMeasureConfig.frequencyType"
               placeholder="请选择">
      <el-option v-for="item in options"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
      </el-option>
    </el-select>
    <div class="title">
      赋值目标：<span>录入对象</span>
    </div>
    <div class="title">
      积分生效时间：<span>录入时间</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'EssentialInformation'
})
export default class EssentialInformation extends Vue {
  created () {
    this.data.assignTarget = 'Operator'
  }

  drawer: any = false
  options: any = [
    {
      label: '每月',
      value: 'ByMonth'
    },
    {
      label: '每季度',
      value: 'ByQuarter'
    }
  ]

  @Prop() private data: any
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
</style>
