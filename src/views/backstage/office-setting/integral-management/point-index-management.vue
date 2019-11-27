<template>
  <div>
    <el-card style="min-height: calc(100vh - 70px); padding: 20px;"
             class="m-b-10"
             :body-style="{padding:0}">
      <div v-if="true">
        <div>
          <strong class="fs-16">积分指标管理</strong>
        </div>
        <div class="nav m-t-20">
          <div>
            <el-button @click="createIndex"
                       type="primary">
              新建指标
            </el-button>
            <el-button @click="goToIndustry">从行业库中添加</el-button>
            <el-button>基础设置</el-button>
            <el-button>更多</el-button>
          </div>
          <div>
            <el-input style="width:300px"
                      placeholder="搜索...">
              <i slot="suffix"
                 class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
        </div>
        <!-- 树和表格 -->
        <div class="body m-t-20">
          <div class="body_left">
            <el-tree :default-expand-all="true"
                     :data="treeData"
                     show-checkbox
                     node-key="id"
                     :key="Math.random()"
                     :expand-on-click-node="false">
              <span class="custom-tree-node"
                    slot-scope="{ node, data }">
                <span v-if="!data.flag">{{ data.name }}</span>
                <el-input v-if="data.flag"
                          v-model="data.name"
                          style="width:100px;"
                          size="mini"></el-input>
                <el-button @click="updateName(data)"
                           v-if="data.flag"
                           class="m-l-5"
                           size="mini"
                           style="padding-left:5px;padding-right:5px;"
                           type="primary">修改</el-button>
                <span v-if="!data.id">
                  <dd-icon @click.native="creatNode(data, node)"
                           class="iconfont m-l-20"
                           name="Addto" /></span>
                <span v-if="data.id"
                      class="icon">
                  <dd-icon @click.native="editNode(data, node)"
                           class="iconfont m-l-30 m-r-10"
                           name="edit" />
                  <dd-icon @click.native="deleteNode(data, node)"
                           class="iconfont m-l-10 m-r-10"
                           name="delete" />
                  <dd-icon @click.native="creatNode(data, node)"
                           class="iconfont m-l-10 m-r-10"
                           name="Addto" />
                </span>
              </span>
            </el-tree>
          </div>
          <div class="body_right">
            <el-table ref="multipleTable"
                      :header-cell-style="{background:'#F8FAFC'}"
                      :data="tableData"
                      border
                      tooltip-effect="dark"
                      class="table"
                      @selection-change="handleSelectionChange">
              <el-table-column type="selection"
                               width="55">
              </el-table-column>
              <el-table-column width="200"
                               prop="typeName"
                               label="积分类型">
              </el-table-column>
              <el-table-column prop="level1"
                               :render-header="rederButton"
                               width="200"
                               label="一级指标">
                <template slot-scope="scope">
                  <span>{{scope.row.level1?scope.row.level1.name:'--'}}</span>
                </template>
              </el-table-column>
              <!-- <el-collapse-transition> -->
              <el-table-column v-if="flag"
                               width="200"
                               prop="level2"
                               label="二级指标">
                <template slot-scope="scope">
                  <span>{{scope.row.level2?scope.row.level2.name:'--'}}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="flag"
                               width="200"
                               prop="level3"
                               label="三级指标">
                <template slot-scope="scope">
                  <span>{{scope.row.level3?scope.row.level3.name:'--'}}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="flag"
                               width="200"
                               prop="level4"
                               label="四级指标">
                <template slot-scope="scope">
                  <span>{{scope.row.level4?scope.row.level4.name:'--'}}</span>
                </template>
              </el-table-column>
              <el-table-column v-if="flag"
                               width="200"
                               prop="level5"
                               label="五级指标">
                <template slot-scope="scope">
                  <span>{{scope.row.level5?scope.row.level5.name:'--'}}</span>
                </template>
              </el-table-column>
              <!-- </el-collapse-transition> -->

              <el-table-column prop="dataSource"
                               width="200"
                               label="规则类别">
              </el-table-column>
              <el-table-column prop="description"
                               width="200"
                               label="规则描述">
              </el-table-column>
              <el-table-column prop="frequencyType"
                               width="200"
                               label="给分频率">
              </el-table-column>
              <el-table-column prop="address"
                               fixed="right"
                               width="250"
                               label="操作">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)"
                             type="text"
                             size="small">编辑指标</el-button>
                  <el-button type="text"
                             size="small">停用</el-button>
                  <el-button type="text"
                             size="small">移动到</el-button>
                  <el-button @click="deleteData(scope.row)"
                             type="text"
                             size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="block m-t-20">
              <el-pagination style="float:right"
                             @size-change="handleSizeChange"
                             @current-change="handleCurrentChange"
                             :current-page.sync="currentPage2"
                             :page-sizes="[10, 20, 30, 40]"
                             :page-size="10"
                             layout="sizes, prev, pager, next"
                             :total="total">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </el-card>

    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               width="30%">
      <el-input v-model="newName"></el-input>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addScoreMeasureNodes">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Api from '@/api'

