<template>
  <div class="details">
    <div style="margin-left:10px">
      <el-button type="primary" @click="goToAdd">新建</el-button>
      <el-button class="button" @click='goToLayOut'>分配页面布局</el-button>
    </div>
    <div style="margin-top:15px">
      <el-table
        :header-cell-style="{background:'#F8FAFC',borderTop:'1px solid #EBEEF5'}"
        @cell-mouse-enter="mouseEnter"
        @cell-mouse-leave="mouseLeave"
        :data="tableData">
        <el-table-column
          label="记录类型标签">
          <template slot-scope="scope">
              <span @click="goToEdit(scope.row)">{{scope.row.description}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
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
          prop="time">
          <template slot-scope="scope">
            <div v-show="scope.row.flag">
               <span class="dd-click m-r-10" @click="handleClick(scope.row)"><dd-icon name="edit"></dd-icon> 编辑 </span>
               <span class="dd-click m-r-10" @click="deleteData(scope.row)"> <dd-icon name="delete"></dd-icon> 删除</span>
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
  name: 'TypeRecord'
})
export default class TypeRecord extends Vue {
  private tableData:any = []
  private dialogVisible:boolean = false
  private checked:boolean = false
  private activeRow:any = ''
  created () {
    if (this.$route.query.id) {
      this.getData()
    }
  }
  goToAdd () {
    localStorage.setItem('activeName', 'second')
    this.$router.push({
      path: '/backstage/customized/standard-edit/add',
      query: {
        id: this.$route.query.id
      }
    })
  }
  goToLayOut () {
    this.$router.push('/backstage/customized/standard-edit/layout')
  }
  async getData () {
    const { data } = await Api.bizObjects.getAllRecordTypes(this.$route.query.id)
    this.tableData = data
    this.tableData.forEach((item:any) => {
      item.flag = true
    })
  }
  mouseEnter (a:any, b:any, c:any) {
    a.flag = true
  }
  mouseLeave (a:any) {
    a.flag = false
  }
  handleClick (row:any) {
    this.$router.push({
      path: '/backstage/customized/standard-edit/add',
      query: {
        id: JSON.stringify(row)
      }
    })
  }
  deleteData (row:any) {
    this.dialogVisible = true
    this.activeRow = row
  }
  async shoreDelete () {
    if (this.checked) {
      try {
        await Api.bizObjects.deleteRecordTypes(this.$route.query.id, this.activeRow.id)
        this.dialogVisible = false
        this.checked = false
        this.$message.success('删除成功')
        this.getData()
      } catch (err) {
        this.$message.error('删除失败')
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
  border-top: 1px solid rgba(241,242,246,1);
  .button {
    background: #40D2A5;
    color: #fff;
  }
}
</style>
