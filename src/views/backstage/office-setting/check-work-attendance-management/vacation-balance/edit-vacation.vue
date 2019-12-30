<template>
  <div class="form-management">
    <el-card style="min-height: calc(100vh - 70px); padding:20px;"
             :body-style="{padding:0, paddingBottom: '30px'}">
      <div class="header">
        <div v-if="data.userName"
             class="header_title fs-18">
          {{data.userName.substring(data.userName.length-2)}}
        </div>
        <div class="header_subTitle m-l-10">
          <div>{{data.userName}} 的假期使用记录</div>
          <div class="fs-12 m-t-5">
            <span v-for="item in data.orgNames"
                  :key="item">{{item}}</span>
          </div>
        </div>
      </div>
      <div class="main m-t-20">
        <el-tabs v-model="activeName">
          <template v-for="item in data.vacationBalances">
            <el-tab-pane v-if="item.isTarget" lazy
                       :key="item.vacationRuleId"
                       :label="item.vacationRuleName"
                       :name="item.vacationRuleId">
            <VacationUsageRecord :data="item"></VacationUsageRecord>
          </el-tab-pane>
          </template>

        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Api from '@/api'
import ChoosePeople from '@/components/UserSelect/index.vue'
import VacationUsageRecord from './components/VacationUsageRecord.vue'

@Component({
  name: 'FormManagement',
  components: {
    ChoosePeople,
    VacationUsageRecord
  }
})
export default class FormManagement extends Vue {
  data: any = {}

  activeName: any = null

  get userId () {
    return this.$route.params.id
  }

  get vacationRuleId () {
    return this.$route.query.vacationRuleId
  }

  created () {
    this.getData()
  }

  async getData () {
    const data = await Api.jiliOa.getVacationsBalances({ userId: this.userId })
    this.data = data.data.data.content[0]
    this.activeName = this.vacationRuleId
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  &_title {
    width: 60px;
    height: 60px;
    background: rgb(247, 181, 94);
    color: #fff;
    text-align: center;
    line-height: 60px;
    border-radius: 50%;
  }
  &_subTitle {
    display: flex;
    justify-content: center;
    flex-direction: column;
    span {
      color: #999999;
    }
  }
}
</style>
