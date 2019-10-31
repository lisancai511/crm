<template>
  <el-submenu
    :class="{'is-active':isActive}"
    :index="menu.meta.title">
    <template slot="title">
      <span>
        <dd-icon style="margin-left:-10px;margin-right:10px"
                 :name="menu.meta.icon?menu.meta.icon:''"></dd-icon>
        {{ menu.meta.title }}
      </span>
    </template>
    <template v-for="item in menu.children">
      <el-menu-item
        v-if="item.meta && item.meta.inNav"
        :index="item.path"
        class="dd-el-menu-item"
        :class="{'is-active':new RegExp(`^${item.path}`).test($route.path)}"
        :key="item.meta.title">{{ item.meta.title }}
      </el-menu-item>
    </template>
  </el-submenu>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'MyMenu'
})
export default class Menu extends Vue {
  @Prop({ required: true }) private menu: any

  get isActive (): boolean {
    return new RegExp(`^${this.menu.path}`).test(this.$route.path)
  }
}
</script>

<style lang="scss" scoped>
.dd-el-menu-item {
  &.is-active {
    color: $dd--primary-color !important;
  }
}
</style>
