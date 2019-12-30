<!--Created by LiuLei on 2019/11/27-->
<template>
  <div class="FormItemBody">
    <div class="fs-12">可见范围</div>
    <div class="fs-12 body__auth">{{(form.targets || []).map(target => target.name).join('、')}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'FormItemBody'
})
export default class FormItemBody extends Vue {
  @Prop({ required: true }) readonly form !: any
}
</script>

<style lang="scss" scoped>
.FormItemBody {
  .body {
    &__auth {
      color: #999;
      margin-top: 5px;
    }
  }
}
</style>
