<!--Created by LiuLei on 2019/9/3-->
<template>
  <div class="login">
    <div class="login_left"></div>
    <div class="login_right">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'login'
})
export default class SignIn extends Vue {
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;

  &_left {
    width: 67.5%;
    min-width: 32.5%;
    height: 100%;
    float: left;
    background: url("https://qzonestyle.gtimg.cn/qzone/qzactStatics/imgs/20171122191532_f2975b.jpg") no-repeat 100%;
    background-size: cover;
  }

  &_right {
    min-width: 32.5%;
    height: 100%;
    background: #fff;
    float: right;
  }
}

@media screen and (max-width: 1000px) {
  .login_left {
    display: none;
  }
  .login_right {
    width: 100%;
  }
}
</style>
