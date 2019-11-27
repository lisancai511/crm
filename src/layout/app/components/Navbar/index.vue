<!--Created by LiuLei on 2019/9/3-->
<template>
  <div class="nav-bar">
    <div class="nav-bar__left">
      <div class="nav-bar__logo"></div>
      <div class="header__nav">
        <slot name="menu"></slot>
      </div>
    </div>
    <div class="nav-bar__right">
      <el-input
        size="small"
        style="width: 258px"
        placeholder="搜索..."
        suffix-icon="el-icon-search">
      </el-input>
      <div class="nav-bar__right-buttons p-l-30 p-r-30 m-r-30">
        <dd-icon class="m-r-20" name="add"/>
        <dd-icon class="m-r-20" name="phone"/>
        <dd-icon class="dd-click" @click.native="navBackstage" name="setting"/>
      </div>
      <el-dropdown @command="handleUserCommand">
        <div>
          <img alt="name" class="avatar" src="@/assets/images/nav-logo.png">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
  logout () {
    userModule.logout()
    this.$router.push('/login')
  }

  navBackstage () {
    this.$router.push('/backstage/general-setting/personalSetting')
  }

  handleUserCommand (command: string) {
    switch (command) {
      case 'logout':
        this.logout()
    }
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
  z-index: 999;
  position: relative;

  &__left {
    display: flex;
    align-items: center;
  }

  .header__nav {
    margin-left: 50px;
  }

  &__logo {
    width: $dd--side-bar-width;
    height: $dd--nav-bar-height;
    background: url("~@/assets/images/nav-logo.png") no-repeat 20px;
    background-size: auto 40px;
  }

  &__right {
    padding-right: 20px;
    display: flex;
    align-items: center;

    &-buttons {
      border-right: 1px solid #A3A3A3;
      font-size: 16px;
      color: rgba(154, 154, 154, 1);
    }
  }

  .el-dropdown-selfdefine {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .avatar {
    height: 30px;
    width: 30px;
    border-radius: 30px;
  }
}
</style>
