<!--Created by LiuLei on 2019/9/23-->
<template>
  <div class="TheFormHeaderAttrs">
    <div class="TheFormHeaderAttrs__inner">
      <div>
        <sortable-box
          :data="data.attrs"
          attribute="usedButtons"
          title="使用的按钮">
          <el-button slot="header-right"
                     @click="beforeEdit(editTypes.BUTTON)"
                     type="text">
            <dd-icon name="edit"/>
            编辑
          </el-button>
        </sortable-box>
      </div>
      <div>
        <sortable-box
          class="m-t-15"
          :data="data.attrs"
          attribute="usedFields"
          title="高亮显示的字段">
          <el-button slot="header-right"
                     @click="beforeEdit(editTypes.FIELD)"
                     type="text">
            <dd-icon name="edit"/>
            编辑
          </el-button>
        </sortable-box>
      </div>
    </div>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="30%">
      <el-checkbox-group v-model="checkList">
        <el-checkbox
          v-for="item in fields"
          :disabled="checkList.length === 1 && checkList[0] === item.key"
          :key="item.key"
          :label="item.key">{{item.name}}
        </el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="beforeConfirmEdit(curEditType)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Mixins } from 'vue-property-decorator'
import SortableBox from '@/views/designer/layout/components/SidebarRight/components/SortableBox.vue'
import { IField } from '@/views/designer/config/components'
import designerModule from '@/store/modules/designer'
import edit from '@/views/designer/layout/components/SidebarRight/components/mixins/edit'

@Component({
  name: 'TheFormHeaderAttrs',
  components: { SortableBox }
})
export default class TheFormHeaderAttrs extends Mixins(edit) {
  @Prop({ required: true }) readonly data !: IField

  dialogVisible: boolean = false
  checkList: string[] = []
  curEditType: number = 0

  get fields (): object {
    return designerModule.fields
  }

  get fieldByKey (): any {
    return designerModule.fieldByKey
  }

  get editTypes (): any {
    enum editTypes {
      BUTTON,
      FIELD
    }

    return editTypes
  }

  beforeEdit (type: number): void {
    switch (type) {
      case this.editTypes.BUTTON:
        this.$alert('迭代一不支持此功能')
        break
      case this.editTypes.FIELD:
        this.edit(this.data.attrs, 'usedFields')
        break
    }
    this.curEditType = type
  }

  beforeConfirmEdit (type: number): void {
    switch (type) {
      case this.editTypes.BUTTON:
        this.$alert('迭代一不支持此功能')
        break
      case this.editTypes.FIELD:
        this.confirmEdit(this.data.attrs, 'usedFields', 'key', this.fieldByKey)
    }
  }

  confirmEdit (data: any, attribute: string, key: string = 'key', dataMap: any): void {
    // 过滤删除项
    data[attribute] = data[attribute].filter((item: any) => this.checkList.includes(item.key))
    // 追加新增项
    const usedKeys: string[] = data[attribute].map((item: any) => item.key)
    this.checkList.forEach((checkedType: string) => {
      if (!usedKeys.includes(checkedType)) {
        data[attribute].push({
          key: checkedType,
          name: dataMap[checkedType].name
        })
      }
    })
    this.dialogVisible = false
  }
}
</script>

<style lang="scss" scoped>
.TheFormHeaderAttrs {
  height: 100%;

  &__inner {
    height: 100%;
    display: flex;
    flex-direction: column;

    > div {
      flex: 1;
      display: flex;
      flex-direction: column;
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
