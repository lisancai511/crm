<!--Created by LiuLei on 2019/11/8-->
<template>
  <div class="AppEmpty">
    暂无应用
    <router-link to="/backstage/general-setting/personalSetting">
      设置应用
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'AppEmpty'
})
export default class AppEmpty extends Vue {
}
</script>

<style lang="scss" scoped>

</style>
