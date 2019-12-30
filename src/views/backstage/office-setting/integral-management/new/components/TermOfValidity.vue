<template>
  <div class="TermOfValidity">
    <el-card class="main">
      <div class="title m-t-30">
        开始时间
        <el-date-picker @change="changeDatge"
                        v-model="dataFourth.timeFrom"
                        class="m-t-10"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        style="width:100%;"
                        type="date"
                        placeholder="选择日期">
        </el-date-picker>
      </div>
      <div class="title m-t-20">
        截止时间
        <el-date-picker @change="changeDatge"
                        v-model="dataFourth.timeTo"
                        class="m-t-10"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        style="width:100%;"
                        type="date"
                        placeholder="可不选填，不填即永久有效">
        </el-date-picker>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'TermOfValidity'
})
export default class TermOfValidity extends Vue {
  static title = '指标有效期'
  @Prop() private data: any
  dataFourth: any = {
    timeFrom: null,
    timeTo: null
  }

  mounted () {
    this.dataFourth.timeFrom = this.data.timeFrom
    this.dataFourth.timeTo = this.data.timeTo
  }

  changeDatge () {
    this.$emit('choose', this.dataFourth)
  }
}
</script>

<style lang="scss" scoped>
.TermOfValidity {
  width: 100%;
  display: flex;
  min-height: 650px;
  justify-content: center;
  .main {
    width: 600px;
    margin-top: 20px;
    .title {
      font-weight: bold;
    }
  }
}
</style>
