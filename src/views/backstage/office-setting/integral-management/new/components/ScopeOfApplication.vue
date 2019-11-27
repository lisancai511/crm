<template>
  <div class="ScopeOfApplication">
    <el-card class="main">
      <div class="left">
        <div>选择</div>
        <div class="left_main m-t-10">
          <el-input v-model="input"
                    placeholder="请输入内容"></el-input>
          <el-tree :data="tbaleData"
                   class="m-t-10"
                   @check-change="handleCheckChange"
                   show-checkbox
                   :default-checked-keys="data.applyTargets[0].targetIds"
                   default-expand-all
                   node-key="id"
                   ref="tree"
                   highlight-current>
            <span class="custom-tree-node"
                  slot-scope="{ node, data }">
              <span>
                <dd-icon class="m-r-10"
                         :name="data.type?'Bankcard':'man'"></dd-icon>{{ data.name }}
              </span>
            </span>
          </el-tree>
        </div>
      </div>
      <div class="right">
        <div>已选{{num}}人</div>
        <div class="right_main m-t-10">
          <el-tag :key="tag.id"
                  class="m-r-5 m-t-5"
                  v-for="(tag) in peopleList"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)">
            {{tag.name}}
          </el-tag>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Api from '@/api'

@Component({
  name: 'ScopeOfApplication'
})
export default class ScopeOfApplication extends Vue {
  tbaleData: any = []
  async mounted () {
    await this.getData()
    const tree = this.$refs['tree'] as any
    this.peopleList = tree.getCheckedNodes(true)
    this.num = this.data.applyTargets[0].targetIds ? this.data.applyTargets[0].targetIds.length : 0
  }
  peopleList: any = []
  num: any = 0
  @Prop() private data: any
  choosePeople: any = []
  input: any = ''
  static title = '适用范围'
  async getData () {
    const {
      data: { data }
    } = await Api.mainData.getUsersFromOrg()
    this.tbaleData = [data]
    this.directData(this.tbaleData)
  }
  handleCheckChange () {
    const tree = this.$refs['tree'] as any
    this.peopleList = tree.getCheckedNodes(true)
    this.peopleList = this.peopleList.filter((item:any) => {
      return !item.type
    })
    this.data.applyTargets[0].targetIds = this.peopleList.map((item: any) => {
      return item.id
    })
    this.num = this.data.applyTargets[0].targetIds.length
  }
  handleClose (tag: any) {
    this.peopleList = this.peopleList.filter((item: any) => {
      return item.id !== tag.id
    })
    this.data.applyTargets[0].targetIds = this.data.applyTargets[0].targetIds.filter((item: any) => {
      return item !== tag.id
    })
    const tree = this.$refs['tree'] as any
    tree.setCheckedKeys(this.data.applyTargets[0].targetIds)
  }
  directData (tbaleData:any) {
    tbaleData.forEach((item:any) => {
      if (!item.children) {
        item.children = []
      }
      if (item.users) {
        item.children = item.children.concat(item.users)
      }
      if (item.children) {
        this.directData(item.children)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.ScopeOfApplication {
  width: 100%;
  display: flex;
  min-height: 650px;
  justify-content: center;
  .main {
    width: 600px;
    margin-top: 20px;
    .left {
      width: 300px;
      height: 550px;
      min-height: 500px;
      float: left;
      &_main {
        width: 300px;
        border: 1px solid rgba(217, 217, 217, 1);
        overflow: auto;
        height: 100%;
        padding: 20px;
      }
    }
    .right {
      width: 250px;
      height: 550px;
      min-height: 500px;
      float: right;
      &_main {
        width: 250px;
        border: 1px solid rgba(217, 217, 217, 1);
        overflow: auto;
        height: 100%;
        padding: 20px;
      }
    }
  }
}
</style>
