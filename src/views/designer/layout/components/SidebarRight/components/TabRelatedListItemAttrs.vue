<!--Created by LiuLei on 2019/10/24-->
<template>
  <div class="TheTabRelatedListItemAttrs">
    <div>
      <strong>相关列表设置</strong>
      <div class="attrs__wrap">
        <sortable-box
          class="used-fields"
          :data="data.attrs"
          attribute="usedFields"
          item-key="apiName"
          title="显示字段设置">
          <el-button slot="header-right"
                     @click="beforeEdit"
                     type="text">
            <dd-icon name="edit"/>
            编辑
          </el-button>
          <template slot-scope="item">
            <the-item-label :label="(fieldByApiName[item.apiName] || {}).name"/>
          </template>
        </sortable-box>

        <div class="attrs__sort">
          <div class="attrs__title">
            <span class="attrs__title-dot"></span>
            <span class="attrs__title-text">
              排序标准
            </span>
          </div>
          <!--          {{data.attrs.sortOrderBy}}-->
          <el-select
            placeholder="请选择"
            style="width: 100%"
            v-model="data.attrs.sortOrderBy">
            <el-option
              v-for="item in curObjectFields"
              :label="item.name"
              :value="item.apiName"
              :key="item.apiName"
            ></el-option>
          </el-select>
          <div class="m-t-10">
            <el-radio-group v-model="data.attrs.sortDirection">
              <el-radio label="ASC">升序</el-radio>
              <el-radio label="DESC">降序</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="attrs__buttons">
          <div class="attrs__title">
            <span class="attrs__title-dot"></span>
            <span class="attrs__title-text">
              标准按钮
            </span>
          </div>
          <div>
            <el-checkbox-group v-model="checkListButton">
              <el-checkbox v-for="item in standardButtons"
                           :label="item.apiName"
                           :key="item.apiName">{{item.name}}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="30%">
      <el-checkbox-group v-model="checkList">
        <el-checkbox
          v-for="item in curObjectFields"
          :disabled="checkList.length === 1 && checkList[0] === item.apiName"
          :key="item.key"
          :label="item.apiName">{{item.name}}
        </el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="beforeConfirmEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import { IField } from '@/views/designer/config/components'
import { mixins } from 'vue-class-component'
import edit from '@/views/designer/layout/components/SidebarRight/components/mixins/edit'
import designerStore from '@/store/modules/designer'
import SortableBox from '@/views/designer/layout/components/SidebarRight/components/SortableBox.vue'
import { arrToMap } from '@/utils'
import PredefinedButtonApiNames from '@/views/designer/config/PredefinedButtonApiNames'
import TheItemLabel from '@/views/designer/components/Transfer/TheItemLabel.vue'

@Component({
  name: 'TabRelatedListItemAttrs.vue',
  components: { TheItemLabel, SortableBox }
})
export default class TheTabRelatedListItemAttrs extends mixins(edit) {
  @Prop({ required: true }) readonly data !: IField
  dialogVisible: boolean = false
  checkList: string[] = []

  get checkListButton (): string[] {
    return (this.data.attrs.usedButtons as any).map((usedButton: any) => {
      return usedButton.apiName
    })
  }

  set checkListButton (val: string[]) {
    this.data.attrs.usedButtons = [...val.map((apiName: string) => ({ apiName })) as any]
      .filter((apiName: string) => !!apiName)
    // Fixme hack 不加下一行, usedButtons 更新不能被监听
    // this.data.attrs.usedFields = [...(this.data.attrs.usedFields as any)]
  }

  get curObjectFields () {
    return designerStore.fieldsByObjectId[this.data.attrs.objectId as string] || []
  }

  get fieldByApiName () {
    return arrToMap(this.curObjectFields, 'apiName')
  }

  get curObjectFieldByFieldApiName () {
    return arrToMap(this.curObjectFields, 'apiName')
  }

  get standardButtons (): any[] {
    return [
      {
        apiName: PredefinedButtonApiNames.new,
        name: '新建'
      },
      {
        apiName: PredefinedButtonApiNames.edit,
        name: '编辑'
      },
      {
        apiName: PredefinedButtonApiNames.delete,
        name: '删除'
      }
    ]
  }

  @Watch('data.attrs.objectId', { immediate: true })
  onObjectChange (val: string) {
    designerStore.getFieldsByObjectId({
      objectId: val
    })
  }

  beforeEdit () {
    this.edit(this.data.attrs, 'usedFields', 'apiName')
  }

  beforeConfirmEdit () {
    this.confirmEdit(this.data.attrs, 'usedFields', 'apiName', (checkedValue: string) => {
      const curItem: IField = this.curObjectFieldByFieldApiName[checkedValue] || {}
      return {
        key: checkedValue,
        name: curItem.name,
        apiName: curItem.apiName
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.TheTabRelatedListItemAttrs {
  @mixin attrs__title {
    display: flex;
    align-items: center;
    position: relative;
  }
  @mixin attrs__dot {
    display: inline-block;
    background-color: #8A96A0;
    height: 6px;
    width: 6px;
    border-radius: 6px;
    position: absolute;
  }
  @mixin attrs__title-text {
    font-weight: normal;
    padding-left: 15px;
  }

  .attrs__wrap {
    margin-top: 8px;
  }

  .attrs__title {
    margin: 20px 0 10px;
    @include attrs__title;

    &-dot {
      @include attrs__dot;
    }

    &-text {
      @include attrs__title-text;
    }
  }

  .used-fields {
    min-height: 256px;

    /deep/ .sort-box__title {
      position: relative;

      &::before {
        content: '';
        @include attrs__dot
      }

      &__text {
        @include attrs__title-text
      }
    }
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
