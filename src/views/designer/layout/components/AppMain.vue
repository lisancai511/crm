<!--Created by LiuLei on 2019/9/5-->
<template>
  <div class="form-designer-app-main">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'FormDesignerAppMain'
})
export default class AppMain extends Vue {
}
</script>

<style lang="scss" scoped>
.form-designer-app-main {
  flex: 1;
  background-color: #F2F6FA;
  overflow: auto;
}
</style>
