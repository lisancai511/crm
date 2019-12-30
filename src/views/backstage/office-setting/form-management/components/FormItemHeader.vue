<!--Created by LiuLei on 2019/11/27-->
<template>
  <div class="FormItemHeader">
    <div class="header__icon" :class="{'is-disabled':!form.enable}">
      <dd-icon class="header__icon-inner" :full-name="form.iconUrl"/>
    </div>
    <div class="header__info">
      <div class="header__title">
        {{form.name}}
      </div>
      <div class="header__description fs-12">
        {{form.description}}
      </div>
      <div class="header__update-time fs-12">
        {{$moment(form.lastModifiedTime).format('YYYY-MM-DD HH:mm:ss')}} 更新
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'FormItemHeader'
})
export default class FormItemHeader extends Vue {
  @Prop({ required: true }) readonly form !: any
}
</script>

<style lang="scss" scoped>
.FormItemHeader {
  display: flex;
  align-items: center;

  .header {
    &__icon {
      font-size: 66px;

      &.is-disabled {
        filter: grayscale(100%);
      }

      &-inner {
        border-radius: 18px;
      }
    }

    &__info {
      padding-left: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 56px;
    }

    &__description, &__update-time {
      color: #999999;
    }
  }
}
</style>
