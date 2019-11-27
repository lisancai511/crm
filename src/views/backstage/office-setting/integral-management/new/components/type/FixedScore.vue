<template>
  <div class="businessForm">
    <div class="title">类型</div>
    <el-select style="width: 100%;"
               v-model="data.typeInSource"
               placeholder="请选择">
      <el-option v-for="item in options"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
      </el-option>
    </el-select>
    <div class="title">
      赋值目标：<span>对应级别的人</span>
    </div>

    <el-row>
      <el-col :span="3">
        分类
      </el-col>
      <el-col :span="5">
        加/减分
      </el-col>
      <el-col :span="5">
        分值
      </el-col>
    </el-row>

    <el-row class="m-t-10">
      <el-col :span="3">
        <span style="line-height:28px;">员工</span>
      </el-col>
      <el-col :span="5">
        <el-select size="mini"
                   style="width: 100px;"
                   v-model="data.aaa"
                   placeholder="请选择">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="7">
        <el-input v-model="input"
                  size="mini"
                  style="width:80%;"
                  placeholder="请输入内容"></el-input> 分
      </el-col>
    </el-row>

    <div>
      <div class="title">给分频率</div>
      <el-select style="width: 100%;"
                 v-model="data.fixedScoreMeasureConfig.frequencyType"
                 placeholder="请选择">
        <el-option v-for="item in frequencyType"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'EssentialInformation'
})
export default class EssentialInformation extends Vue {
  options: any = [
    { label: '学历', value: 'Education' },
    { label: '职位', value: 'Position' },
    { label: '职称', value: 'Rank' },
    { label: '工龄', value: 'WorkingYears' }
  ]
  frequencyType: any = [
    { label: '每天一次', value: 'ByDay' },
    { label: '每周一次', value: 'ByWeek' },
    { label: '每月一次', value: 'ByMounth' },
    { label: '每季度一次', value: 'BySeason' },
    { label: '每年一次', value: 'ByYear' }
  ]
  value: any = ''
  input: any = ''
  @Prop() private data: any
}
</script>

<style lang="scss" scoped>
.businessForm {
  .title {
    margin: 20px 0 10px;
    font-weight: bold;
  }
}
</style>
