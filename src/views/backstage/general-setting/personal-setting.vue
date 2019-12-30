<!--Created by LiuLei on 2019/11/26-->
<template>
  <div class="personal-setting">
    <el-card>
      <strong class="fs-16">个人设置</strong>
      <table
        v-if="$route.query.t !== 'edit'"
        class="info__table m-t-40">
        <tbody>
        <tr>
          <td>
            <el-avatar
              class="user-avatar"
              :size="60"
              :src="user.headImages || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"/>
          </td>
          <td>
            {{user.name}}
            <el-button
              @click="beforeEdit"
              class="dd-button__text dd-button__text--info"
              style="margin-left: 175px"
              type="text">
              <dd-icon name="edit"/>
              编辑
            </el-button>
          </td>
        </tr>
        <tr>
          <td>姓名</td>
          <td>{{user.name}}</td>
        </tr>
        <tr>
          <td>主部门</td>
          <td>{{user.orgnizationName}}</td>
        </tr>
        <tr>
          <td>辅部门</td>
          <!--TODO-->
          <td>{{(user.secondaryOrgs || []).map(item => item.orgnizationName).join(',')}}</td>
        </tr>
        <tr>
          <td>上级经理</td>
          <td>{{user.managerName}}</td>
        </tr>
        <tr>
          <td>邮箱</td>
          <td>{{user.email}}</td>
        </tr>
        <tr>
          <td>角色</td>
          <td>{{(user.roles || []).map(role => role.name).join(',')}}</td>
        </tr>
        <tr>
          <td>手机号</td>
          <td>{{user.mobile}}</td>
        </tr>
        </tbody>
      </table>
      <div v-else class="p-t-40 info__form">
        <el-form
          ref="form"
          :rules="rules"
          :model="userEdit">
          <el-form-item>
            <div style="display: flex;align-items: center">
              <el-upload
                :show-file-list="false"
                :headers="userAvatarHeader"
                :httpRequest="httpRequest"
                :on-success="onUploadAvatarSuccess"
                :on-error="onUploadAvatarError"
                name="img"
                :action="userAvatarHeader.url">
                <div
                  class="avatar__wrap"
                  slot="trigger">
                  <el-avatar
                    class="user-avatar"
                    :size="120"
                    :src="userEdit.headImages">
                    <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                  </el-avatar>
                </div>
              </el-upload>
              <span class="p-l-15">{{userEdit.name}}</span>
            </div>
          </el-form-item>
          <el-row :gutter="195">
            <el-col :span="12">
              <el-form-item
                prop="name"
                label="姓名">
                <el-input v-model="userEdit.name"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱">
                <el-input v-model="userEdit.email"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="195">
            <el-col :span="12">
              <el-form-item label="主部门">
                <el-input v-model="userEdit.orgnizationName" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="角色">
                <el-input
                  disabled
                  :value="(user.roles || []).map(role => role.name).join(',')"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="195">
            <el-col :span="12">
              <el-form-item label="辅部门">
                <el-input
                  :value="(userEdit.secondaryOrgs || []).map(item => item.orgnizationName).join(',')"
                  disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号">
                <el-input
                  v-model="userEdit.mobile"
                  disabled/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="195">
            <el-col :span="12">
              <el-form-item label="上级经理">
                <el-input
                  :value="userEdit.managerName"
                  disabled/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button @click="cancel">取消</el-button>
            <el-button @click="save" type="primary">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import routerWatch from './mixins/router-watch'
import api from '@/api'
import httpRequest from '@/utils/httpRequest'
import _ from 'lodash'

@Component({
  name: 'PersonalSetting',
  methods: { httpRequest }
})
export default class PersonalSetting extends mixins(routerWatch) {
  user: any = {
    headImages: '',
    orgnizationName: ''
  }

  userEdit: any = {
    headImages: '',
    orgnizationName: ''
  }

  get userAvatarHeader () {
    return {
      ...api.mainData.uploadUserAvatar(this.user.id),
      Authorization: `Bearer ${this.$store.state.user.token}`,
      'X-tenant-id': this.$store.state.user.tenantId
    }
  }

  get rules () {
    return {
      name: {
        required: true, message: '请输入姓名'
      }
    }
  }

  async created () {
    this.getUser()
  }

  async getUser () {
    try {
      const {
        data: {
          data: user
        }
      } = await api.mainData.getCurrentUser()
      this.user = user
      this.userEdit = _.cloneDeep(this.user)
    } catch (e) {
      console.error(e)
    }
  }

  onUploadAvatarSuccess (res: any) {
    this.user.headImages = res.data.headImages
    this.userEdit.headImages = res.data.headImages
  }

  onUploadAvatarError () {
    this.$message.error('上传头像失败')
  }

  save () {
    (this.$refs.form as any).validate((valid: boolean) => {
      if (valid) {
        api.mainData.putCurrentUser({
          name: this.userEdit.name,
          email: this.userEdit.email
        }).then(async () => {
          await this.getUser()
          this.cancel()
        })
      }
    })
  }

  beforeEdit () {
    this.userEdit = _.cloneDeep(this.user)
    this.edit()
  }
}
</script>

<style lang="scss" scoped>
.personal-setting {
  .info__table {
    tr {
      > td {
        padding-bottom: 20px;

        &:first-child {
          color: #8A96A0;
          text-align: right;
          padding-right: 20px;
        }
      }
    }
  }

  .info__form {
    .avatar {
      &__wrap {
        height: 120px;
        border-radius: 60px;
        position: relative;

        &:hover {
          &::after {
            content: '更换头像';
            font-size: 12px;
            color: #fff;
            line-height: 120px;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: rgba(1, 10, 19, 0.49);
            border-radius: 60px;
          }
        }
      }
    }
  }

  .user-avatar {
    /deep/ img {
      width: 100%;
    }
  }
}
</style>
