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
                       size="small"
                       type="primary">
              新建指标
            </el-button>
            <el-button size="small"
                       @click="goToIndustry">从行业库中添加</el-button>
            <el-button size="small"
                       @click="goToBaseSetting">基础设置</el-button>
            <el-button size="small"
                       @click="updateAviliables(false)">批量停用</el-button>
            <el-button size="small"
                       @click="updateAviliables(true)">批量启用</el-button>
          </div>
          <div>
            <el-input size="small"
                      debounce
                      @input="getTableData()"
                      v-model="filter.keyword"
                      style="width:300px"
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
                     :highlight-current="true"
                     @node-click="filterTable"
                     ref="tree"
                     :data="treeData"
                     node-key="id"
                     :expand-on-click-node="false">
              <span class="custom-tree-node"
                    slot-scope="{ node, data }">
                <span>{{ data.name }}</span>
                <span v-if="!data.id">
                  <dd-icon @click.native="creatNode(data, node)"
                           class="iconfont m-l-20"
                           name="Addto" /></span>
                <span v-if="data.id"
                      class="icon editTree m-r-10">
                  <el-button type="text"
                             size="mini">
                    <dd-icon @click.native="creatNode(data, node)"
                             class="Addto"
                             name="Addto"></dd-icon>
                  </el-button>
                  <el-dropdown>
                    <el-button type="text"
                               size="mini">
                      <dd-icon class="more"
                               name="more"></dd-icon>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="editNode(data, node)">
                        <dd-icon name="edit"></dd-icon>
                      </el-dropdown-item>
                      <el-dropdown-item @click.native="deleteNode(data, node)">
                        <dd-icon name="delete"></dd-icon>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </span>
              </span>
            </el-tree>
          </div>
          <div class="body_right">
            <el-table ref="table"
                      :header-cell-style="{background:'#F8FAFC'}"
                      :data="tableData"
                      border
                      tooltip-effect="dark"
                      class="table"
                      @selection-change="handleSelectionChange">
              <el-table-column type="selection"
                               width="50">
              </el-table-column>
              <el-table-column prop="name"
                               width="120"
                               label="指标名称">
              </el-table-column>
              <el-table-column label="所属积分类型">
                <template slot-scope="scope">
                  {{renderType(scope.row)}}
                </template>
              </el-table-column>
              <el-table-column prop="description"
                               label="规则描述">
              </el-table-column>
              <el-table-column width="100"
                               label="是否启用">
                <template slot-scope="scope">
                  <el-switch @change="updateAviliable($event,scope.row)"
                             v-model="scope.row.aviliable">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column width="120"
                               prop="lastModifierName"
                               label="修改人">
              </el-table-column>
              <el-table-column width="180"
                               prop="lastModifiedTime"
                               label="最后修改时间">
              </el-table-column>
              <el-table-column width="100"
                               prop="address"
                               label="操作">
                <template slot-scope="scope">
                  <dd-icon @click.native="handleClick(scope.row)"
                           name="edit"
                           class="m-r-10 dd-click"></dd-icon>
                  <dd-icon @click.native="deleteData(scope.row)"
                           name="delete"
                           class="dd-click"></dd-icon>
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

    <el-dialog title="请输入类别名称"
               :visible.sync="dialogVisible"
               width="20%">
      <el-input v-model="newName"></el-input>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addScoreMeasureNodes">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog v-if="activeNode.name"
               title="请输入新的类别名称"
               :visible.sync="dialogVisible1"
               width="20%">
      <el-input v-model="activeNode.name"></el-input>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary"
                   @click="updateScoreMeasureNodes">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Api from '@/api'
import lodash from 'lodash'

@Component({
  name: 'CustomizedApplication'
})
export default class CustomizedApplication extends Vue {
  dialogVisible: boolean = false
  dialogVisible1: boolean = false
  treeData: any = [{ name: '全部', id: 0, children: [] }]
  tableData: any = []
  filter: any = {
    keyword: null,
    pageSize: 10,
    pageNo: 1
  }

  currentPage2: any = 1
  newName: any = ''
  total: number = 10
  multipleSelection: any = []
  activeNode: any = {
    name: ''
  }

  mounted () {
    this.getTreeData()
    this.getTableData()
  }

  async getTreeData () {
    const {
      data: { data }
    } = await Api.jiliScore.getDataScoreTree()
    this.treeData[0].children = data
    this.filterTree(this.treeData)
    this.$nextTick(() => {
      const tree = this.$refs.tree as any
      tree.setCurrentKey(0)
    })
  }

