<!--Created by LiuLei on 2019/11/8-->
<template>
  <div v-if="curListView"
       class="AppRecords">
    <app-views
      v-if="objects.length > 0"
      @updateListViews="updateListViews"
      @changeTerms="handleChangeTerms"
      :list-views="listViews"
      :cur-list-view="curListView"
      :active-tab-name.sync="activeTabName"
      :buttons="buttonsModule"
      :fields="fields"/>
    <app-list
      ref="appList"
      @activated="activatedAppList"
      v-if="objects.length > 0"
      :cur-list-view="curListView"
      :buttons="buttonsList"
      :fields="fields"/>
  </div>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator'
import AppViews from '@/views/app/components/AppViews.vue'
import AppList from '@/views/app/components/AppList.vue'
import { mixins } from 'vue-class-component'
import routerParams from '@/views/app/mixins/router-params'
import api from '@/api'
import axios from 'axios'
import { arrToMap } from '@/utils'
import _ from 'lodash'
import PredefinedFieldApiNames from '@/views/designer/config/PredefinedFieldApiNames'
import { ButtonPositions } from '@/sdk/button-sdk/PredefinedButton'
import { serverFieldToLocalField } from '@/views/designer/utils'

const CancelToken = axios.CancelToken

@Component({
  name: 'AppRecords',
  components: { AppViews, AppList },
  beforeRouteEnter (to: any, from: any, next: any) {
    next((vm: any) => {
      vm._from = from
    })
  }
})
export default class AppRecords extends mixins(routerParams) {
  fields: any[] = []
  loadingFields: boolean = false
  buttons: any[] = []
  loadingButtons: boolean = false
  // 视图
  listViews: any[] = []
  loadingListViews: boolean = false
  activeTabName: string = ''
  source = CancelToken.source()
  sourceButton = CancelToken.source()
  sourceListViews = CancelToken.source()

  _from: any = {}

  get listViewById () {
    return arrToMap(this.listViews, 'id')
  }

  get curListView () {
    return this.listViewById[this.activeTabName]
  }

  get objects () {
    return this.$store.getters['app/objects']
  }

  get buttonsList () {
    return this.buttons.filter((button: any) => {
      return button.position.includes(ButtonPositions.list)
    })
  }

  get buttonsModule () {
    return this.buttons.filter((button: any) => {
      return button.position.includes(ButtonPositions.module)
    })
  }

  @Watch('uniqueKey', { immediate: true })
  onUniqueKeyChange (val: string) {
    if (!val || val.split('_').includes('undefined')) {
      return
    }
    this.$nextTick(() => {
      this.init()
    })
  }

  @Watch('objectId', { immediate: true })
  onObjectIdChange (val: string) {
    if (!val) {
      return
    }
    this.$nextTick(() => {
      this.getFields()
      this.getButtons()
    })
  }

  init () {
    this.getListViews()
  }

  getFields () {
    //  获取对象全部字段
    if (this.loadingFields) {
      this.source.cancel()
    }
    this.loadingFields = true
    this.source = CancelToken.source()
    this.fields = []
    api.bizObjects.getFields(
      {
        objectId: this.objectId,
        cancelToken: this.source.token
      }
    ).then((res: any) => {
      // this.fields = res.data.data
      this.fields = res.data.data.map(serverFieldToLocalField)
    }).finally(() => {
      this.loadingFields = false
    })
  }

  getButtons () {
    //  获取对象全部字段
    if (this.loadingButtons) {
      this.sourceButton.cancel()
    }
    this.loadingButtons = true
    this.sourceButton = CancelToken.source()
    this.buttons = []
    api.bizObjects.getOperators(
      this.objectId,
      {
        type: 'Button',
        checkAuth: true
      },
      this.sourceButton.token
    ).then((res: any) => {
      this.buttons = res.data.data
    }).finally(() => {
      this.loadingButtons = false
    })
  }

  getListViews () {
    if (this.loadingListViews) {
      this.sourceListViews.cancel()
    }
    this.loadingListViews = true
    this.sourceListViews = CancelToken.source()
    this.listViews = []
    api.bizObjects.getAppListView(
      this.objectId,
      this.appId,
      this.sourceListViews.token
    ).then((res: any) => {
      this.listViews = res.data.data.map((listView: any) => {
        // if (!listView.fields) {
        //   listView.fields = []
        // }
        !listView.fields && (listView.fields = [])
        !listView.conditions && (listView.conditions = [])
        !listView.listConfig && (listView.listConfig = {})
        !listView.listConfig.fieldWidthConfig && (listView.listConfig.fieldWidthConfig = '{}')
        !listView.listConfig.showFieldConfig && (listView.listConfig.showFieldConfig = '[]')
        !listView.listConfig.orderByConfig && (listView.listConfig.orderByConfig = '{}')
        // 增加显示name字段
        const tempShowFieldConfig = JSON.parse(listView.listConfig.showFieldConfig)
        tempShowFieldConfig.unshift(PredefinedFieldApiNames.name)
        listView.listConfig.showFieldConfig = JSON.stringify([...new Set(tempShowFieldConfig)])
        // TODO 调试接口重复问题
        listView.fields = _.uniqBy(listView.fields, 'apiName')
        return listView
      })
      if (this.listViews.length > 0) {
        this.activeTabName = this.listViews[0].id
      }
    }).finally(() => {
      this.loadingListViews = false
    })
  }

  created () {
    if (this.$store.getters['app/objects'].length === 0) {
      this.$store.dispatch('app/getObjects')
    }
  }

  activatedAppList () {
    this.$nextTick(() => {
      if (
        [
          'BatchNewAppRecord',
          'NewAppRecord',
          'EditAppRecord'
        ].includes((this._from || {}).name) ||
        this.$route.query.update
      ) {
        (this.$refs as any).appList.getRecords()
      }
    })
  }

  updateListViews (listViews: any) {
    this.listViews = listViews
  }

  // 处理搜索条件变化
  handleChangeTerms (terms: any) {
    this.$bus.$emit('app/updateTerms', terms)
  }
}
</script>

<style lang="scss" scoped>

</style>
