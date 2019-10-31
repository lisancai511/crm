<template>
  <div class="p-l-20 m-b-20" style="border-top: 1px solid rgba(1, 8, 19, 0.12);">
    <div v-for="(item, index) in objects" :key="item.id" class="m-t-30">
       <span>{{item.name}}</span>
       <div class="m-t-10">
         <el-checkbox v-for="item0 in recordTypesList[index]" :key="item0.id">{{item0.name}}</el-checkbox>
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
  recordTypesList:any = []
  get objects (): IObjectById {
    return this.$store.getters['backstage/customized/objects']
  }
  created () {
    this.getData()
  }
  handleClick (tab: any) {
    sessionStorage.setItem('activeName', tab.name)
  }
  async getData () {
    this.$store.dispatch('backstage/customized/getObjects')
    const arr = this.objects as any
    const idArr = arr.map((item:any) => {
      return item.id
    })
    const newArr = idArr.map((item:any) => {
      return Api.bizObjects.getAllRecordTypes(item)
    })
    const newdata = await Promise.all(newArr)
    this.recordTypesList = newdata.map((item:any) => {
      return item.data.data
    })
    const { data } = await Api.mainData.getRoleRecordTypeAuths(this.$route.params.id)
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
</style>
