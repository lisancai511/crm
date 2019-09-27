import LayoutTypes from '@/views/designer/config/LayoutTypes'
<!--Created by LiuLei on 2019/9/5-->
<template>
  <div class="form-design-navbar">
    <div class="navbar__left">
      <el-menu
        mode="horizontal"
        :default-active="activeMenu">
        <el-menu-item
          :key="designer.name"
          :index="designer.name"
          v-for="designer in designers">
          <router-link :to="{name:designer.name}" replace>{{designer.meta.title}}</router-link>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="navbar__right">
      <el-button @click="save" type="primary">保存</el-button>
      <el-button @click="saveAndExit">保存并退出</el-button>
      <el-button @click="exit">退出</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import formDesignerRouter from '@/router/modules/backstage/formDesigner'
import designerStore from '@/store/modules/designer'
import LayoutTypes from '@/views/designer/config/LayoutTypes'
import api from '@/api'

@Component({
  name: 'FormDesignNavBar'
})
export default class Navbar extends Vue {
  activeMenu: string | undefined = 'FormDesignerPc'
  designers = formDesignerRouter.children

  created () {
    this.activeMenu = this.$route.name
  }

  save () {
    console.log(JSON.stringify(designerStore.layout[LayoutTypes.PC]))
    // TODO 切换真实ID
    api.bizObjects.createLayoutUIs(
      '1568612437027',
      '6582945665578569728',
      {
        ...designerStore.layout[LayoutTypes.PC],
        define: JSON.stringify(designerStore.layout[LayoutTypes.PC].define)
      })
  }

  saveAndExit () {

  }

  exit () {
  }
}
</script>

<style lang="scss" scoped>
.form-design-navbar {
  height: 60px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 9px 26px 0 rgba(48, 48, 48, 0.13);
  display: flex;
  justify-content: space-between;
  align-content: center;
  z-index: 1;

  .el-menu {
    border-bottom: none;

    /deep/ .el-menu-item {
      border-bottom: none !important;

      &.is-active {
        font-weight: bold;
        font-size: 15px;
      }

      a {
        line-height: 60px;
        display: inline-block;
      }
    }
  }

  .navbar {
    &__right {
      display: flex;
      align-items: center;
      margin-right: 20px;
    }
  }
}
</style>
