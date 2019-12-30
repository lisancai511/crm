<!--Created by LiuLei on 2019/11/12-->
<template>
  <div class="app-views-terms" :class="[type]">
    <div class="terms__label">
      {{'到达'.padEnd((labelLength || label.length || 2),'到达')}}：
      <div class="terms__label--inner">
        {{label}}：
      </div>
    </div>
    <div
      :class="{'show-all':showAll,[type]:true}"
      class="terms__value m-l-25">
      <template v-if="type===ComponentTypes.OptionListField">
        <div
          :class="{'show-all':showAll}"
          class="check-box__wrap">
          <el-checkbox
            class="m-r-30"
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange">全部
          </el-checkbox>
          <el-checkbox-group
            @change="handleCheckedCheckBoxChange"
            v-model="model">
            <el-checkbox
              :ref="'checkbox_'+index"
              v-for="(option,index) in OptionList"
              :key="option.id"
              :label="option.id">{{option.v}}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </template>
      <template v-else-if="[
        ComponentTypes.TextField,
        ComponentTypes.LongTextField,
        ComponentTypes.EmailField,
        ComponentTypes.PhoneField,
        ComponentTypes.WebsiteField,
        ComponentTypes.AutoNumberField
      ].includes(type)">
        <el-input size="mini" v-model="model"/>
      </template>
      <template v-else-if="type === ComponentTypes.DateField">
        <div style="display: flex;align-items: center">
          <!--<el-radio-group v-model="model">
            <el-radio
              :key="dateType.value"
              v-for="dateType in DateTypesList"
              :label="dateType.value">{{dateType.label}}
            </el-radio>
          </el-radio-group>-->
          <div
            v-if="!showCustomDate"
            class="check-box__wrap">
            <el-checkbox
              class="m-r-30"
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange">全部
            </el-checkbox>
            <el-checkbox-group
              @change="handleCheckedCheckBoxChange"
              v-model="model">
              <el-checkbox
                :ref="'checkbox_'+index"
                v-for="(option,index) in DateTypesList"
                :key="option.value"
                :label="option.value">{{option.label}}
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <div>
            <span
              @click="handleCustomDate"
              :class="{'is-checked':showCustomDate}"
              class="m-r-10 custom-date_button">自定义时间段</span>
            <el-date-picker
              v-if="showCustomDate"
              size="mini"
              v-model="model"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </div>
      </template>
      <template v-else-if="type === ComponentTypes.DateTimeField">
        <el-date-picker
          size="mini"
          v-model="model"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间">
        </el-date-picker>
      </template>
      <template v-else-if="type === ComponentTypes.CheckBoxField">
        <!--<el-radio-group v-model="model">
          <el-radio
            :key="type.value"
            v-for="type in CheckBoxTypes"
            :label="type.value">{{type.label}}
          </el-radio>
        </el-radio-group>-->
        <div class="check-box__wrap">
          <el-checkbox
            class="m-r-30"
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange">全部
          </el-checkbox>
          <el-checkbox-group
            @change="handleCheckedCheckBoxChange"
            v-model="model">
            <el-checkbox
              :ref="'checkbox_'+index"
              v-for="(option,index) in CheckBoxTypes"
              :key="option.value"
              :label="option.value">{{option.label}}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </template>
      <template v-else-if="type === ComponentTypes.LookUpField">
        <el-select
          size="mini"
          class="fd-form-item__lookup"
          filterable
          remote
          clearable
          reserve-keywor
          :remote-method="remoteMethod"
          placeholder=""
          v-model="model">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </template>
    </div>
    <el-button
      v-if="showHideButton"
      @click="showAll = !showAll"
      type="text"
      class="show-hide-button__wrap p-v-0">
      {{showAll ? '隐藏' :'显示全部'}}
    </el-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { ListViewOperators, TermsFieldTypesList } from '@/views/app/const'
import ComponentTypes from '@/views/designer/config/ComponentTypes'
import routerParams from '@/views/app/mixins/router-params'
import { mixins } from 'vue-class-component'
import axios from 'axios'
import api from '@/api'
import PredefinedFieldApiNames from '@/views/designer/config/PredefinedFieldApiNames'
import { IField } from '@/views/designer/config/components'

const CancelToken = axios.CancelToken

@Component({
  name: 'AppViewsTerms'
})
export default class AppViewsTerms extends mixins(routerParams) {
  @Prop({ required: true }) readonly value !: string | string[]
  @Prop({ type: String, required: true }) readonly type !: string
  @Prop({ type: String, required: true }) readonly label !: string
  @Prop({ type: String, required: true }) readonly apiName !: string
  @Prop({ type: Object, required: true }) readonly field !: IField
  @Prop({ type: Number }) readonly labelLength !: string
  @Prop({ type: Object }) readonly optionsByApiName !: { [propName: string]: { id: string, v: string }[] }
  // @Prop({
  //   type: Array,
  //   default () {
  //     return []
  //   }
  // }) readonly optionList !: string[]
  options: any = []

  loading: boolean = false

  isIndeterminate: boolean = false
  checkAll: boolean = false
  lookupObjectApiName: string = ''
  source = CancelToken.source()

