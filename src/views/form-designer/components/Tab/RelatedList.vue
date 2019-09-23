<!--Created by LiuLei on 2019/9/17-->
<template>
  <div class="fd-components-tab-related-list">
    {{usedFields}}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'FdComponentsTabRelatedList'
})
export default class FdComponentsTabRelatedList extends Vue {
  @Prop({ type: Array, required: true }) readonly usedFields!: []
}
</script>

<style lang="scss" scoped>

</style>
