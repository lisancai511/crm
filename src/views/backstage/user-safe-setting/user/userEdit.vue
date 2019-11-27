<template>
  <div>
    <el-card style="min-height: calc(100vh - 150px)">
      <h2 class="m-l-10">{{userId?'编辑': '新建'}}</h2>
      <el-form ref="ruleForm"
               class="m-l-10"
               label-position="top"
               label-width="60px"
               :model="formLabelAlign">
        <el-row>
          <el-col :span="6">
            <el-form-item prop="name"
                          :rules="{required: true, message: '请输入用户姓名'}"
                          label="姓名">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6"
                  :offset="2">
            <el-form-item prop="roleIds"
                          :rules="{required: true, message: '请选择用户角色'}"
                          label="角色">
              <el-select style="width: 100%"
                         multiple
                         v-model="formLabelAlign.roleIds"
                         placeholder="请选择">
                <el-option v-for="item in roleList"
                           :key="item.id"
                           :label="item.name"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item prop="orgnization"
                          :rules="{required: true, message: '请选择主部门'}"
                          label="主部门">
              <el-cascader v-model="formLabelAlign.orgnization"
                           style="width:100%;"
                           :show-all-levels="false"
                           :options="organizationsList"
                           :props="{ expandTrigger: 'hover', label: 'name', value: 'id', checkStrictly: true }"></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="6"
                  :offset="2">
            <el-form-item prop="mobile"
                          :rules="{required: true, message: '请输入手机号'}"
                          label="手机号">
              <el-input v-model="formLabelAlign.mobile"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item prop="manager"
                          :rules="{required: true, message: '请选择上级经理'}"
                          label="上级经理">
              <el-select style="width: 100%"
                         v-model="formLabelAlign.manager"
                         placeholder="请选择">
                <el-option v-for="item in userList"
                           :key="item.id"
                           :label="item.name"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6"
                  :offset="2">
            <el-form-item prop="email"
                          :rules="{required: true, message: '请填写邮箱'}"
                          label="邮箱">
              <el-input v-model="formLabelAlign.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="m-t-30 m-l-10">
        <el-button @click="saveData"
                   type="primary">保存</el-button>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Api from '@/api'

@Component({
  name: 'Standard'
})
export default class Standard extends Vue {
  formLabelAlign: any = {}
  buttonList: any = {}
  roleList: any = []
  userList: any = []
  organizationsList: any = []
  organizations:any = []
  async created () {
    await this.getData()
    if (this.userId) {
      this.getUser()
    }
  }
  async saveData () {
    const roluForm = this.$refs['ruleForm'] as any
    roluForm.validate(async (vaild: any) => {
      if (vaild) {
        if (Array.isArray(this.formLabelAlign.orgnization)) {
          this.formLabelAlign.orgnization = this.formLabelAlign.orgnization[this.formLabelAlign.orgnization.length - 1]
        }
        if (!this.userId) {
          try {
            await Api.mainData.addUser(this.formLabelAlign)
          } catch (err) {
            throw err
          }
        } else {
          try {
            await Api.mainData.updateUser(this.formLabelAlign)
          } catch (err) {
            throw err
          }
        }
        this.$router.go(-1)
      } else {
        console.log('error submit!!')
        return false
      }
    })
  }

  get userId () {
    return this.$route.params.id
  }

  async getData () {
    try {
      [
        {
          data: { data: this.roleList }
        },
        {
          data: { data: this.userList }
        },
        {
          data: { data: this.organizationsList }
        }
      ] = await Promise.all([
        Api.mainData.getRoles(),
        Api.mainData.getUsersList(),
        Api.mainData.getOrganizations(true)
      ])
      this.organizationsList = [this.organizationsList]
    } catch (err) {
      throw err
    }
  }

  async getUser () {
    try {
      const {
        data: { data }
      } = await Api.mainData.getUser(this.userId as any)
      this.formLabelAlign = data
    } catch (err) {
      throw err
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-form-item__label {
  padding: 0 0 1px 0;
  line-height: 28px;
  font-weight: 550;
}
</style>
