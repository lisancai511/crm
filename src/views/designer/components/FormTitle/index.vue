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
        :usedButtons="usedButtons"/>
    </div>
    <div class="form-title-bottom m-t-30">
      <transition-group
        class="form-title-info"
        name="list-complete"
        tag="div">
        <div class="form-title-info-item"
             v-for="usedField in usedFields"
             :key="usedField.key"
        >
          <div class="form-title-info-item__title">
            {{usedField.name}}
          </div>
          <div class="form-title-info-item__value">
            <strong>xxxx</strong>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import TheButtons from '@/views/designer/components/FormTitle/TheButtons.vue'
import { IField } from '@/views/designer/config/components'

@Component({
  name: 'FdComponentsFormHeader',
  components: { TheButtons }
})
export default class FdComponentsFormHeader extends Vue {
  @Prop({ type: Object, required: true }) readonly layout!: IField
  @Prop({ type: Array, default: () => [] }) readonly usedButtons!: []
  @Prop({ type: Array, default: () => [] }) readonly usedFields!: []
  @Prop({ type: String, default: '' }) readonly title!: string
  @Prop({ type: String, default: '' }) readonly subTitle!: string
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
    &-item {
      margin-left: 56px;
      display: inline-block;
      transition: all 0.3s;

      &:first-child {
        margin-left: 0;
      }

      &__title {
        color: #8A96A0;
        margin-bottom: 10px;
        text-align: center;
      }

      &__value {
        text-align: center;
      }
    }
  }
}
</style>
