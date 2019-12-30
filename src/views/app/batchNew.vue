<!--Created by LiuLei on 2019/12/23-->
<template>
  <div
    v-loading="loading"
    class="batch-new">
    <el-card :body-style="{padding:0}">
      <div
        class="card__header"
        slot="header">
        批量新建
        <el-button
          size="small"
          @click="newLine"
          type="primary">新增一行
        </el-button>
      </div>
      <div>
        <el-table
          :header-cell-style="{background:'#fff'}"
          class="dd-table--card"
          :data="tableForm">
          <el-table-column
            :column-key="item[0]"
            :key="item[0]"
            v-for="item in linerLayout">
              <span slot="header">
                <span
                  v-if="item[1]"
                  class="required__flag">*</span>{{(fieldByApiName[item[0]] || {}).name}}
              </span>
            <template slot-scope="scope">
              <el-form
                ref="forms"
                :model="tableForm[scope.$index]">
                <fd-form-item-wrap
                  :index="scope.$index"
                  :layout="fieldByApiName[item[0]]"/>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="100"
            label="操作">
            <template slot-scope="scope">
              <el-button
                @click="deleteLine(scope)"
                style="padding: 0;margin-bottom: 22px"
                type="text">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="dd-text-center p-t-30 p-b-20">
        <el-button
          @click="submit"
          :loading="saving"
          type="primary">保存
        </el-button>
        <el-button @click="$router.go(-1)">返回</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Provide } from 'vue-property-decorator'
import api from '@/api'
import { mixins } from 'vue-class-component'
import routerParams from '@/views/app/mixins/router-params'
import LayoutTypes from '@/views/designer/config/LayoutTypes'
import { IField } from '@/views/designer/config/components'
import { serverFieldToLocalField } from '@/views/designer/utils'
import { arrToMap } from '@/utils'
import { EXCEPT_FORM_FIELD_API_NAMES, EXCEPT_FORM_FIELD_TYPES } from '@/views/app/const'
import FdFormItem from '@/views/designer/components/PCLayout/FdFormItem.vue'
import FdFormItemWrap from '@/views/app/components/FdFormItemWrap.vue'
import { IDesigner } from '@/views/designer/types'
import { DESIGNER_EXEC_TYPES, DESIGNER_UI_TYPES, DESIGNER_USED_TYPES } from '@/views/designer/config/Designer'
import { toFormApiName, toNormalApiName } from '@/views/app/utils'
import PredefinedFieldApiNames from '@/views/designer/config/PredefinedFieldApiNames'
import appObjects from '@/views/app/mixins/app-objects'
import pathToRegexp from 'path-to-regexp'

const DEFAULT_LENGTH = 5
@Component({
  name: 'batchNew',
  components: { FdFormItemWrap, FdFormItem }
})
export default class batchNew extends mixins(routerParams, appObjects) {
  @Provide() designer: IDesigner = {
    object: {},
    setting: {
      execType: DESIGNER_EXEC_TYPES.FORM,
      uiType: DESIGNER_UI_TYPES.LINEAR,
      usedType: DESIGNER_USED_TYPES.PAAS
    }
  }

  saving: boolean = false
  linerLayout: [string, boolean][] = []
  // tableForm: any[] = []
  fields: IField[] = []
  fieldDependencies: any = []
  loading: boolean = false

  get tableForm (): any[] {
    return this.$store.state?.app?.record?.linear || []
  }

  get fieldByApiName (): { [prop: string]: IField } {
    return arrToMap(this.fields, 'apiName')
  }

  async created () {
    try {
      this.loading = true
      await this.initLayout()
    } catch (e) {
      console.error(e)
    } finally {
      this.loading = false
    }
  }

  get defaultLine () {
    return this.linerLayout.reduce((pre: any, cur: any) => {
      const field = this.fieldByApiName[cur[0]]
      const apiName = toFormApiName(cur[0], field.type as any)
      pre[apiName] = ''
      return pre
    }, {})
  }

  deleteLine (scope: any) {
    this.tableForm.splice(scope.$index, 1)
  }

