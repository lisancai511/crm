<template>
  <div class="businessForm">
    <div class="title">类型</div>
    <el-select style="width: 100%;"
               @change="chooseType"
               v-model="data.typeInSource"
               placeholder="请选择">
      <el-option v-for="item in options"
                 :key="item.id"
                 :label="item.name"
                 :value="item.id">
      </el-option>
    </el-select>
    <div v-if="data.typeInSource" class="title">
      赋值目标：<span>对应级别的人</span>
    </div>

    <el-row class="m-t-20">
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
import Api from '@/api'

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
    { label: '每天', value: 'ByDay' },
    { label: '每周', value: 'ByWeek' },
    { label: '每月', value: 'ByMounth' },
    { label: '每季度', value: 'BySeason' },
    { label: '每年', value: 'ByYear' }
  ]

  value: any = ''
  input: any = ''
  @Prop() private data: any
  created () {
    this.getDictionaries()
  }

  async chooseType (val:any) {
    this.$forceUpdate()
    const res = await Api.globalData.getDictionary(val)
    console.log(res)
  }

  async getDictionaries () {
    try {
      const {
        data: { data: dictionaries }
      } = await Api.globalData.getDictionaries()
      this.options = dictionaries
    } catch (e) {
      console.error(e)
    }
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
</style>
