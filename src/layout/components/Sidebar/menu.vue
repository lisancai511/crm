<template>
  <el-submenu :index="menu.meta.title">
    <template slot="title">
      <i :class="menu.icon"></i>
      <span>{{ menu.meta.title }}</span>
    </template>
    <template v-for="item in menu.children">
      <el-menu-item v-show="item.meta && item.meta.title" :index="item.path" :key="item.meta.title">{{ item.meta.title }}</el-menu-item>
    </template>
  </el-submenu>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'myMenu'
})
export default class Menu extends Vue {
  @Prop({ required: true }) private menu:any
  mounted () {
  }
}
</script>
