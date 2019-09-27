<!--Created by LiuLei on 2019/9/23-->
<template>
  <div class="TheFieldComponentAttrs">
    <div class="attrs-section">
      <strong class="attrs-section__title">字段属性</strong>
      <template v-if="data.type === ComponentTypes.TextField">
        <TextField :data="data" position="top"/>
      </template>
      <template v-if="data.type === ComponentTypes.LongTextField">
        <LongTextField :data="data" position="top"/>
      </template>
      <template v-if="data.type === ComponentTypes.DateField">
        <DateField :data="data" position="top"/>
      </template>
      <template v-if="data.type === ComponentTypes.DateTimeField">
        <DateTimeField :data="data" position="top"/>
      </template>
      <template v-if="data.type === ComponentTypes.PhoneField">
        <PhoneField :data="data" position="top"/>
      </template>
    </div>
    <div class="attrs-section attrs-section--footer">
      <strong class="attrs-section__title">页面属性</strong>
      <div>
        <el-checkbox :disabled="data.attrs.required"
                     v-model="data.attrs.disabled">只读
        </el-checkbox>
        <el-checkbox :disabled="data.attrs.disabled"
                     v-model="data.attrs.required">必填
        </el-checkbox>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IField } from '@/views/designer/config/components'
import basicFieldComponents from '@/views/backstage/customized/object-standard/details/feildList/components/fields'
import ComponentTypes from '@/views/designer/config/ComponentTypes'

@Component({
  name: 'TheFieldComponentAttrs',
  components: {
    'TextField': basicFieldComponents.TextField,
    'LongTextField': basicFieldComponents.LongTextField,
    'DateField': basicFieldComponents.DateField,
    'DateTimeField': basicFieldComponents.DateTimeField,
    'PhoneField': basicFieldComponents.PhoneField
  }
})
export default class TheFieldComponentAttrs extends Vue {
  @Prop({ required: true }) readonly data !: IField

  get ComponentTypes () {
    return ComponentTypes
  }
}
</script>

<style lang="scss" scoped>
.TheFieldComponentAttrs {
  /deep/ .el-form-item {
    margin-bottom: 12px;

    &__label {
      padding-bottom: 0;
      height: 30px;
      line-height: 30px;
    }
  }

  .attrs-section {
    padding-bottom: 30px;

    &__title {
      padding-bottom: 25px;
      display: inline-block;
    }

    &.attrs-section--footer {
      padding-bottom: 0;

      .attrs-section__title {
        padding-bottom: 10px;
      }
    }
  }
}
</style>
