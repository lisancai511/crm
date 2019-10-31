<!--Created by LiuLei on 2019/9/3-->
<template>
  <div class="SignIn">
    <div @click="goToLogin" class="common SignIn_title">
      <dd-icon style="margin-left:-5px" name="goBack"></dd-icon>
    </div>
    <div class="common SignIn_subTitle">注册</div>
    <div class="common SignIn_input">
      <el-form :rules="rules" :model="ruleForm" ref="ruleForm">
        <el-form-item prop="account">
          <el-input placeholder="请输入手机号" v-model="ruleForm.account"></el-input>
        </el-form-item>
        <el-form-item prop="verefyCode">
          <el-input placeholder="请输入验证码" v-model="ruleForm.verefyCode">
            <template slot="append"><span class="dd-click" v-if="showCode" @click="getCode">验证码</span><span v-else>{{count}} s</span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请填写企业完整名称" v-model="ruleForm.tenantName"></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <el-input placeholder="请填写姓名" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="设置登录密码" type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="确认登录密码" type="password" v-model="password"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="common">
      <el-button @click="saveData" style="width:100%" type="primary">注册</el-button>
    </div>
    <div class="common SignIn_footer">版权所有：北京格勤世纪教育科技有限公司</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Api from '@/api'
import { UserModule } from '@/store/modules/user'
import { getModule } from 'vuex-module-decorators'
import store from '@/store'

const userModule = getModule(UserModule, store)

@Component({
  name: 'Login'
})
export default class Login extends Vue {
  private checkPhone = (rule: any, value: any, callback: any) => {
    const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/
    if (!value) {
      return callback(new Error('电话号码格式不正确'))
    }
    setTimeout(() => {
      if (!Number.isInteger(+value)) {
        callback(new Error('请输入数字值'))
      } else {
        if (phoneReg.test(value)) {
          callback()
        } else {
          callback(new Error('电话号码格式不正确'))
        }
      }
    }, 100)
  }
  private ruleForm: any = {
    type: 'Cellphone'
  }
  private rules: any = {
    account: [
      { required: true, message: '请输入手机号', validator: this.checkPhone, trigger: 'blur' }
    ],
    verefyCode: [
      { required: true, message: '请输入验证码' }
    ],
    name: [
      { required: true, message: '请输入姓名' }
    ],
    password: [
      { required: true, message: '请确认密码' }
    ]
  }
  private password: any = ''
  showCode: boolean = true
  count: number = 60

  async getCode () {
    const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/
    if (phoneReg.test(this.ruleForm.account)) {
      const data: any = {
        account: this.ruleForm.account,
        type: 'Cellphone'
      }
      await Api.user.getCode(data)
      this.showCode = false
      let a = setInterval(() => {
        if (this.count === 1) {
          this.showCode = true
          this.count = 60
          clearInterval(a)
        }
        this.count = this.count - 1
      }, 1000)
    } else {
      this.$message.error('请输入正确的手机号')
    }
  }

  async saveData () {
    const register = this.$refs['ruleForm'] as any
    register.validate(async (valid: any) => {
      if (valid) {
        if (this.ruleForm.password === this.password) {
          let data = await Api.user.register(this.ruleForm)
          if (data.data.success) {
            this.$message.success('注册成功')
            const login = {
              username: this.ruleForm.account,
              password: this.ruleForm.password,
              device: {
                type: 'PC',
                osType: 'IOS',
                osVersion: '10.001',
                model: 'asd',
                deviceId: 'asdf',
                pushAllow: true,
                locateAllow: true,
                photoAllow: true,
                storageAllow: true
              }
            }
            let { data } = await Api.user.login(login)
            if (data.success) {
              userModule.setToken(data.data)
              this.chooseCompany()
            }
            this.$emit('changeShow')
          } else {
            this.$message.error(data.data.message)
          }
        } else {
          this.$message.error('两次密码不一致，请确认')
        }
      }
    })
  }

  goToLogin () {
    this.$router.push('/login')
  }

  async surePhoneNumber () {
    let { data: { data } } = await Api.user.surePhoneNumber()
    return data
  }

  async chooseCompany () {
    let { data } = await Api.user.getCompany('All')
    if (data.data.length > 1) {
      await this.$router.push('/company-choose')
    } else if (data.data.length === 1) {
      userModule.setTenantId(data.data[0].id)
      await this.$router.push('/')
    } else {
      await this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.SignIn {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  .common {
    width: 307px;
  }

  &_title {
    margin-top: 150px;
    height: 46px;
    line-height: 46px;
    font-size: 46px;
    cursor: pointer;
  }

  &_subTitle {
    margin: 20px 0;
    font-size: 20px;
    font-weight: bold;
  }

  &_footer {
    position: absolute;
    bottom: 30px;
    color: #8A96A0;
    text-align: center;
  }
}

@media screen and (max-height: 750px) {
  .SignIn_footer {
    display: none;
  }
}
</style>
