<!--Created by LiuLei on 2019/9/18-->
<template>
  <fd-component-detailed
    :class="itemClassNames"
    v-bind="$props"
    v-if="layout.type === ComponentTypes.Detailed">
    <PCLayout
      detailed
      :class="[ComponentTypes.Detailed]"
      v-bind="$props"/>
    <dd-icon
      slot="delete"
      name="delete" @click.native="deleteField(layout)"/>
  </fd-component-detailed>
  <div
    v-else
    class="fd-form-item"
    :class="itemClassNames">
    <div
      v-if="DESIGNER_UI_TYPES.PC === designer.setting.uiType && !layout.attrs.required && !layout.name"
      style="height: 24px;"></div>
    <el-form-item
      v-if="[DESIGNER_EXEC_TYPES.DESIGNER,DESIGNER_EXEC_TYPES.FORM].includes(designer.setting.execType)"
      :rules="rules"
      :prop="apiName"
      :label="layout.name">
      <span slot="label">
        {{layout.name}}
        <el-tooltip
          effect="dark"
          :content="layout.helpText"
          placement="top-start">
        <span
          v-if="layout.helpText"
          class="help-icon">?</span>
      </el-tooltip>
      </span>
      <!--单行文本-->
      <template v-if="layout.type === ComponentTypes.TextField">
        <el-input
          :maxlength="layout.attrs.maxlength"
          v-model="model"
          :disabled="layout.attrs.disabled"/>
      </template>
      <!--多行文本-->
      <template v-if="layout.type === ComponentTypes.LongTextField">
        <el-input
          v-model="model"
          :disabled="layout.attrs.disabled"
          :maxlength="layout.attrs.maxlength"
          :rows="6"
          class="fd-form-item__textarea"
          resize="none"
          type="textarea"/>
      </template>
      <!--日期-->
      <template v-if="layout.type === ComponentTypes.DateField">
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="model"
          :disabled="layout.attrs.disabled"
          type="date"
          placeholder="选择日期"
          style="width: 100%;"/>
      </template>
      <!--日期时间-->
      <template v-if="layout.type === ComponentTypes.DateTimeField">
        <el-date-picker
          value-format="yyyy-MM-dd HH:mm:ss"
          v-model="model"
          :disabled="layout.attrs.disabled"
          type="datetime"
          placeholder="选择日期时间"
          style="width: 100%;"/>
      </template>
      <!--电话-->
      <template v-if="layout.type === ComponentTypes.PhoneField">
        <el-input
          v-model.number="model"
          :disabled="layout.attrs.disabled"/>
      </template>
      <!--数字-->
      <template v-if="layout.type === ComponentTypes.NumberField">
        <label
          v-if="layout.attrs.unit"
          slot="label">({{layout.attrs.unit}})</label>
        <el-input
          style="width: 100%"
          :precision="layout.attrs.decimalDigit || 2"
          :max="Math.pow(10,layout.attrs.integerDigit || 10)-(1/Math.pow(10,layout.attrs.decimalDigit || 2))"
          :min="-Math.pow(10,layout.attrs.integerDigit || 10)+(1/Math.pow(10,layout.attrs.decimalDigit || 2))"
          v-model="model"
          :disabled="layout.attrs.disabled"/>
      </template>
      <!--电子邮件-->
      <template v-if="layout.type === ComponentTypes.EmailField">
        <el-input
          v-model="model"
          :disabled="layout.attrs.disabled"/>
      </template>
      <!--网址-->
      <template v-if="layout.type === ComponentTypes.WebsiteField">
        <el-input
          v-model="model"
          :maxlength="layout.attrs.maxlength"
          :disabled="layout.attrs.disabled"/>
      </template>
      <!--复选框-->
      <template v-if="layout.type === ComponentTypes.CheckBoxField">
        <el-checkbox
          :true-label="1"
          :false-label="0"
          v-model="model"
          :disabled="layout.attrs.disabled"/>
      </template>
      <!--查找-->
      <template v-if="layout.type === ComponentTypes.LookUpField">
        <!--TODO-->
        <LookUpField
          v-bind="$props"
          v-model="model"/>
      </template>
      <!--选项列表-->
      <template v-if="layout.type === ComponentTypes.OptionListField">
        <OptionListField
          v-bind="$props"
          v-model="model"/>
      </template>
      <!--自动编号-->
      <template v-if="layout.type === ComponentTypes.AutoNumberField">
        <span v-show="layout.autoNumberConfig.prefix">{{$moment().format((prefixByValue[layout.autoNumberConfig.prefix] || {}).label)}}{{String(layout.autoNumberConfig.beginNumber).padStart(+layout.attrs.maxlength,'0')}}</span>
        <span v-show="!layout.autoNumberConfig.prefix">
            <span style="visibility: hidden">[]</span>
          </span>
      </template>
      <!--金额-->
      <template v-if="layout.type === ComponentTypes.MoneyField">
        <label
          v-if="layout.attrs.unit"
          slot="label">({{layout.attrs.unit}})</label>
        <el-input
          style="width: 100%"
          :precision="layout.attrs.decimalDigit || 8"
          :max="Math.pow(10,layout.attrs.integerDigit || 20)-(1/Math.pow(10,layout.attrs.decimalDigit || 2))"
          :min="-Math.pow(10,layout.attrs.integerDigit || 20)+(1/Math.pow(10,layout.attrs.decimalDigit || 2))"
          v-model="model"
          :disabled="layout.attrs.disabled">
          <template
            v-if="layout.attrs.capital"
            slot="append">{{nzhcn.toMoney(model).replace('人民币','')}}
          </template>
        </el-input>
      </template>
      <!--图片-->
      <template v-if="layout.type === ComponentTypes.ImageField">
        <image-field
          v-model="model"
          v-bind="$props"/>
      </template>
      <!--定位-->
      <template v-if="layout.type === ComponentTypes.LocationField">
        <el-button type="text">获取定位</el-button>
      </template>
      <!--标签-->
      <template v-if="layout.type === ComponentTypes.TagField">
        <el-button
          class="button-new-tag">+ 新建标签
        </el-button>
      </template>
    </el-form-item>
    <div
      v-if="DESIGNER_EXEC_TYPES.DETAILS === designer.setting.execType"
      class="details-item">
      <div class="details-item__label">{{layout.name}}</div>
      <!--网址-->
      <template v-if="layout.type===ComponentTypes.WebsiteField">
        <a
          :target="layout.attrs.urlModel"
          :href="(model|| '').includes('http') ? model : `///${model}`">
          {{model}}
        </a>
      </template>
      <!--复选框-->
      <template v-else-if="layout.type===ComponentTypes.CheckBoxField">
        <el-checkbox
          disabled
          :checked="model-1===0"/>
      </template>
      <!--查找-->
      <template v-else-if="layout.type===ComponentTypes.LookUpField">
        <LookUpFieldDetails v-bind="$props"/>
      </template>
      <!--图片-->
      <template v-else-if="layout.type===ComponentTypes.ImageField">
        <ImageFieldDetails v-bind="$props"/>
      </template>
      <!--默认-->
      <template v-else>
        <div class="details-item__value">{{model}}</div>
      </template>
    </div>
    <div v-if="DESIGNER_EXEC_TYPES.DESIGNER === designer.setting.execType"
         :class="{'dd-fence':layout.isSelect}"
         class="dd-fence-mask">
      <div v-show="layout.isSelect" class="operation-buttons">
        <dd-icon name="delete" @click.native="deleteField(layout)"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Inject, Emit } from 'vue-property-decorator'
