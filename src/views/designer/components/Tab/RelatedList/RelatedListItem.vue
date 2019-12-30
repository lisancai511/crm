<!--Created by LiuLei on 2019/10/23-->
<template>
  <div class="RelatedListItem">
    <div class="related-list__header">
      <!--      {{layout}}-->
      <div>
        <strong class="fs-16">
          {{layout.attrs.relatedListTitle}}
        </strong>
      </div>
      <!--      {{usedButtons.map(item => item.apiName)}}-->
      <el-button
        v-show="usedButtonByApiName[PredefinedButtonApiNames.new]"
        plain
        size="small"
        type="primary">新建
      </el-button>
    </div>
    <div class="related-list__main">
      <!--{{layout.attrs.usedFields.map(item => (fieldByApiName[item.apiName] || {}).name)}}-->
      <!-- TODO :key is a hack,the table header isn't update if not add :key-->
      <el-table
        :key="JSON.stringify(usedFields) + JSON.stringify(usedButtons)"
        border
        v-if="usedFields.every(usedField => fieldByApiName[usedField.apiName])"
        v-show="usedFields.length > 0"
        style="width: 100%"
        :data="mockData">
        <el-table-column
          v-for="usedField in usedFields"
          :key="usedField.apiName"
          :column-key="usedField.apiName"
          :prop="usedField.apiName"
          :label="usedField.apiName">
          <template slot="header" slot-scope="header">
            {{(fieldByApiName[header.column.columnKey] || {}).name}}
            <!--            {{header.column}}-->
          </template>
          <template slot-scope="scope">
            {{scope.row[usedField.apiName]}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button
              v-show="usedButtonByApiName[PredefinedButtonApiNames.edit]"
              plain
              size="small"
              type="success">编辑
            </el-button>
            <el-button
              v-show="usedButtonByApiName[PredefinedButtonApiNames.delete]"
              plain
              size="small"
              type="danger">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-if="designer.setting.execType === DESIGNER_EXEC_TYPES.DESIGNER"
         :class="{'dd-fence':layout.isSelect}"
         class="dd-fence-mask">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject } from 'vue-property-decorator'
// import { mixins } from 'vue-class-components'
// import updateCurrentField from '@/views/designer/mixins/updateCurrentField'
import { IField } from '@/views/designer/config/components'
import { arrToMap } from '@/utils'
import { PredefinedButtonApiNames } from '@/sdk/button-sdk/PredefinedButton'
import designerStore from '@/store/modules/designer'
import { DESIGNER_EXEC_TYPES } from '@/views/designer/config/Designer'

@Component({
  name: 'RelatedListItem'
})
export default class RelatedListItem extends Vue {
  @Prop({ required: true, type: Object }) readonly layout!: IField
  @Inject('designer') readonly designer!: any

  get DESIGNER_EXEC_TYPES () {
    return DESIGNER_EXEC_TYPES
  }

  get fieldByApiNameByObjectId () {
    return designerStore.fieldByApiNameByObjectId
  }

  get fieldByApiName () {
    return this.fieldByApiNameByObjectId[this.layout.attrs.objectId as string] || {}
  }

  get PredefinedButton () {
    return PredefinedButtonApiNames
  }

  get usedFields (): any[] {
    return this.layout.attrs.usedFields as any[]
  }

  get usedButtons (): any[] {
    return this.layout.attrs.usedButtons as any[]
  }

  get usedButtonByApiName () {
    return arrToMap(this.usedButtons, 'apiName')
  }

  get mockData () {
    const mockItem = this.usedFields.reduce((pre: any, cur: any) => {
      pre[cur.apiName] = 'xxx'
      return pre
    }, {})
    return new Array(2).fill(mockItem)
  }

  // @Watch('usedButtons', { deep: true, immediate: true })
  // onFieldChange (val, oldVal) {
  //   console.log(oldVal, '=>', val)
  //   this.$forceUpdate()
  // }

  created () {
    designerStore.getFieldsByObjectId({ objectId: this.layout.attrs.objectId as string })
  }
}
</script>

<style lang="scss" scoped>
.RelatedListItem {
  padding: 15px 0;
  position: relative;

  .related-list {
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }
  }

  .dd-fence-mask {
    z-index: 9;
  }
}
</style>
