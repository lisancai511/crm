<template>
  <el-submenu
    v-if="menu"
    class="dd-el-submenu"
    :class="{'is-active':isActive}"
    :index="menu.name || menu.meta.name">
    <template slot="title">
      <span>
        <dd-icon style="margin-left:-10px;margin-right:10px"
                 :name="menu.meta.icon?menu.meta.icon:''"></dd-icon>
        {{ menu.meta.title }}
      </span>
    </template>
    <template v-for="item in menu.children">
      <nest-menu
        v-if="item.children && item.children.filter(sItem => (sItem.meta || {}).inNav).length > 0"
        :menu="item"
        :key="item.name"/>
      <el-menu-item
        v-else-if="item.meta && item.meta.inNav"
        :index="item.path"
        class="dd-el-menu-item"
        :class="{'is-active':new RegExp(`^${item.path}`).test($route.path)}"
        :key="item.name || item.meta.name">
        {{ item.meta.title }}
      </el-menu-item>
    </template>
  </el-submenu>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'NestMenu'
})
export default class NestMenu extends Vue {
  @Prop({ required: true }) private menu: any

  get isActive (): boolean {
    return new RegExp(`^${this.menu.path}`).test(this.$route.path)
  }

  created () {
  }
}
</script>

<style lang="scss" scoped>
.dd-el-menu-item {
  &.is-active {
    color: $dd--primary-color !important;
  }
}

/deep/ .el-submenu .el-menu-item {
  padding-left: -20px !important;
}

/deep/ .el-submenu__title {
  padding-left: 20px !important;
}
</style>
