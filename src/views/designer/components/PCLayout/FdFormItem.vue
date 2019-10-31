<!--Created by LiuLei on 2019/9/18-->
<template>
  <div
    class="fd-form-item"
    :class="[
    layout.type,
    {
    'designer--mobile':designer.isMobile,
    disabled:layout.attrs.disabled,
    'is-error':layout.isError
    }]">
    <div
      v-if="!layout.name"
      style="height: 50px;"></div>
    <el-form-item
      :rules="[{ required: layout.attrs.required}]"
      :label="layout.name">
      <!--单行文本-->
      <template v-if="layout.type === ComponentTypes.TextField">
        <el-input
          :maxlength="layout.attrs.maxlength"
          v-model="layout.modal"
          :disabled="layout.attrs.disabled"/>
      </template>
      <!--多行文本-->
      <template v-if="layout.type === ComponentTypes.LongTextField">
        <el-input
          v-model="layout.modal"
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
          v-model="layout.modal"
          :disabled="layout.attrs.disabled"
          type="date"
          placeholder="选择日期"
          style="width: 100%;"></el-date-picker>
      </template>
      <!--日期时间-->
      <template v-if="layout.type === ComponentTypes.DateTimeField">
        <el-date-picker
          v-model="layout.modal"
          :disabled="layout.attrs.disabled"
          type="datetime"
          placeholder="选择日期时间"
          style="width: 100%;"></el-date-picker>
      </template>
      <!--电话-->
      <template v-if="layout.type === ComponentTypes.PhoneField">
        <el-input
          v-model="layout.modal"
          :disabled="layout.attrs.disabled"/>
      </template>
      <!--数字-->
      <template v-if="layout.type === ComponentTypes.NumberField">
        <el-input
          v-model="layout.modal"
          :disabled="layout.attrs.disabled"/>
      </template>
      <!--电子邮件-->
      <template v-if="layout.type === ComponentTypes.EmailField">
        <el-input
          v-model="layout.modal"
          :disabled="layout.attrs.disabled"/>
      </template>
      <!--网址-->
      <template v-if="layout.type === ComponentTypes.WebsiteField">
        <el-input
          v-model="layout.modal"
          :disabled="layout.attrs.disabled"/>
      </template>
      <!--复选框-->
      <template v-if="layout.type === ComponentTypes.CheckBoxField">
        <el-checkbox
          :true-label="1"
          :false-label="0"
          v-model="layout.modal"
          :disabled="layout.attrs.disabled"/>
      </template>
      <!--查找-->
      <template v-if="layout.type === ComponentTypes.LookUpField">
        <!--        TODO-->
        <el-select
          class="fd-form-item__lookup"
          filterable
          remote
          reserve-keywor
          placeholder=""
          v-model="layout.modal"
          :disabled="layout.attrs.disabled"/>
      </template>
      <!--选项列表-->
      <template v-if="layout.type === ComponentTypes.OptionListField">
        <el-select
          class="fd-form-item__option-list"
          filterable
          remote
          reserve-keywor
          placeholder=""
          v-model="layout.modal"
          :disabled="layout.attrs.disabled"/>
      </template>
      <template v-if="layout.type === ComponentTypes.AutoNumberField">
          <span v-show="layout.autoNumberConfig.prefix">{{$moment().format(layout.autoNumberConfig.prefix)}}{{String(layout.autoNumberConfig.beginNumber).padStart(+layout.attrs.maxlength,'0')}}</span>
          <span v-show="!layout.autoNumberConfig.prefix">
            <span style="visibility: hidden">[]</span>
          </span>
      </template>
    </el-form-item>
    <div v-if="designer.isBackstage"
         :class="{'dd-fence':layout.isSelect}"
         class="dd-fence-mask">
      <div v-show="layout.isSelect" class="operation-buttons">
        <dd-icon name="delete" @click.native="deleteField(layout)"></dd-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject, Emit } from 'vue-property-decorator'
import ComponentTypes from '@/views/designer/config/ComponentTypes'
import { IField } from '@/views/designer/config/components'

@Component({
  name: 'FdFormItem'
})
export default class FdFormItem extends Vue {
  @Prop({ type: Object, required: true }) readonly layout!: IField

  @Inject('designer') readonly designer!: any

  get ComponentTypes () {
    return ComponentTypes
  }

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

  &.is-error {
    border: 1px solid #F56C6C;
  }

  &::after {
    content: '';
    display: table;
  }

  &__textarea {
    /deep/ .el-textarea__inner {
      height: 152px;
    }
  }

  &__lookup,.fd-form-item__option-list {
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
    &.PhoneField {
      height: 46px;
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
      }
    }

    &.disabled {
      background-color: #F5F7FA;
    }

    .operation-buttons {
      padding-top: 14px;
    }
  }
}
</style>
