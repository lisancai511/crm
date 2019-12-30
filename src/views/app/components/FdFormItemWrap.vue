<!--Created by LiuLei on 2019/12/23-->
<template>
  <div class="fd-form-item-wrap">
    <FdFormItem v-bind="$props"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import FdFormItem from '@/views/designer/components/PCLayout/FdFormItem.vue'
import { IField } from '@/views/designer/config/components'

@Component({
  name: 'FdFormItemWrap',
  components: { FdFormItem }
})
export default class FdFormItemWrap extends Vue {
  @Prop({ type: Object, required: true }) readonly layout!: IField
  @Prop({ type: Number }) readonly index!: number
}
</script>

<style lang="scss" scoped>
.fd-form-item-wrap {
  /deep/ .el-form-item {
    &__label {
      display: none;
    }
  }
}
</style>
