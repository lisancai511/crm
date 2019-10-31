<!--Created by LiuLei on 2019/10/22-->
<template>
  <div class="TheTabRelatedList">
    <sortable-box
      class="sortable__box"
      :data="data"
      :item-key="'id'"
      :item-name="'id'"
      attribute="children"
      title="显示的相关列表">
      <el-button slot="header-right"
                 @click="edit(data,'children','id')"
                 type="text">
        <dd-icon name="edit"/>
        编辑
      </el-button>
      <template slot-scope="item">
        <the-item-label :label="item.attrs.relatedListTitle"/>
      </template>
    </sortable-box>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="30%">
      <el-checkbox-group v-model="checkList">
        <el-checkbox
          v-for="item in allLookups"
          :disabled="checkList.length === 1 && checkList[0] === item.id"
          :key="item.id"
          :label="item.id">{{item.relatedListTitle}}
        </el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import designerStore from '@/store/modules/designer'
import { ILookup, IRelatedListLookup } from '@/views/designer/types'
import _ from 'lodash'
import SortableBox from '@/views/designer/layout/components/SidebarRight/components/SortableBox.vue'
import { mixins } from 'vue-class-component'
import edit from '@/views/designer/layout/components/SidebarRight/components/mixins/edit'
import { IField } from '@/views/designer/config/components'
import ComponentTypes from '@/views/designer/config/ComponentTypes'
import TheItemLabel from '@/views/designer/components/Transfer/TheItemLabel.vue'
import PredefinedFieldApiNames from '@/views/designer/config/PredefinedFieldApiNames'

@Component({
  name: 'TabRelatedListAttrs.vue',
  components: {
    TheItemLabel,
    SortableBox
  }
})
export default class TheTabRelatedListAttrs extends mixins(edit) {
  @Prop({ required: true }) readonly data !: IField
  allLookups: ILookup[] = []
  checkList: string[] = []
  dialogVisible: boolean = false
  fieldByObjectId: any

  get lookupById () {
    return designerStore.lookupById
  }

  created () {
    this.getLookups()
  }

  confirmUpdate () {
    this.confirmEdit(this.data, 'children', 'id', (checkValue: string): IRelatedListLookup => {
      const curLookup = this.lookupById[checkValue] || {}
      return {
        type: ComponentTypes.InfoTabRelatedListItem,
        id: checkValue,
        attrs: {
          relatedListTitle: curLookup.relatedListTitle,
          objectId: curLookup.objectId,
          usedFields: [],
          usedButtons: [],
          sortDirection: 'ASC',
          sortOrderBy: PredefinedFieldApiNames.name
        }
      }
    })
  }

  async getLookups () {
    try {
      if (designerStore.lookups.length === 0) {
        await designerStore.getAllLookups()
      }
      this.allLookups = _.cloneDeep(designerStore.lookups).map((lookup: ILookup) => {
        return {
          ...lookup
        }
      })
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.TheTabRelatedList {
  height: 100%;

  .sortable__box {
    min-height: 300px;
  }

  .el-checkbox-group {
    display: flex;
    flex-direction: column;

    /deep/ .el-checkbox {
      margin-bottom: 10px;
    }
  }
}
</style>
