<template>
  <div class="p-l-20 m-b-20"
       style="border-top: 1px solid rgba(1, 8, 19, 0.12);">
    <div v-for="(item, index) in objects"
         :key="item.id"
         class="m-t-30">
      <div v-if="recordTypesList[index] && recordTypesList[index].length>0">
        <span>{{item.name}}</span>
        <div class="m-t-10">
          <el-checkbox-group v-if="data[index]"
                             v-model="data[index].recordTypes">
            <el-checkbox class="m-b-10" v-for="item0 in recordTypesList[index]"
                         :label="item0.id"
                         :key="item0.id">{{item0.name}}</el-checkbox>
          </el-checkbox-group>

        </div>
      </div>
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
  recordTypesList: any = []
  data: any = []
  get objects (): IObjectById {
    return this.$store.getters['backstage/customized/objects']
  }
  async created () {
    await this.getData()
    await this.createData()
  }
  handleClick (tab: any) {
    sessionStorage.setItem('activeName', tab.name)
  }
  get roleId () {
    return this.$route.params.id
  }
  async getData () {
    this.$store.dispatch('backstage/customized/getObjects')
    const arr = this.objects as any
    const idArr = arr.map((item: any) => {
      return item.id
    })
    const newArr = idArr.map((item: any) => {
      return Api.bizObjects.getAllRecordTypes(item)
    })
    const newdata = await Promise.all(newArr)
    this.recordTypesList = newdata.map((item: any) => {
      return item.data.data
    })
    console.log(this.recordTypesList)
  }
  createData () {
    const arr = this.objects as any
    arr.forEach((item: any, index: any) => {
      this.data.push({})
      this.$set(this.data[index], 'bizObjectId', item.id)
      this.$set(this.data[index], 'recordTypes', [])
    })
    this.recordTypesList.forEach((item: any, index: any) => {
      this.data[index].recordTypes = []
    })
  }
  async saveData () {
    this.data.forEach((item: any) => {
      item.recordTypes.forEach((item0: any, index: any) => {
        item.recordTypes[index] = {
          layoutId: item0
        }
      })
    })
    const data = await Api.mainData.updateRoleObejctRecordTypesAuth(
      this.data,
      this.roleId
    )
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
  margin-left: 10px;
}
</style>
