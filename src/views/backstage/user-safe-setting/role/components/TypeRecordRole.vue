<template>
  <div class="p-l-20 m-b-20"
       style="border-top: 1px solid rgba(1, 8, 19, 0.12);">
    <div v-for="(item, index) in objects"
         :key="item.id"
         class="m-t-30">
      <div v-if="recordTypesList[index]">
        <span v-show="recordTypesList[index].length>0">{{item.name}}</span>
        <div class="m-t-10">
          <el-checkbox-group :disabled="roleId==='-1'" v-if="data[index]"
                             v-model="data[index].recordTypes">
            <el-checkbox class="m-b-10"
                         v-for="item0 in recordTypesList[index]"
                         :label="item0.id"
                         :key="item0.id">{{item0.name}}</el-checkbox>
          </el-checkbox-group>

        </div>
      </div>
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
import lodash from 'lodash'

interface IObjectById {
  [propName: string]: IServerObject
}

@Component({
  name: 'StandardDetails'
})
export default class StandardDetails extends Vue {
  recordTypesList: any = []
  data: any = []
  authData:any = []
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
  }

  async createData () {
    const arr = this.objects as any
    const res = await Api.mainData.getRoleRecordTypeAuths(this.roleId)
    this.data = []
    arr.forEach((item: any) => {
      this.data.push({ bizObjectId: item.id, recordTypes: [] })
    })
    this.recordTypesList.forEach((item: any, index: any) => {
      this.data[index].recordTypes = []
    })
    this.authData = lodash.cloneDeep(res.data.data)
    res.data.data.forEach((item: any) => {
      this.data.forEach((item0: any) => {
        if (item0.bizObjectId === item.bizObjectId) {
          if (item.recordTypes) {
            item0.recordTypes = item.recordTypes.map((item1: any) => {
              return item1.id
            })
          }
        }
      })
    })
  }

  async saveData () {
    console.log(this.authData, 9090, this.data)
    this.data.forEach((item: any, index:any) => {
      item.recordTypes.forEach((item0: any, index0: any) => {
        item.recordTypes[index0] = {
          id: item0
        }
        if (this.authData[index].recordTypes && this.authData[index].recordTypes[index0] && this.authData[index].recordTypes[index0].layoutId) {
          item.recordTypes[index0].layoutId = this.authData[index].recordTypes[index0].layoutId
        }
      })
    })
    const data = await Api.mainData.updateRoleObejctRecordTypesAuth(
      this.data,
      this.roleId
    )
    if (data.data.success) {
      this.createData()
      this.$message.success('保存成功')
    }
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
