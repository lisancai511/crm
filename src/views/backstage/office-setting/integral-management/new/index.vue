<!--Created by LiuLei on 2019/11/4-->
<template>
  <header-tab-steps :tabs="tabs"
                    v-model="activeTabName"
                    back-title="积分指标管理"
                    back-path="/backstage/office-setting/integral-management/point-index-management">
    <template slot="right">
      <el-button @click="saveData"
                 type="primary">保存</el-button>
      <el-button>取消</el-button>
    </template>
    <component :is="activeTabName"
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
    typeId: 2,
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
        computeRules: [
        ]
      }
    },
    reportScoreMeasureConfig: {
      define: {
        computeRules: [
        ]
      }
    },
    fixedScoreMeasureConfig: {},
    applyTargets: [{ targetType: 'User', targetIds: [] }]
  }
  activeIndex: any = ''
  created () {
    this.activeIndex = this.$route.query.activeIndex
  }

  async saveData () {
    // const type = this.$route.query.activeIndex
    let res: any
    this.data.superiorLevelId = this.data.superiorLevelId[this.data.superiorLevelId.length - 1]
    this.switchType()
    const type = this.data.type
    delete this.data.type
    res = await Api.jiliScore.addDataScore(
      this.data,
      type === 'BusinessForm' ? 'Form' : type
    )
    console.log(res)
  }

  switchType () {
    switch (this.data.type) {
      case 'BusinessForm':
        this.data.BusinessForm.define = JSON.stringify(this.data.BusinessForm.define)
        delete this.data.inputScoreMeasureConfig
        delete this.data.attendanceScoreMeasureConfig
        delete this.data.reportScoreMeasureConfig
        delete this.data.fixedScoreMeasureConfig
        delete this.data.applyScoreMeasureConfig
        break
      case 'Apply':
        this.data.applyScoreMeasureConfig.define = JSON.stringify(this.data.applyScoreMeasureConfig.define)
        delete this.data.inputScoreMeasureConfig
        delete this.data.attendanceScoreMeasureConfig
        delete this.data.reportScoreMeasureConfig
        delete this.data.fixedScoreMeasureConfig
        delete this.data.formScoreMeasureConfig
        break
      case 'Attendance':
        this.data.attendanceScoreMeasureConfig.define = JSON.stringify(this.data.attendanceScoreMeasureConfig.define)
        delete this.data.inputScoreMeasureConfig
        delete this.data.formScoreMeasureConfig
        delete this.data.reportScoreMeasureConfig
        delete this.data.fixedScoreMeasureConfig
        delete this.data.applyScoreMeasureConfig
        break
      case 'Report':
        this.data.reportScoreMeasureConfig.define = JSON.stringify(this.data.reportScoreMeasureConfig.define)
        delete this.data.inputScoreMeasureConfig
        delete this.data.attendanceScoreMeasureConfig
        delete this.data.formScoreMeasureConfig
        delete this.data.fixedScoreMeasureConfig
        delete this.data.applyScoreMeasureConfig
        break
      case 'FixedScore':
        this.data.fixedScoreMeasureConfig.define = JSON.stringify(this.data.fixedScoreMeasureConfig.define)
        delete this.data.inputScoreMeasureConfig
        delete this.data.attendanceScoreMeasureConfig
        delete this.data.reportScoreMeasureConfig
        delete this.data.formScoreMeasureConfig
        delete this.data.applyScoreMeasureConfig
        break
      case 'Input':
        this.data.inputScoreMeasureConfig.define = JSON.stringify(this.data.inputScoreMeasureConfig.define)
        delete this.data.formScoreMeasureConfig
        delete this.data.attendanceScoreMeasureConfig
        delete this.data.reportScoreMeasureConfig
        delete this.data.fixedScoreMeasureConfig
        delete this.data.applyScoreMeasureConfig
        delete this.data.eventType
        delete this.data.typeInSource
        break
    }
  }

  get tabs () {
    return [
      {
        label: (EssentialInformation as any).title,
        name: EssentialInformation.name
      },
      {
        label: (IntegralRule as any).title,
        name: IntegralRule.name
      },
      {
        label: (ScopeOfApplication as any).title,
        name: ScopeOfApplication.name
      },
      {
        label: (TermOfValidity as any).title,
        name: TermOfValidity.name
      }
    ]
  }
  filterConfig (data:any) {
    data.define.computeRules[1].ruleItems.forEach((item:any) => {
      if (item.seq !== '介于') {
        item.seq = 2
        item.condition.splice(0, 1)
      } else {
        item.seq = 1
      }
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
