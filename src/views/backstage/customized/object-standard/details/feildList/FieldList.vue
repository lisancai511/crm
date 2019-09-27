<template>
  <div class="details">
    <div class="m-l-10">
      <el-button @click="goToNewField" type="primary">新建字段</el-button>
    </div>
    <div class="m-t-15">
      <el-table
        :header-cell-style="{background:'#F8FAFC',borderTop:'1px solid #EBEEF5'}"
        @cell-mouse-enter="mouseEnter"
        @cell-mouse-leave="mouseLeave"
        :data="tableData">
        <el-table-column
          label="字段名称">
          <template slot-scope="scope">
              <span @click="goToEdit(scope.row)">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="apiName"
          label="API">
        </el-table-column>
        <el-table-column
          prop="mandatory"
          label="启用状态">
        </el-table-column>
        <el-table-column
          prop="dataType"
          label="字段类型">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="标准字段">
        </el-table-column>
        <el-table-column
          prop="time">
          <template slot-scope="scope">
            <div v-show="scope.row.flag">
               <span class="dd-click m-r-10" @click="handleClick(scope.row)"><dd-icon name="edit"></dd-icon> 编辑 </span>
               <span class="dd-click m-r-10" @click="deleteRow(scope.row)"> <dd-icon name="delete"></dd-icon> 删除</span>
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
import { Component, Vue } from 'vue-property-decorator'
import Api from '@/api'
@Component({
  name: 'FiledList'
})
export default class FiledList extends Vue {
  private tableData:any = []
  private dialogVisible:boolean = false
  private checked:boolean = false
  private activeRow:any =''
  private created () {
    if (this.$route.query.id) {
      this.getData()
    }
  }
  goToNewField () {
    this.$router.push({
      path: '/backstage/customized/standard-edit/newField',
      query: {
        id: this.$route.query.id
      }
    })
  }
  mouseEnter (a:any, b:any, c:any) {
    this.$nextTick(() => {
      a.flag = true
    })
  }
  mouseLeave (a:any) {
    a.flag = false
  }
  handleClick (row:any) {
    this.$router.push({
      path: '/backstage/customized/standard-edit/newField',
      query: {
        id: this.$route.query.id,
        fieldId: row.id
      }
    })
  }
  deleteRow (row:any) {
    this.dialogVisible = true
    this.activeRow = row
  }
  async shoreDelete () {
    if (this.checked) {
      try {
        const { data } = await Api.bizObjects.deleteFields(this.$route.query.id, this.activeRow.id)
        if (data.status === 226) {
          this.$message.error(`字段存在依赖关系，无法删除`)
          this.dialogVisible = false
        } else {
          this.$message.success('删除成功')
          this.dialogVisible = false
          this.checked = false
          this.getData()
        }
      } catch (err) {
        console.log(err, 999)
      }
    } else {
      this.$message.error('取消删除')
      this.dialogVisible = false
    }
  }
  async getData () {
    const { data } = await Api.bizObjects.getFields(this.$route.query.id as string)
    this.tableData = data
    this.tableData.forEach((item:any) => {
      item.flag = true
    })
  }
}
</script>

<style lang="scss" scoped>
.details {
  margin-top: 10px;
  padding: 15px 0;
  border-top: 1px solid rgba(241,242,246,1);
  &_delete {
    text-align: center;
    li {
      text-align: left;
      font-family:'PingFangSC';
      font-weight:400;
      color:rgba(98,101,107,1);
      margin: 2px 0 2px 70px;
    }
  }
  &_title {
    font-size:16px;
    font-family:'PingFangSC';
    font-weight:600;
    color:rgba(51,51,51,1);
  }
}
/deep/.el-dialog__title {
  font-weight: bold;
}
</style>