  editNode (data: any) {
    this.activeNode = lodash.cloneDeep(data)
    this.dialogVisible1 = true
  }

  creatNode (data: any) {
    this.activeNode = data
    this.dialogVisible = true
  }

  async getTableData () {
    const {
      data: { data }
    } = await Api.jiliScore.getScoreMeasureList(this.filter)
    this.total = data.total
    this.tableData = data.content
  }

  async handleSizeChange (val: any) {
    this.filter.pageSize = val
    this.getTableData()
  }

  async handleCurrentChange (val: any) {
    this.filter.pageNo = val
    this.getTableData()
  }

  async addScoreMeasureNodes () {
    const newData: any = {}
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
        this.getTreeData()
        this.getTableData()
      }
    } catch (e) {
      console.log(e)
    }
  }

  async updateScoreMeasureNodes () {
    await this.updateName(this.activeNode)
    this.dialogVisible1 = false
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
          this.getTreeData()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      })
      .catch(e => {
        console.log(e)
      })
  }

  handleClick (row: any) {
    this.$router.push({
      path:
        '/backstage/office-setting/integral-management/point-index-management/new',
      query: {
        id: row.id
      }
    })
  }

  goToBaseSetting () {
    this.$router.push(
      '/backstage/office-setting/integral-management/point-index-management/base-setting'
    )
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
          this.getTableData()
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
      this.getTreeData()
      this.getTableData()
      this.$message.success('修改成功')
    } else {
      this.$message.error('修改失败')
    }
  }

  goToIndustry () {
    this.$router.push({
      path: this.$route.path + '/import-from-industry-library'
    })
  }

  createIndex () {
    this.$router.push({
      path:
        '/backstage/office-setting/integral-management/point-index-management/new'
    })
  }

  filterTree (arr: any) {
    arr.forEach((item: any) => {
      if (item.children) {
        item.children.forEach((item0: any, index: any) => {
          if (item0.measure === true) {
            item.children.splice(index, 1)
          }
        })
        this.filterTree(item.children)
      }
    })
  }

  renderType (row: any) {
    let str = ''
    str += row.typeName
    if (row.level1.name && row.level1.id !== row.id) {
      str += '>' + row.level1.name
    }
    if (row.level2.name && row.level2.id !== row.id) {
      str += '>' + row.level2.name
    }
    if (row.level3.name && row.level3.id !== row.id) {
      str += '>' + row.level3.name
    }
    if (row.level4.name && row.level4.id !== row.id) {
      str += '>' + row.level4.name
    }
    if (row.level5.name && row.level5.id !== row.id) {
      str += '>' + row.level5.name
    }
    return str
  }

  filterTable (treeNode: any) {
    if (treeNode.id === 0) {
      this.filter.id = null
    } else {
      this.filter.id = treeNode.id
    }
    this.filter.type = treeNode.type
    this.getTableData()
  }

  async updateAviliable ($event: any, row: any) {
    const obj: any = {}
    obj.aviliable = $event
    obj.ids = [row.id]
    const { data } = await Api.jiliScore.updateScoreMeasureAviliable(obj)
    if (data.success) {
      obj.aviliable
        ? this.$message.success('启用成功')
        : this.$message.success('停用成功')
    }
    this.getTableData()
  }

  async updateAviliables (aviliable: boolean) {
    if (this.multipleSelection.length < 1) {
      this.$message.error('请先选择需要批量处理的指标')
      return
    }
    const obj = {
      aviliable: aviliable,
      ids: []
    }
    obj.ids = this.multipleSelection.map((item: any) => {
      return item.id
    })
    const { data } = await Api.jiliScore.updateScoreMeasureAviliable(obj)
    if (data.success) {
      obj.aviliable
        ? this.$message.success('启用成功')
        : this.$message.success('停用成功')
      this.getTableData()
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-card__header {
  border: 0 !important;
}

.nav {
  display: flex;
  justify-content: space-between;
}

.body {
  display: flex;

  &_left {
    width: 16%;
    overflow: auto !important;
    margin-right: 10px;
    min-height: calc(100vh - 210px);
  }

  &_right {
    width: 82%;
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

/deep/ .el-tree > .el-tree-node {
  min-width: 100%;
  display: inline-block;
}

/deep/ .el-tree-node__content {
  height: 36px;
  line-height: 36px;
}

.more {
  color: black;
}

.Addto {
  color: black;
  margin-right: 5px;
}

/deep/ .el-table th.gutter {
  display: table-cell !important;
}

.editTree {
  position: absolute;
  right: 0;
}

// /deep/.el-tree-node:focus > .el-tree-node__content {
//   background-color: red !important;
// }
</style>
