<!--Created by LiuLei on 2019/9/9-->
<template>
  <div class="dd-card">
    Card
    <slot/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'DdCard'
})
export default class DdCard extends Vue {
}
</script>

<style lang="scss" scoped>
.dd-card {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 12px 20px 0 rgba(1, 8, 19, 0.12);
  border-radius: 4px;
}
</style>
