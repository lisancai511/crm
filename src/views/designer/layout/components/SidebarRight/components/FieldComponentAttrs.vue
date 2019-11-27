<!--Created by LiuLei on 2019/9/23-->
<template>
  <div class="TheFieldComponentAttrs">
    <div class="attrs-section">
      <strong class="attrs-section__title">字段属性</strong>
      <component
        :data="data"
        :dynamic-rules="fieldDynamicRules"
        position="top"
        ref="fieldAttrForm"
        :is="data.type"></component>
      <!--<template v-if="data.type === ComponentTypes.TextField">
        <TextField
          :data="data"
          :dynamic-rules="fieldDynamicRules"
          position="top"/>
      </template>
      <template v-if="data.type === ComponentTypes.LongTextField">
        <LongTextField :data="data"
                       :dynamic-rules="fieldDynamicRules"
                       position="top"/>
      </template>
      <template v-if="data.type === ComponentTypes.DateField">
        <DateField
          :data="data"
          :dynamic-rules="fieldDynamicRules"
          position="top"/>
      </template>
      <template v-if="data.type === ComponentTypes.DateTimeField">
        <DateTimeField
          :dynamic-rules="fieldDynamicRules"
          :data="data"
          position="top"/>
      </template>
      <template v-if="data.type === ComponentTypes.PhoneField">
        <PhoneField
          :dynamic-rules="fieldDynamicRules"
          :data="data"
          position="top"/>
      </template>-->
    </div>
    <div class="attrs-section attrs-section--footer">
      <strong class="attrs-section__title">页面属性</strong>
      <div>
        <el-checkbox :disabled="data.attrs.required"
                     v-model="data.attrs.disabled">只读
        </el-checkbox>
        <el-checkbox :disabled="data.attrs.disabled || PredefinedFieldApiNames.name === data.apiName"
                     v-model="data.attrs.required">必填
        </el-checkbox>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { IField, fieldComponents } from '@/views/designer/config/components'
import _ from 'lodash'
import basicFieldComponents from '@/views/backstage/customized/object-standard/components/FeildList/components/fields'
import ComponentTypes from '@/views/designer/config/ComponentTypes'
import LayoutTypes from '@/views/designer/config/LayoutTypes'
import designerStore from '@/store/modules/designer'
import { arrToMap } from '@/utils'
import { getLocalLayoutFields } from '@/views/designer/utils'
import PredefinedFieldApiNames from '@/views/designer/config/PredefinedFieldApiNames'

@Component({
  name: 'FieldComponentAttrs.vue',
  components: {
    ...basicFieldComponents
  }
})
export default class TheFieldComponentAttrs extends Vue {
  @Prop({ required: true }) readonly data !: IField

  @Watch('hackData', { deep: true, immediate: true })
  onLayoutChange (newVal: any, oldVal: any) {
    if (!newVal || !oldVal) {
      return
    }
    // console.log('newVal', JSON.stringify(newVal))
    // console.log('oldVal', JSON.stringify(oldVal))
    if (!this.data.isEdit && (newVal.key === oldVal.key) && !_.isEqual(newVal, oldVal)) {
      this.$set(this.data, 'isEdit', true)
    }
  }

  get hackData () {
    return JSON.parse(JSON.stringify(this.data))
  }

  get PredefinedFieldApiNames () {
    return PredefinedFieldApiNames
  }

  get ComponentTypes () {
    return ComponentTypes
  }

  get fieldComponentByType () {
    return arrToMap(fieldComponents, 'type')
  }

  get layoutType (): LayoutTypes {
    return this.$route.meta.type
  }

  get curLayout () {
    return designerStore.layout[this.layoutType]
  }

  get allUsedFields (): IField[] {
    return getLocalLayoutFields(this.curLayout.define)
  }

  get serverFields (): IField[] {
    return designerStore.fields
  }

  get otherUsedFields () {
    return [...new Set([...this.serverFields, ...this.allUsedFields])]
      .filter((field: IField) => {
        if (field.id) {
          return field.id !== this.data.id
        }
        return field !== this.data
      })
  }

  get otherUsedFieldNames (): string[] {
    return this.otherUsedFields.map((field: IField) => field.name)
  }

  get otherUsedFieldApiNames (): string[] {
    return this.otherUsedFields.map((field: IField) => field.apiName)
  }

  get fieldDynamicRules () {
    const dynamicConfigRules = ((this.fieldComponentByType[this.data.type] || {}) as IField).dynamicConfigRules
    if (dynamicConfigRules) {
      return dynamicConfigRules({
        otherUsedFieldNames: this.otherUsedFieldNames,
        otherUsedFieldApiNames: this.otherUsedFieldNames
      })
    } else {
      return {}
    }
  }

  created () {
    this.$bus.$on('designer/layout/valid', this.validateForm)
  }

  beforeDestroy () {
    this.$bus.$off('designer/layout/valid', this.validateForm)
  }

  validateForm () {
    this.$nextTick(() => {
      try {
        (this.$refs.fieldAttrForm as any).validateForm()
      } catch (e) {
        console.error(e)
      }
    })
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

    .el-select {
      width: 100%;
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
