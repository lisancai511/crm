<!--Created by LiuLei on 2019/11/4-->
<template>
  <header-tab-steps :tabs="tabs"
                    v-model="activeTabName"
                    back-title="积分指标管理"
                    back-path="/backstage/office-setting/integral-management/point-index-management">
    <template slot="right">
      <el-button @click="saveData"
                 type="primary">保存</el-button>
      <el-button @click="()=>{$router.go(-1)}">取消</el-button>
    </template>
    <component v-if="Id?data.name:true" @choose="choose" :is="activeTabName"
               :data="data"></component>
  </header-tab-steps>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Api from '@/api'
import HeaderTabSteps from '@/layout/header-tab-steps.vue'
import EssentialInformation from '@/views/backstage/office-setting/integral-management/new/components/EssentialInformation.vue'
import IntegralRule from '@/views/backstage/office-setting/integral-management/new/components/IntegralRule.vue'
import ScopeOfApplication from '@/views/backstage/office-setting/integral-management/new/components/ScopeOfApplication.vue'
import TermOfValidity from '@/views/backstage/office-setting/integral-management/new/components/TermOfValidity.vue'
import lodash from 'lodash'

@Component({
  name: 'IntegralManagementNew',
  components: {
    EssentialInformation,
    IntegralRule,
    ScopeOfApplication,
    TermOfValidity,
    HeaderTabSteps
  }
})
export default class IntegralManagementNew extends Vue {
  activeTabName = ''
  data: any = {
    measure: true,
    applyScoreMeasureConfig: {
      define: {
        computeRules: [
          {
            direction: 'Add'
          }
        ]
      }
    },
    inputScoreMeasureConfig: {},
    formScoreMeasureConfig: {},
    attendanceScoreMeasureConfig: {
      define: {
        computeRules: []
      }
    },
    reportScoreMeasureConfig: {
      define: {
        computeRules: []
      }
    },
    fixedScoreMeasureConfig: {},
    applyTargets: {
      peopleIdList: [],
      orgIdList: [],
      roleIdList: []
    }
  }

  async created () {
    await this.getData()
    this.$forceUpdate()
  }

  choose (val:any) {
    Object.assign(this.data, val)
  }

  async saveData () {
    let res: any
    const orgType = this.data.orgType
    if (Array.isArray(this.data.superiorLevelId)) {
      this.data.superiorLevelId = this.data.superiorLevelId[
        this.data.superiorLevelId.length - 1
      ]
    }
    this.switchType()
    if (this.Id) {
      this.data.measure = true
      res = await Api.jiliScore.updateScoreMeasure(
        this.Id,
        orgType === 'BusinessForm' ? 'Form' : orgType,
        this.data
      )
    } else {
      res = await Api.jiliScore.addDataScore(
        this.data,
        orgType === 'BusinessForm' ? 'Form' : orgType
      )
    }
    if (res.data.success) {
      this.$router.go(-1)
      this.Id
        ? this.$message.success('修改成功')
        : this.$message.success('保存成功')
    }
  }

  get Id () {
    return this.$route.query.id
  }

  async getData () {
    if (this.Id) {
      const data = await Api.jiliScore.getScoreMeasure(this.Id)
      this.data = lodash.cloneDeep(data.data.data)
      if (!this.data.applyTargets) {
        this.data.applyTargets = [{ targetType: 'User', targetIds: [] }]
      }
      this.filterData(this.data)
      const arr = lodash.cloneDeep(this.data.applyTargets)
      this.data.applyTargets = {}
      if (arr) {
        arr.forEach((item: any) => {
          if (item.targetType === 'User' && item.targetIds.length > 0) {
            this.data.applyTargets.peopleIdList = item.targetIds
          }
          if (item.targetType === 'Org' && item.targetIds.length > 0) {
            this.data.applyTargets.orgIdList = item.targetIds
          }
        })
      }
      this.$forceUpdate()
    }
  }

