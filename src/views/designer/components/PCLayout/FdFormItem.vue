<!--Created by LiuLei on 2019/9/18-->
<template>
  <div
    class="fd-form-item"
    :class="[
    layout.type,
    {
    'designer--mobile':designer.setting && designer.setting.platform === DESIGNER_PLATFORMS.MOBILE,
    disabled:layout.attrs.disabled,
    'is-error':layout.isError
    }]">
    <div
      v-if="!layout.name"
      style="height: 50px;"></div>
    <el-form-item
      v-if="designer.setting || (designer.running && designer.running.type === DESIGNER_RUNNING_TYPES.FORM)"
      :rules="rules"
      :prop="layout.apiName"
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
          style="width: 100%;"></el-date-picker>
      </template>
      <!--日期时间-->
      <template v-if="layout.type === ComponentTypes.DateTimeField">
        <el-date-picker
          value-format="yyyy-MM-dd HH:mm:ss"
          v-model="model"
          :disabled="layout.attrs.disabled"
          type="datetime"
          placeholder="选择日期时间"
          style="width: 100%;"></el-date-picker>
      </template>
      <!--电话-->
      <template v-if="layout.type === ComponentTypes.PhoneField">
        <el-input
          v-model.number="model"
          :disabled="layout.attrs.disabled"/>
      </template>
      <!--数字-->
      <template v-if="layout.type === ComponentTypes.NumberField">
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
        <!--        TODO-->
        <el-select
          class="fd-form-item__lookup"
          filterable
          remote
          clearable
          reserve-keywor
          :remote-method="remoteMethod"
          placeholder=""
          v-model="model"
          :disabled="!lookupObjectApiName && layout.attrs.disabled">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </template>
      <!--选项列表-->
      <template v-if="layout.type === ComponentTypes.OptionListField">
        <!--<el-select
          class="fd-form-item__option-list"
          placeholder=""
          v-model="model"
          :disabled="layout.attrs.disabled">
          <el-option
            :key="item.id"
            :value="item.id"
            :label="item.v"
            v-for="item in valueCandidates">
            {{item.v}}
          </el-option>
        </el-select>-->
        <option-list-field
          :record="($store.state.app.record || {}).form || {}"
          :field-by-id="($store.state.app.record || {}).fieldById || {}"
          :show-all="designer.setting || (designer.running && designer.running.type === DESIGNER_RUNNING_TYPES.DETAILS)"
          :field-dependencies="fieldDependencies"
          :layout="layout"
          v-model="model"/>
      </template>
      <!--自动编号-->
      <template v-if="layout.type === ComponentTypes.AutoNumberField">
        <span v-show="layout.autoNumberConfig.prefix">{{$moment().format(prefixByValue[layout.autoNumberConfig.prefix].label)}}{{String(layout.autoNumberConfig.beginNumber).padStart(+layout.attrs.maxlength,'0')}}</span>
        <span v-show="!layout.autoNumberConfig.prefix">
            <span style="visibility: hidden">[]</span>
          </span>
      </template>
    </el-form-item>
    <div
      v-if="designer.running && designer.running.type === DESIGNER_RUNNING_TYPES.DETAILS"
      class="details-item">
      <div class="details-item__label">{{layout.name}}</div>
      <template v-if="layout.type===ComponentTypes.WebsiteField">
        <a
          :target="layout.attrs.urlModel"
          :href="(model|| '').includes('http') ? model : `///${model}`">
          {{model}}
        </a>
      </template>
      <template v-else-if="layout.type===ComponentTypes.CheckBoxField">
        <el-checkbox
          disabled
          :checked="model-1===0"/>
      </template>
      <template v-else-if="layout.type===ComponentTypes.LookUpField">
        <router-link
          v-if="lookUpFieldPath"
          :to="lookUpFieldPath"
        >{{model}}
        </router-link>
      </template>
      <template v-else>
        <div class="details-item__value">{{model}}</div>
      </template>
    </div>
    <div v-if="designer.setting"
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
import { DESIGNER_PLATFORMS, DESIGNER_RUNNING_TYPES } from '@/views/designer/config/Designer'
import api from '@/api'
import axios from 'axios'
import PredefinedFieldApiNames from '@/views/designer/config/PredefinedFieldApiNames'
import { ListViewOperators } from '@/views/app/const'
import pathToRegexp from 'path-to-regexp'
import { AutoNumberPrefixesList } from '@/views/designer/config/AutoNumberPrefixes'
import { arrToMap } from '@/utils'
import OptionListField from '@/views/designer/components/PCLayout/field-components/OptionListField.vue'