  showAll: boolean = false
  showHideButton: boolean = false
  showCustomDate: boolean = false

  get model () {
    return this.value
  }

  set model (val: any) {
    if (this.type === ComponentTypes.DateField && this.showCustomDate && val.length === 2) {
      val[0] = this.$moment(val[0]).format('YYYY-MM-DD')
      val[1] = this.$moment(val[1]).format('YYYY-MM-DD')
    }
    if (this.type === ComponentTypes.DateTimeField && Array.isArray(val)) {
      val[0] = this.$moment(val[0]).format('YYYY-MM-DD HH:mm:ss')
      val[1] = this.$moment(val[1]).format('YYYY-MM-DD HH:mm:ss')
    }
    this.$emit('input', val || '')
  }

  // 选项列表值
  get OptionList (): { id: string, v: string }[] {
    return this.optionsByApiName[this.apiName] || []
  }

  get CheckBoxTypes () {
    enum types {
      all = '',
      no = '0',
      yes = '1'
    }

    return [
      {
        label: '是',
        value: types.yes
      },
      {
        label: '否',
        value: types.no
      }
    ]
  }

  get DateTypesList () {
    return [
      {
        label: '昨天',
        value: 'YESTERDAY'
      },
      {
        label: '今天',
        value: 'TODAY'
      },
      {
        label: '明天',
        value: 'TOMORROW'
      },
      {
        label: '本周',
        value: 'THIS_WEEK'
      },
      {
        label: '本月',
        value: 'THIS_MONTH'
      },
      {
        label: '本季度',
        value: 'THIS_QUARTER'
      },
      {
        label: '本年',
        value: 'THIS_YEAR'
      }
    ]
  }

  get ComponentTypes () {
    return ComponentTypes
  }

  get TermsFieldTypesList () {
    return TermsFieldTypesList
  }

  async created () {
    // 如果是选项列表
    if (this.type === ComponentTypes.OptionListField) {
      this.$emit('updateOptions', this.apiName)
    }
  }

  updated () {
    switch (this.type) {
      case ComponentTypes.OptionListField: {
        const firstCheckBox: any = this.$refs.checkbox_0
        const lastCheckBox: any = this.$refs[`checkbox_${this.OptionList.length - 1}`]
        if (!this.showHideButton && firstCheckBox && lastCheckBox) {
          this.showHideButton = firstCheckBox[0].$el.offsetTop !== lastCheckBox[0].$el.offsetTop
        }
      }
        break
      default:
    }
  }

  get checkBoxList (): any {
    switch (this.type) {
      case ComponentTypes.OptionListField:
        return this.OptionList
      case ComponentTypes.CheckBoxField:
        return this.CheckBoxTypes.map((item: any) => {
          return {
            ...item,
            id: item.value
          }
        })
      case ComponentTypes.DateField:
        return this.DateTypesList.map((item: any) => {
          return {
            ...item,
            id: item.value
          }
        })
      default:
        return []
    }
  }

  handleCheckAllChange (val: boolean) {
    // TODO 更换真实数据
    this.model = val ? this.checkBoxList.map((option: any) => option.id) : []
    this.isIndeterminate = false
  }

  handleCheckedCheckBoxChange (value: string[]) {
    const checkedCount = value.length
    this.checkAll = checkedCount === this.checkBoxList.length
    this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkBoxList.length
  }

  async remoteMethod (query: string) {
    try {
      if (this.loading) {
        this.source.cancel()
      }
      this.loading = true
      this.source = CancelToken.source()
      if (!this.lookupObjectApiName) {
        const {
          data: {
            data: {
              apiName
            }
          }
        } = await api.bizObjects.getObjectById(
          this.field?.attrs?.lookupConfig?.lookupObjectId as string
        )
        this.lookupObjectApiName = apiName
      }
      const {
        data: {
          data
        }
      } = await api.paasObjectOp.getAppRecords(
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

  handleCustomDate () {
    this.model = []
    this.showCustomDate = !this.showCustomDate
  }
}
</script>

<style lang="scss" scoped>
.app-views-terms {
  display: flex;
  align-items: center;

  .terms {
    &__label {
      position: relative;
      color: transparent;
      white-space: nowrap;

      &--inner {
        color: #8A96A0;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }
    }

    &__value {
      &.OptionListField {
        height: 24px;
        overflow: hidden;
      }

      &.show-all {
        height: auto;
      }

      .check-box__wrap {
        display: flex;

        &.show-all {
          align-items: center;
        }
      }

      .el-checkbox-group {
        display: flex;
        flex-wrap: wrap;
      }

      /deep/ .el-checkbox {
        margin-right: 12px;

        &__input {
          display: none;

          &.is-checked {
            & + .el-checkbox__label {
              background-color: $dd--primary-color;
              color: #fff;
            }
          }
        }

        &__label {
          padding: 0 8px;
          color: $dd--color-text-primary;
        }
      }

      .custom-date_button {
        cursor: pointer;
        padding: 0 8px;
        line-height: 19px;
        display: inline-block;
        color: #222222;
        font-weight: 500;

        &.is-checked {
          background-color: $dd--primary-color;
          color: #fff;
        }
      }
    }
  }
}
</style>
