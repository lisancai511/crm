<template>
  <div class="side-bar__wrap">
    <div class="side-bar">
      <el-menu :default-active="$route.path"
               class="el-menu-vertical-demo"
               background-color="#fff"
               text-color="black"
               active-text-color="#3A85FF"
               router>
        <template v-for="item in menu">
          <el-menu-item :index="item.path"
                        :key="item.meta.title"
                        v-if="!item.children">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.meta.title }}</span>
          </el-menu-item>
          <Menu v-else
                :menu="item"
                :key="item.meta.title" />
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router/modules/backstage/index'
import Menu from './menu.vue'
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'SideBar',
  components: { Menu }
})
export default class SideBar extends Vue {
  menu: any = router;
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.side-bar {
  height: 100%;
  width: $dd--side-bar-width;
  padding-top: 31px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.03);
  &__wrap {
    z-index: 1;
    position: absolute;
    width: $dd--side-bar-width;
    top: $dd--nav-bar-height;
    bottom: 0;
    overflow-y: auto;
    overflow-x: hidden;
  }
  /deep/ .el-menu {
    border-right: none;
    .el-submenu.is-active {
      .el-submenu__title {
        background-color: #3a85ff !important;
        span {
          color: #fff;
        }
      }
    }
    .el-menu {
      .is-active {
        background: #D8E7FF!important;
      }
    }
  }
  /deep/ .el-submenu .el-menu-item {
    min-width: 0px !important;
  }
}
</style>
