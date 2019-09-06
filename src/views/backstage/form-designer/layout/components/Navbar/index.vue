<!--Created by LiuLei on 2019/9/5-->
<template>
    <div class="form-design-navbar">
      <div class="navbar__left">
        <el-menu
          mode="horizontal"
          :default-active="activeMenu">
          <el-menu-item
            :key="designer.routerName"
            :index="designer.routerName"
            v-for="designer in designers">
            <router-link :to="{name:designer.routerName}" replace>{{designer.name}}</router-link>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="navbar__right">
        <el-button type="primary">保存</el-button>
        <el-button>保存并退出</el-button>
        <el-button>退出</el-button>
      </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

  @Component({
    name: 'FormDesignNavBar'
  })
export default class Navbar extends Vue {
  activeMenu:string|undefined = 'FormDesignerPc'
  designers = [
    {
      path: 'pc',
      routerName: 'FormDesignerPc',
      name: 'PC布局设计器'
    },
    {
      path: 'mobile',
      routerName: 'FormDesignerMobile',
      name: '移动端布局设计器'
    },
    {
      path: 'hover',
      routerName: 'FormDesignerHover',
      name: '悬停布局设计器'
    }, {
      path: 'linear',
      routerName: 'FormDesignerLinear',
      name: '线式布局设计器'
    }
  ]
  created () {
    this.activeMenu = this.$route.name
  }
}
</script>

<style lang="scss" scoped>
  .form-design-navbar{
    height:60px;
    background:rgba(255,255,255,1);
    box-shadow:0 9px 26px 0 rgba(48,48,48,0.13);
    display: flex;
    justify-content: space-between;
    align-content: center;
    z-index: 1;
    .el-menu{
      border-bottom: none;
      /deep/ .el-menu-item{
        border-bottom: none!important;
        &.is-active{
          font-weight: bold;
          font-size: 15px;
        }
      }
    }
    .navbar{
      &__right{
        display: flex;
        align-items: center;
        margin-right: 20px;
      }
    }
  }
</style>
