import { PredefinedButtonApiNames } from '@/sdk/button-sdk/PredefinedButton'
import { PredefinedButtonApiNames } from '@/sdk/button-sdk/PredefinedButton'
<!--Created by LiuLei on 2019/11/11-->
<template>
  <div class="AppList">
    <el-card :body-style="{padding:0}">
      <div slot="header"
           class="card-header">
        <div class="card-header__left">
          <span>已选{{multipleSelection.length}}个{{curObject.name}}</span>
          <div
            v-if="multipleSelection.length > 0"
            class="card-header__buttons m-l-30">
            <el-button
              v-for="button in buttons"
              :disabled="!showButton(button)"
              :key="button.apiName"
              @click="handleClickButton(button)"
              class="dd-button__text dd-button__text--info"
              type="text">
              <!--<dd-icon name="edit"/>-->
              {{button.name}}
            </el-button>
          </div>
        </div>
        <div class="card-header__right">
          <app-setting-fields-dialog
            :checked-list="visibleFieldApiNames"
            :disabled-checked-list="[PredefinedFieldApiNames.name]"
            @update="updateFields"
            :fields="fields">
            <el-button
              class="button-setting dd-button__text dd-button__text--info"
              type="text">
              <dd-icon name="setting"/>
              <span> 设置</span>
            </el-button>
          </app-setting-fields-dialog>
        </div>
      </div>
      <div class="card-body">
        <el-table
          v-loading="loadingRecords"
          :header-cell-style="{background:'#F8FAFC'}"
          class="dd-table--card"
          v-show="visibleFields.length"
          border
          ref="multipleTable"
          :data="records"
          tooltip-effect="dark"
          style="width: 100%"
          @header-dragend="handleHeaderDragend"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            :fixed="true"
            width="55">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            v-for="field in visibleFields"
            :prop="field.apiName"
            :label="field.name"
            :column-key="field.apiName"
            :key="field.apiName"
            :width="fieldWidthByApiName[field.apiName] || 'auto'">
            <template slot-scope="scope">
              <template v-if="field.apiName === PredefinedFieldApiNames.name">
                <router-link
                  :to="`${$route.path}/records/${scope.row.id}`"
                  class="dd-link">
                  {{scope.row[field.apiName]}}
                </router-link>
              </template>
              <template v-else>
                {{scope.row[field.apiName]}}
              </template>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import AppSettingFieldsDialog from '@/views/app/components/AppSettingFieldsDialog.vue'
import { mixins } from 'vue-class-component'
import routerParams from '@/views/app/mixins/router-params'
import appObjects from '@/views/app/mixins/app-objects'
import api from '@/api'
import { arrToMap } from '@/utils'
import axios from 'axios'
import _ from 'lodash'
import PredefinedFieldApiNames from '@/views/designer/config/PredefinedFieldApiNames'
import { PredefinedButtonApiNames } from '@/sdk/button-sdk/PredefinedButton'
import { buttonSdk } from '@/sdk/button-sdk'

const CancelToken = axios.CancelToken

@Component({
  name: 'AppList',
  components: { AppSettingFieldsDialog }
})
export default class AppList extends mixins(routerParams, appObjects) {
  @Prop({ required: true, type: Array }) readonly fields !: any[]
  @Prop({ required: true, type: Array }) readonly buttons !: any[]
  @Prop({ required: true, type: Object }) readonly curListView !: any

  records = []
  multipleSelection = []
  source = CancelToken.source()
  loadingRecords: boolean = false
  terms: any = []

  get PredefinedFieldApiNames () {
    return PredefinedFieldApiNames
  }

  get fieldByApiName () {
    return arrToMap(this.fields, 'apiName')
  }

  get visibleFields () {
    try {
      return JSON.parse((this.curListView.listConfig.showFieldConfig || '[]'))
        .filter((apiName: string) => !!this.fieldByApiName[apiName])
        .map((apiName: string) => {
          return this.fieldByApiName[apiName]
        })
      // if (!fields.some((field: any) => field.apiName === PredefinedFieldApiNames.name) &&
      //   this.fieldByApiName[PredefinedFieldApiNames.name]) {
      //   fields.push(this.fieldByApiName[PredefinedFieldApiNames.name])
      // }
      // return fields
    } catch (e) {
      console.error(e)
      return []
    }
  }

  get visibleFieldApiNames () {
    return this.visibleFields.map((field: any) => field.apiName)
  }

  get info () {
    return {
      colApiName: this.visibleFieldApiNames,
      filters: this.terms
    }
  }

  @Watch('info', { immediate: true })
  onVisibleFieldApiNamesChange (newVal: string[], oldVal: string) {
    if (_.isEqual(newVal, oldVal)) {
      return
    }
    this.getRecords()
  }

  activated () {
    this.$nextTick(() => {
      this.$emit('activated')
    })
  }

  get fieldWidthByApiName () {
    try {
      return JSON.parse((this.curListView.listConfig.fieldWidthConfig || '{}'))
    } catch (e) {
      console.error(e)
    }
  }

