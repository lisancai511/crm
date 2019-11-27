<!--Created by LiuLei on 2019/11/11-->
<template>
  <div class="AppViews__wrap">
    <el-card
      class="AppViews"
      :body-style="{padding:0}">
      <div class="card-header"
           slot="header">
        <el-tabs
          class="header-tabs"
          v-model="activeName"
          @tab-click="handleTabClick">
          <el-tab-pane
            v-for="listView in listViews"
            :key="listView.id"
            :label="listView.name"
            :name="listView.id"/>
        </el-tabs>
        <div class="card-header__buttons">
          <el-button
            v-for="button in buttons"
            :key="button.apiName"
            @click="handleClickButton(button)"
            type="primary"
            size="small">{{button.name}}
          </el-button>
        </div>
      </div>
      <div class="card-body">
        <el-collapse v-model="showTerms" accordion>
          <el-collapse-item name="terms">
            <div class="collapse-item-main">
              <el-tabs
                class="body-tabs"
                v-model="activeName" @tab-click="handleTabClick">
                <el-tab-pane
                  class="terms-pane"
                  v-for="listView in listViews"
                  :key="listView.id"
                  :label="listView.name"
                  :name="listView.id">
                  <app-views-terms
                    :field="fieldByApiName[apiName]"
                    v-for="apiName in curCheckedFieldApiNames"
                    v-model="terms[apiName]"
                    :apiName="apiName"
                    :options-by-api-name="optionsByApiName"
                    @updateOptions="updateOptions"
                    :key="apiName"
                    :label="fieldByApiName[apiName].name"
                    :label-length="maxLabelLength"
                    :type="fieldByApiName[apiName].dataType"/>
                </el-tab-pane>
              </el-tabs>
              <div class="terms-buttons">
                <app-setting-fields-dialog
                  :checked-list="curCheckedFieldApiNames"
                  @update="updateFields"
                  :fields="fields.filter(field => TermsFieldTypesList.includes(field.dataType))">
                  <el-button
                    class="terms-buttons-setting" type="text">
                    <dd-icon name="setting"/>
                    <span> 设置</span>
                  </el-button>
                </app-setting-fields-dialog>
                <el-button
                  @click="saveOtherView"
                  type="text">保存当前搜索条件
                </el-button>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>
    <div
      @click="showTerms = showTerms === '' ? 'terms' :'' "
      class="toggle-terms" :class="{'rotate':!showTerms}">
      <dd-icon name="Open"/>
    </div>
    <app-record-record-type-dialog ref="recordTypeDialog"/>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Prop } from 'vue-property-decorator'
import AppViewsTerms from '@/views/app/components/AppViewsTerms.vue'
import ComponentTypes from '@/views/designer/config/ComponentTypes'
import api from '@/api'
import { mixins } from 'vue-class-component'
import routerParams from '@/views/app/mixins/router-params'
import { arrToMap } from '@/utils'
import AppSettingFieldsDialog from '@/views/app/components/AppSettingFieldsDialog.vue'
import { ListViewOperators, TermsFieldTypesList } from '@/views/app/const'
import _ from 'lodash'
import { PredefinedButtonApiNames } from '@/sdk/button-sdk/PredefinedButton'
import AppRecordRecordTypeDialog from '@/views/app/components/AppRecordRecordTypeDialog.vue'

@Component({
  name: 'AppViews',
  components: { AppRecordRecordTypeDialog, AppSettingFieldsDialog, AppViewsTerms }
})
export default class AppViews extends mixins(routerParams) {
  @Prop({ required: true, type: Array }) readonly fields !: any[]
  @Prop({ required: true, type: Array }) readonly buttons !: any[]
  @Prop({ required: true, type: Object }) readonly curListView !: any
  @Prop({ required: true, type: String }) readonly activeTabName !: any
  @Prop({ required: true, type: Array }) readonly listViews !: any[]

