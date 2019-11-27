import { PredefinedButtonApiNames } from '@/sdk/button-sdk/PredefinedButton'
<!--Created by LiuLei on 2019/11/8-->
<template>
  <div
    v-loading.fullscreen.lock="loading"
    element-loading-background="rgba(255, 255, 255, 0.3)"
    class="AppDetails">
    <PCLayout
      class="pc-layout"
      v-bind="layout.attrs"
      container
      :layout="layout"/>
    <app-record-record-type-dialog ref="recordTypeDialog"/>
  </div>
</template>

<script lang="ts">
import { Component, Provide, Watch } from 'vue-property-decorator'
import routerParams from '@/views/app/mixins/router-params'
import appObjects from '@/views/app/mixins/app-objects'
import { mixins } from 'vue-class-component'
import api from '@/api'
import LayoutTypes from '@/views/designer/config/LayoutTypes'
import ComponentTypes from '@/views/designer/config/ComponentTypes'
import {
  compressStringToBase64,
  decompressBase64ToString,
  localLayoutToServer,
  serverLayoutToLocal
} from '@/views/designer/utils'
import PCLayout from '@/views/designer/components/PCLayout/index.vue'
import { DESIGNER_RUNNING_TYPES } from '@/views/designer/config/Designer'
import { arrToMap } from '@/utils'
import PredefinedFieldApiNames from '@/views/designer/config/PredefinedFieldApiNames'
import layout1 from '@/views/designer/config/PredefinedLayouts/layout1'
import { PredefinedButtonApiNames } from '@/sdk/button-sdk/PredefinedButton'
import pathToRegexp from 'path-to-regexp'
import AppRecordRecordTypeDialog from '@/views/app/components/AppRecordRecordTypeDialog.vue'
import { buttonSdk } from '@/sdk/button-sdk'

@Component({
  name: 'AppDetails',
  components: { AppRecordRecordTypeDialog, PCLayout }
})
export default class AppDetails extends mixins(routerParams, appObjects) {
  @Provide() designer = {
    object: {},
    running: {
      type: DESIGNER_RUNNING_TYPES.DETAILS
    }
  }

  loading: boolean = false

  record: any = {}
  layout: any = {
    attrs: {},
    children: [],
    type: ComponentTypes.Container
  }
  fields: any[] = []

  get recordId () {
    return this.$route.params.recordId
  }

  @Watch('$route')
  on$routeChange () {
    this.init()
  }

  async created () {
    this.$bus.$on('app/record/details/click', this.handleClickButton)
    await this.init()
  }

  async init () {
    this.loading = true
    try {
      if (this.recordId && !this.curObject.apiName) {
        await this.$store.dispatch('app/getObjects')
      }
      await this.getRecord()
      const [
        {
          data: {
            data: layoutUi
          }
        },
        {
          data: {
            data: buttons
          }
        }
      ] = await Promise.all([
        api.metaData.getLayoutUi(
          this.objectId,
          LayoutTypes.PC,
          // TODO GET recordTypeId
          this.record[PredefinedFieldApiNames.recordTypeId] || null
        ),
        api.bizObjects.getOperators(
          this.curObject.id,
          'Button'
        )
      ])

      const {
        data: {
          data: fields
        }
      } = await api.bizObjects.getFields(
        this.objectId,
        // TODO
        null,
        layoutUi.layoutId
      )
      this.fields = fields
      if (!layoutUi.define) {
        layoutUi.define = compressStringToBase64(
          JSON.stringify(
            localLayoutToServer(
              layout1({
                buttons,
                fields
              })[LayoutTypes.PC].define
            )
          )
        )
      }
      this.layout = serverLayoutToLocal({
        serverLayout: JSON.parse(decompressBase64ToString(layoutUi.define)),
        fields,
        uiId: layoutUi.id,
        needAddFields: layoutUi.needAddFields || []
      })
      if (this.$store.state.app.record) {
        this.$store.unregisterModule(['app', 'record'])
      }
      this.$store.registerModule(['app', 'record'], {
        // ...
        namespaced: true,
        state: {
          form: this.record,
          buttonByApiName: arrToMap(buttons, 'apiName')
        }
      })
    } catch (e) {
      console.error(e)
    } finally {
      this.loading = false
    }
  }

  async getRecord () {
    try {
      const {
        data: {
          data: record
        }
      } = await api.passObjectOp.getAppRecord(
        this.curObject.apiName,
        this.recordId
      )
      this.record = record
    } catch (e) {
      console.error(e)
    }
  }

  beforeDestroy () {
    this.$bus.$off('app/record/details/click', this.handleClickButton)
    this.$store.unregisterModule(['app', 'record'])
  }

  handleClickButton (button: any) {
    switch (button.apiName) {
      case PredefinedButtonApiNames.new:
        this.newRecord()
        break
      case PredefinedButtonApiNames.edit:
        this.$router.push(`${this.$route.path}/edit`)
        break
      case PredefinedButtonApiNames.delete:
        buttonSdk[PredefinedButtonApiNames.batchDelete](
          this.curObject.apiName,
          [this.recordId]
        ).then(() => {
          this.$router.replace({
            path: pathToRegexp.compile(this.$route.matched[this.$route.matched.length - 1].path.replace(/\/records\/:recordId$/, ''))(this.$route.params),
            query: { update: 'true' }
          })
        })
        break
      case PredefinedButtonApiNames.changeOwner:
        buttonSdk[PredefinedButtonApiNames.changeOwner](
          this.$createElement,
          {
            recordId: this.recordId,
            ownerId: this.record[PredefinedFieldApiNames.ownerId],
            objectApiName: this.curObject.apiName
          }
        ).then(this.getRecord)
        break
      default:
        this.$message.info('暂不支持此按钮')
    }
  }

  // handle click button start

  async newRecord () {
    // await this.$router.push(`${this.$route.path}/records/new`)
    const recordType = await (this.$refs as any).recordTypeDialog.selectRecordType()
    const query: any = {}
    if (recordType) {
      query.recordTypeId = recordType.id
    }
    await this.$router.push({
      path: pathToRegexp.compile(this.$route.matched[this.$route.matched.length - 1].path.replace(/\/:recordId$/, '/new'))(this.$route.params),
      query
    })
  }

  // handle click button end
}
</script>

<style lang="scss" scoped>
.AppDetails {
  margin: 0 -20px -20px;
}
</style>