@Component({
  name: 'CustomizedApplication'
})
export default class CustomizedApplication extends Vue {
  flag: boolean = false
  dialogVisible: boolean = false
  treeData: any = [{ name: '全部', children: [] }]
  tableData: any = []
  currentPage2: any = 1
  pageSize: any = 10
  pageNo: any = 1
  newName: any = ''
  total: number = 10
  multipleSelection: any = []
  activeNode: any
  created () {
    this.getData()
    this.getData1()
  }
  async getData () {
    const {
      data: { data }
    } = await Api.jiliScore.getDataScoreTree()
    this.treeData[0].children = data
    this.filterTree(this.treeData)
  }
  editNode (data: any) {
    data.flag = true
    this.$forceUpdate()
  }
  creatNode (data: any) {
    this.activeNode = data
    this.dialogVisible = true
  }
  async getData1 () {
    const pageSize = this.pageSize
    const pageNo = this.pageNo
    const params = { pageSize, pageNo }
    const {
      data: { data }
    } = await Api.jiliScore.getScoreMeasureList(params)
    this.total = data.total
    this.tableData = data.content
  }
  async handleSizeChange (val: any) {
    this.pageSize = val
    this.getData1()
  }
  async handleCurrentChange (val: any) {
    this.pageNo = val
    this.getData1()
  }
  async addScoreMeasureNodes () {
    let newData: any = {}
    newData.name = this.newName
    if (!this.activeNode.id) {
      newData.type = 1
    } else {
      newData.type = 2
      newData.parentType = this.activeNode.type
      newData.parentId = this.activeNode.id
    }
    try {
      const data = await Api.jiliScore.addScoreMeasureNodes(newData)
      if (data.status === 200) {
        this.dialogVisible = false
        this.newName = ''
        this.getData()
        this.getData1()
      }
    } catch (e) {
      this.$message('层级已达上限')
    }
  }
  async deleteNode (row: any) {
    this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        const data = await Api.jiliScore.deleteScoreMeasureTypes(row.id, {
          type: row.type
        })
        if (data.status === 200) {
          this.getData()
          this.getData1()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
  }
  async deleteData (row: any) {
    this.$confirm('此操作将永久删除该指标, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        const { data } = await Api.jiliScore.deleteScoreMeasure(row.id)
        if (data.success) {
          this.getData()
          this.getData1()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
  }
  handleSelectionChange (val: any) {
    this.multipleSelection = val
  }
  async updateName (data: any) {
    const newData = await Api.jiliScore.updateScoreMeasureTypes(
      { name: data.name },
      data.id
    )
    if (newData.data.success) {
      data.flag = false
      this.$forceUpdate()
      this.$message.success('修改成功')
    } else {
      this.$message.error('修改失败')
    }
  }
  showMore () {
    this.flag = !this.flag
  }
  goToIndustry () {
    this.$router.push({
      path: this.$route.path + '/import-from-industry-library'
    })
  }
  rederButton (h: any, { column }: any) {
    return this.flag
      ? h('span', [
        h('span', column.label),
        h(
          'el-tag',
          { style: 'float:right', on: { click: this.showMore } },
          '收起'
        )
      ])
      : h('span', [
        h('span', column.label),
        h(
          'el-tag',
          { style: 'float:right', on: { click: this.showMore } },
          '展开'
        )
      ])
  }
  createIndex () {
    this.$router.push({
      path: `/backstage/office-setting/integral-management/point-index-management/new`
    })
  }
  filterTree (arr:any) {
    arr.forEach((item:any) => {
      if (item.children) {
        item.children.forEach((item0:any, index:any) => {
          if (item0.measure === true) {
            item.children.splice(index, 1)
          }
        })
        this.filterTree(item.children)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-card__header {
  border: 0 !important;
}
.nav {
  display: flex;
  justify-content: space-between;
}
.body {
  display: flex;
  &_left {
    width: 20%;
    overflow: auto !important;
    min-height: calc(100vh - 210px);
  }
  &_right {
    width: 80%;
  }
}
.custom-tree-node {
  .icon {
    opacity: 0;
  }
}
/deep/ .el-tree-node__content:hover {
  .icon {
    opacity: 1;
  }
}
.iconfont:hover {
  color: $dd--primary-color;
  transform: scale(1.4);
}
/deep/.el-tree > .el-tree-node {
  min-width: 100%;
  display: inline-block;
}
/deep/.el-tree-node__content {
  height: 36px;
}
</style>
