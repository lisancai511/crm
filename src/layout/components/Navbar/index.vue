<!--Created by LiuLei on 2019/9/3-->
<template>
  <div class="nav-bar">
    <div class="nav-bar-logo"></div>
    <span class="nav-bar-title">北京到达科技有限公司</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'NavBar'
})
export default class SideBar extends Vue {}
</script>

<style lang="scss" scoped>
.nav-bar {
  background-color: $dd--primary-color;
  height: $dd--nav-bar-height;
  display: flex;
  align-items: center;
  &-title {
    font-size: 16px;
    color: #ffffff;
    font-weight: 600;
    font-family: 'PingFangSC';
  }
  &-logo {
    width: 31px;
    height: 20px;
    background: #ffffff;
    margin: 20px;
  }
}
</style>
