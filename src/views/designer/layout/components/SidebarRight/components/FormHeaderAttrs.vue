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
          v-for="item in curAllCheckList"
          :disabled="checkList.length === 1 && checkList[0] === item.apiName"
          :key="item.apiName"
          :label="item.apiName">{{item.name}}
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
import { Component, Prop, Mixins, Watch } from 'vue-property-decorator'
import SortableBox from '@/views/designer/layout/components/SidebarRight/components/SortableBox.vue'
import { IField } from '@/views/designer/config/components'
import designerStore from '@/store/modules/designer'
import edit from '@/views/designer/layout/components/SidebarRight/components/mixins/edit'

@Component({
  name: 'FormHeaderAttrs.vue',
  components: { SortableBox }
})
export default class TheFormHeaderAttrs extends Mixins(edit) {
  @Prop({ required: true }) readonly data !: IField

  dialogVisible: boolean = false
  checkList: string[] = []
  curEditType: number = 0
  curAllCheckList: any[] = []

  get fields (): any[] {
    return designerStore.fields
  }

  get buttons (): any[] {
    return designerStore.buttons
  }

  get fieldByApiName (): any {
    return designerStore.fieldByApiName
  }

  get buttonByApiName (): any {
    return designerStore.buttonByApiName
  }

  get editTypes (): any {
    enum editTypes {
      BUTTON,
      FIELD
    }

    return editTypes
  }

  @Watch('buttons', { immediate: true })
  onButtonsChange () {
    this.data.attrs.usedButtons = (this.data.attrs.usedButtons as any[])
      .filter((button: any) => {
        return this.buttonByApiName[button.apiName]
      }).map((button: any) => {
        return this.buttonByApiName[button.apiName]
      })
  }

  beforeEdit (type: number): void {
    switch (type) {
      case this.editTypes.BUTTON:
        this.curAllCheckList = this.buttons
        this.edit(this.data.attrs, 'usedButtons', 'apiName')
        break
      case this.editTypes.FIELD:
        this.curAllCheckList = this.fields
        this.edit(this.data.attrs, 'usedFields', 'apiName')
        break
    }
    this.curEditType = type
  }

  beforeConfirmEdit (type: number): void {
    // switch (type) {
    //   case this.editTypes.BUTTON:
    //     this.$alert('迭代一不支持此功能')
    //     break
    //   case this.editTypes.FIELD:
    // }
    this.confirmEdit(
      this.data.attrs,
      type === this.editTypes.FIELD ? 'usedFields' : 'usedButtons',
      'apiName',
      (checkedValue: string) => {
        const curField = this[type === this.editTypes.FIELD ? 'fieldByApiName' : 'buttonByApiName'][checkedValue] || {}
        return {
          key: checkedValue,
          name: curField.name,
          id: curField.id,
          apiName: curField.apiName
        }
      })
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
