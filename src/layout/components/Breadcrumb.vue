<!--Created by LiuLei on 2019/9/3-->
<template>
  <div class="bread-crumb">
    Breadcrumb
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'bread-crumb'
})
export default class SideBar extends Vue {
}
</script>

<style lang="scss" scoped>
  .bread-crumb {
    background-color: sienna;
  }
</style>
