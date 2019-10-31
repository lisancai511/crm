<template>
  <div class="main">
    <el-card class='m-b-20' :body-style="{padding:0}">
      <el-tabs
        class='tabs'
        v-model="activeName"
        @tab-click="handleClick">
        <el-tab-pane :lazy="true" label="基本信息" name="first">
          <EssentialInformation/>
        </el-tab-pane>
        <el-tab-pane :lazy="true" v-if="objectId !== 'add'" label="记录类型" name="second">
          <TypeRecord/>
        </el-tab-pane>
        <el-tab-pane :lazy="true" v-if="objectId !== 'add'" label="字段列表" name="third">
          <FieldList/>
        </el-tab-pane>
        <el-tab-pane :lazy="true" v-if="objectId !== 'add'" label="字段依赖设置" name="fourth">
          <FieldDependence/>
        </el-tab-pane>
        <!-- <el-tab-pane label="角色权限设置" name="fifth">
          <RoleSetting></RoleSetting>
        </el-tab-pane> -->
        <el-tab-pane :lazy="true" v-if="objectId !== 'add'" label="布局" name="sixth">
          <Geography/>
        </el-tab-pane>
        <el-tab-pane :lazy="true" label="布局分配" v-if="objectId !== 'add'" name="seventh">
          <LayDistribution/>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'
import EssentialInformation from './components/EssentialInformation/index.vue'
import TypeRecord from './components/TypeRecord/index.vue'
import FieldList from './components/FeildList/index.vue'
import FieldDependence from './components/FieldDependence/index.vue'
import Geography from './components/Geography/index.vue'
import RoleSetting from './components/roleSetting/RoleSetting.vue'
import LayDistribution from './components/LayDistribution/LayDistribution.vue'

@Component({
  name: 'StandardDetails',
  components: {
    EssentialInformation,
    TypeRecord,
    FieldList,
    FieldDependence,
    Geography,
    RoleSetting,
    LayDistribution
  }
})
export default class StandardDetails extends Vue {
  private activeName: String = sessionStorage.getItem('activeName') || 'first'
  @Provide() objectId = this.$attrs.objectId || false

  handleClick (tab: any) {
    sessionStorage.setItem('activeName', tab.name)
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-tabs__nav-wrap::after {
  height: 0;
}

// /deep/ .el-tabs__active-bar {
//   background: linear-gradient(to right, #fff 25%, $dd--primary-color 25%, $dd--primary-color 75%, #fff 75%)
// }

/deep/ .el-tabs__header {
  margin: 20px 20px 10px;
}
</style>
