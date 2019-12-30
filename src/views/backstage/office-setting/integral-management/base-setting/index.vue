<template>
  <div>
    <el-card style="min-height: calc(100vh - 70px); padding: 20px;"
             class="m-b-10"
             :body-style="{padding:0}">
      <div>
        <strong class="fs-16">基础设置</strong>
      </div>
      <div class="m-t-30 subtitle">
        <strong class="m-r-20">每月积分申诉截止至</strong>
        <el-select v-model="data.latestAppealTimeValue"
                   size='mini'
                   style="width:100px;"
                   placeholder="请选择">
          <el-option key="FixedDay"
                     label="不限制"
                     value="Unlimit">
          </el-option>
          <el-option v-for="item in 28"
                     :key="item.value"
                     :label="item+'号'"
                     :value="item">
          </el-option>
        </el-select>
      </div>
      <div class="m-t-30 subtitle">
        <strong class="m-r-20">每月积分申请截止至</strong>
        <el-select v-model="data.latestApplyTimeValue"
                   size='mini'
                   style="width:100px;"
                   placeholder="请选择">
          <el-option key="FixedDay"
                     label="不限制"
                     value="Unlimit">
          </el-option>
          <el-option v-for="item in 28"
                     :key="item.value"
                     :label="item+'号'"
                     :value="item">
          </el-option>
        </el-select>
      </div>
      <div class="m-t-30">
        <el-button size="mini"
                   type="primary" @click="saveData">保存</el-button>
        <el-button size="mini"
                   @click="()=>{$router.go(-1)}">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Api from '@/api'
import lodash from 'lodash'

@Component({
  name: 'CustomizedApplication'
})
export default class CustomizedApplication extends Vue {
  data: any = {
    latestApplyTimeValue: null,
    latestAppealTimeValue: null
  }

  async created () {
    await this.getData()
  }

  async saveData () {
    const newData = lodash.cloneDeep(this.data)
    if (newData.latestApplyTimeValue && newData.latestAppealTimeValue) {
      if (newData.latestApplyTimeValue === 'Unlimit') {
        newData.latestApplyTimeType = 'Unlimit'
        newData.latestApplyTimeValue = null
      } else {
        newData.latestApplyTimeType = 'FixedDay'
      }
      if (newData.latestAppealTimeValue === 'Unlimit') {
        newData.lastestAppealTimeType = 'Unlimit'
        newData.latestAppealTimeValue = null
      } else {
        newData.lastestAppealTimeType = 'FixedDay'
      }
      try {
        if (newData.id) {
          await Api.jiliScore.updateScoreBaseSetting(newData)
          this.$message.success('修改成功')
        } else {
          await Api.jiliScore.addScoreBaseSetting(newData)
          this.$message.success('添加成功')
        }
        this.$router.go(-1)
      } catch (e) {
        console.log(e)
      }
    } else {
      this.$message.error('请选择截止日')
    }
  }

  async getData () {
    const data = await Api.jiliScore.getScoreBaseSetting()
    if (data.data.data.id) {
      this.data = data.data.data
      if (this.data.latestApplyTimeType === 'Unlimit') {
        this.data.latestApplyTimeValue = 'Unlimit'
      }
      if (this.data.lastestAppealTimeType === 'Unlimit') {
        this.data.latestAppealTimeValue = 'Unlimit'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.subtitle {
  color: #666;
}
</style>
