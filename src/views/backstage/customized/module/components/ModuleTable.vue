<!--Created by LiuLei on 2019/9/9-->
<template>
  <el-table
    :header-cell-style="{background:'#F8FAFC'}"
    class="dd-table--card" :data="data">
    <el-table-column
      prop="name"
      label="模块名称"></el-table-column>
    <el-table-column
      prop="objectName"
      label="对象"></el-table-column>
    <el-table-column
      prop="iconUrl"
      label="图标">
      <template slot-scope="scope">
        <dd-icon :full-name="scope.row.iconUrl"/>
      </template>
    </el-table-column>
    <el-table-column
      prop="description"
      label="备注"></el-table-column>
    <el-table-column
      prop="operation"
      width="120px"
      align="center"
      label="操作">
      <template slot-scope="scope">
        <el-button
          class="p-v-0"
          @click="editMenu(scope.row)"
          type="text">编辑
        </el-button>
        <el-button
          class="p-v-0"
          @click="deleteMenu(scope.row)"
          v-if="!standard"
          type="text">删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'ModuleTable.vue'
})
export default class MenuTable extends Vue {
  @Prop({ type: Array, required: true }) readonly data!: object
  @Prop({ type: Boolean, default: false }) readonly standard!: boolean

  editMenu (row: any) {
    this.$emit('edit', row)
  }

  deleteMenu (row: any) {
    this.$emit('delete', row)
  }
}
</script>

<style lang="scss" scoped>

</style>
