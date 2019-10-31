<!--Created by LiuLei on 2019/10/31-->
<template>
  <div class="dictionaries">
    <el-table
      style="width: 100%"
      :data="dictionaries">
      <el-table-column
        prop="name"
        label="名称"
      >
        <template slot-scope="scope">
         <span class="dd-link">
            {{scope.row.name}}
         </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
      ></el-table-column>
      <el-table-column
        label="操作"
        width="180"
        align="center"
      >
        <el-button type="text">编辑</el-button>
        <el-button type="text">删除</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Dictionary'
})
export default class Dictionary extends Vue {
  dictionaries: any[] = [
    {
      id: 1,
      name: '学历',
      description: '学历分类，平台统一使用'
    },
    {
      id: 2,
      name: '省份',
      description: '省份分类，平台统一使用'
    },
    {
      id: 3,
      name: '市区',
      description: '市区分类，平台统一使用'
    }
  ]
}
</script>

<style lang="scss" scoped>
.dictionaries {
  .el-button.el-button--text {
    padding-bottom: 0;
    padding-top: 0;
  }
}
</style>