  filterData (data: any) {
    if (data.formScoreMeasureConfig) {
      data.orgType = 'BusinessForm'
      data.formScoreMeasureConfig.define = JSON.parse(
        data.formScoreMeasureConfig.define
      )
    } else if (data.inputScoreMeasureConfig) {
      data.orgType = 'Input'
    } else if (data.attendanceScoreMeasureConfig) {
      data.orgType = 'Attendance'
      data.attendanceScoreMeasureConfig.define = JSON.parse(
        data.attendanceScoreMeasureConfig.define
      )
    } else if (data.reportScoreMeasureConfig) {
      data.orgType = 'Report'
      data.reportScoreMeasureConfig.define = JSON.parse(
        data.reportScoreMeasureConfig.define
      )
    } else if (data.fixedScoreMeasureConfig) {
      data.orgType = 'FixedScore'
    } else if (data.applyScoreMeasureConfig) {
      data.orgType = 'Apply'
    }
  }

  switchType () {
    switch (this.data.orgType) {
      case 'BusinessForm':
        this.data.BusinessForm.define = JSON.stringify(
          this.data.BusinessForm.define
        )
        delete this.data.inputScoreMeasureConfig
        delete this.data.attendanceScoreMeasureConfig
        delete this.data.reportScoreMeasureConfig
        delete this.data.fixedScoreMeasureConfig
        delete this.data.applyScoreMeasureConfig
        break
      case 'Apply':
        this.data.applyScoreMeasureConfig.define = JSON.stringify(
          this.data.applyScoreMeasureConfig.define
        )
        delete this.data.inputScoreMeasureConfig
        delete this.data.attendanceScoreMeasureConfig
        delete this.data.reportScoreMeasureConfig
        delete this.data.fixedScoreMeasureConfig
        delete this.data.formScoreMeasureConfig
        break
      case 'Attendance':
        this.data.attendanceScoreMeasureConfig.define = JSON.stringify(
          this.data.attendanceScoreMeasureConfig.define
        )
        delete this.data.inputScoreMeasureConfig
        delete this.data.formScoreMeasureConfig
        delete this.data.reportScoreMeasureConfig
        delete this.data.fixedScoreMeasureConfig
        delete this.data.applyScoreMeasureConfig
        break
      case 'Report':
        this.data.reportScoreMeasureConfig.define = JSON.stringify(
          this.data.reportScoreMeasureConfig.define
        )
        delete this.data.inputScoreMeasureConfig
        delete this.data.attendanceScoreMeasureConfig
        delete this.data.formScoreMeasureConfig
        delete this.data.fixedScoreMeasureConfig
        delete this.data.applyScoreMeasureConfig
        break
      case 'FixedScore':
        this.data.fixedScoreMeasureConfig.define = JSON.stringify(
          this.data.fixedScoreMeasureConfig.define
        )
        delete this.data.inputScoreMeasureConfig
        delete this.data.attendanceScoreMeasureConfig
        delete this.data.reportScoreMeasureConfig
        delete this.data.formScoreMeasureConfig
        delete this.data.applyScoreMeasureConfig
        break
      case 'Input':
        this.data.inputScoreMeasureConfig.define = JSON.stringify(
          this.data.inputScoreMeasureConfig.define
        )
        delete this.data.formScoreMeasureConfig
        delete this.data.attendanceScoreMeasureConfig
        delete this.data.reportScoreMeasureConfig
        delete this.data.fixedScoreMeasureConfig
        delete this.data.applyScoreMeasureConfig
        delete this.data.eventType
        delete this.data.typeInSource
        break
    }
    const obj = lodash.cloneDeep(this.data.applyTargets)
    this.data.applyTargets = []
    if (obj.peopleIdList && obj.peopleIdList.length > 0) {
      const userObj = {
        targetType: 'User',
        targetIds: []
      }
      userObj.targetIds = obj.peopleIdList
      this.data.applyTargets.push(userObj)
    }
    if (obj.orgIdList && obj.orgIdList.length > 0) {
      const orgObj = {
        targetType: 'Org',
        targetIds: []
      }
      orgObj.targetIds = obj.orgIdList
      this.data.applyTargets.push(orgObj)
    }
  }

  get tabs () {
    return [
      {
        label: (EssentialInformation as any).title,
        name: EssentialInformation.name,
        id: this.$route.query.id
      },
      {
        label: (IntegralRule as any).title,
        name: IntegralRule.name,
        id: this.$route.query.id
      },
      {
        label: (ScopeOfApplication as any).title,
        name: ScopeOfApplication.name,
        id: this.$route.query.id
      },
      {
        label: (TermOfValidity as any).title,
        name: TermOfValidity.name,
        id: this.$route.query.id
      }
    ]
  }
}
</script>

<style lang="scss" scoped>
</style>
