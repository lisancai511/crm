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
        <el-button @click="newApp"
                   type="primary"
                   size="small">新建
        </el-button>
        <el-upload class="m-l-10"
                   style="display:inline"
                   v-show="isPack"
                   :show-file-list="false"
                   :headers="userAvatarHeader"
                   :on-success="onUploadAvatarSuccess"
                   :on-error="onUploadAvatarError"
                   name="file"
                   :action="userAvatarHeader.url">
          <div class="avatar__wrap"
               slot="trigger">
            <el-button size="small"
                       type="primary">安装</el-button>
          </div>
        </el-upload>
      </div>
      <el-table :header-cell-style="{background:'#F8FAFC'}"
                :data="apps">
        <el-table-column prop="name"
                         label="应用程序名称"></el-table-column>
        <el-table-column prop="isCustom"
                         label="自定义">
          <template slot-scope="scope">
            {{scope.row.standard ? '否':'是'}}
          </template>
        </el-table-column>
        <el-table-column prop="description"
                         label="备注"></el-table-column>
        <el-table-column width="120px"
                         align="center"
                         prop="operation"
                         label="操作">
          <template slot-scope="scope">
            <el-button class="p-v-0 dd-button__text dd-button__text--info"
                       v-if="!isPack"
                       @click="editApp(scope.row)"
                       type="text">编辑
            </el-button>
            <el-button class="p-v-0 dd-button__text dd-button__text--info"
                       v-if="!scope.row.standard"
                       @click="deleteApp(scope.row)"
                       type="text">删除
            </el-button>
            <el-button class="p-v-0 dd-button__text dd-button__text--info"
                       v-if="isPack"
                       @click="downLoadApp(scope.row)"
                       type="text">下载
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Api from '@/api'

@Component({
  name: 'CustomizedApplication'
})
export default class CustomizedApplication extends Vue {
  get apps () {
    return this.$store.state.backstage.customized.apps
  }

  get isPack () {
    return this.$route.path.includes('pack')
  }

  async created () {
    await this.$store.dispatch('backstage/customized/getApps')
  }

  editApp (app: any) {
    this.$router.push(`${this.$route.path}/${app.id}/edit`)
  }

  onUploadAvatarError () {
    this.$message.error('上传失败')
  }

  async deleteApp (app: any) {
    await this.$store.dispatch('backstage/customized/deleteApp', app.id)
  }

  onUploadAvatarSuccess (res: any) {
    if (res.success) {
      this.$message.success('上传成功')
    }
  }

  get userAvatarHeader () {
    return {
      ...Api.paasPackage.uploadPackage(),
      Authorization: `Bearer ${this.$store.state.user.token}`,
      'X-tenant-id': this.$store.state.user.tenantId
    }
  }

  newApp () {
    this.$router.push(`${this.$route.path}/new`)
  }

  async downLoadApp (row: any) {
    await Api.paasPackage.downloadPackage(row.id).then((res: any) => {
      const blob = new Blob([res.data], {
        type: 'application/octet-stream'
      })
      const objectUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = objectUrl
      a.download = res.headers.filename
      a.click()
    })
  }
}
</script>

<style lang="scss" scoped>
.customized-application {
  .application-header {
    &__tips {
      color: #9d9d9e;
      margin: 5px 0 10px;
      line-height: 17px;
    }
  }
}
</style>
