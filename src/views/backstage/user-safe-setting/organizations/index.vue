<template>
  <div>
     <el-card :body-style="{padding:0}" style="min-height: calc(100vh - 150px)">
      <h3 class="m-l-20">公司部门</h3>
      <el-tree
        :default-expand-all="true"
        :data="data"
        node-key="id"
        :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span><dd-icon class="m-r-10" :name="data.children?'Bankcard':'text'"></dd-icon>{{ data.name }}</span>
          <span class="icon">
            <dd-icon @click.native="editNode(data, node)" class="iconfont m-l-30 m-r-10" name="edit"/>
            <dd-icon @click.native="deleteNode(data, node)" class="iconfont m-l-10 m-r-10" name="delete"/>
            <dd-icon @click.native="creatNode(data, node)" class="iconfont m-l-10 m-r-10" name="Addto"/>
            <dd-icon @click.native="downNode(data, node)" class="iconfont m-l-10 m-r-10" name="down"/>
            <dd-icon @click.native="upNode(data, node)" class="iconfont m-l-10 m-r-10" name="up"/>
          </span>
        </span>
      </el-tree>
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
  private formLabelAlign: any = {
    type: 'Department',
    parentId: null
  }
  data: any = []
  roleList: any = []

  created () {
    this.getData()
  }

  async saveData () {
    const data = await Api.mainData.addOrganization(this.formLabelAlign)
    console.log(data)
  }
  handleNodeClick (data:any) {
    console.log(data)
  }
  editNode (data:any, node:any) {
    console.log(data, node)
  }
  creatNode (data:any) {
    console.log(data)
    this.$router.push({
      path: this.$route.path + `/add/${data.id}`
    })
  }
  deleteNode (data:any, node:any) {
    console.log(data, node)
  }
  async downNode (org:any, node:any) {
    const current = node.parent.data.children
    if (current) {
      current.forEach(async (item:any, index:any) => {
        if (item.id === org.id) {
          if (index === current.length - 1) {
            this.$message.error('已经是最后一项了')
          } else {
            const { data } = await Api.mainData.sortOrganizations(current[index + 1].id, org.id)
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
  async upNode (org:any, node:any) {
    const current = node.parent.data.children
    if (current) {
      current.forEach(async (item:any, index:any) => {
        if (item.id === org.id) {
          if (index === 0) {
            this.$message.error('已经是第一项了')
          } else {
            const { data } = await Api.mainData.sortOrganizations(current[index - 1].id, org.id)
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
    const { data: { data } } = await Api.mainData.getOrganizations(true)
    this.data.push(data)
  }

  getCurrentArr (id: any, data:any) {
    let currentArr:any = []
    data.forEach((item:any) => {
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
  transform:scale(1.4);
}
</style>
