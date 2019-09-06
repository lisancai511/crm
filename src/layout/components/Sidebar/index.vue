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
                        background-color="red"
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
import router from './side'
import Menu from './menu.vue'
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'SideBar',
  components: { Menu }
})
export default class SideBar extends Vue {
  menu: any = router;
  mounted () {
    console.log(router)
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
  border-right: 1px solid rgba(236, 238, 243, 1);
  &__wrap {
    z-index: 1;
    position: absolute;
    width: $dd--side-bar-width;
    top: $dd--nav-bar-height;
    bottom: 0;
  }
  /deep/ .el-menu {
    .el-submenu.is-active {
      .el-submenu__title {
        background-color: #3a85ff !important;
      }
    }
  }
  /deep/ .el-submenu .el-menu-item {
    min-width: 0px !important;
  }
}
</style>