  showTerms: string = 'terms'
  terms: { [propName: string]: any } = {}
  optionsByApiName: { [propName: string]: { id: string, v: string }[] } = {}

  get activeName () {
    return this.activeTabName
  }

  set activeName (val) {
    this.$emit('update:activeTabName', val)
  }

  get TermsFieldTypesList () {
    return TermsFieldTypesList
  }

  get fieldByApiName () {
    return arrToMap(this.fields, 'apiName')
  }

  get curCheckedFieldApiNames () {
    return (this.curListView.fields || [])
      .filter((field: any) => this.fieldByApiName[field.apiName])
      .map((field: any) => field.apiName)
    // // TODO 让后端处理新建默认视图name
    // if (fieldApiNames.length === 0) {
    //   fieldApiNames.push(PredefinedFieldApiNames.name)
    // }
    // return fieldApiNames
  }

  @Watch('curCheckedFieldApiNames', { immediate: true })
  onCurCheckedFieldApiNamesChange (newVal: string[]) {
    if (!Array.isArray(newVal)) {
      return
    }
    const terms: { [propName: string]: any } = {}
    newVal.forEach((apiName: string) => {
      if (this.terms[apiName]) {
        terms[apiName] = this.terms[apiName]
      } else {
        switch (this.fieldByApiName[apiName].dataType) {
          case ComponentTypes.OptionListField:
            terms[apiName] = []
            break
          default:
            terms[apiName] = ''
        }
      }
    })
    this.terms = terms
  }

  get maxLabelLength () {
    return Math.max(
      ...this.curCheckedFieldApiNames
        .map((apiName: string) => (this.fieldByApiName[apiName].name || '到达到达到达')
        // eslint-disable-next-line no-control-regex
          .replace(/[^\x00-\xff]/g, '01').length / 2)
    )
  }

  get ComponentTypes () {
    return ComponentTypes
  }

  get conditions () {
    const termList = Object.entries(this.terms)
      .map(([apiName, term]: [string, any]) => {
        return {
          fieldApiName: apiName,
          values: term
        }
      })
      .filter((field: { fieldApiName: string, values: any }) => {
        const term = field.values
        if (Array.isArray(term) || typeof term === 'string') {
          return term.length > 0
        }
        return false
      }).map(({ fieldApiName, values }) => {
        switch (this.fieldByApiName[fieldApiName].dataType) {
          case ComponentTypes.DateField:
            return typeof values === 'string'
              ? {
                fieldApiName,
                operator: ListViewOperators.EQ,
                values: [values]
              } : {
                fieldApiName,
                operator: ListViewOperators.IN,
                values
              }
          case ComponentTypes.DateTimeField:
            return {
              fieldApiName,
              operator: ListViewOperators.IN,
              values: values
            }
          case ComponentTypes.OptionListField:
            return {
              fieldApiName,
              operator: ListViewOperators.IN,
              values
            }
          case ComponentTypes.CheckBoxField:
          case ComponentTypes.LookUpField:
            return {
              fieldApiName,
              operator: ListViewOperators.EQ,
              values: [values]
            }
          default:
            return {
              fieldApiName,
              operator: ListViewOperators.LIKE,
              values: [values]
            }
        }
      })
    return [
      ...this.curListView.conditions || [],
      ...termList
    ]
  }

  @Watch('conditions')
  onConditionsChange (newVal: any) {
    // 未初始化之前返回
    if (!this.curListView.conditions) {
      return
    }
    this.emitChangeConditions(newVal)
  }

  emitChangeConditions = _.debounce(function (val: any) {
    // @ts-ignore
    this.$emit('changeTerms', val)
  }, 200)

  @Watch('uniqueKey', { immediate: true })
  onUniqueKeyChange (val: string) {
    if (!val || val.split('_').includes('undefined')) {
      return
    }
    this.$nextTick(() => {
      this.init()
    })
  }

  handleTabClick () {
  }

  init () {
  }

