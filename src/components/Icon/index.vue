<!--Created by LiuLei on 2019/9/10-->
<template>
  <svg
    class="dd-icon"
    aria-hidden="true"
  >
    <use
      v-if="fullName"
      :xlink:href="`#${fullName || name}`"></use>
    <use
      v-else
      :xlink:href="`#dd-icon-${name}`"></use>
  </svg>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'DdIcon'
})
export default class DdIcon extends Vue {
  @Prop({ type: String, required: false, default: '' }) readonly name!: string
  @Prop({ type: String, required: false, default: '' }) readonly fullName!: string
}
</script>

<style lang="scss" scoped>
.dd-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
