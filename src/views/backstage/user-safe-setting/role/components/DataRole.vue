<template>
  <div class="p-l-20 m-b-20" style="border-top: 1px solid rgba(1, 8, 19, 0.12);">
    <div v-for="(item,index) in objects" :key="item.id" class="m-t-30 top_title">
      <span>{{item.name}}</span>
       <div v-if="data[index]" class="m-t-10 checkBox">
         <el-radio :disabled="roleId==='-1'" v-model="data[index].dataScopeAuthCode" label="Person">本人</el-radio>
         <el-radio :disabled="roleId==='-1'" v-model="data[index].dataScopeAuthCode" label="PersonAndSubPerson">本人及下属</el-radio>
         <el-radio :disabled="roleId==='-1'" v-model="data[index].dataScopeAuthCode" label="Dept">本部门</el-radio>
         <el-radio :disabled="roleId==='-1'" v-model="data[index].dataScopeAuthCode" label="DeptAndSubDepts">本部门及下属部门</el-radio>
         <el-radio :disabled="roleId==='-1'" v-model="data[index].dataScopeAuthCode" label="Company">全部数据</el-radio>
       </div>
    </div>
    <div v-if="roleId!=='-1'" class="button">
      <el-button @click="saveData" type="primary">保存</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IServerObject } from '@/store/modules/backstage/modules/customized'
import Api from '@/api'

interface IObjectById {
  [propName: string]: IServerObject
}

@Component({
  name: 'StandardDetails'
})
export default class StandardDetails extends Vue {
  data: any = []
  get objects (): IObjectById {
    return this.$store.getters['backstage/customized/objects']
  }

  created () {
    this.getData()
  }

  handleClick (tab: any) {
    sessionStorage.setItem('activeName', tab.name)
  }

  get roleId () {
    return this.$route.params.id
  }

  async saveData () {
    const arr = this.data.filter((item:any) => {
      return item.dataScopeAuthCode
    })
    const data = await Api.mainData.updateObjDataScopAuths(this.roleId, arr)
    if (data.data.success) {
      this.$message.success('保存成功')
    }
  }

  async getData () {
    await this.$store.dispatch('backstage/customized/getObjects')
    const arr = this.objects as any
    this.data = []
    arr.forEach((item: any) => {
      this.data.push({ bizObjectId: item.id, dataScopeAuthCode: null })
    })
    const res = await Api.mainData.getObjDataScopAuths(this.roleId)
    this.data.forEach((item:any) => {
      res.data.data.forEach((item0:any) => {
        if (item0.bizObjectId === item.bizObjectId) {
          item.dataScopeAuthCode = item0.dataScopeAuthCode
        }
      })
    })
  }
}
</script>
<style lang="scss" scoped>
.button {
  margin-top: 60px;
}
.title {
  cursor: pointer;
  color: rgba(58, 133, 255, 1);
  font-size: 12px;
  margin-left:10px;
}
.top_title {
  color:#222D3E;
}
/deep/.el-checkbox {
  color:rgba(102,102,102,1);
}
</style>
