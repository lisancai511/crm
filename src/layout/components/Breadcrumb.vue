<!--Created by LiuLei on 2019/9/3-->
<template>
  <div class="bread-crumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item,index) in Breadcrumb" :key="index" :to="{ path: item.path }">{{item.title?item.title:null}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({
  name: 'bread-crumb'
})
export default class SideBar extends Vue {
  private Breadcrumb:any = [{ title: '首页', path: '/' }]
 @Watch('$route', { immediate: true, deep: true })
  onRouteChanged (val: any, oldVal: any) {
    this.Breadcrumb = [this.Breadcrumb[0]]
    if (!this.$route.redirectedFrom) {
      let newMatched = this.$route.matched.slice(1, this.$route.matched.length)
      newMatched.forEach((item) => {
        if (Array.isArray(item.meta.breadcrumb)) {
          item.meta.breadcrumb.forEach((item0:any) => {
            if (item0.path && item0.title) {
              this.Breadcrumb.push(item0)
            }
          })
        } else {
          this.Breadcrumb.push(item.meta.breadcrumb)
        }
      })
    } else {
      this.Breadcrumb = [{ title: '首页', path: '/' }]
    }
  }
}
</script>

<style lang="scss" scoped>
  .bread-crumb {
    background: #EEF3F7;
    margin: 20px 0 0 20px;
  }
</style>
