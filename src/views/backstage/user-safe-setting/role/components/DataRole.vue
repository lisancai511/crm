<template>
  <div class="p-l-20 m-b-20" style="border-top: 1px solid rgba(1, 8, 19, 0.12);">
    <div v-for="item in objects" :key="item.id" class="m-t-30 top_title">
       <span>{{item.name}}<span class="title">设置字段权限</span></span>

       <div class="m-t-10 checkBox">
         <el-checkbox>本人</el-checkbox>
         <el-checkbox>本人及下属</el-checkbox>
         <el-checkbox>本部门</el-checkbox>
         <el-checkbox>本部门及下属部门</el-checkbox>
         <el-checkbox>全部数据</el-checkbox>
       </div>
    </div>
    <div class="button">
      <el-button type="primary">保存</el-button>
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

  async getData () {
    await this.$store.dispatch('backstage/customized/getObjects')
    const { data } = await Api.bizObjects.getOperators('1')
    console.log(data)
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