const CancelToken = axios.CancelToken

@Component({
  name: 'FdFormItem',
  components: { OptionListField }
})
export default class FdFormItem extends Vue {
  @Prop({ type: Object, required: true }) readonly layout!: IField
  @Inject('designer') readonly designer!: any

  loading: boolean = false
  options: any[] = []
  lookupObjectApiName: string = ''
  source = CancelToken.source()
  // 选项列表控制字段值
  controlFieldValue: string = ''
  valueCandidateIds: string[] = []

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

  get DESIGNER_PLATFORMS () {
    return DESIGNER_PLATFORMS
  }

  get DESIGNER_RUNNING_TYPES () {
    return DESIGNER_RUNNING_TYPES
  }

  get apiName () {
    let apiName = this.layout.apiName
    if (this.designer.running.type === DESIGNER_RUNNING_TYPES.FORM) {
      switch (this.layout.type) {
        case ComponentTypes.OptionListField:
        case ComponentTypes.LookUpField:
          apiName += '__id'
          break
        default:
      }
    }
    return apiName
  }

  get model () {
    if (this.designer.setting) {
      return this.layout.model
    }

    return ((this.$store.state.app.record || {}).form || {})[this.apiName] || ''
  }

  set model (value: any) {
    if (this.designer.setting) {
      this.layout.model = value
    } else {
      try {
        switch (this.layout.type) {
          case ComponentTypes.NumberField:
            const decimalDigit = this.layout.attrs.decimalDigit || 2
            const integerDigit = this.layout.attrs.integerDigit || 8
            value = (value.match(new RegExp(`^\\d*(\\.?\\d{0,${decimalDigit}})`, 'g'))[0]) || 0
            if (typeof value === 'string') {
              const integerDigitVal = value.split('.')[0]
              if (integerDigitVal.length > integerDigit) {
                value = value.substring(0, integerDigit)
              }
            }
            break
          default:
        }
        this.$store.dispatch('app/record/updateForm',
          {
            key: this.apiName,
            value
          })
      } catch (e) {
        console.error(e)
      }
    }
  }

  get modelId () {
    if (this.designer.setting) {
      return ''
    }
    return ((this.$store.state.app.record || {}).form || {})[this.apiName + '__id'] || ''
  }

  get lookUpFieldPath () {
    if (!this.modelId) {
      return
    }
    const toPath = pathToRegexp.compile(
      this.$route.matched[this.$route.matched.length - 1].path
    )
    return toPath({
      ...this.$route.params,
      recordId: this.modelId,
      moduleId_objectId: `${this.$route.params.moduleId_objectId.split('_')[0]}_${this.layout.attrs.lookupConfig && this.layout.attrs.lookupConfig.lookupObjectId}`
    })
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

  // 获取全部字段依赖
  get fieldDependencies () {
    if (this.designer.running && this.designer.running.type === DESIGNER_RUNNING_TYPES.FORM) {
      return (this.$store.state.app.record || {}).fieldDependencies || []
    }
    return []
  }

  async created () {
    this.initLookUpField()
  }

  async remoteMethod (query: string) {
    try {
      if (this.loading) {
        this.source.cancel()
      }
      this.loading = true
      this.source = CancelToken.source()
      const {
        data: {
          data
        }
      } = await api.passObjectOp.getAppRecords(
        this.lookupObjectApiName,
        {
          info: {
            filters: [{
              fieldApiName: PredefinedFieldApiNames.name,
              values: [query],
              operator: ListViewOperators.LIKE
            }],
            colApiName: [PredefinedFieldApiNames.name]
          },
          size: 10
        },
        this.source.token
      )
      this.options = data
    } catch (e) {
      console.error(e)
    } finally {
      this.loading = false
    }
  }

  // 初始化查找
  async initLookUpField () {
    if (this.designer.running) {
      switch (this.layout.type) {
        case ComponentTypes.LookUpField:
          if (!this.lookupObjectApiName) {
            const {
              data: {
                data: {
                  apiName
                }
              }
            } = await api.bizObjects.getObjectById((this.layout.attrs.lookupConfig as any).lookupObjectId)
            this.lookupObjectApiName = apiName
            this.remoteMethod('')
          }
          break
        default:
      }
    }
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
