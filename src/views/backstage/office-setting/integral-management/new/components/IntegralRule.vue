<template>
  <div class="IntegralRule">
    <el-card class="main">
      <div class="title">
        说明：1、申请类：需要申请、审批人审批通过后生效；2、考勤类：使用积励软件考勤打卡，考勤积分将根据此处配置的规则自动计算对应积分；3、工作报告类：使用积励软件填写日志、周报、月报等，相关积分将根据此处配置的规则自动计算对应积分；4、业务表单类：填写积励平台预置的业务表单，系统将自动根据此处配置的规则自动计算对应积分。
      </div>
      <div class="m-t-10 m-b-10 subTitle">
        规则来源
      </div>
      <el-select style="width:100%"
                 :disabled="Id"
                 @change="changeTypeInSource"
                 v-model="data.orgType"
                 placeholder="请选择">
        <el-option v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.name">
        </el-option>
      </el-select>
      <component :data="data"
                 :is="data.orgType"></component>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import BusinessForm from '@/views/backstage/office-setting/integral-management/new/components/type/BusinessForm.vue'
import Report from '@/views/backstage/office-setting/integral-management/new/components/type/Report.vue'
import Apply from '@/views/backstage/office-setting/integral-management/new/components/type/Apply.vue'
import FixedScore from '@/views/backstage/office-setting/integral-management/new/components/type/FixedScore.vue'
import Attendance from '@/views/backstage/office-setting/integral-management/new/components/type/Attendance.vue'
import Input from '@/views/backstage/office-setting/integral-management/new/components/type/Input.vue'

@Component({
  name: 'IntegralRule',
  components: {
    BusinessForm,
    Report,
    Apply,
    FixedScore,
    Attendance,
    Input
  }
})
export default class IntegralRule extends Vue {
  static title = '积分规则'
  @Prop() private data: any
  activeIndex: any = ''
  options: any = [
    { label: '业务表单类', name: 'BusinessForm' },
    { label: '工作报告类', name: 'Report' },
    { label: '申请类', name: 'Apply' },
    { label: '考勤类', name: 'Attendance' },
    { label: '固定积分类', name: 'FixedScore' },
    { label: '录入类', name: 'Input' }
  ]

  get Id () {
    return !!this.$route.query.id
  }

  changeTypeInSource () {
    this.data.typeInSource = ''
    this.data.eventType = ''
  }
}
</script>

<style lang="scss" scoped>
.IntegralRule {
  width: 100%;
  display: flex;
  min-height: 650px;
  justify-content: center;
  .main {
    width: 600px;
    margin-top: 20px;
    padding: 10px;
    .title {
      color: #999999;
      font-size: 12px;
      line-height: 17px;
    }
  }
}
.subTitle {
  font-weight: 550;
}
</style>
