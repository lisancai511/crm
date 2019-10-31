<template>
  <div class="details">
    <div>
      <el-button class="m-l-20" @click="addLayout" type="primary">新建</el-button>
    </div>
    <div style="margin-top:15px">
      <el-table
        :header-cell-style="{background:'#F8FAFC',borderTop:'1px solid #EBEEF5'}"
        :data="tableData">
        <el-table-column
          label="名称">
          <template slot-scope="scope">
            <span class="link" @click="navLayoutDesigner(scope.row)">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="creator"
          label="创建人">
        </el-table-column>
        <el-table-column
          prop="lastModifier"
          label="最后修改人">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <div>
              <span class="dd-click m-r-10" @click="editLayout(scope.row)"><dd-icon name="edit"></dd-icon> 编辑 </span>
              <span class="dd-click m-r-10" @click="deleteLayout(scope.row)"> <dd-icon
                name="delete"></dd-icon> 删除</span>
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
  name: 'Geography'
})
export default class Geography extends mixins(injectObjectId) {
  private tableData: any = []
  private dialogVisible: boolean = false
  private checked: boolean = false
  private activeRow: any = ''

  addLayout () {
    this.$router.push({
      path: this.$route.path + `/layout/add`
    })
  }

  editLayout (row: any) {
    this.$router.push({
      path: this.$route.path + `/layout/${row.id}/edit`,
      query: {
        lay: encodeURIComponent(JSON.stringify(row))
      }
    })
  }

  navLayoutDesigner (row: any) {
    this.$router.push({
      path: '/designer',
      query: {
        layoutId: row.id,
        objectId: this.objectId
      }
    })
  }

  deleteLayout (row: any) {
    this.dialogVisible = true
    this.activeRow = row
  }

  async shoreDelete () {
    if (this.checked) {
      try {
        await Api.bizObjects.deleteLayouts(this.$route.params.objectId, this.activeRow.id)
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
    const { data: { data } } = await Api.bizObjects.getLayouts(objectId)
    this.tableData = data
  }
}
</script>

<style lang="scss" scoped>
.details {
  margin-top: 10px;
  padding: 15px 0;
  border-top: 1px solid rgba(241, 242, 246, 1);
}

.link {
  cursor: pointer;
  color: $dd--primary-color;
}
</style>
