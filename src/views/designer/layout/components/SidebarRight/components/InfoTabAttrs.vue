<!--Created by LiuLei on 2019/9/23-->
<template>
  <div class="TheInfoTabAttrs">
    <div class="select-box">
      <strong class="section__title">
        默认显示
      </strong>
      <el-row>
        <el-col :span="24">
          <el-select
            class="select-default"
            v-model="data.attrs.tabValue" placeholder="请选择">
            <el-option
              v-for="item in data.children"
              :key="item.key"
              :label="item.name"
              :value="item.type">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <sortable-box
      title="显示的TAB页"
      attribute="children"
      :filter="filterTabs"
      :data="data">
      <el-button slot="header-right"
                 class="dd-button__text dd-button__text--info"
                 @click="edit(data,'children','type')"
                 type="text">
        <dd-icon name="edit"/>
        编辑
      </el-button>
    </sortable-box>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="30%">
      <el-checkbox-group v-model="checkList">
        <el-checkbox
          v-for="item in tabDetailsComponents"
          :disabled="checkList.length === 1 && checkList[0] === item.key"
          :key="item.key"
          :label="item.key">{{item.name}}
        </el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmEdit">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator'
import {
  IField,
  ILayoutComponent,
  layoutComponents,
  tabDetailsComponents
} from '@/views/designer/config/components'
import SortableBox from '@/views/designer/layout/components/SidebarRight/components/SortableBox.vue'
import edit from '@/views/designer/layout/components/SidebarRight/components/mixins/edit'

@Component({
  name: 'InfoTabAttrs.vue',
  components: { SortableBox }
})
export default class TheInfoTabAttrs extends Mixins(edit) {
  @Prop({ required: true }) readonly data !: IField

  dialogVisible: boolean = false
  checkList: string[] = []

  get tabDetailsComponents (): ILayoutComponent[] {
    return tabDetailsComponents
  }

  get tabDetailsComponentByType (): any {
    return this.getComponentByType(this.tabDetailsComponents)
  }

  get layoutComponentByType (): any {
    return this.getComponentByType(layoutComponents)
  }

  filterTabs (tab: any) {
    return tab.show
  }

  getComponentByType (components: ILayoutComponent[]): any {
    return components.reduce((pre: any, cur: ILayoutComponent) => {
      pre[cur.type] = cur
      return pre
    }, {})
  }

  // edit (): void {
  //   this.checkList = (this.data.children as []).map(item => (item as IField).type)
  //   this.dialogVisible = true
  // }

  // confirmUpdate () {
  //   this.confirmEdit(
  //     this.data,
  //     'children',
  //     'type',
  //     checkValue => {
  //       const child: IField = this.tabDetailsComponentByType[checkValue]
  //       if (!child.children) {
  //         child.children = []
  //       }
  //       // 如果是增加的是详情页
  //       (child.children as IField[]) = [{
  //         // 初始化表单
  //         ...this.layoutComponentByType[ComponentTypes.Container],
  //         children: [{
  //           ...this.layoutComponentByType[ComponentTypes.Main],
  //           key: ComponentTypes.Main + nanoid(),
  //           children: []
  //         }, {
  //           ...this.layoutComponentByType[ComponentTypes.Main],
  //           key: ComponentTypes.Main + nanoid(),
  //           children: []
  //         }]
  //       }];
  //       (this.data.children as IField[]).push(child)
  //     },
  //     () => {
  //       // 更新defaultValue
  //       if (!this.checkList.includes(this.data.attrs.tabValue as string)) {
  //         this.data.attrs.tabValue = this.checkList[0]
  //       }
  //     }
  //   )
  // }

  edit (data: any, attribute: string, key: string = 'id'): void {
    this.checkList = (data[attribute] as [])
      .filter(item => (item as any).show)
      .map(item => (item as any)[key])
    this.dialogVisible = true
  }

  confirmEdit (): void {
    // 过滤删除项
    (this.data.children as []).forEach((item: IField) => {
      this.$set(item, 'show', this.checkList.includes(item.type))
    })
    // 追加新增项
    // const tabTypes = this.data.children.map((item: IField) => item.type)
    // this.checkList.forEach((checkedType: string) => {
    //   if (!tabTypes.includes(checkedType)) {
    //     const child: IField = this.tabDetailsComponentByType[checkedType]
    //     if (!child.children) {
    //       child.children = []
    //     }
    //     // 如果是增加的是详情页
    //     (child.children as IField[]) = [{
    //       // 初始化表单
    //       ...this.layoutComponentByType[ComponentTypes.Container],
    //       children: [{
    //         ...this.layoutComponentByType[ComponentTypes.Main],
    //         key: ComponentTypes.Main + nanoid(),
    //         children: []
    //       }, {
    //         ...this.layoutComponentByType[ComponentTypes.Main],
    //         key: ComponentTypes.Main + nanoid(),
    //         children: []
    //       }]
    //     }];
    //     (this.data.children as IField[]).push(child)
    //   }
    // })

    // 更新defaultValue
    if (!this.checkList.includes(this.data.attrs.tabValue as string)) {
      this.data.attrs.tabValue = this.checkList[0]
    }

    this.dialogVisible = false
  }
}
</script>

<style lang="scss" scoped>
.TheInfoTabAttrs {
  height: 100%;
  display: flex;
  flex-direction: column;

  .section {
    &__title {
      display: inline-block;
      padding-bottom: 12px;
    }
  }

  .select-box {
    margin-bottom: 30px;
  }

  .select-default {
    width: 100%;
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
