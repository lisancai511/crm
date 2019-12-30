<!--Created by LiuLei on 2019/9/3-->
<template>
  <div class="SignIn">
    <div class="common SignIn_title">欢迎登陆到答科技云平台</div>
    <div class="common SignIn_subTitle">您的账号属于多个公司，请选择要登录的公司</div>
    <div v-for="item in data" :key="item.id" class="common">
      <el-button @click="chooseCompany(item)" style="width:100%; margin-bottom:20px;">{{item.name}}</el-button>
    </div>
    <div class="common SignIn_footer">版权所有：北京格勤世纪教育科技有限公司</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Api from '@/api'
import { UserModule } from '@/store/modules/user'
import store from '@/store'
import { getModule } from 'vuex-module-decorators'

const userModule = getModule(UserModule, store)

@Component({
  name: 'Login'
})
export default class SignIn extends Vue {
  private data: any = []

  created () {
    this.getData()
  }

  async getData () {
    const { data } = await Api.user.getCompany('All')
    this.data = data.data
  }

  chooseCompany (item: any) {
    userModule.setTenantId(item.id)
    this.$router.push('/')
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
    margin-top: 215px;
    height: 46px;
    font-size: 20px;
    text-align: center;
    font-weight: bold;
    color: #020E22;
  }

  &_subTitle {
    text-align: center;
    color: #62656B;
    margin-bottom: 40px;
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
