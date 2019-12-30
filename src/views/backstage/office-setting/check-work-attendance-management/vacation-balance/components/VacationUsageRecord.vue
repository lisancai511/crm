<template>
  <div class="form-management">
    <div v-if="data.canSetBalance" class="container">
      <div>
        <div>当前 {{data.vacationRuleName}} 余额：<span class="fs-18">{{timeLineData.totalAmount?timeLineData.totalAmount:0}} {{data.minUnit==='Hour'?'小时':'天'}}</span>
          <el-button class="m-l-30"
                     size="mini"
                     @click="dialogVisible=true">修改余额</el-button>
        </div>
      </div>
      <div style="width:500px;" class="m-t-20">
        <el-timeline>
          <el-timeline-item type="success" size="large" placement="top" v-for="(activity, index) in timeLineData.list"
                            :key="index"
                            icon="el-icon-time"
                            :timestamp="activity.createdTime">
            <div class="timeline m-t-10 fs-12">
              <div class="m-b-5">{{activity.amount>=0?'+'+activity.amount:activity.amount}}天 <span class="m-l-10">{{activity.dateFrom}}至{{activity.dateTo}}有效</span></div>
              <div class="m-b-5">{{activity.creator.name}}为{{activity.user.name}}{{activity.amount>0?'增加了':'减少了'}}{{activity.amount}}天{{data.vacationRuleName}}</div>
              <div class="m-b-5">理由：{{activity.reason}}</div>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>

    <el-dialog :title="'修改' + data.vacationRuleName + '余额'"
               :visible.sync="dialogVisible"
               width="30%">
      <div class="dialog">
        <el-form :model="numberValidateForm"
                 ref="numberValidateForm"
                 label-width="100px"
                 class="demo-ruleForm m-t-10 m-b-10">
          <el-form-item :label="'修改' + data.vacationRuleName"
                        prop="amount"
                        :rules="[{ required: true, message: '不能为空'},
                                 { type: 'number', message: '必须为数字值'}]">
            <el-select class="m-r-10"
                       style="width:100px;"
                       size="mini"
                       v-model="value"
                       placeholder="请选择">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
            <el-input-number style="width:100px"
                             size="mini"
                             v-model="numberValidateForm.amount"
                             :min="1" :max="365"
                             controls-position="right"></el-input-number>
            {{data.minUnit==='Hour'?'时':'天'}}
          </el-form-item>
          <el-form-item label="原因"
                        prop="reason"
                        :rules="[{ required: true, message: '理由不能为空'}]">
            <el-input style="width:228px;"
                      size="mini"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      placeholder="请输入内容"
                      v-model="numberValidateForm.reason">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button size="small"
                   @click="dialogVisible = false">取 消</el-button>
        <el-button size="small"
                   type="primary"
                   @click="saveData">确 定</el-button>
      </span>
    </el-dialog>

    <div v-if="!data.canSetBalance"
         class="main">
      <div style="color:#999999">未设置 {{data.vacationRuleName}} 规则，无法计算出员工余额</div>
      <div class="m-t-20">
        <el-button size="small"
                   @click="gotoSetRole"
                   type="primary">设置{{data.vacationRuleName}}规则</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Api from '@/api'
import ChoosePeople from '@/components/UserSelect/index.vue'
import lodash from 'lodash'

@Component({
  name: 'FormManagement',
  components: {
    ChoosePeople
  }
})
export default class FormManagement extends Vue {
  @Prop() private data: any

  dialogVisible: boolean = false
  numberValidateForm: any = {
    amount: '',
    reason: ''
  }

  get userId () {
    return this.$route.params.id
  }

  timeLineData: any = {}
  value: any = '+'

  options: any = [
    {
      label: '增加',
      value: '+'
    },
    {
      label: '减少',
      value: '-'
    }
  ]

  created () {
    this.getData()
  }

  gotoSetRole () {
    this.$router.push(
      `/backstage/office-setting/attendance-management/vacation-manage/${this.data.vacationRuleId}/edit-vacation`
    )
  }

  async saveData () {
    const data = lodash.cloneDeep(this.numberValidateForm)
    if (this.value === '-') {
      data.amount = -this.numberValidateForm.amount
    }
    data.userId = this.userId
    data.vacationRuleId = this.data.vacationRuleId
    await Api.jiliOa.updateVacationRemaining(
      data
    )
    this.dialogVisible = false
    this.numberValidateForm = {
      amount: '',
      reason: ''
    }
    this.value = '+'
    this.getData()
  }

  async getData () {
    const data = await Api.jiliOa.getVacationRemainingChange(this.userId, {
      vacationRuleId: this.data.vacationRuleId
    })
    this.timeLineData = data.data.data
  }
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.dialog {
  min-height: 200px;
  border-top: 1px solid #e9e9e9;
  border-bottom: 1px solid #e9e9e9;
}
/deep/.el-dialog__body {
  padding: 0;
}
.demo-ruleForm {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-left: -30px;
}
.timeline {
  flex-direction: column;
}
/deep/.el-timeline-item__timestamp {
  width: 100px;
}
/deep/.el-timeline-item__timestamp.is-bottom{
  margin-top: 0;
}
</style>
