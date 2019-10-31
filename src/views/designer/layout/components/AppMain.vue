<!--Created by LiuLei on 2019/9/5-->
<template>
  <div class="form-designer-app-main">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'FormDesignerAppMain'
})
export default class FormDesignerAppMain extends Vue {
  // transitionName: string = 'slide-left'

  // @Watch('$route')
  // on$RouteChange (to: any, from: any) {
  //   const toDepth = to.path.split('/').length
  //   const fromDepth = from.path.split('/').length
  //   this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  // }
}
</script>

<style lang="scss" scoped>
.form-designer-app-main {
  flex: 1;
  background-color: #F2F6FA;
  overflow: auto;
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>
