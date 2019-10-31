<!--Created by LiuLei on 2019/9/12-->
<template>
  <div class="form-title p-25"
       :class="{'designer--mobile':designer.isMobile}">
    <div
      :class="{'dd-fence':layout.isSelect}"
      class="dd-fence-mask">
    </div>
    <template v-if="!designer.isMobile">
      <div class="form-title-top">
        <div class="form-title__name__wrap">
          <div class="form-title__name fs-18">
            <strong>{{designer.object.name}}</strong>
          </div>
          <div class="form-title__name--sub">
            {{designer.object.description}}
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
    </template>
    <template v-if="designer.isMobile">
      <transition-group
        class="form-title-info-item__title"
        name="list-complete"
        tag="div">
        <div class="form-title-info-item"
             v-for="usedField in usedFields"
             :key="usedField.key"
        >
          <div class="form-title-info-item__name">
            {{usedField.name}}
          </div>
        </div>
      </transition-group>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject } from 'vue-property-decorator'
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

  @Inject('designer') readonly designer!: any
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

  &.designer--mobile {
    /*background: #FE723F;*/
    padding: 15px;
    box-shadow: none;
    margin-bottom: 10px;

    .form-title-info-item {
      margin-left: 0;
      margin-bottom: 6px;

      &:first-child {
        font-size: 18px;

        .form-title-info-item__name {
          color: #333;
          font-weight: bold;
        }
      }

      &:last-child {
        margin-bottom: 0;
      }

      &__title {
        margin-bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
    }
  }
}
</style>
