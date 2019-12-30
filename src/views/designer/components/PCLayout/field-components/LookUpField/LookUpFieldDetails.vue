<!--Created by LiuLei on 2019/12/23-->
<template>
  <el-popover
    placement="right"
    width="300"
    :title="popoverTitle"
    trigger="hover"
    @show="showPopover"
    v-if="lookUpFieldPath">
    <router-link
      slot="reference"
      :to="lookUpFieldPath"
    >{{model}}
    </router-link>
    <div
      v-loading="loadingHover">
      <!--查找对象相应字段-->
      <div
        :key="usedField"
        v-for="usedField in hoverLayout.usedFields">
        <div
          class="fs-12"
          style="font-weight: bold">{{(lookupObjectFieldByApiName[usedField] || {}).name}}
        </div>
        <div>{{(lookupObjectRecord || {})[usedField]}}</div>
      </div>
      <!--查找对象显示的相关列表-->
      <!--<div
        :key="lookup.id"
        v-for="lookup in lookupObjectLookups">
        {{lookup}}
      </div>-->
    </div>
  </el-popover>
  <span v-else>{{model}}</span>
</template>

<!--TODO 悬停布局相关列表-->
<script lang="ts">
import { Component } from 'vue-property-decorator'
import pathToRegexp from 'path-to-regexp'
import { IField } from '@/views/designer/config/components'
import api from '@/api'
import { IHoverLayoutItemDefine } from '@/store/modules/designer'
import LayoutTypes from '@/views/designer/config/LayoutTypes'
import { serverFieldToLocalField } from '@/views/designer/utils'
import { arrToMap } from '@/utils'
import PredefinedFieldApiNames from '@/views/designer/config/PredefinedFieldApiNames'
import { mixins } from 'vue-class-component'
import detailsMixins from '@/views/designer/components/PCLayout/mixins/detailsMixins'
import apiNameMixins from '@/views/designer/components/PCLayout/mixins/apiNameMixins'
import modelMixins from '@/views/designer/components/PCLayout/mixins/modelMixins'

@Component({
  name: 'LookUpFieldDetails'
})
export default class LookUpFieldDetails extends mixins(detailsMixins, modelMixins, apiNameMixins) {
  loadHoverLayout: boolean = false
  loadingHover: boolean = false

  hoverLayout: IHoverLayoutItemDefine = {
    usedFields: [],
    lookups: []
  }

  lookupObject: any = {}
  lookupObjectFields: IField[] = []
  lookupObjectRecord: any = {}

  lookupObjectLookups: any[] = []

  get lookupObjectFieldByApiName () {
    return arrToMap(this.lookupObjectFields, 'apiName')
  }

  get popoverTitle () {
    return this.lookupObjectRecord?.[PredefinedFieldApiNames.name]
  }

  get lookupObjectId () {
    return this.layout.attrs.lookupConfig?.lookupObjectId
  }

  get lookUpFieldPath () {
    if (!this.modelId) {
      return
    }
    if (!this.moduleId) {
      return
    }
    if (!this.lookupObjectId) {
      return
    }
    const toPath = pathToRegexp.compile(
      this.$route.matched[this.$route.matched.length - 1].path
    )
    return toPath({
      ...this.$route.params,
      recordId: this.modelId,
      moduleId_objectId: `${this.moduleId}_${this.lookupObjectId}`
    })
  }

  created () {
  }

  async initHoverLayout () {
    if (!this.lookUpFieldPath) {
      return
    }
    // 1、获取查找对象的悬停布局
    // 3、获取查找对象的字段列表
    // 4、获取查找对象的详情
    // 5、获取查找对象相关列表的列表
    // 6、获取查找对象要展示的相关列表的对象的的详情
    // 7、获取查找对象要展示的相关列表的对象的的字段
    // 8、获取查找对象要展示的相关列表的对象的的前三条记录

    // 1、获取查找对象对应的记录
    this.loadingHover = true
    try {
      const [
        {
          data: {
            data: {
              define = JSON.stringify({ usedFields: [], lookups: [] })
            } = {}
          } = {}
        },
        {
          data: {
            data: fields
          }
        },
        {
          data: {
            data: objectDetails
          }
        },
        {
          data: {
            data: lookups
          }
        }
      ] = await Promise.all([
        api.metaData.getLayoutUi(
          this.lookupObjectId as string,
          LayoutTypes.Hover,
          this.designer.recordTypeId as string
        ),
        api.bizObjects.getFields({ objectId: this.lookupObjectId as string }),
        api.bizObjects.getObjectById(this.lookupObjectId as string),
        api.bizObjects.getLookups(this.lookupObjectId as string)
      ])
      this.hoverLayout = JSON.parse(define)
      this.lookupObject = objectDetails
      this.lookupObjectFields = fields.map(serverFieldToLocalField)
      this.lookupObjectLookups = lookups
      const [
        {
          data: {
            data: record
          }
        }
      ] = await Promise.all([
        api.paasObjectOp.getAppRecord(objectDetails.apiName, this.modelId)
      ])
      this.lookupObjectRecord = record
    } catch (e) {
      console.error(e)
    } finally {
      this.loadingHover = false
    }
  }

  showPopover () {
    if (this.loadHoverLayout) {
      return
    }
    console.log('showPopover')
    this.loadHoverLayout = true
    this.initHoverLayout()
  }
}
</script>

<style lang="scss" scoped>

</style>
