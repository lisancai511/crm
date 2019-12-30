<template>
  <div class="form-management">
    <el-card :body-style="{padding:0}">
      <div slot="header">
        <strong class="fs-16">{{vacationId?'编辑假期':'新建假期'}}</strong>
      </div>
      <div class="main">
        <div class="main_item m-b-20">
          <span class="m-b-5">假期名称</span>
          <el-input v-model="data.name"
                    size="small"
                    style="width: 200px;"
                    placeholder="请输入"></el-input>
        </div>
        <div class="main_item m-b-20">
          <span class="m-b-5">适用范围</span>
          <el-input @focus="dialogVisible=true"
                    v-model="value"
                    size="small"
                    style="width: 200px;"
                    placeholder="全公司"></el-input>
        </div>
        <div class="main_subTitle m-t-10 m-b-20">
          请假时长核算规则
        </div>
        <div class="main_item m-b-20">
          <span class="m-b-5">最小请假单位</span>
          <el-select size="small"
                     style="width: 200px;"
                     v-model="data.minUnit"
                     placeholder="请选择">
            <el-option v-for="item in minUnitList"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
          <span v-if="data.minUnit === 'Hour'"
                class="m-t-5 fs-12">员工以1分钟为最小单位选择时间，考勤报表按小时统计</span>
          <span v-if="data.minUnit === 'Day'"
                class="m-t-5 fs-12">员工以1天为最小单位选择时间，考勤报表按天统计</span>
          <span v-if="data.minUnit === 'HalfDay'"
                class="m-t-5 fs-12">员工以半天为最小单位选择时间，考勤报表按天统计</span>
        </div>
        <div class="main_item m-b-20">
          <span class="m-b-5">请假时长核算</span>
          <el-select size="small"
                     style="width: 200px;"
                     v-model="data.dayType"
                     placeholder="请选择">
            <el-option v-for="item in dayTypeList"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>

          <span v-if="data.dayType === 'NaturalDay'"
                class="m-t-5 fs-12">请假时段中包含的休息日，也会计入请假天数</span>
          <span v-if="data.dayType === 'WorkingDay'"
                class="m-t-5 fs-12">请假时段中不包含员工的休息日，例如未排班的双休日、法定节假日</span>
        </div>
        <div class="main_subTitle m-t-10 m-b-20">
          设置员工假期余额
          <el-switch class="m-l-20"
                     v-model="data.canSetBalance">
          </el-switch>
          <span class="m-l-20 fs-12">设置后，有假期余额才可请该类别假期；不开启即申请该类别假期不受余额限制</span>
        </div>
        <div v-if="data.canSetBalance">
          <div class="main_item m-b-20">
            <span class="m-b-5">余额发放方式</span>
            <el-select size="small"
                       style="width: 200px;"
                       v-model="data.balanceAddingType"
                       placeholder="请选择">
              <el-option v-for="item in balanceAddingTypeList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div v-if="data.balanceAddingType==='AddingOneTimePerYear'"
               class="main_item m-b-20">
            <span class="m-b-5">发放日期</span>
            <el-select size="small"
                       style="width: 200px;"
                       v-model="data.addingDate"
                       placeholder="请选择">
              <el-option v-for="item in addingDateList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="m-b-20"
               v-if="data.balanceAddingType==='AddingOneTimePerYear'">
            每人每年发放 <el-input-number style="width:100px"
                             size="mini"
                             v-model="data.quota"
                             controls-position="right"
                             :min="1"
                             :max="365"></el-input-number> {{data.minUnit === 'Hour'?'小时': '天'}}
          </div>
          <div class="m-b-20">
            <div class="m-b-5">有效期</div>
            <el-select size="small"
                       @change="changeExpireType"
                       style="width: 200px;"
                       v-model="data.expireType"
                       placeholder="请选择">
              <el-option v-for="item in expireTypeList"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
              <el-option v-if="data.balanceAddingType === 'OvertimeAutoAdding'"
                         label="加班后固定天数作废"
                         value="OvertimeAutoAdding">
              </el-option>
            </el-select>
            <span class="m-l-20"
                  v-if="data.expireType === 'OvertimeAutoAdding'">
              <el-input-number size="small"
                               v-model="data.expireValue"
                               controls-position="right"
                               :min="1"
                               :max="365"></el-input-number> 天后作废
            </span>
            <span class="m-l-20"
                  v-if="data.expireType === 'FixedDate'">
              每年
              <el-date-picker style="width: 150px"
                              format="MM 月 dd 日"
                              value-format="MM dd"
                              v-model="data.expireValue"
                              size="small"
                              type="date"
                              placeholder="选择日期">
              </el-date-picker> 日后作废
            </span>
          </div>
        </div>
        <div class="m-b-30">
          <el-button size="small"
                     @click="saveData"
                     type="primary">保存</el-button>
          <el-button @click="$router.go(-1)"
                     size="small">取消</el-button>
        </div>
      </div>
    </el-card>

    <el-dialog :visible.sync="dialogVisible"
               width="600px">
      <ChoosePeople mode="orguser" :orgIdList="this.data.targets.orgIdList"
                    :peopleIdList="this.data.targets.peopleIdList"
                    :roleIdList="this.data.targets.roleIdList"
                    @cancel="cancel"
                    @chooseDone="chooseDone"></ChoosePeople>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
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
  minUnitList: any = [
    {
      label: '按天请假',
      value: 'Day'
    },
    {
      label: '按半天请假',
      value: 'HalfDay'
    },
    {
      label: '按小时请假',
      value: 'Hour'
    }
  ]

  value: any = '全公司'

  dialogVisible: any = false

  dayTypeList: any = [
    {
      label: '按自然日计算请假时长',
      value: 'NaturalDay'
    },
    {
      label: '按工作日计算请假时长',
      value: 'WorkingDay'
    }
  ]

  balanceAddingTypeList: any = [
    {
      label: '手动发放',
      value: 'ManualAdding'
    },
    {
      label: '每年自动发放一次',
      value: 'AddingOneTimePerYear'
    },
    {
      label: '加班时长自动计入余额',
      value: 'OvertimeAutoAdding'
    }
  ]

  addingDateList: any = [
    {
      label: '每年员工入职日',
      value: 'EmployeeEntryDay'
    },
    {
      label: '每年1月1日',
      value: 'FirstDayOfTheYear'
    }
  ]

  expireTypeList: any = [
    {
      label: '永不作废',
      value: 'NoExpire'
    },
    {
      label: '每年固定日期后作废',
      value: 'FixedDate'
    }
    // {
    //   label: '加班后固定天数作废',
    //   value: 'OvertimeFixedDay'
    // }
  ]

  data: any = {
    name: '',
    targets: {
      orgIdList: [],
      peopleIdList: [],
      roleIdList: []
    },
    minUnit: 'Hour', // Hour(按小时), HalfDay(按半天), Day(按天)
    dayType: 'NaturalDay', // NaturalDay(按自然日), WorkingDay(按工作日)
    canSetBalance: true, // 是否设置员工假期余额
    balanceAddingType: 'ManualAdding', // 余额发放方式：ManualAdding(手动发放), OvertimeAutoAdding(加班时长自动计入余额), AddingOneTimePerYear(一年一次)
    addingDate: 'EmployeeEntryDay', // 余额添加日期
    quota: 5, // 假期余额额度
    expireType: 'NoExpire', // 有效期类型：NoExpire(永不作废), FixedDate(每年固定日期后作废), OvertimeFixedDay(加班后固定天数作废)
    expireValue: '5', // 根据expire_type的不同而定, FixedDate：日期、OvertimeFixedDay：天数
    stopped: false,
    preseted: false
  }

  @Watch('data.balanceAddingType', { immediate: true })
  onBalanceAddingTypeChange (val:any) {
    if (val !== 'OvertimeAutoAdding' && this.data.expireType === 'OvertimeFixedDay') {
      this.data.expireType = 'NoExpire'
    }
  }

  async created () {
    if (this.vacationId) {
      await this.getData()
    }
  }

  chooseDone (val: any) {
    this.dialogVisible = false
    this.data.targets.orgIdList = lodash.cloneDeep(val.orgIdList)
    this.data.targets.peopleIdList = lodash.cloneDeep(val.peopleIdList)
    this.data.targets.roleIdList = lodash.cloneDeep(val.roleIdList)
    if (
      val.orgIdList.length === 0 &&
      val.peopleIdList.length === 0 &&
      val.roleIdList.length === 0
    ) {
      this.value = '全公司'
    } else {
      this.value = `${this.data.targets.orgIdList.length}个组织，${this.data.targets.roleIdList.length}个角色，${this.data.targets.peopleIdList.length}个人`
    }
  }

  cancel () {
    this.dialogVisible = false
  }

  async saveData () {
    if (!this.data.name) {
      this.$message.error('请输入假期名称')
    } else {
      const newData = lodash.cloneDeep(this.data)
      const obj = newData.targets
      newData.targets = []
      if (obj) {
        obj.orgIdList.forEach((item: any) => {
          newData.targets.push({
            targetType: 'Org',
            targetId: item
          })
        })
        obj.peopleIdList.forEach((item: any) => {
          newData.targets.push({
            targetType: 'User',
            targetId: item
          })
        })
        obj.roleIdList.forEach((item: any) => {
          newData.targets.push({
            targetType: 'Role',
            targetId: item
          })
        })
      }
      if (newData.targets.length === 0) {
        newData.targets = null
      }
      if (this.vacationId) {
        await Api.jiliOa.updateVacations(newData)
        this.$message.success('修改成功')
        this.$router.go(-1)
      } else {
        const data = await Api.jiliOa.addVacations(newData)
        if (data.data.success) {
          this.$message.success('添加成功')
          this.$router.go(-1)
        }
      }
    }
  }

  get vacationId () {
    return this.$route.params.id
  }

  changeExpireType (val: any) {
    switch (val) {
      case 'FixedDate':
        this.data.expireValue = '01 01'
        break
      case 'OvertimeFixedDay':
        this.data.expireValue = 5
        break
      case 'NoExpire':
        this.data.expireValue = null
        break
    }
  }

  async getData () {
    const data = await Api.jiliOa.getVacation(this.vacationId)
    this.data = data.data.data
    const arr = lodash.cloneDeep(this.data.targets)
    this.data.targets = {
      peopleIdList: [],
      roleIdList: [],
      orgIdList: []
    }
    if (arr) {
      arr.forEach((item0: any) => {
        if (item0.targetType === 'Org') {
          this.data.targets.orgIdList.push(item0.targetId)
        }
        if (item0.targetType === 'User') {
          this.data.targets.peopleIdList.push(item0.targetId)
        }
        if (item0.targetType === 'Role') {
          this.data.targets.roleIdList.push(item0.targetId)
        }
      })
      this.value = `${this.data.targets.orgIdList.length}个组织，${this.data.targets.roleIdList.length}个角色，${this.data.targets.peopleIdList.length}个人`
    }
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
  }
  &_subTitle {
    font-weight: bold;
    span {
      color: #666;
      font-weight: normal;
    }
  }
}
/deep/.el-dialog__body {
  padding: 0 !important;
}
/deep/.el-dialog__header {
  padding: 0;
}
</style>