import ComponentTypes from '@/views/designer/config/ComponentTypes'
import { IField } from '@/views/designer/config/components'
import {
  DESIGNER_EXEC_TYPES,
  DESIGNER_UI_TYPES
} from '@/views/designer/config/Designer'
import { AutoNumberPrefixesList } from '@/views/designer/config/AutoNumberPrefixes'
import { arrToMap } from '@/utils'
import OptionListField
  from '@/views/designer/components/PCLayout/field-components/OptionListField/OptionListField.vue'
import Nzh from 'nzh'
import FdComponentDetailed from '@/views/designer/components/Detailed/index.vue'
import LookUpField
  from '@/views/designer/components/PCLayout/field-components/LookUpField/LookUpField.vue'
import ImageField
  from '@/views/designer/components/PCLayout/field-components/ImageField/ImageField.vue'
import { IDesigner } from '@/views/designer/types'
import LookUpFieldDetails
  from '@/views/designer/components/PCLayout/field-components/LookUpField/LookUpFieldDetails.vue'
import { mixins } from 'vue-class-component'
import operateModelMixins from '@/views/designer/components/PCLayout/mixins/modelMixins'
import apiNameMixins from '@/views/designer/components/PCLayout/mixins/apiNameMixins'
import ImageFieldDetails from '@/views/designer/components/PCLayout/field-components/ImageField/ImageFieldDetails.vue'