  async initLayout () {
    try {
      const [
        {
          data: {
            data: {
              define = '[]'
            } = {}
          } = []
        }, {
          data: {
            data: fields
          }
        },
        {
          data: {
            data: fieldDependencies
          }
        }
      ] = await Promise.all([
        api.metaData.getLayoutUi(
          this.objectId,
          LayoutTypes.Linear,
          this.$route.query.recordTypeId as string
        ),
        api.bizObjects.getFields({
          objectId: this.objectId
        }),
        api.bizObjects.getFieldDependencies(this.objectId)
      ])

      const requiredByApiName = JSON.parse(define).reduce((pre: any, cur: [string, boolean]) => {
        pre[cur[0]] = cur[1]
        return pre
      }, {})
      this.fields = fields.map(serverFieldToLocalField).map((field: IField) => {
        return {
          ...field,
          attrs: {
            ...field.attrs,
            required: requiredByApiName[field.apiName]
          }
        }
      })
      this.fieldDependencies = fieldDependencies
      this.linerLayout = JSON.parse(define).filter((item: [string, boolean]) => {
        const fieldApiName: any = item[0]
        return !EXCEPT_FORM_FIELD_API_NAMES.includes(fieldApiName) &&
          !EXCEPT_FORM_FIELD_TYPES.includes(this.fieldByApiName[fieldApiName].type as any)
      })
      const tableForm = new Array(DEFAULT_LENGTH).fill(1).map(() => ({ ...this.defaultLine }))
      this.registerModule(tableForm)
    } catch (e) {
      console.error(e)
    }
  }

  registerModule (tableForm: any[]) {
    if (this.$store.state.app.record) {
      this.$store.unregisterModule(['app', 'record'])
    }
    // 注册嵌套模块 `nested/myModule`
    this.$store.registerModule(['app', 'record'], {
      // ...
      namespaced: true,
      state: {
        linear: tableForm,
        fieldDependencies: this.fieldDependencies,
        fields: this.fields
      },
      mutations: {
        // UPDATE_FORM (state, payload) {
        //   state.form[payload.key] = payload.value
        // }
        UPDATE_LINEAR (state, payload) {
          const { index, form: { key, value } } = payload
          state.linear[index][key] = value
        }
      },
      actions: {
        updateLinear ({ commit }, payload) {
          commit('UPDATE_LINEAR', payload)
        }
      }
    })
  }

  newLine () {
    this.tableForm.push({ ...this.defaultLine })
  }

  async submit () {
    // ( as any[]).forEach( (item) => {
    //   const result = await item.validate()
    //   console.log(result)
    // })
    try {
      this.saving = true
      const validResults: boolean[] = []
      for (const form of this.$refs.forms as any[]) {
        try {
          await form.validate()
          validResults.push(true)
        } catch (e) {
          validResults.push(false)
        }
      }
      if (validResults.some((item) => !item)) {
        return
      }
      const params = this.tableForm.map((form: any) => {
        const newForm: any = {}
        if (this.$route.query.recordTypeId) {
          newForm[PredefinedFieldApiNames.recordType] = this.$route.query.recordTypeId
        }
        Object.entries(form).forEach(([k, v]: [string, any]) => {
          k = toNormalApiName(k)
          newForm[k] = v
        })
        return newForm
      })
      await api.paasObjectOp.batchNewAppRecord({
        objectApiName: this.curObject.apiName,
        records: params
      })
      this.$message.success('批量新建成功')
      await this.$router.replace({
        path: pathToRegexp.compile(this.$route.matched[this.$route.matched.length - 1].path.replace(/\/records\/batch-new$/, ''))(this.$route.params)
      })
    } catch (e) {
      console.error(e)
    } finally {
      this.saving = false
    }
  }
}
</script>

<style lang="scss" scoped>
.batch-new {
  .card {
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .required__flag {
    color: $dd--warning-color;
  }

  .dd-table--card {
    /deep/ .el-table__header {
      th {
        border-bottom: none;
      }
    }

    /deep/ .el-table__row {
      > td {
        padding: 0;
        border: none;
      }

      .cell {
        padding: 0 !important;
      }
    }
  }
}
</style>
