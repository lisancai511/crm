<template>
  <div class="details">
    <div class="m-l-20">
      <el-button @click="newFieldDependence" type="primary">新建</el-button>
    </div>
    <div style="margin-top:15px">
      <el-table
        :header-cell-style="{background:'#F8FAFC',borderTop:'1px solid #EBEEF5'}"
        :data="tableData">
        <el-table-column
          prop="dependencyFields[0].fieldName"
          label="控制字段">
        </el-table-column>
        <el-table-column
          prop="dependencyFields[1].fieldName"
          label="依赖字段">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <div>
              <span class="dd-click m-r-10" @click="editFieldDependence(scope.row)"><dd-icon name="edit"></dd-icon> 编辑 </span>
              <span class="dd-click m-r-10" @click="deleteFieldDependence(scope.row)"> <dd-icon name="delete"></dd-icon> 删除</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 删除弹框 -->
    <el-dialog
      title="确认删除"
      :visible.sync="dialogVisible"
      width="30%">
      <div class="details_delete">
        <div class="details_title">删除自定义字段将会</div>
        <ul>
          <li>删除所有依赖字段或控制字段的所有以来信息</li>
          <li>改变基于该自定义字段数据的分配规则或升级规则的结果</li>
          <li>从页面布局上删除</li>
        </ul>
        <el-checkbox v-model="checked">是，我要删除此自定义字段。</el-checkbox>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="shoreDelete">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import Api from '@/api'
import { mixins } from 'vue-class-component'
import injectObjectId from '@/views/backstage/customized/object-standard/mixins/injectObjectId'

@Component({
  name: 'FieldDependence'
})
export default class FieldDependence extends mixins(injectObjectId) {
  private tableData: any = []
  private activeRow: any = ''

  private dialogVisible: boolean = false
  private checked: boolean = false

  newFieldDependence () {
    this.$router.push({
      path: this.$route.path + '/field-dependence/add'
    })
  }

  editFieldDependence (row: any) {
    this.$router.push({
      path: this.$route.path + `/field-dependence/${row.id}/edit`,
      query: {
        id: this.$route.params.objectId,
        controlId: row.dependencyFields[0].fieldId,
        dependenceId: row.dependencyFields[1].fieldId
      }
    })
  }

  deleteFieldDependence (row: any) {
    this.dialogVisible = true
    this.activeRow = row
  }

  async shoreDelete () {
    if (this.checked) {
      try {
        await Api.bizObjects.deleteFieldDependence(this.objectId, this.activeRow.id)
        this.$message.success('删除成功')
        this.dialogVisible = false
        this.checked = false
        this.getData(this.objectId)
      } catch (err) {
        console.log(err, 999)
      }
    } else {
      this.$message.error('取消删除')
      this.dialogVisible = false
    }
  }

  async getData (objectId: string) {
    const { data: { data } } = await Api.bizObjects.getFieldDependencies(objectId)
    this.tableData = data
    this.tableData.forEach((item: any) => {
      item.flag = true
    })
  }
}
</script>

<style lang="scss" scoped>
.details {
  margin-top: 10px;
  padding: 15px 0;
  border-top: 1px solid rgba(241, 242, 246, 1);
}
</style>
