<template>
  <div class="p-l-20 m-b-20"
       style="border-top: 1px solid rgba(1, 8, 19, 0.12);">
       <div class="m-t-20 title">自定义应用程序设置</div>
    <div v-for="(item,index) in apps"
         :key="item.id"
         class="m-t-30">
      <span class="m-r-20"
            style="display:inline-block">{{item.name}}</span>
      <el-checkbox v-if="data[index]" v-model="data[index].asDefault">可见</el-checkbox>
    </div>
    <div class="button">
      <el-button @click="saveData"
                 type="primary">保存</el-button>
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
  buttonList: any = []
  data: any = []
  options: any = [
    { label: '全部可见', value: 'AllVisible' },
    { label: '全部隐藏', value: 'AllHidden' },
    { label: 'PC端可见', value: 'PCVisible' },
    { label: '移动端可见', value: 'MobileVisible' }
  ]
  async created () {
    await this.getData()
  }
  mounted () {}
  handleClick (tab: any) {
    sessionStorage.setItem('activeName', tab.name)
  }
  get roleId () {
    return this.$route.params.id
  }

  get apps () {
    return this.$store.state.backstage.customized.apps
  }

  async getData () {
    await this.$store.dispatch('backstage/customized/getApps')
    const data = Api.mainData.getRoleAppAuth(this.roleId)
    console.log(data)
    this.apps.forEach((item:any) => {
      this.data.push({ appId: item.id })
    })
  }

  async saveData () {
    const data = await Api.mainData.updateRoleAppAuth(this.data, this.roleId)
    console.log(data)
  }
}
</script>
<style lang="scss" scoped>
.button {
  margin-top: 60px;
}
.title {
  font-size: 15px;
  font-weight: bold;
}
</style>
