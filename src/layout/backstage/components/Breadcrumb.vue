<!--Created by LiuLei on 2019/9/3-->
<template>
  <transition name="custom-classes-transition"
              :duration="100"
              enter-active-class="animated fadeInDown"
              leave-active-class="animated fadeOutUp">
    <div class="bread-crumb" v-if="breadcrumbs.length > 1">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item
            v-for="(item,index) in breadcrumbs"
            :key="item.path">
        <span
          class="el-breadcrumb-item__inner"
          :class="{
            'is-current':index === breadcrumbs.length - 1
          }"
          @click="handleNav(item,index,breadcrumbs)">{{item.meta.title}}</span>
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </div>
  </transition>
</template>

<script lang="ts">
import pathToRegexp from 'path-to-regexp'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { IServerObject } from '@/store/modules/backstage/modules/customized'

interface IObjectById {
  [propName: string]: IServerObject
}

@Component({
  name: 'bread-crumb'
})
export default class SideBar extends Vue {
  private breadcrumbs: any = []

  get objectById (): IObjectById {
    return this.$store.getters['backstage/customized/objectById']
  }

  @Watch('$route', { immediate: true, deep: true })
  on$RouterChange () {
    this.getBreadcrumb()
  }

  created () {
    this.getBreadcrumb()
  }

  pathCompile (path: string) {
    // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
    const { params } = this.$route
    const toPath = pathToRegexp.compile(path)
    return toPath(params)
  }

  formatMatched (matched: any[]) {
    return matched.map((item: any) => {
      // 如果是定制页面
      if (/^\/backstage\/customized/.test(item.path)) {
        // 如果是对象详情页面
        if (/^\/backstage\/customized\/object-standard\/:objectId$/.test(item.path)) {
          return {
            ...item,
            meta: {
              ...item.meta,
              title: (this.objectById[this.$route.params.objectId] || {}).name || item.meta.title
            }
          }
        }
        return item
      }
      return item
    })
  }

  getBreadcrumb () {
    const [, , ...matched] = this.$route.matched
    // console.log(this.$route)
    // console.log(matched)
    this.breadcrumbs = this.formatMatched(matched)
  }

  handleNav (breadcrumb: any, index: number, breadcrumbs: any[]) {
    if (index === breadcrumbs.length - 1) {
      return
    }
    this.$router.push({
      path: this.pathCompile(breadcrumb.path)
    })
  }
}
</script>

<style lang="scss" scoped>
.bread-crumb {
  background: #EEF3F7;
  margin: 20px 0 0 20px;

  .el-breadcrumb-item__inner {
    color: $dd--primary-color;
    cursor: pointer;

    &.is-current {
      color: #62656B;
      cursor: default;
    }
  }

  // breadcrumb
  .breadcrumb-enter-active,
  .breadcrumb-leave-active {
    transition: all .5s;
  }

  .breadcrumb-enter,
  .breadcrumb-leave-active {
    opacity: 0;
    transform: translateX(20px);
  }

  .breadcrumb-move {
    transition: all .5s;
  }

  .breadcrumb-leave-active {
    position: absolute;
  }
}
</style>
