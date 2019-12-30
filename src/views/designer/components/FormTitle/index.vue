<!--Created by LiuLei on 2019/9/12-->
<template>
  <div class="form-title p-20"
       :class="{
    'designer--mobile':designer.setting.uiType === DESIGNER_UI_TYPES.MOBILE
  }">
    <div
      v-if="designer.setting.execType === DESIGNER_EXEC_TYPES.DESIGNER"
      :class="{'dd-fence':layout.isSelect}"
      class="dd-fence-mask">
    </div>
    <template
      v-if="[DESIGNER_EXEC_TYPES.DETAILS,DESIGNER_EXEC_TYPES.FORM].includes(designer.setting.execType) || (DESIGNER_EXEC_TYPES.DESIGNER === designer.setting.execType && DESIGNER_UI_TYPES.PC === designer.setting.uiType)">
      <div class="form-title-top">
        <div class="form-title__name__wrap">
          <div class="form-title__name fs-18">
            <strong v-if="DESIGNER_EXEC_TYPES.DESIGNER === designer.setting.execType">{{designer.object.name}}</strong>
            <strong v-else>{{moduleById[moduleId].name}}</strong>
          </div>
          <div class="form-title__name--sub">
            <span v-if="DESIGNER_EXEC_TYPES.DESIGNER === designer.setting.execType">xxxxxx</span>
            <span v-else>{{record[PredefinedFieldApiNames.name]}}</span>
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
              <strong v-if="DESIGNER_EXEC_TYPES.DESIGNER === designer.setting.execType">xxxx</strong>
              <strong v-else>{{record[usedField.apiName]}}</strong>
            </div>
          </div>
        </transition-group>
      </div>
    </template>
    <template
      v-if="DESIGNER_EXEC_TYPES.DESIGNER === designer.setting.execType && DESIGNER_UI_TYPES.MOBILE === designer.setting.uiType">
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
import {
  DESIGNER_EXEC_TYPES,
  DESIGNER_UI_TYPES
} from '@/views/designer/config/Designer'
import PredefinedFieldApiNames from '@/views/designer/config/PredefinedFieldApiNames'
import { arrToMap } from '@/utils'
import { IDesigner } from '@/views/designer/types'

@Component({
  name: 'FdComponentsFormHeader',
  components: { TheButtons }
})
export default class FdComponentsFormHeader extends Vue {
  @Prop({ type: Object, required: true }) readonly layout!: IField
  @Prop({ type: Array, default: () => [] }) readonly usedButtons!: []
  @Prop({ type: Array, default: () => [] }) readonly usedFields!: []

  @Inject('designer') readonly designer!: IDesigner

  get PredefinedFieldApiNames () {
    return PredefinedFieldApiNames
  }

  get DESIGNER_EXEC_TYPES () {
    return DESIGNER_EXEC_TYPES
  }

  get DESIGNER_UI_TYPES () {
    return DESIGNER_UI_TYPES
  }

  get record () {
    return (this.$store.state.app || {}).record.form || {}
  }

  get modules () {
    if (DESIGNER_EXEC_TYPES.DESIGNER === this.designer.setting.execType) {
      return []
    }
    return this.$store.state.app.modules
  }

  get moduleById () {
    return arrToMap(this.modules, 'id')
  }

  get moduleId () {
    if (DESIGNER_EXEC_TYPES.DESIGNER === this.designer.setting.execType) {
      return ''
    }
    return this.$route.params.moduleId_objectId.split('_')[0]
  }
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
    align-items: flex-start;
  }

  &__name {
    &__wrap {
      max-width: 50%;
      overflow: hidden;
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
      display: inline-block;
      transition: all 0.3s;

      &:first-child {
        margin-left: 0;
      }

      &__title {
        font-size: 12px;
        color: #8A96A0;
        margin-bottom: 10px;
      }

      &__value {

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
