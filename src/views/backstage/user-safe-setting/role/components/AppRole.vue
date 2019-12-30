<template>
  <div class="p-l-20 m-b-20"
       style="border-top: 1px solid rgba(1, 8, 19, 0.12);">
    <div class="m-t-20 title">自定义应用程序设置</div>
    <div v-for="(item,index) in apps"
         :key="item.id"
         class="m-t-30">
      <span class="m-r-20"
            style="display:inline-block">{{item.name}}</span>
      <el-checkbox :disabled="roleId==='-1'" @change="changeRadio($event, data[index])" v-if="data[index]"
                   v-model="data[index].isShow">可见</el-checkbox>
    </div>
    <div class="m-t-20 title">默认应用程序设置</div>
    <div class="m-t-30">
      <template v-for="(item, index) in apps">
        <el-radio :key="item.id+'_'"
                  v-model="radio"
                  v-if="data[index]"
                  :label="item.id"
                  :disabled="!data[index].isShow">{{item.name}}</el-radio>
      </template>
    </div>
    <div v-if="roleId!=='-1'" class="button">
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
  radio: any = null
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

  changeRadio (val:any, item:any) {
    console.log(item, this.radio)
    if (item.appId === this.radio) {
      this.radio = null
    }
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
    const res = await Api.mainData.getRoleAppAuth(this.roleId)
    this.data = []
    this.apps.forEach((item: any) => {
      this.data.push({ appId: item.id, asDefault: null, isShow: false })
    })
    this.data.forEach((item: any) => {
      res.data.data.forEach((item0: any) => {
        if (item0.asDefault) {
          this.radio = item0.appId
        }
        if (item0.appId === item.appId) {
          item.isShow = true
        }
      })
    })
    console.log(this.radio)
  }

  async saveData () {
    const filterData = this.data.filter((item: any) => {
      if (item.appId === this.radio) {
        item.asDefault = true
      } else {
        item.asDefault = null
      }
      return item.isShow
    })
    filterData.forEach((item: any) => {
      delete item.isShow
    })
    try {
      const data = await Api.mainData.updateRoleAppAuth(filterData, this.roleId)
      if (data.data.success) {
        this.$message.success('保存成功')
        this.getData()
      }
    } catch (e) {
      console.log(e)
    }
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
