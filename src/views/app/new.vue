<!--Created by LiuLei on 2019/11/13-->
<template>
  <div class="NewAppRecord">
    <el-card>
      <div slot="header">{{recordId ? '编辑':'新建'}}</div>
      <el-form label-position="top"
               ref="recordForm"
               :model="recordForm"
               class="record-form">
        <PCLayout
          class="pc-layout"
          v-bind="layout.attrs"
          container
          :layout="layout"/>
        <div class="dd-text-center p-t-30">
          <el-button
            @click="submit"
            :loading="saving"
            type="primary">保存
          </el-button>
          <el-button @click="$router.go(-1)">返回</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Provide } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import routerParams from '@/views/app/mixins/router-params'
import appObjects from '@/views/app/mixins/app-objects'
import {
  compressStringToBase64,
  decompressBase64ToString,
  getLocalLayoutUsedFields,
  localLayoutToServer, serverFieldToLocalField,
  serverLayoutToLocal
} from '@/views/designer/utils'
import getFormLayoutFromLayout from '@/views/designer/utils/getFormLayoutFromLayout'
import PCLayout from '@/views/designer/components/PCLayout/index.vue'
import ComponentTypes from '@/views/designer/config/ComponentTypes'
import api from '@/api'
import {
  DESIGNER_EXEC_TYPES,
  DESIGNER_UI_TYPES,
  DESIGNER_USED_TYPES
} from '@/views/designer/config/Designer'
import LayoutTypes from '@/views/designer/config/LayoutTypes'
import PredefinedFieldApiNames from '@/views/designer/config/PredefinedFieldApiNames'
import layout1 from '@/views/designer/config/PredefinedLayouts/layout1'
import { arrToMap } from '@/utils'
import pathToRegexp from 'path-to-regexp'
import { IDesigner } from '@/views/designer/types'
import { EXCEPT_FORM_FIELD_API_NAMES, EXCEPT_FORM_FIELD_TYPES } from '@/views/app/const'
import { toFormApiName, toNormalApiName } from '@/views/app/utils'
// import { formatFormApiName } from '@/views/app/utils'

@Component({
  name: 'NewAppRecord',
  components: { PCLayout }
})
export default class NewAppRecord extends mixins(routerParams, appObjects) {
  @Provide() designer: IDesigner = {
    object: {},
    setting: {
      execType: DESIGNER_EXEC_TYPES.FORM,
      uiType: DESIGNER_UI_TYPES.PC,
      usedType: DESIGNER_USED_TYPES.PAAS
    }
  }

  layout: any = {
    attrs: {},
    children: [],
    type: ComponentTypes.InfoTabDetails
  }

  fields: any[] = []

  saving: boolean = false

  get fieldByApiName () {
    return arrToMap(this.fields, 'apiName')
  }

  get recordId () {
    return this.$route.params.recordId
  }

  get recordForm () {
    return (this.$store.state.app.record || {}).form
  }

  async created () {
    // 获取布局全部字段
    // 初始化记录
    let initRecord: any = {}
    try {
      if (this.recordId && !this.curObject.apiName) {
        await this.$store.dispatch('app/getObjects')
      }
      if (this.recordId) {
        const recordRes = await api.paasObjectOp.getAppRecord(
          this.curObject.apiName,
          this.recordId
        )
        initRecord = (recordRes as any).data.data
      }
      // let layoutUi: any
      // let fields: any[]
      // let fieldDependencies: any[];
      // fieldDependencies
      //  获取布局UI
      const [
        {
          data: {
            data: layoutUi
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
          LayoutTypes.PC,
          // TODO GET recordTypeId
          this.$route.query.recordTypeId || initRecord[PredefinedFieldApiNames.recordTypeId] || null
        ),
        api.bizObjects.getFieldDependencies(this.objectId)
      ])
      const {
        data: {
          data: fields
        }
      } = await api.bizObjects.getFields({
        objectId: this.objectId,
        layoutId: layoutUi.layoutId,
        containModuleId: true
      })
      if (!layoutUi.define) {
        layoutUi.define = compressStringToBase64(
          JSON.stringify(
            localLayoutToServer(
              layout1({
                buttons: [],
                fields: fields,
                exceptApiNames: EXCEPT_FORM_FIELD_API_NAMES,
                exceptFieldTypes: EXCEPT_FORM_FIELD_TYPES
              })[LayoutTypes.PC].define
            )
          )
        )
      }
      this.fields = fields
      let layout: any = {}
      if (typeof layoutUi.define === 'string') {
        // 获取布局配置
        const define = layoutUi.define
        const plainLayout = JSON.parse(decompressBase64ToString(define))
        const formLayout = getFormLayoutFromLayout(plainLayout)
        layout = serverLayoutToLocal({
          serverLayout: formLayout,
          needAddFields: layoutUi.needAddFields || [],
          fields: this.fields,
          uiId: layoutUi.id,
          exceptApiNames: EXCEPT_FORM_FIELD_API_NAMES,
          exceptFieldTypes: EXCEPT_FORM_FIELD_TYPES,
          auth: true
        })
      } else {
        layout = getFormLayoutFromLayout(layoutUi.define)
      }
      const usedFieldApiNames = getLocalLayoutUsedFields(layout).map((field: any) => {
        return toFormApiName(field.apiName, field.type)
      })
      // 注册嵌套模块 `nested/myModule`
      this.$store.registerModule(['app', 'record'], {
        // ...
        namespaced: true,
        state: {
          form: usedFieldApiNames.reduce((pre: any, cur: string) => {
            pre[cur] = initRecord[cur] === undefined
              ? (this.fieldByApiName[cur] || {}).defaultValue || '' : initRecord[cur] || ''
            return pre
          }, {}),
          fieldDependencies,
          fields: fields.map(serverFieldToLocalField)
        },
        mutations: {
          UPDATE_FORM (state, payload) {
            state.form[payload.key] = payload.value
          }
        },
        actions: {
          updateForm ({ commit }, payload) {
            commit('UPDATE_FORM', payload)
          }
        }
      })
      this.layout = layout
    } catch (e) {
      console.error(e)
    }
  }

  beforeDestroy () {
    this.$store.unregisterModule(['app', 'record'])
  }

  submit () {
    (this.$refs as any).recordForm.validate(async (valid: boolean) => {
      if (valid) {
        try {
          this.saving = true
          const recordForm: any = {}
          Object.entries(this.recordForm).forEach(([k, v]: [string, any]) => {
            k = toNormalApiName(k)
            recordForm[k] = v
          })
          if (!this.recordId) {
            if (this.$route.query.recordTypeId) {
              recordForm[PredefinedFieldApiNames.recordType] = this.$route.query.recordTypeId
            }
            await api.paasObjectOp.newAppRecord({
              objectApiName: this.curObject.apiName,
              record: recordForm
            })
          } else {
            await api.paasObjectOp.putAppRecord(
              this.recordId,
              this.curObject.apiName,
              recordForm
            )
          }
          this.$message.success(`${this.recordId ? '编辑' : '新建'}成功`)
          if (this.recordId) {
            // this.$router.go(-1)
            await this.$router.replace({
              path: pathToRegexp.compile(this.$route.matched[this.$route.matched.length - 1].path.replace(/\/records\/:recordId\/edit$/, ''))(this.$route.params)
            })
          } else {
            // this.$router.go(-1)
            await this.$router.replace({
              path: pathToRegexp.compile(this.$route.matched[this.$route.matched.length - 1].path.replace(/\/records\/new$/, ''))(this.$route.params)
            })
          }
        } catch (e) {
          console.error(e)
        } finally {
          this.saving = false
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.record-form {
}
</style>
