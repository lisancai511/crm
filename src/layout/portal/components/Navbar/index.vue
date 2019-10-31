<!--Created by LiuLei on 2019/9/3-->
<template>
  <div class="nav-bar">
    <div class="nav-bar-left">
      <div class="nav-bar-left-logo"></div>
    </div>
    <div class="nav-bar-right">
      <div class="nav-bar-right-setting">
        <dd-icon @click.native="goToObject" class="dd-click" name="setting"></dd-icon>
      </div>
      <div @click="Logout" class="nav-bar-right-Logout">退出</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import store from '@/store'
import { getModule } from 'vuex-module-decorators'

const userModule = getModule(UserModule, store)
@Component({
  name: 'NavBar'
})
export default class SideBar extends Vue {
  Logout () {
    userModule.logout()
    this.$router.push('/login')
  }

  goToObject () {
    this.$router.push('/backstage/general-setting/personalSetting')
  }
}
</script>

<style lang="scss" scoped>
.nav-bar {
  background-color: $dd--background-color-header-nav;
  height: $dd--nav-bar-height;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);

  &-left {
    display: flex;
    align-items: center;

    &-title {
      font-size: 16px;
      color: $dd--primary-color;
      text-align: center;
      font-weight: 600;
    }

    &-logo {
      width: 60px;
      height: 30px;
      background: url('~@/assets/images/nav-logo.png') no-repeat 100%;
      background-size: cover;
      margin: 20px;
    }
  }

  &-right {
    display: flex;

    &-setting {
      line-height: $dd--nav-bar-height;
      margin-right: 60px;
      color: $dd--primary-color;
      font-size: 20px;
    }

    &-Logout {
      margin-right: 20px;
      background: #ccc;
      text-align: center;
      width: $dd--nav-bar-height;
      border-radius: 50%;
      line-height: $dd--nav-bar-height;
      cursor: pointer;
    }
  }
}
</style>
