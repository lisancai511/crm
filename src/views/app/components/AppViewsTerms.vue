<!--Created by LiuLei on 2019/11/12-->
<template>
  <div class="AppViewsTerms">
    <div class="terms__label">
      {{'到达'.padEnd((labelLength || label.length || 2),'到达')}}：
      <div class="terms__label--inner">
        {{label}}：
      </div>
    </div>
    <div class="terms__value m-l-25">
      <template v-if="type===ComponentTypes.OptionListField">
        <div
          style="display: flex;align-items: center">
          <el-checkbox
            class="m-r-30"
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange">全选
          </el-checkbox>
          <el-checkbox-group
            @change="handleCheckedCheckBoxChange"
            v-model="model">
            <el-checkbox
              v-for="option in OptionList"
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
      ].includes(type)">
        <el-input size="mini" v-model="model"/>
      </template>
      <template v-else-if="type === ComponentTypes.DateField">
        <div style="display: flex;align-items: center">
          <el-radio-group v-model="model">
            <el-radio
              :key="dateType.value"
              v-for="dateType in DateTypesList"
              :label="dateType.value">{{dateType.label}}
            </el-radio>
          </el-radio-group>
          <div class="m-l-30">
            <span class="m-r-10">自定义时间段</span>
            <el-date-picker
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
        <el-radio-group v-model="model">
          <el-radio
            :key="type.value"
            v-for="type in CheckBoxTypes"
            :label="type.value">{{type.label}}
          </el-radio>
        </el-radio-group>
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

const CancelToken = axios.CancelToken

@Component({
  name: 'AppViewsTerms'
})
export default class AppViewsTerms extends mixins(routerParams) {
  @Prop({ required: true }) readonly value !: string | string[]
  @Prop({ type: String, required: true }) readonly type !: string
  @Prop({ type: String, required: true }) readonly label !: string
  @Prop({ type: String, required: true }) readonly apiName !: string
  @Prop({ type: Object, required: true }) readonly field !: any
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

  get model () {
    return this.value
  }

  set model (val: any) {
    if (this.type === ComponentTypes.DateField && Array.isArray(val)) {
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
        label: '全部',
        value: types.all
      },
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
        label: '全部',
        value: ''
      },
      {
        label: '昨天',
        value: 'Yesterday'
      },
      {
        label: '今天',
        value: 'Today'
      },
      {
        label: '明天',
        value: 'Tomorrow'
      },
      {
        label: '本周',
        value: 'CurrentWeek'
      },
      {
        label: '本月',
        value: 'CurrentMonth'
      },
      {
        label: '本季度',
        value: 'CurrentSeason'
      },
      {
        label: '本年',
        value: 'CurrentYear'
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

  handleCheckAllChange (val: boolean) {
    // TODO 更换真实数据
    this.model = val ? this.OptionList.map((option: any) => option.id) : []
    this.isIndeterminate = false
  }

  handleCheckedCheckBoxChange (value: string[]) {
    let checkedCount = value.length
    // TODO 更换真实 Length
    this.checkAll = checkedCount === this.OptionList.length
    this.isIndeterminate = checkedCount > 0 && checkedCount < this.OptionList.length
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
          this.field.lookupConfig.lookupObjectId
        )
        this.lookupObjectApiName = apiName
      }
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
}
</script>

<style lang="scss" scoped>
.AppViewsTerms {
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
  }
}
</style>

2019-01-01 2019-02-02
