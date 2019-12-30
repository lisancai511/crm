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
                   :default-checked-keys="targetIds"
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
import { UserModule } from '@/store/modules/user'
import { getModule } from 'vuex-module-decorators'
import store from '@/store'

const userModule = getModule(UserModule, store)

@Component({
  name: 'ScopeOfApplication'
})
export default class ScopeOfApplication extends Vue {
  @Prop() private data: any
  targetIds:any = []
  choosePeople: any = []
  input: any = ''
  static title = '适用范围'
  tbaleData: any = []
  peopleList: any = []
  num: any = 0
  roleList:any = []
  organizationsList:any = []
  async mounted () {
    await this.getData()
    const tree = this.$refs.tree as any
    this.peopleList = tree.getCheckedNodes(true) || []
    this.num = this.targetIds ? this.targetIds.length : 0
  }

  get tenantId () {
    return userModule.tenantId
  }

  async getData () {
    const {
      data: { data }
    } = await Api.mainData.getUsersFromOrg({ orgId: this.tenantId, all: true })
    this.tbaleData = [data]
    this.directData(this.tbaleData)
  }

  handleCheckChange () {
    const tree = this.$refs.tree as any
    this.peopleList = tree.getCheckedNodes(true) || []
    this.peopleList = this.peopleList.filter((item:any) => {
      return !item.type
    })
    this.targetIds = this.peopleList.map((item: any) => {
      return item.id
    })
    this.num = this.targetIds.length || 0
  }

  handleClose (tag: any) {
    this.peopleList = this.peopleList.filter((item: any) => {
      return item.id !== tag.id
    })
    this.targetIds = this.targetIds.filter((item: any) => {
      return item !== tag.id
    })
    const tree = this.$refs.tree as any
    tree.setCheckedKeys(this.targetIds)
  }

  async getData1 () {
    try {
      [
        {
          data: { data: this.roleList }
        },
        {
          data: { data: this.organizationsList }
        }
      ] = await Promise.all([
        Api.mainData.getRoles(),
        Api.mainData.getOrganizationsList()
      ])
    } catch (err) {
      console.error(err)
    }
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
  min-height: 500px;
  justify-content: center;
  .main {
    width: 600px;
    margin-top: 20px;
    .left {
      width: 300px;
      height: 400px;
      min-height: 400px;
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
      height: 400px;
      min-height: 400px;
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
