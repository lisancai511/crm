<template>
  <div class="side-bar__wrap">
    <div
      @click="navHome"
      class="side-bar__header"></div>
    <div class="side-bar__main">
      <div class="side-bar">
        <el-menu :default-active="$route.path"
                 class="el-menu-vertical-demo"
                 background-color="#fff"
                 text-color="black"
                 router>
          <template v-for="item in menus">
            <el-menu-item
              class="dd-el-menu-item"
              :class="{'is-active':new RegExp(`^${item.path}`).test($route.path)}"
              :index="item.path"
              :key="item.name || item.meta.name"
              v-if="!item.children">
            <span slot="title">
              <dd-icon
                style="margin-left:-10px;margin-right:10px"
                :name="item.meta.icon||'a'"></dd-icon>
              {{ item.meta.title }}</span>
            </el-menu-item>
            <nest-menu
              v-else
              :menu="item"
              :key="item.name || item.meta.name"/>
          </template>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import NestMenu from './NestMenu.vue'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'SideBar',
  components: { NestMenu }
})
export default class SideBar extends Vue {
  @Prop({ required: true }) readonly menus !: any

  async navHome () {
    await this.$router.push('/')
  }

  created () {
  }
}
</script>

<style lang="scss" scoped>
$side-bar-height: 60px;
.side-bar {
  height: 100%;
  width: $dd--side-bar-width;
  padding-top: 20px;

  .dd-el-menu-item {
    &.is-active {
      color: $dd--primary-color !important;
    }
  }

  &__wrap {
    z-index: 1;
    position: absolute;
    width: $dd--side-bar-width;
    top: 0;
    bottom: 0;
    overflow-y: auto;
    overflow-x: hidden;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.03);
  }

  &__header {
    cursor: pointer;
    height: $side-bar-height;
    /*background-color: #40D2A5;*/
    background: url("~@/assets/images/nav-logo.png") no-repeat center;
    background-size: auto 40px;
  }

  &__main {
    position: absolute;
    width: 100%;
    top: $side-bar-height;
    bottom: 0;
    overflow-y: auto;
    overflow-x: hidden;
  }

  /deep/ .el-menu {
    border-right: none;

    .el-submenu.is-active {
      .el-submenu__title {
        /*
        background-color: $dd--primary-color !important;
*/
        span {
          /*color: #fff;*/
        }
      }
    }

    .el-menu {
      .is-active {
        /*
        background: lighten($dd--primary-color, 36%) !important;
        */
        &::before {
          content: '';
          position: absolute;
          width: 4px;
          height: 100%;
          background-color: $dd--primary-color;
          left: 0;
        }
      }
    }
  }

  /deep/ .el-submenu .el-menu-item {
    min-width: 0 !important;
  }
}

/*滑动轨道*/
::-webkit-scrollbar-track {
  background: #fff !important;
}
</style>
