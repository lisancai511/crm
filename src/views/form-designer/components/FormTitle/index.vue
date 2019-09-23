<!--Created by LiuLei on 2019/9/12-->
<template>
  <div class="form-title p-25">
    <div
      :class="{'dd-fence':layout.isSelect}"
      class="dd-fence-mask">
    </div>
    <div class="form-title-top">
      <div class="form-title__name__wrap">
        <div class="form-title__name fs-18">
          <strong>{{title}}</strong>
        </div>
        <div class="form-title__name--sub">
          {{subTitle}}
        </div>
      </div>
      <the-buttons
        @click.native.stop="updateCurrentField(usedButtons)"
        :usedButtons="usedButtons"/>
    </div>
    <div class="form-title-bottom m-t-30">
      <div class="form-title-info">
        <div class="form-title-info-item"
             v-for="(usedField,index) in usedFields.children"
             :key="index"
        >
          <div class="form-title-info-item__title">
            {{usedField}}
          </div>
          <div class="form-title-info-item__value">
            <strong>{{usedField}}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import TheButtons from '@/views/form-designer/components/FormTitle/TheButtons.vue'
import { field } from '@/views/form-designer/config/components'
import updateCurrentField from '@/views/form-designer/mixins/updateCurrentField'

@Component({
  name: 'FdComponentsFormHeader',
  components: { TheButtons }
})
export default class FdComponentsFormHeader extends mixins(updateCurrentField) {
  @Prop({ type: Object, required: true }) readonly layout!: field
  @Prop({ type: String, default: '' }) readonly title!: string
  @Prop({ type: String, default: '' }) readonly subTitle!: string
  @Prop({ type: Object, default: () => ({}) }) readonly usedButtons!: field
  @Prop({ type: Object, default: () => ({}) }) readonly usedFields!: field
}
</script>

<style lang="scss" scoped>
.form-title {
  /*flex-grow: 1;*/
  position: relative;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0 5px 0 rgba(1, 8, 19, 0.12);

  &-top {
    display: flex;
    justify-content: space-between;
  }

  &__name {
    &__wrap {
    }

    &--sub {
      color: #62656B;
      margin-top: 3px;
    }
  }

  &-bottom {
  }

  &-info {
    display: flex;

    &-item {
      margin-left: 56px;

      &:first-child {
        margin-left: 0;
      }

      &__title {
        color: #8A96A0;
        margin-bottom: 10px;
      }

      &__value {
      }
    }
  }
}
</style>
