<!--Created by LiuLei on 2019/9/9-->
<template>
  <div class="customized-application">
    <el-card>
      <div slot="header">
        <strong class="fs-16">应用程序</strong>
        <div class="fs-12 application-header__tips">
          <div>应用程序"是指作为一个单位提供功能的一组菜单。用户可以在每个页面右上角下拉选择应用程序，菜单会在不同的应用程序直接切换"</div>
          <div>您可以自定义现有应用程序以匹配您的工作方式，或通过对标准和自定义菜单分组构建新应用程序</div>
        </div>
        <el-button type="primary" size="small">新建</el-button>
      </div>
      <el-table :data="applicationData">
        <el-table-column
          prop="name"
          label="应用程序名称"></el-table-column>
        <el-table-column
          prop="isCustom"
          label="自定义">
          <template slot-scope="scope">
            {{scope.row.isCustom ? '是':'否'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"></el-table-column>
        <el-table-column
          prop="operation"
          label="操作"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'CustomizedApplication'
})
export default class CustomizedApplication extends Vue {
  private applicationData = [
    {
      name: '名称1',
      isCustom: Math.random() > 0.5,
      remark: '备注1',
      operation: '操作1'
    },
    {
      name: '名称2',
      isCustom: Math.random() > 0.5,
      remark: '备注2',
      operation: '操作2'
    },
    {
      name: '名称3',
      isCustom: Math.random() > 0.5,
      remark: '备注3',
      operation: '操作3'
    },
    {
      name: '名称4',
      isCustom: Math.random() > 0.5,
      remark: '备注4',
      operation: '操作4'
    }
  ]
}
</script>

<style lang="scss" scoped>
.customized-application {
  .application-header {
    &__tips {
      color: #9D9D9E;
      margin: 5px 0 10px;
      line-height: 17px;
    }
  }
}
</style>
