<template>
  <div class="details">
    <div class="m-l-20">
      <el-button @click="addField"
                 type="primary">新建字段</el-button>
    </div>
    <div class="m-t-15">
      <el-table :header-cell-style="{background:'#F8FAFC',borderTop:'1px solid #EBEEF5'}"
                :data="tableData">
        <el-table-column prop="name"
                         label="字段名称">
        </el-table-column>
        <el-table-column prop="apiName"
                         label="API">
        </el-table-column>
        <el-table-column prop="dataType"
                         label="字段类型">
          <template slot-scope="scope">
            {{(fieldComponentByType[scope.row.dataType] || {}).name || scope.row.dataType}}
          </template>
        </el-table-column>
        <el-table-column prop="createdTime"
                         label="标准字段">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div>
              <span class="dd-click m-r-10"
                    @click="editField(scope.row)">
                <dd-icon name="edit"></dd-icon> 编辑
              </span>
              <span v-if="!scope.row.internal" class="dd-click m-r-10"
                    @click="deleteField(scope.row)">
                <dd-icon name="delete"></dd-icon> 删除
              </span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 删除弹框 -->
    <el-dialog title="确认删除"
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
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="shoreDelete">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import Api from '@/api'
import { arrToMap } from '@/utils'
import { fieldComponents } from '@/views/designer/config/components'
import { mixins } from 'vue-class-component'
import injectObjectId from '@/views/backstage/customized/object-standard/mixins/injectObjectId'

@Component({
  name: 'FiledList'
})
export default class FiledList extends mixins(injectObjectId) {
  private tableData: any = []
  private dialogVisible: boolean = false
  private checked: boolean = false
  private activeRow: any = ''

  get fieldComponentByType () {
    return arrToMap(fieldComponents, 'type')
  }

  addField () {
    this.$router.push({
      path: this.$route.path + '/field/add'
    })
  }

  editField (row: any) {
    this.$router.push({
      path: this.$route.path + `/field/${row.id}/edit`
    })
  }

  deleteField (row: any) {
    this.dialogVisible = true
    this.activeRow = row
  }

  async shoreDelete () {
    if (this.checked) {
      try {
        const res = await Api.bizObjects.deleteFields(
          this.$route.params.objectId,
          this.activeRow.id
        )
        if (res.status === 200) {
          this.$message.success('删除成功')
          this.dialogVisible = false
          this.checked = false
          this.getData(this.objectId)
        }
      } catch (err) {
        this.checked = false
        this.dialogVisible = false
      }
    } else {
      this.$message.error('取消删除')
      this.dialogVisible = false
    }
  }

  async getData (objectId: string) {
    const {
      data: { data }
    } = await Api.bizObjects.getFields(objectId)
    this.tableData = data
  }
}
</script>

<style lang="scss" scoped>
.details {
  margin-top: 10px;
  padding: 15px 0;
  border-top: 1px solid rgba(241, 242, 246, 1);

  &_delete {
    text-align: center;

    li {
      text-align: left;
      font-weight: 400;
      color: rgba(98, 101, 107, 1);
      margin: 2px 0 2px 70px;
    }
  }

  &_title {
    font-size: 16px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
  }
}

/deep/ .el-dialog__title {
  font-weight: bold;
}
</style>
