<template>
  <div>
    <el-card :body-style="{padding:0}"
             style="min-height: calc(100vh - 50px)">
      <h3 class="m-l-20">公司部门</h3>
      <el-tree :default-expand-all="true"
               :data="data"
               node-key="id"
               :expand-on-click-node="false">
        <span class="custom-tree-node"
              slot-scope="{ node, data }">
          <span>
            <dd-icon class="m-r-10"
                     :name="data.children?'home':'home'"></dd-icon>{{ data.name }}
          </span>
          <span class="icon">
            <dd-icon @click.native="editNode(data)"
                     class="iconfont m-l-30 m-r-10"
                     name="edit" />
            <dd-icon @click.native="deleteNode(data, node)"
                     class="iconfont m-l-10 m-r-10"
                     name="delete" />
            <dd-icon @click.native="creatNode(data, node)"
                     class="iconfont m-l-10 m-r-10"
                     name="Addto" />
            <dd-icon @click.native="downNode(data, node)"
                     class="iconfont m-l-10 m-r-10"
                     name="down" />
            <dd-icon @click.native="upNode(data, node)"
                     class="iconfont m-l-10 m-r-10"
                     name="up" />
          </span>
        </span>
      </el-tree>
    </el-card>

    <el-dialog title="修改部门名称"
               :visible.sync="dialogVisible"
               width="30%">
      <div class="dialog">
        <span class="m-r-10">部门名称</span>
        <el-input v-model="activeData.name" style="width: 200px;"></el-input>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="saveData">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Api from '@/api'
import lodash from 'lodash'

@Component({
  name: 'Standard'
})
export default class Standard extends Vue {
  private formLabelAlign: any = {
    type: 'Department',
    parentId: null
  }

  activeData: any = {
    name: ''
  }

  dialogVisible: boolean = false

  data: any = []
  roleList: any = []

  created () {
    this.getData()
  }

  editNode (data: any) {
    this.activeData = lodash.cloneDeep(data)
    this.dialogVisible = true
  }

  creatNode (data: any) {
    this.$router.push({
      path: this.$route.path + `/add/${data.id}`
    })
  }

  async saveData () {
    const obj = {
      name: '',
      parentId: '',
      type: '',
      manager: ''
    }
    obj.name = this.activeData.name
    obj.parentId = this.activeData.parentId
    obj.type = this.activeData.type
    obj.manager = this.activeData.manager
    await Api.mainData.updateOrganizations(obj, this.activeData.id)
    this.$message.success('修改成功')
    this.getData()
    this.dialogVisible = false
  }

  async deleteNode (data: any) {
    await Api.mainData.deleteOrganization(data.id)
    this.$message.success('删除成功')
    this.getData()
  }

  async downNode (org: any, node: any) {
    const current = node.parent.data.children
    if (current) {
      current.forEach(async (item: any, index: any) => {
        if (item.id === org.id) {
          if (index === current.length - 1) {
            this.$message.error('已经是最后一项了')
          } else {
            const { data } = await Api.mainData.sortOrganizations(
              current[index + 1].id,
              org.id
            )
            if (data.success) {
              this.data = []
              this.getData()
            }
          }
        }
      })
    } else {
      this.$message.error('根组织不能更改')
    }
  }

  async upNode (org: any, node: any) {
    const current = node.parent.data.children
    if (current) {
      current.forEach(async (item: any, index: any) => {
        if (item.id === org.id) {
          if (index === 0) {
            this.$message.error('已经是第一项了')
          } else {
            const { data } = await Api.mainData.sortOrganizations(
              current[index - 1].id,
              org.id
            )
            if (data.success) {
              this.data = []
              this.getData()
            }
          }
        }
      })
    } else {
      this.$message.error('根组织不能更改')
    }
  }

  async getData () {
    const {
      data: { data }
    } = await Api.mainData.getOrganizations(true)
    this.data = []
    this.data.push(data)
  }

  getCurrentArr (id: any, data: any) {
    let currentArr: any = []
    data.forEach((item: any) => {
      if (item.id === id) {
        currentArr = item
      } else {
        this.getCurrentArr(id, item.children)
      }
    })
    return currentArr
  }
}
</script>
<style lang="scss" scoped>
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
.dialog {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
