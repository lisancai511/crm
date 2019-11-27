<!--Created by LiuLei on 2019/9/9-->
<template>
  <div class="customized-application">
    <el-card :body-style="{padding:0}">
      <div slot="header">
        <strong class="fs-16">应用程序</strong>
        <div class="fs-12 application-header__tips">
          <div>应用程序"是指作为一个单位提供功能的一组模块。用户可以在每个页面右上角下拉选择应用程序，模块会在不同的应用程序直接切换"</div>
          <div>您可以自定义现有应用程序以匹配您的工作方式，或通过对标准和自定义模块分组构建新应用程序</div>
        </div>
        <el-button
          @click="newApp"
          type="primary" size="small">新建
        </el-button>
      </div>
      <el-table
        :header-cell-style="{background:'#F8FAFC'}"
        :data="apps">
        <el-table-column
          prop="name"
          label="应用程序名称"></el-table-column>
        <el-table-column
          prop="isCustom"
          label="自定义">
          <template slot-scope="scope">
            {{scope.row.standard ? '否':'是'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="备注"></el-table-column>
        <el-table-column
          width="120px"
          align="center"
          prop="operation"
          label="操作">
          <template slot-scope="scope">
            <el-button
              class="p-v-0"
              @click="editApp(scope.row)" type="text">编辑
            </el-button>
            <el-button
              class="p-v-0"
              v-if="!scope.row.standard"
              @click="deleteApp(scope.row)" type="text">删除
            </el-button>
          </template>
        </el-table-column>
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
  get apps () {
    return this.$store.state.backstage.customized.apps
  }

  async created () {
    await this.$store.dispatch('backstage/customized/getApps')
  }

  editApp (app: any) {
    console.log(app)
    this.$router.push(`${this.$route.path}/${app.id}/edit`)
  }

  async deleteApp (app: any) {
    await this.$store.dispatch('backstage/customized/deleteApp', app.id)
  }

  newApp () {
    this.$router.push(`${this.$route.path}/new`)
  }
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
