<template>
  <div class="main">
    <el-card class="m-b-20" :body-style="{padding:0}">
      <div slot="header" class="title">
        <span class="title_left">角色</span>
        <div class="title_right">角色用于管理和控制不同模块的访问、操作权限、定制设置的权限。</div>
        <div class="m-t-20">
          <el-button @click="createRole" type="primary">新建角色</el-button>
        </div>
      </div>
      <div>
        <el-table
          :header-cell-style="{background:'#F8FAFC'}"
          :data="tableData">
          <el-table-column
            label="对象名称">
            <template slot-scope="scope">
              <span class="link" @click="goToEdit(scope.row)">{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="description"
            label="描述">
          </el-table-column>
          <el-table-column
            prop="stardard"
            label="自定义">
          </el-table-column>
          <el-table-column
            prop="creatorName"
            label="创建人">
          </el-table-column>
          <el-table-column
            prop="createdTime"
            label="创建时间">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <div>
                <span class="dd-click m-r-10" @click="goToEdit(scope.row)">
                  <dd-icon name="edit"></dd-icon> 编辑 </span>
                <span class="dd-click m-r-10" @click="deleteObject(scope.row)">
                  <dd-icon name="delete"></dd-icon> 删除</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Api from '@/api'

@Component({
  name: 'Standard'
})
export default class Standard extends Vue {
  private tableData: any = []

  mounted () {
    this.getData()
  }

  goToEdit (row: any) {
    this.$router.push({
      path: this.$route.path + `/${row.id}/edit`
    })
  }

  async getData () {
    try {
      const { data } = await Api.mainData.getRoles()
      this.tableData = data.data
    } catch (err) {
      throw err
    }
  }

  async deleteObject (row: any) {
    try {
      const { data } = await Api.mainData.deleteRole(row.id)
      if (data.success) {
        this.$message.success('删除成功')
        this.getData()
      }
    } catch (err) {
      throw err
    }
  }

  createRole () {
    this.$router.push({
      path: this.$route.path + `/add`
    })
  }
}
</script>

<style lang="scss" scoped>
.title {
  &_left {
    font-size: 16px;
    font-weight: 600;
  }

  &_right {
    font-size: 12px;
    font-weight: 400;
    color: rgba(138, 150, 160, 1);
    margin: 10px 0;
  }
}

.link {
  cursor: pointer;
  color: $dd--info-color;
}
</style>
