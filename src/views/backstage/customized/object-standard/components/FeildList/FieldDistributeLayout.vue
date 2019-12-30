<template>
  <div class="singleLine">
    <div class="title">选择应包含该字段的页面布局</div>
    <div class="title_second">该字段将作为最后一个字段添加到这些页面布局的前 2 列。如果不选择布局，该字段在任何页面上都不会显示。</div>
    <el-table
      :data="addToLayouts"
      :header-cell-style="{background:'#F8FAFC'}"
      border
      style="width: 700px;marginLeft:30px">
      <el-table-column
        prop="name"
        label="布局名称"
        width="379">
      </el-table-column>
      <el-table-column
        label="是否显示"
        width="160">
        <template slot-scope="scope">
          <el-checkbox
            @change="changeCheckbox(scope.row)"
            v-model="scope.row.show"/>
        </template>
      </el-table-column>
      <el-table-column
        label="必填"
        width="80">
        <template slot-scope="scope">
          <el-checkbox :disabled="!scope.row.show || scope.row.readOnly" v-model="scope.row.required"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
        label="只读"
        width="80">
        <template slot-scope="scope">
          <el-checkbox :disabled="!scope.row.show|| scope.row.required" v-model="scope.row.readOnly"/>
        </template>
      </el-table-column>
    </el-table>
    <div class="m-t-30 m-l-30 m-b-20">
      <el-button :loading="loading" type="primary" @click="saveData">保存</el-button>
      <el-button type="primary" @click="goBack">返回</el-button>
      <el-button :loading="loading" @click="saveDataAndGoBack">保存并继续添加</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { localFieldToServerField } from '@/views/designer/utils'
import Api from '@/api'

@Component({
  name: 'FieldDistributeLayout'
})
export default class FieldDistributeLayout extends Vue {
  @Prop() data: any
  @Prop({ type: String, required: true }) readonly objectId !: string
  @Prop({ required: true }) readonly fieldId !: string | undefined
  private addToLayouts: any = []

  loading: boolean = true

  layouts: any[] = []

  created () {
    this.getData()
  }

  activated () {
    this.initAddToLayouts()
  }

  goBack () {
    this.$emit('changeShowNext', false)
  }

  async saveData () {
    const { fieldId, objectId } = this
    try {
      if (fieldId) {
        await Api.bizObjects.updateFields(objectId, fieldId, localFieldToServerField(this.data))
        this.$message.success('修改成功')
      } else {
        this.data.addToLayouts = this.addToLayouts.filter((item: any) => {
          if (item.show) {
            return item
          }
        })
        await Api.bizObjects.addFields(localFieldToServerField(this.data), objectId)
        this.$message.success('添加成功')
      }
      this.$router.go(-1)
    } catch (err) {
      console.error(err)
    }
  }

  async saveDataAndGoBack () {
    const { fieldId, objectId } = this
    try {
      if (fieldId) {
        await Api.bizObjects.updateFields(objectId, fieldId, localFieldToServerField(this.data))
        this.$message.success('修改成功')
      } else {
        this.data.addToLayouts = this.addToLayouts.filter((item: any) => {
          if (item.show) {
            return item
          }
        })
        await Api.bizObjects.addFields(localFieldToServerField(this.data), objectId)
        this.$message.success('添加成功')
      }
      this.$emit('changeShowNext', 'saveAndAdd')
    } catch (err) {
      console.error(err)
    }
  }

  async getData () {
    const { data: { data } } = await Api.bizObjects.getLayouts(this.objectId)
    this.layouts = data
    this.initAddToLayouts()
    this.loading = false
  }

  initAddToLayouts () {
    this.addToLayouts = this.layouts.map((item: any) => {
      const obj = {
        show: true,
        readOnly: false,
        required: false,
        layoutId: null,
        name: null
      }
      obj.layoutId = item.id
      obj.name = item.name
      return obj
    })
  }

  changeCheckbox (row: any) {
    if (!row.show) {
      row.readOnly = false
      row.required = false
    }
  }
}
</script>
<style lang="scss" scoped>
.title {
  font-size: 16px;
  font-weight: 500;
  color: rgba(34, 45, 62, 1);
  margin: 22px 0 3px 30px;

  &_second {
    margin: 0px 0 25px 30px;
    font-size: 12px;
    font-weight: 400;
    color: rgba(138, 150, 160, 1);
  }
}
</style>
