<!--Created by LiuLei on 2019/11/26-->
<template>
  <div class="company-setting">
    <el-card>
      <strong class="fs-16">公司设置</strong>
      <table
        v-if="$route.query.t !== 'edit'"
        class="info__table m-t-40">
        <tbody>
        <tr>
          <td>
            <el-avatar
              :size="60"
              :src="company.logoUrl || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"/>
          </td>
          <td>
            Logo
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
          <td>企业全称</td>
          <td>{{company.name}}</td>
        </tr>
        <tr>
          <td>简称</td>
          <td>{{company.shortName}}</td>
        </tr>
        <tr>
          <td>当前主要联系人</td>
          <td>{{company.contactUserName}}</td>
        </tr>
        <tr>
          <td>程序版本</td>
          <td>// TODO</td>
        </tr>
        <tr>
          <td>版本类型</td>
          <td>// TODO</td>
        </tr>
        <tr>
          <td>组织ID</td>
          <td>// TODO</td>
        </tr>
        </tbody>
      </table>
      <div v-else class="p-t-40 info__form">
        <el-form
          :rules="rules"
          ref="form"
          :model="companyEdit">
          <el-row :gutter="195">
            <el-col :span="12">
              <el-form-item label="企业全称">
                <el-input v-model="companyEdit.name"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="程序版本">
                <el-select
                  disabled
                  style="width: 100%"
                  value="1"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="195">
            <el-col :span="12">
              <el-form-item label="简称">
                <el-input v-model="companyEdit.shortName"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="版本类别">
                <el-input disabled/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="195">
            <el-col :span="12">
              <el-form-item>
                <div style="display: flex">
                  <el-upload
                    :show-file-list="false"
                    :headers="companyAvatarHeader"
                    :httpRequest="httpRequest"
                    :on-success="onUploadAvatarSuccess"
                    :on-error="onUploadAvatarError"
                    name="img"
                    :action="companyAvatarHeader.url">
                    <div class="avatar__wrap">
                      <el-avatar
                        slot="label"
                        shape="square"
                        :size="100"
                        :src="companyEdit.logoUrl || 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"/>
                      <div class="avatar__mask">
                        <span class="avatar__mask-add">+</span>
                        <span>logo</span>
                      </div>
                    </div>
                  </el-upload>
                  <div class="avatar__description">
                    <div>
                      上传您的Logo
                    </div>
                    <span
                      style="color: #D94600"
                      class="fs-12">注：建议上传图片大小320X320像素，大小不超过2M</span>
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="组织ID">
                <el-input disabled/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="195">
            <el-col :span="12">
              <el-form-item label="当前主要联系人">
                <el-select
                  filterable
                  style="width: 100%"
                  v-model="companyEdit.contactUserId"
                  class="button__append">
                  <el-option
                    :label="user.name"
                    :value="user.id"
                    :key="user.id"
                    v-for="user in users">{{user.name}}
                  </el-option>
                  <!--                  <el-button-->
                  <!--                    class="button__append__inner dd-button__text dd-button__text&#45;&#45;info"-->
                  <!--                    slot="append" type="text">更改主要联系人-->
                  <!--                  </el-button>-->
                </el-select>
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
import routerWatch from './mixins/router-watch'
import { mixins } from 'vue-class-component'
import api from '@/api'
import _ from 'lodash'
import httpRequest from '@/utils/httpRequest'

interface ICompany {
  name: string,
  shortName: string,
  contactUserName: string
  contactUserId: string
  logoUrl: string
}

@Component({
  name: 'CompanySetting',
  methods: { httpRequest }
})
export default class CompanySetting extends mixins(routerWatch) {
  company: ICompany = {
    name: '',
    shortName: '',
    contactUserName: '',
    contactUserId: '',
    logoUrl: ''
  }

  companyEdit: ICompany = {
    name: '',
    shortName: '',
    contactUserName: '',
    contactUserId: '',
    logoUrl: ''
  }

  users: any[] = []

  get rules () {
    return {
      name: {
        required: true, message: '请输入企业全称'
      },
      shortName: {
        required: true, message: '请输入企业简称'
      }
    }
  }

  get companyAvatarHeader () {
    return {
      ...api.mainData.uploadCompanyLogo(this.$store.state.user.tenantId),
      Authorization: `Bearer ${this.$store.state.user.token}`,
      'X-tenant-id': this.$store.state.user.tenantId
    }
  }

  created () {
    this.getTenant()
    this.getUsers()
  }

  async getUsers () {
    try {
      const {
        data: {
          data: users
        }
      } = await api.mainData.getUsersList()
      this.users = users
    } catch (e) {
      console.error(e)
    }
  }

  async getTenant () {
    try {
      const {
        data: {
          data
        }
      } = await api.mainData.getCurrentTenant()
      this.company = data
      this.companyEdit = _.cloneDeep(data)
    } catch (e) {
      console.error(e)
    }
  }

  beforeEdit () {
    this.companyEdit = _.cloneDeep(this.company)
    this.edit()
  }

  onUploadAvatarSuccess (res: any) {
    this.company.logoUrl = res.data.logoUrl
    this.companyEdit.logoUrl = res.data.logoUrl
  }

  onUploadAvatarError () {
    this.$message.error('上传头像失败')
  }

  save () {
    (this.$refs.form as any).validate((valid: boolean) => {
      if (valid) {
        // TODO 完善参数
        api.mainData.putCurrentTenant({
          name: this.companyEdit.name,
          shortName: this.companyEdit.shortName,
          contactUserId: this.companyEdit.contactUserId,
          telephone: ''
        }).then(async () => {
          await this.getTenant()
          this.cancel()
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.company-setting {
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
        position: relative;
        height: 100px;
        width: 100px;
        display: inline-block;
        float: left;
        margin-right: 15px;
      }

      &__mask {
        border: 1px dashed #DDD;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 999;
        color: #999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        line-height: 1;

        &-add {
          font-size: 40px;
        }

        > * {
          display: none;
        }

        &:hover {
          > * {
            display: block;
          }
        }
      }

      &__description {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100px;
        line-height: 2;
      }
    }
  }

  .button__append {
    /deep/ .el-input-group__append {
      background-color: transparent;
      border: none;
    }

    &__inner {
      padding-left: 15px;
    }
  }

  .el-avatar {
    /deep/ img {
      width: 100%;
    }
  }
}
</style>
