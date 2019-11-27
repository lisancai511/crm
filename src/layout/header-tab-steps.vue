<!--Created by LiuLei on 2019/11/5-->
<template>
  <el-container class="header-tab-steps">
    <el-header class="fm-header">
      <div class="dd-click fm-header__section fm-header__section--left"
           @click="goBack">
        <dd-icon
          name="back"/>
        <span class="m-l-10">{{backTitle}}</span>
      </div>
      <div class=" fm-header__section fm-header__section--main">
        <el-tabs
          v-model="activeTabName">
          <el-tab-pane
            v-for="(tab,index) in tabs"
            :key="tab.name"
            :label="tab.label"
            :name="tab.name">
            <span slot="label">
              <span class="tab-label__index" :class="{'is-active':activeTabName === tab.name}">
                {{index+1}}
              </span>
              {{tab.label}}
            </span>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class=" fm-header__section fm-header__section--right">
        <slot name="right"></slot>
      </div>
    </el-header>
    <el-main>
      <slot/>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component({
  name: 'HeaderTabSteps'
})
export default class HeaderTabSteps extends Vue {
  @Prop({ required: true, type: Array }) readonly tabs !: any[]
  @Prop({ type: String, default: '返回' }) readonly backTitle !: string
  @Prop({ type: String }) readonly backPath !: string
  @Prop({ type: String, required: true }) readonly value !: string

  get activeTabName () {
    return this.value
  }

  set activeTabName (tabName: string) {
    if (tabName === '0' || !tabName) {
      return
    }
    this.$emit('input', tabName)
  }

  created () {
    const queryTab = this.$route.query.tab
    this.activeTabName = queryTab
      ? queryTab as string : this.value
        ? this.value : this.tabs[0]
          ? this.tabs[0].name : this.value
  }

  @Watch('activeTabName')
  onActiveTabNameChange (tabName: string) {
    if (tabName === this.$route.query.tab) {
      return
    }
    this.$router.replace({
      path: this.$route.path,
      query: {
        tab: tabName
      }
    })
  }

  goBack () {
    this.backPath ? this.$router.push(this.backPath) : this.$router.go(-1)
  }
}
</script>

<style lang="scss" scoped>
$headerHeight: 60px;
.header-tab-steps{
  height: 100%;
}
.el-main{
  padding: 0;
}
.fm-header {
  display: flex;
  justify-content: center;
  align-content: center;
  box-shadow: 0 0 20px 0 rgba(1, 8, 19, 0.12);
  position: relative;
  background: #fff;

  &__section {
    display: flex;
    align-items: center;

    &--right, &--left {
      position: absolute;
      height: 100%;
      left: 20px;
    }

    &--right {
      left: auto;
      right: 20px;
    }

    &--main {
      user-select: none;
    }
  }

  /deep/ .el-tabs {
    &__header {
      margin-bottom: 0;
    }

    &__nav-wrap {
      &::after {
        display: none;
      }
    }

    &__active-bar {
      display: none;
    }

    &__item {
      height: $headerHeight;
      line-height: $headerHeight;
    }
  }

  .tab-label {
    &__index {
      display: inline-block;
      border: 1px solid rgba(102, 102, 102, 1);
      height: 18px;
      width: 18px;
      border-radius: 18px;
      line-height: 16px;
      text-align: center;

      &.is-active {
        background: $dd--primary-color;
        border-color: $dd--primary-color;
        color: #fff;
      }
    }
  }
}
</style>