@Component({
  name: 'FdFormItem',
  components: {
    ImageFieldDetails,
    ImageField,
    LookUpFieldDetails,
    LookUpField,
    PCLayout: () => import('@/views/designer/components/PCLayout/index.vue'),
    OptionListField,
    FdComponentDetailed
  }
})
export default class FdFormItem extends mixins(operateModelMixins, apiNameMixins) {
  @Prop({ type: Object, required: true }) readonly layout!: IField
  @Inject('designer') readonly designer!: IDesigner
  @Prop({ type: Number }) readonly index!: number

  get itemClassNames () {
    return [
      this.layout.type,
      {
        'designer--mobile': this.designer.setting.uiType === DESIGNER_UI_TYPES.MOBILE,
        disabled: this.layout.attrs.disabled,
        'is-error': this.layout.isError
      }]
  }

  get rules () {
    const baseRules = [
      {
        required: this.layout.attrs.required,
        message: `请输入${this.layout.name}`
      }
    ]
    const selfRules: any[] = []
    switch (this.layout.type) {
      case ComponentTypes.EmailField:
        selfRules.push(...[
          {
            pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            message: '请输入正确的邮件地址'
          }
        ])
        break
      case ComponentTypes.WebsiteField:
        selfRules.push(...[
          {
            pattern: /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i,
            message: '请输入以 http:// 或 https:// 开头的网址'
          }
        ])
        break
      default:
    }
    return [
      ...baseRules,
      ...selfRules
    ]
  }

  get DESIGNER_EXEC_TYPES () {
    return DESIGNER_EXEC_TYPES
  }

  get DESIGNER_UI_TYPES () {
    return DESIGNER_UI_TYPES
  }

  get ComponentTypes () {
    return ComponentTypes
  }

  get prefixes () {
    return AutoNumberPrefixesList
  }

  get prefixByValue () {
    return arrToMap(this.prefixes, 'value')
  }

  nzhcn = Nzh.cn

  @Emit('delete')
  deleteField (layout: IField) {
    return layout
  }
}
</script>

<style lang="scss" scoped>

.fd-form-item {
  position: relative;
  padding: 0 10px 0;

  /deep/ .el-form-item {
    &__label {
      padding-bottom: 0;
    }
  }

  &.is-error {
    border: 1px solid #F56C6C;
  }

  &::after {
    content: '';
    display: table;
  }

  &__textarea {
    /deep/ .el-textarea__inner {
      height: 142px;
    }
  }

  &__lookup, .fd-form-item__option-list {
    width: 100%;
  }

  .dd-fence-mask {
    cursor: move;
    z-index: 9;
  }

  .operation-buttons {
    float: right;
    padding-right: 10px;
    padding-top: 10px;

    > .dd-icon {
      cursor: pointer;
    }
  }

  &.designer--mobile {
    &.TextField,
    &.LongTextField,
    &.DateTimeField,
    &.DateField,
    &.NumberField,
    &.EmailField,
    &.WebsiteField,
    &.CheckBoxField,
    &.LookUpField,
    &.OptionListField,
    &.AutoNumberField,
    &.PhoneField,
    &.ImageField,
    &.LocationField,
    &.MoneyField {
      height: $dd-design-mobile-item-height;
      /*background-color: #FE723F;*/
      &::after {
        position: absolute;
        width: 100%;
        height: 1px;
        background-color: rgba(230, 230, 230, 1);
      }

      .el-form-item {
        height: 100%;
        margin: 0;
        display: flex;
        flex-direction: row;
        align-items: center;

        /deep/ .el-form-item {
          &__label {
            /*background-color: #FE723F;*/
            height: 40px;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          &__content {
            background-color: transparent;

            .el-input {
              &__inner {
                border: none;
              }
            }

            .el-textarea {
              &__inner {
                border: none;
                height: 40px;
              }
            }
          }
        }

        /deep/ .el-input-group--append {
          .el-input-group__append {
            border: none !important;
            background-color: transparent;
          }
        }
      }
    }

    &.disabled {
      background-color: #F5F7FA;
    }

    .operation-buttons {
      padding-top: 14px;
    }
  }

  /*详情部分*/
  .details-item {
    height: 60px;

    &__label {
      color: $dd--color-text-regular;
      margin-bottom: 6px;
    }

    &__value {
      font-size: 16px;
    }
  }

  .help-icon {
    border: 1px solid $dd--color-text-placeholder;
    display: inline-block;
    height: 12px;
    width: 12px;
    line-height: 12px;
    border-radius: 12px;
    font-size: 12px;
    text-align: center;
    cursor: help;
  }
}
</style>
