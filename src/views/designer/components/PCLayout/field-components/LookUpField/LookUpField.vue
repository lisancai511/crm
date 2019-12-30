<!--Created by LiuLei on 2019/12/20-->
<template>
  <el-select
    class="fd-form-item__lookup"
    filterable
    remote
    clearable
    reserve-keywor
    @focus="handleFocus"
    :remote-method="remoteMethod"
    placeholder=""
    v-model="model"
    :disabled="!lookupObjectApiName && layout.attrs.disabled">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import api from '@/api'
import PredefinedFieldApiNames from '@/views/designer/config/PredefinedFieldApiNames'
import { ListViewOperators } from '@/views/app/const'
import axios from 'axios'
import { DESIGNER_EXEC_TYPES } from '@/views/designer/config/Designer'
import { mixins } from 'vue-class-component'
import operateModelMixins from '@/views/designer/components/PCLayout/mixins/modelMixins'
import apiNameMixins from '@/views/designer/components/PCLayout/mixins/apiNameMixins'
import formBaseItemMixins from '@/views/designer/components/PCLayout/mixins/formBaseItemMixins'

const CancelToken = axios.CancelToken

@Component({
  name: 'LookUpField'
})
export default class LookUpFieldDesign extends mixins(
  formBaseItemMixins,
  operateModelMixins,
  apiNameMixins
) {
  lookupObjectApiName: string = ''
  loading: boolean = false
  source = CancelToken.source()
  options: any[] = []

  // async created () {
  //
  // }

  handleFocus () {
    if (this.designer.setting.execType === DESIGNER_EXEC_TYPES.FORM) {
      if (!this.lookupObjectApiName) {
        this.remoteMethod('')
      }
    }
  }

  async remoteMethod (query: string) {
    try {
      if (this.loading) {
        this.source.cancel()
      }
      if (!this.lookupObjectApiName) {
        await this.initLookUpField()
      }
      this.loading = true
      this.source = CancelToken.source()
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

  // 初始化查找
  async initLookUpField () {
    // todo 优化 cancelToken and 全局存储数据
    if (!this.lookupObjectApiName) {
      const {
        data: {
          data: {
            apiName
          }
        }
      } = await api.bizObjects.getObjectById((this.layout.attrs.lookupConfig as any).lookupObjectId)
      this.lookupObjectApiName = apiName
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
