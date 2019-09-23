<template>
  <div class="main">
    <el-card class='m-b-20' :body-style="{padding:0}">
      <el-tabs class='tabs' v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <EssentialIinformation></EssentialIinformation>
        </el-tab-pane>
        <el-tab-pane label="记录类型" name="second">
          <TypeRecord></TypeRecord>
        </el-tab-pane>
        <el-tab-pane label="字段列表" name="third">
          <FieldList></FieldList>
        </el-tab-pane>
        <el-tab-pane label="字段依赖设置" name="fourth">
          <Depend></Depend>
        </el-tab-pane>
        <el-tab-pane label="角色权限设置" name="fifth">
          <RoleSetting></RoleSetting>
        </el-tab-pane>
        <el-tab-pane label="布局" name="sixth">
          <Lay></Lay>
        </el-tab-pane>
        <el-tab-pane label="布局分配" name="seventh"><LayDistribution></LayDistribution></el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EssentialIinformation from './details/essentialInformation/EssentialInformation.vue'
import TypeRecord from './details/typeRecord/TypeRecord.vue'
import FieldList from './details/feildList/FieldList.vue'
import Depend from './details/depend/Depend.vue'
import Lay from './details/lay/Lay.vue'
import RoleSetting from './details/roleSetting/RoleSetting.vue'
import LayDistribution from './details/layDistribution/LayDistribution.vue'

@Component({
  name: 'StandardEdit',
  components: { EssentialIinformation, TypeRecord, FieldList, Depend, Lay, RoleSetting, LayDistribution }
})
export default class StandardEdit extends Vue {
  private activeName: String = localStorage.getItem('activeName') || 'first'
  handleClick (tab:any, event:any) {
    localStorage.setItem('activeName', tab.name)
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-tabs__nav-wrap::after {
  height: 0px;
}
/deep/ .el-tabs__active-bar {
  background: linear-gradient(to right,#fff 25%,#3A85FF 25%,#3A85FF 75%, #fff 75%)
}
/deep/ .el-tabs__header {
  margin: 20px 20px 10px;
}
</style>
