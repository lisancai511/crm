<!--Created by LiuLei on 2019/11/25-->
<template>
  <div class="BatchEdit">
    <el-form
      ref="form"
      :model="formModel">
      <el-form-item
        label="请选择要编辑的字段"
        :rules="{ required: true, message: '请选择要编辑的字段' }"
        prop="fieldId">
        <el-select
          style="width: 100%"
          filterable
          remote
          reserve-keywor
          :remote-method="remoteMethod"
          placeholder=""
          v-model="form.fieldId">
          <el-option
            v-for="item in fields"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <div v-if="layout">
        <fd-form-item
          :key="form.fieldId"
          :layout="layout"/>
      </div>
      <div class="dd-text-center">
        <el-button @click="cancel">取消</el-button>
        <el-button
          :loading="loading"
          @click="confirm" type="primary">确定
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from 'vue-property-decorator'
import api from '@/api'
import ComponentTypes from '@/views/designer/config/ComponentTypes'
import PredefinedFieldApiNames from '@/views/designer/config/PredefinedFieldApiNames'
import { arrToMap } from '@/utils'
import FdFormItem from '@/views/designer/components/PCLayout/FdFormItem.vue'
import { serverFieldToLocalField } from '@/views/designer/utils'
import {
  DESIGNER_EXEC_TYPES,
  DESIGNER_UI_TYPES,
  DESIGNER_USED_TYPES
} from '@/views/designer/config/Designer'
import { IDesigner } from '@/views/designer/types'
import { toNormalApiName } from '@/views/app/utils'

// 单行文本
// 数字
// 日期
// 日期时间
// 电话
// 电子邮件
// 网址
// 复选框
// 查找
// 选项列表
//
// （但创建人，创建日期，修改人，最后修改日期，记录类型字段不可修改）

const INCLUDE_FIELD_TYPES = [
  ComponentTypes.TextField,
  ComponentTypes.NumberField,
  ComponentTypes.DateField,
  ComponentTypes.DateTimeField,
  ComponentTypes.PhoneField,
  ComponentTypes.EmailField,
  ComponentTypes.WebsiteField,
  ComponentTypes.CheckBoxField,
  ComponentTypes.LookUpField,
  ComponentTypes.OptionListField
]

const EXCLUDE_FIELD_API_NAMES = [
  PredefinedFieldApiNames.createdBy,
  PredefinedFieldApiNames.createTime,
  PredefinedFieldApiNames.lastModifiedBy,
  PredefinedFieldApiNames.lastModifiedTime,
  PredefinedFieldApiNames.recordType,
  PredefinedFieldApiNames.recordTypeId
]

@Component({
  name: 'BatchEdit',
  components: { FdFormItem }
})
export default class BatchEdit extends Vue {
  @Prop({ required: true, type: String }) readonly objectId!: string
  @Prop({ required: true, type: String }) readonly objectApiName!: string
  @Prop({ required: true, type: Array }) readonly recordId!: string[]
  @Provide() designer: IDesigner = {
    object: {},
    setting: {
      execType: DESIGNER_EXEC_TYPES.FORM,
      uiType: DESIGNER_UI_TYPES.PC,
      usedType: DESIGNER_USED_TYPES.PAAS
    }
  }

  fields: any[] = []
  allFields: any[] = []
  loading: boolean = false

  form: any = {
    fieldId: ''
  }

  get formModel () {
    return {
      fieldId: this.form.fieldId,
      ...((this.$store.state.app || {}).record || {}).form || {}
    }
  }

  get fieldById () {
    return arrToMap(this.fields, 'id')
  }

  get layout () {
    const field = this.fieldById[this.form.fieldId]
    if (field) {
      return serverFieldToLocalField(this.fieldById[this.form.fieldId])
    }
    return null
  }

  // @Watch('objectId', { immediate: true })
  // onObjectIdChange (val: string) {
  //   if (!val) {
  //     return
  //   }
  //
  // }

  // TODO 批量编辑注册模块有问题   重复打开的时候
  async created () {
    try {
      const [
        {
          data: {
            data: allFields
          }
        }
      ] = await Promise.all([
        api.bizObjects.getFields({ objectId: this.objectId })
      ])
      this.fields = this.allFields = allFields.filter((field: any) => {
        return INCLUDE_FIELD_TYPES.includes(field.dataType) &&
          !EXCLUDE_FIELD_API_NAMES.includes(field.apiName)
      })
      if (this.fields.length > 0) {
        this.form.fieldId = this.fields[0].id
      }

      // 注册嵌套模块 `nested/myModule`
      this.$store.registerModule(['app', 'record'], {
        // ...
        namespaced: true,
        state: {
          form: {},
          fieldDependencies: [],
          fields: this.fields,
          fieldById: this.fieldById
        },
        mutations: {
          UPDATE_FORM (state: any, payload) {
            state.form = {
              [payload.key]: payload.value
            }
          }
        },
        actions: {
          updateForm ({ commit }, payload) {
            commit('UPDATE_FORM', payload)
          }
        }
      })
    } catch (e) {
      console.error(e)
    }
  }

  beforeDestroy () {
    this.$store.unregisterModule(['app', 'record'])
  }

  remoteMethod (query: string) {
    this.fields = this.allFields.filter((field: any) => field.name.includes(query))
  }

  confirm () {
    this.$nextTick(() => {
      (this.$refs.form as any).validate(async (valid: boolean) => {
        if (valid) {
          this.loading = true
          try {
            const data: any = {}
            Object.entries(((this.$store.state.app || {}).record || {}).form || {})
              .forEach(([k, v]: [string, any]) => {
                k = toNormalApiName(k)
                data[k] = v
              })
            await api.paasObjectOp.putAppRecordField({
              objectApiName: this.objectApiName,
              recordId: this.recordId.join(','),
              data: {
                ...data
              }
            })
            this.$emit('confirm', this.formModel)
          } catch (e) {
            console.error(e)
          } finally {
            this.loading = false
          }
        }
      })
    })
  }

  cancel () {
    this.$emit('cancel')
  }
}
</script>

<style lang="scss" scoped>

</style>
