<template>
  <div class="form-management">
    <el-card :body-style="{padding:0}">
      <div slot="header">
        <strong class="fs-16">修改加班基础设置</strong>
      </div>
      <div class="main">
        <div class="main_item m-b-20">
          <span class="m-b-5">最小加班单位</span>
          <el-select size="small"
                     style="width: 200px;"
                     v-model="data.minOvertimeUnit"
                     placeholder="请选择">
            <el-option v-for="item in minOvertimeUnitList"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="main_item m-b-20">
          <span class="m-b-5">日折算时长</span>
          <div>
            <el-input-number size="small"
                             v-model="data.overtimeHoursToOneDay"
                             controls-position="right"
                             :min="1"
                             :max="24"></el-input-number> 小时 = 一天
          </div>
          <span class="main_item_mark m-t-10 fs-12">切换单位或加班转调休时使用。加班、考勤、请假、出差、外出等日折算时长同步按此规则。</span>
        </div>
      </div>
      <div class="m-l-20 m-b-30">
        <el-button @click="saveData"
                   type="primary"
                   size="small">保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Api from '@/api'

@Component({
  name: 'FormManagement'
})
export default class FormManagement extends Vue {
  data: any = {
    minOvertimeUnit: 'Day',
    overtimeHoursToOneDay: 8
  }

  minOvertimeUnitList: any = [
    {
      label: '按天加班',
      value: 'Day'
    },
    {
      label: '按半天加班',
      value: 'HalfDay'
    },
    {
      label: '按小时加班',
      value: 'Hour'
    },
    {
      label: '按半小时加班',
      value: 'HalfHour'
    },
    {
      label: '按分钟加班',
      value: 'Minute'
    }
  ]

  created () {
    this.getData()
  }

  async saveData () {
    if (this.data.id) {
      await Api.jiliOa.updateOvertimeRulesBaseConfig(this.data)
      this.$message.success('修改成功')
      this.$router.go(-1)
    } else {
      Api.jiliOa.addOvertimeRulesBaseConfig(this.data)
      this.$message.success('保存成功')
      this.$router.go(-1)
    }
  }

  async getData () {
    const data = await Api.jiliOa.getOvertimeRulesBaseConfig()
    this.data = data.data.data
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-card__header {
  border: none;
}
.main {
  padding: 0 20px;
  &_item {
    display: flex;
    flex-direction: column;
    span {
      color: #666;
    }
    &_mark {
      display: inline-block;
      color: #999;
      width: 400px;
    }
  }
  &_subTitle {
    font-weight: bold;
    span {
      color: $dd--color-text-placeholder;
    }
  }
}
</style>
