<template>
  <div>
    <el-card style="min-height: calc(100vh - 150px)">
      <h2 class="m-l-10">{{!userId?'编辑': '新建'}}</h2>
      <el-form ref="ruleForm" class="m-l-10" label-position="top" label-width="60px" :model="formLabelAlign">
        <el-row>
          <el-col :span="6">
            <el-form-item prop="name" :rules="{required: true, message: '请输入用户姓名'}" label="姓名">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-form-item prop="roleId" :rules="{required: true, message: '请选择用户角色'}" label="角色">
              <el-select style="width: 100%" v-model="formLabelAlign.roleId" placeholder="请选择">
                <el-option
                  v-for="item in roleList"
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
            <el-form-item prop="orgnization" :rules="{required: true, message: '请选择主部门'}" label="主部门">
              <el-select style="width: 100%" v-model="formLabelAlign.orgnization" placeholder="请选择">
                <el-option
                  v-for="item in organizationsList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-form-item prop="mobile" :rules="{required: true, message: '请输入手机号'}" label="手机号">
              <el-input v-model="formLabelAlign.mobile"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item prop="manager" :rules="{required: true, message: '请选择上级经理'}" label="上级经理">
              <el-select style="width: 100%" v-model="formLabelAlign.manager" placeholder="请选择">
                <el-option
                  v-for="item in userList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="2">
            <el-form-item prop="email" :rules="{required: true, message: '请填写邮箱'}" label="邮箱">
              <el-input v-model="formLabelAlign.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="m-t-30 m-l-10">
        <el-button @click="saveData" type="primary">保存</el-button>
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
  formLabelAlign: any = {
  }
  roleList: any = []
  userList: any= []
  organizationsList: any= []
  created () {
    console.log(this.userId)
    if (this.userId) {
      this.getUser()
    }
    this.getData()
  }
  async saveData () {
    const roluForm = this.$refs['ruleForm'] as any
    roluForm.validate(async (vaild:any) => {
      if (vaild) {
        if (!this.userId) {
          try {
            const { data: { data } } = await Api.mainData.addUser(this.formLabelAlign)
            console.log(data)
            // this.$router.go(-1)
          } catch (err) {
            throw err
          }
        } else {
          try {
            const { data: { data } } = await Api.mainData.updateUser(this.formLabelAlign)
            console.log(data)
            // this.$router.go(-1)
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
      [{ data: { data: this.roleList } }, { data: { data: this.userList } }, { data: { data: this.organizationsList } }] = await Promise.all([
        Api.mainData.getRoles(),
        Api.mainData.getUsersList(),
        Api.mainData.getOrganizationsList()
      ])
    } catch (err) {
      throw err
    }
  }

  async getUser () {
    try {
      const { data: { data } } = await Api.mainData.getUser(this.userId as any)
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
