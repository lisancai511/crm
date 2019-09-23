<!--Created by LiuLei on 2019/9/17-->
<template>
  <div class="fd-components-tab-follow-up">
    <div>{{usedButtons}}</div>
    <div>{{usedFields}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'FdComponentsTabFollowUp'
})
export default class FdComponentsTabFollowUp extends Vue {
  @Prop({ type: Array, required: true }) readonly usedButtons!: []
  @Prop({ type: Array, required: true }) readonly usedFields!: []
}
</script>

<style lang="scss" scoped>

</style>
