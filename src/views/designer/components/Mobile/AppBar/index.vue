<!--Created by LiuLei on 2019/9/30-->
<template>
  <div class="FdMobileComponentsAppBar">
    <dd-icon name="back"/>
    <span>{{designer.object.name}}</span>
    <dd-icon name="more"></dd-icon>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Inject } from 'vue-property-decorator'

@Component({
  name: 'FdMobileComponentsAppBar'
})
export default class FdMobileComponentsAppBar extends Vue {
  @Inject('designer') readonly designer!: any
}
</script>

<style lang="scss" scoped>
.FdMobileComponentsAppBar {
  height: 30px;
  /*background-color: #1E88FE;*/
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #181818;
  padding: 0 15px;
}
</style>
