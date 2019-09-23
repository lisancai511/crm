<!--Created by LiuLei on 2019/9/9-->
<template>
  <el-table class="dd-table--card" :data="data">
    <el-table-column
      prop="name"
      label="菜单名称"></el-table-column>
    <el-table-column
      prop="object"
      label="对象"></el-table-column>
    <el-table-column
      prop="icon"
      label="图标"></el-table-column>
    <el-table-column
      prop="remark"
      label="备注"></el-table-column>
    <el-table-column
      prop="operation"
      label="操作"></el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'MenuTable'
})
export default class MenuTable extends Vue {
  @Prop({ type: Array, required: true }) readonly data!: object
}
</script>

<style lang="scss" scoped>

</style>
