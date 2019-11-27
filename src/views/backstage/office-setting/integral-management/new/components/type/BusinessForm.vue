<template>
  <div class="businessForm">
    <div class="title">选择表单</div>
    <el-select style="width: 100%;"
               v-model="value"
               placeholder="请选择">
      <el-option v-for="item in options"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
      </el-option>
    </el-select>
    <div class="title">赋值目标</div>
    <el-select style="width: 100%;"
               v-model="value"
               placeholder="请选择">
      <el-option v-for="item in options"
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

@Component({
  name: 'EssentialInformation',
  components: {
    NewIntegralRule
  }
})
export default class EssentialInformation extends Vue {
  dialogVisible:any = false
  drawer: any = false
  options: any = []
  value: any = ''
  @Prop() private data: any
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
