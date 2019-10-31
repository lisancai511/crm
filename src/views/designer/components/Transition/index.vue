<!--Created by LiuLei on 2019/9/29-->
<template>
  <transition-group
    class="FdComponentsTransition"
    type="transition"
    name="list-complete"
    tag="div">
    <slot/>
  </transition-group>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'FdComponentsTransition'
})
export default class FdComponentsTransition extends Vue {
}
</script>

<style lang="scss" scoped>
.FdComponentsTransition {
  height: 100%;

  /deep/ > * {
    transition: all 0.1s;
  }

  .list-complete-enter, .list-complete-leave-to {
  }

  .list-complete-leave-active {
    position: absolute;
    display: none;
  }
}
</style>
