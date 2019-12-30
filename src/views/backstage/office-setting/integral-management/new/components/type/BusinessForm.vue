<template>
  <div class="businessForm">
    <div class="title">选择表单</div>
    <el-select style="width: 100%;"
               v-model="value"
               placeholder="请选择">
      <el-option v-for="item in formList"
                 :key="item.id"
                 :label="item.name"
                 :value="item.id">
      </el-option>
    </el-select>
    <div class="title">赋值目标</div>
    <el-select style="width: 100%;"
               v-model="data.assignTarget"
               placeholder="请选择">
      <el-option v-for="item in assignTargetList"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
      </el-option>
    </el-select>
    <div class="title">
      <el-button @click="drawer=true"
                 type="primary"
                 size="mini">＋ 添加积分规则</el-button>
    </div>

    <el-drawer :show-close="false"
               :visible.sync="drawer">
      <NewIntegralRule :data="data"></NewIntegralRule>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import NewIntegralRule from './components/NewIntegralRule.vue'
import Api from '@/api'

@Component({
  name: 'EssentialInformation',
  components: {
    NewIntegralRule
  }
})
export default class EssentialInformation extends Vue {
  @Prop() private data: any
  dialogVisible:any = false
  drawer: any = false
  options: any = []
  formList: any = []
  assignTargetList:any = [
    {
      label: '申请人',
      value: 'Applicant'
    },
    {
      label: '操作者',
      value: 'Operator'
    },
    {
      label: '操作对象',
      value: 'OperateObject'
    },
    {
      label: '对应级别',
      value: 'Level'
    }
  ]

  value: any = ''

  created () {
    this.getData()
  }

  async getData () {
    const data = await Api.paasApprovalFlow.getForms()
    this.formList = data.data.data.map((item:any) => {
      return item.forms
    })
    this.formList = this.formList.flat()
    console.log(this.formList)
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
/deep/.el-drawer {
  width: 700px !important;
  padding-top: 30px;
  overflow-y:scroll;
}
/deep/.el-drawer__header {
  display: none;
}
</style>