  // 更新字段
  updateFields (fieldApiNames: string[], done: Function) {
    console.log('setFields', fieldApiNames)
    api.bizObjects.putAppListView(
      this.objectId,
      this.appId,
      this.curListView.id,
      {
        fields: fieldApiNames.filter(apiName => !!apiName)
          .map((apiName: string) => ({ apiName }))
      }
    ).then((res: any) => {
      this.$set(this.curListView, 'fields', res.data.data.fields)
    })
    done()
  }

  // 更新选项列表值
  async updateOptions (apiName: string) {
    if (!this.optionsByApiName[apiName]) {
      this.$set(this.optionsByApiName, apiName, [])
      try {
        const {
          data: {
            data
          }
        } = await api.bizObjects.getFieldValueCandidate(
          this.objectId,
          apiName
        )
        this.$set(this.optionsByApiName, apiName, data.items)
      } catch (e) {
        console.error(e)
        this.$set(this.optionsByApiName, apiName, null)
      }
    }
  }

  // 另存视图
  saveOtherView () {
    this.$prompt('请输入视图名称', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /\S/,
      inputValue: '',
      inputErrorMessage: '请输入视图名称'
    }).then((data: any) => {
      console.log(data.value)
      api.bizObjects.newAppListView(
        this.objectId,
        this.appId,
        {
          standard: false,
          showAll: true,
          name: data.value,
          conditions: this.conditions,
          listConfig: this.curListView.listConfig
        }
      ).then((res: any) => {
        this.$emit('updateListViews', [...this.listViews, res.data.data])
      })
    })
  }

  handleClickButton (button: any) {
    switch (button.apiName) {
      case PredefinedButtonApiNames.new:
        this.newRecord()
        break
      default:
    }
  }

  async newRecord () {
    // await this.$router.push(`${this.$route.path}/records/new`)
    const recordType = await (this.$refs as any).recordTypeDialog.selectRecordType()
    const query: any = {}
    if (recordType) {
      query.recordTypeId = recordType.id
    }
    await this.$router.push({
      path: `${this.$route.path}/records/new`,
      query
    })
  }

  //  按钮点击end
}
</script>

<style lang="scss" scoped>
.AppViews {
  /deep/ .el-card__header {
    padding: 0;
  }

  &__wrap {
    position: relative;
    padding-bottom: 20px;

    .el-collapse {
      border: none;
    }

    .el-collapse-item {
      /deep/ .el-collapse-item__header {
        display: none;
      }

      /deep/ .el-collapse-item__wrap {
        border: none;
      }

      /deep/ .el-collapse-item__content {
        padding-bottom: 0;
      }
    }

    .toggle-terms {
      position: absolute;
      color: $dd--primary-color;
      height: 40px;
      width: 40px;
      border-radius: 50%;
      background-color: #fff;
      z-index: 999;
      margin-left: 50%;
      bottom: 4px;
      left: -20px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.3s ease-in-out;

      &.rotate {
        transform: rotate(180deg);
      }
    }
  }

  .card-header {
    height: 70px;
    /*background-color: #1E88FE;*/
    /*border-bottom: 1px solid rgba(241, 242, 246, 1);*/
    display: flex;
    align-items: center;
    padding: 0 20px;
    justify-content: space-between;
  }

  .header-tabs {
    /deep/ .el-tabs {
      &__header {
        margin-bottom: 0;
      }

      &__content {
        display: none;
      }

      &__nav-wrap {
        &.is-top {
          &::after {
            display: none;
          }
        }
      }
    }
  }

  .collapse-item-main {
    padding: 20px 0;
    display: flex;
    justify-content: space-between;

    .terms-buttons {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;

      .el-button {
        padding-top: 0;
        padding-bottom: 0;
      }

      &-setting {
        color: #8A96A0;
      }
    }
  }

  .card-body {
    padding: 0 20px;
  }

  .body-tabs {
    /deep/ .el-tabs {
      &__header {
        display: none;
      }
    }
  }

  .terms-pane {
    .AppViewsTerms {
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
