<template>
  <div class="ScopeOfApplication">
    <el-card class="main">
      <el-button type="primary"
                 size="small"
                 @click="dialogVisible=true">选择适用范围</el-button>
      <div class="title m-t-20">
        <el-tag v-if="isAll">全公司</el-tag>
        <el-tag class="m-r-10 m-b-10"
                v-for="item in dataSecond.applyTargets.orgIdList"
                :key="item"><dd-icon class="m-r-5 fs-14" name="home"></dd-icon>{{filterOrg(item)}}</el-tag>
        <el-tag class="m-r-10 m-b-10"
                v-for="item in dataSecond.applyTargets.roleIdList"
                :key="item"><dd-icon name="home"></dd-icon>{{item}}</el-tag>
        <el-tag class="m-r-10 m-b-10"
                v-for="item in dataSecond.applyTargets.peopleIdList"
                :key="item"><dd-icon class="m-r-5 fs-14" name="man"></dd-icon>{{filterUser(item)}}</el-tag>
      </div>
    </el-card>

    <el-dialog width="600px"
               :visible.sync="dialogVisible">
      <ChoosePeople mode="orguser"
                    :orgIdList="dataSecond.applyTargets.orgIdList"
                    :peopleIdList="dataSecond.applyTargets.peopleIdList"
                    :roleIdList="dataSecond.applyTargets.roleIdList"
                    @cancel="cancel"
                    @chooseDone="chooseDone"></ChoosePeople>
    </el-dialog>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ChoosePeople from '@/components/UserSelect/index.vue'
import Api from '@/api'
import lodash from 'lodash'

@Component({
  name: 'ScopeOfApplication',
  components: {
    ChoosePeople
  }
})
export default class ScopeOfApplication extends Vue {
  @Prop() private data: any
  static title = '适用范围'
  dialogVisible: boolean = false
  peopleList: any = []
  orgList: any = []
  dataSecond:any = {
    applyTargets: {
      orgIdList: [],
      peopleIdList: [],
      roleIdList: []
    }
  }

  mounted () {
    this.dataSecond.applyTargets = Object.keys(this.data.applyTargets).length > 0 ? lodash.cloneDeep(this.data.applyTargets) : {
      orgIdList: [],
      peopleIdList: [],
      roleIdList: []
    }
    this.getData()
  }

  get isAll () {
    if (
      this.dataSecond.applyTargets.orgIdList && this.dataSecond.applyTargets.orgIdList.length === 0 &&
      this.dataSecond.applyTargets.peopleIdList && this.dataSecond.applyTargets.peopleIdList.length === 0 &&
      this.dataSecond.applyTargets.roleIdList && this.dataSecond.applyTargets.roleIdList.length === 0
    ) {
      return true
    } else {
      return false
    }
  }

  cancel () {
    this.dialogVisible = false
  }

  get tenantId () {
    return this.$store.state.user.tenantId
  }

  filterUser (id: any) {
    let str = ''
    this.peopleList.forEach((item: any) => {
      if (item.id === id) {
        str = item.name
      }
    })
    return str
  }

  filterOrg (id: any) {
    let str = ''
    this.orgList.forEach((item: any) => {
      if (item.id === id) {
        str = item.name
      }
    })
    return str
  }

  getList (data: any) {
    this.peopleList = [...this.peopleList, ...data.users]
    if (data.children) {
      this.orgList = [...this.orgList, ...data.children]
      data.children.forEach((item: any) => {
        if (item.children) {
          this.getList(item)
        }
      })
    }
  }

  async getData () {
    const {
      data: { data }
    } = await Api.mainData.getUsersFromOrg({ orgId: this.tenantId, all: true })
    this.getList(data)
  }

  chooseDone (val: any) {
    this.dataSecond.applyTargets.orgIdList = val.orgIdList
    this.dataSecond.applyTargets.peopleIdList = val.peopleIdList
    this.dataSecond.applyTargets.roleIdList = val.roleIdList
    this.$emit('choose', this.dataSecond)
    this.dialogVisible = false
  }
}
</script>

<style lang="scss" scoped>
.ScopeOfApplication {
  width: 100%;
  display: flex;
  justify-content: center;
  .main {
    width: 600px;
    min-height: 600px;
    margin-top: 20px;
    padding: 10px;
    padding-bottom: 60px;
    .title {
      border: 1px solid #D5D8DE;
      border-radius: 5px;
      min-height: 50px;
      padding: 10px;
    }
  }
}
/deep/.el-dialog__body {
  padding: 0 !important;
}
/deep/.el-dialog__header {
  padding: 0;
}
</style>