  async created () {
    this.$bus.$on('app/updateTerms', this.updateTerms)
    this.$bus.$on('app/updateRecords', this.getRecords)
  }

  beforeDestroy () {
    this.$bus.$off('app/updateTerms', this.updateTerms)
    this.$bus.$off('app/updateRecords', this.getRecords)
  }

  updateTerms (terms: any[]) {
    this.terms = terms || this.terms || []
  }

  async getRecords () {
    if (!this.visibleFieldApiNames.length) {
      return
    }
    // TODO 应用全部用apiName 获取视图使用对象apiName
    if (this.loadingRecords) {
      this.source.cancel()
    }
    this.loadingRecords = true
    this.source = CancelToken.source()
    // TODO params.info.orders
    this.records = []
    if (!this.curObject.apiName) {
      await this.$store.dispatch('app/getObjects')
    }
    api.paasObjectOp.getAppRecords(
      this.curObject.apiName,
      {
        info: this.info
      },
      this.source.token
    ).then((res: any) => {
      this.records = res.data.data
    }).finally(() => {
      this.loadingRecords = false
    })
  }

  showButton (button: any): boolean {
    switch (button.apiName) {
      case PredefinedButtonApiNames.edit:
      case PredefinedButtonApiNames.delete:
      case PredefinedButtonApiNames.new:
      case PredefinedButtonApiNames.changeOwner:
        return this.multipleSelection.length === 1
      case PredefinedButtonApiNames.batchDelete:
      case PredefinedButtonApiNames.batchEdit:
      case PredefinedButtonApiNames.batchNew:
      case PredefinedButtonApiNames.batchTransfer:
        return this.multipleSelection.length > 1
      default:
        return true
    }
  }

  handleClickButton (button: any) {
    switch (button.apiName) {
      case PredefinedButtonApiNames.edit:
        this.editRecord()
        break
      case PredefinedButtonApiNames.delete:
      case PredefinedButtonApiNames.batchDelete:
        buttonSdk[PredefinedButtonApiNames.batchDelete](
          this.curObject.apiName,
          this.multipleSelection.map((item: any) => item.id)
        ).then(this.getRecords)
        break
      case PredefinedButtonApiNames.changeOwner:
      case PredefinedButtonApiNames.batchTransfer:
        buttonSdk[PredefinedButtonApiNames.changeOwner](
          this.$createElement,
          {
            recordId: this.multipleSelection.map((item: any) => item.id),
            ownerId: PredefinedFieldApiNames.owner,
            objectApiName: this.curObject.apiName
          }
        ).then(this.getRecords)
        break
      case PredefinedButtonApiNames.changeRecordType:
        buttonSdk[PredefinedButtonApiNames.changeRecordType](
          this.$createElement,
          {
            recordId: this.multipleSelection.map((item: any) => item.id),
            recordTypeId: PredefinedFieldApiNames.owner,
            objectId: this.objectId,
            objectApiName: this.curObject.apiName
          }
        ).then(this.getRecords)
        break
      case PredefinedButtonApiNames.batchEdit:
        buttonSdk[PredefinedButtonApiNames.batchEdit](
          this.$createElement,
          {
            recordId: this.multipleSelection.map((item: any) => item.id),
            objectId: this.objectId,
            objectApiName: this.curObject.apiName
          }
        ).then(this.getRecords)
        break
      default:
        this.$message.info('暂不支持此按钮')
    }
  }

  // handle click button start
  editRecord () {
    const record: any = this.multipleSelection[0]
    this.$router.push(`${this.$route.path}/records/${record.id}/edit`)
  }

  // handle click button end

  handleSelectionChange (val: any) {
    this.multipleSelection = val
  }

  handleHeaderDragend (newWidth: number, oldWidth: number, column: any) {
    this.updateListConfig('fieldWidthConfig', {
      ...this.fieldWidthByApiName,
      [column.columnKey]: newWidth
    })
  }

  // handleRowClick (row: any) {
  //   this.$router.push(`${this.$route.path}/records/${row.id}`)
  // }

  // 更新字段
  updateFields (fieldApiNames: string[], done: Function) {
    if (_.isEqual(this.visibleFieldApiNames, fieldApiNames)) {
      done()
      return
    }
    this.updateListConfig('showFieldConfig', fieldApiNames)
      .finally(() => {
        done()
      })
  }

  async updateListConfig (key: string, value: any) {
    if (typeof value !== 'string') {
      value = JSON.stringify(value)
    }
    try {
      await api.bizObjects.putAppListView(
        this.objectId,
        this.appId,
        this.curListView.id,
        {
          listConfig: {
            [key]: value
          }
        }
      )
      // this.$set(this.curListView.listConfig, key, value)
      // this.curListView.listConfig = {
      //   ...this.curListView.listConfig,
      //   [key]: value
      // }
      this.$set(this.curListView.listConfig, key, value)
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.AppList {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__left {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__buttons {
    }

    .el-button.el-button--text {
      padding-top: 2px;
      padding-bottom: 2px;
    }

    &__right {
      .button-setting {
        color: #8A96A0;
      }
    }
  }

  .card-body {
    margin: -1px;
  }
}
</style>
