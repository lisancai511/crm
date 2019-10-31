<template>
  <div class="details">
    <div>
      <el-button type="primary" class="m-l-20" @click="createRecordType">新建</el-button>
      <el-button class="button" @click='distributeLayout'>分配页面布局</el-button>
    </div>
    <div style="margin-top:15px">
      <el-table
        :header-cell-style="{background:'#F8FAFC',borderTop:'1px solid #EBEEF5'}"
        :data="tableData">
        <el-table-column
          label="记录类型标签">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
        </el-table-column>
        <el-table-column
          label="启用状态">
          <template slot-scope="scope">
            <span>{{scope.row.enable?'已启用':'未启用'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="lastModifier"
          label="上次修改人信息">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <div>
              <span class="dd-click m-r-10" @click="editRecordType(scope.row)">
                <dd-icon name="edit"></dd-icon> 编辑 </span>
              <span class="dd-click m-r-10" @click="deleteRecordType(scope.row)">
                <dd-icon name="delete"></dd-icon> 删除</span>
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
        <el-button type="primary" @click="confirmDelete">确 定</el-button>
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
  name: 'TypeRecord'
})
export default class TypeRecord extends mixins(injectObjectId) {
  private tableData: any = []
  private dialogVisible: boolean = false
  private checked: boolean = false
  private activeRow: any = ''

  createRecordType () {
    sessionStorage.setItem('activeName', 'second')
    this.$router.push({
      path: this.$route.path + '/record-type/add',
      query: {
        id: this.$route.params.id
      }
    })
  }

  distributeLayout () {
    this.$router.push(this.$route.path + `/record-type/layout`)
  }

  async getData (objectId: string) {
    const { data: { data } } = await Api.bizObjects.getAllRecordTypes(objectId)
    this.tableData = data
  }

  editRecordType (row: any) {
    this.$router.push({
      path: this.$route.path + `/record-type/${row.id}/edit`
    })
  }

  deleteRecordType (row: any) {
    this.dialogVisible = true
    this.activeRow = row
  }

  async confirmDelete () {
    if (this.checked) {
      try {
        await Api.bizObjects.deleteRecordTypes(this.$route.params.objectId, this.activeRow.id)
        this.dialogVisible = false
        this.checked = false
        this.$message.success('删除成功')
        this.getData(this.objectId)
      } catch (err) {
        throw err
      }
    } else {
      this.$message('请确认是否删除')
    }
  }
}
</script>

<style lang="scss" scoped>
.details {
  margin-top: 10px;
  padding-top: 15px;
  border-top: 1px solid rgba(241, 242, 246, 1);

  .button {
    background: #40D2A5;
    color: #fff;
  }
}
</style>
