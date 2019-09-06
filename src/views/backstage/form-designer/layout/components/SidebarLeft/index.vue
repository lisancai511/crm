<!--Created by LiuLei on 2019/9/5-->
<template>
    <div class="form-design-sidebar--left">
      form-design-sidebar
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

  @Component({
    name: 'FormDesignSidebarLeft'
  })
export default class SidebarLeft extends Vue {
}
</script>

<style lang="scss" scoped>
  .form-design-sidebar--left{
    width: 179px;
    background:rgba(250,250,250,1);
    box-shadow:0 7px 26px 0 rgba(48,48,48,0.13);
  }
</style>
