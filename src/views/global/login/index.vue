<!--Created by LiuLei on 2019/9/3-->
<template>
  <div class="SignIn">
    <div class="common SignIn_title">
      <img class="logo" src="~@/assets/images/logo.png"/>
    </div>
    <div class="common SignIn_subTitle">登录</div>
    <div class="common SignIn_input">
      <el-form ref="newRuleForm" :rules="rules" :model="ruleForm">
        <el-form-item prop="username">
          <el-input placeholder="用户名" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="密码" type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
        </el-form-item>
      </el-form>
    </div>
    <div class="common">
      <el-button @click="login" style="width:100%" type="primary">登录</el-button>
    </div>
    <div class="common SignIn_forget">
      <div>如果没有账号，请<span @click="showRegister">注册</span></div>
      <div class="dd-click">忘记密码？</div>
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
export default class SignIn extends Vue {
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
    type: 'Password',
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

  private rules: any = {
    username: [
      { required: true, message: '请输入正确的用户名', validator: this.checkPhone, trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入用密码' }
    ]
  }

  showRegister () {
    this.$router.push('/register')
  }

  async login () {
    const newRuleForm = this.$refs.newRuleForm as any
    newRuleForm.validate(async (valid: any) => {
      if (valid) {
        const data = await userModule.login(this.ruleForm)
        if (data.success) {
          this.chooseCompany()
        }
      }
    })
  }

  async chooseCompany () {
    const { data } = await Api.user.getCompany('All')
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
  }

  &_subTitle {
    margin-top: 20px;
    font-size: 20px;
    font-weight: bold;
  }

  &_input {
    margin-top: 35px;
  }

  &_forget {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    color: #BCC7CA;

    span {
      color: $dd--primary-color;
      cursor: pointer;
    }
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

.logo {
  height: 100%;
}
</style>
