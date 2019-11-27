<template>
  <div class="p-l-20 m-b-20"
       style="border-top: 1px solid rgba(1, 8, 19, 0.12);">
    <div v-for="(item, index) in objects"
         :key="item.id"
         class="m-t-30">
      <span>{{item.name}}<span class="title"
              @click="setUpField(item.id)">设置字段权限</span></span>
      <el-checkbox-group :key="item.id"
                         v-if="dataList[index]"
                         class="m-t-10"
                         v-model="dataList[index].buttonIds">
        <el-checkbox class="m-b-10"
                     v-for="(item0) in buttonList[index]"
                     :label="item0.id"
                     :key="item0.id">{{item0.name}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="button">
      <el-button @click="saveData"
                 type="primary">保存</el-button>
    </div>

    <el-dialog title="设置此对象字段权限"
               :visible.sync="dialogVisible"
               width="50%">
      <div class="subTitle"
           v-for="(item,index) in fieldList"
           :key="item.id">
        <el-row>
          <el-col :span="3"><span>{{item.name}}</span></el-col>
          <el-col :span="21">
            <el-radio v-model="fieldCheckGroup[index].authCode" label="ReadWrite">读写</el-radio>
            <el-radio v-model="fieldCheckGroup[index].authCode" label="Read">只读</el-radio>
            <el-radio v-model="fieldCheckGroup[index].authCode" label="Hide">不可见</el-radio>
          </el-col>
        </el-row>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="saveFieldData">确 定</el-button>
      </span>
    </el-dialog>
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
  dialogVisible: boolean = false
  buttonList: any = []
  dataList: any = []
  fieldList:any = []
  fieldCheckGroup:any = []
  get objects (): IObjectById {
    return this.$store.getters['backstage/customized/objects']
  }
  async created () {
    await this.getData()
    await this.createData()
  }
  mounted () {}
  handleClick (tab: any) {
    sessionStorage.setItem('activeName', tab.name)
  }
  get roleId () {
    return this.$route.params.id
  }
  async setUpField (objId:any) {
    const {
      data: { data }
    } = await Api.bizObjects.getFields(objId)
    this.fieldList = data
    this.fieldCheckGroup = []
    this.fieldList.forEach((item:any) => {
      this.fieldCheckGroup.push({ fieldId: item.id, bizObjectId: objId, authCode: 'ReadWrite' })
    })
    this.dialogVisible = true
  }
  async saveFieldData () {
    const data = await Api.mainData.updateRoleObejctField(this.roleId, this.fieldCheckGroup)
    if (data.data.success) {
      this.$message.success('保存成功')
      this.dialogVisible = false
    }
  }

  async getData () {
    await this.$store.dispatch('backstage/customized/getObjects')
    const arr = this.objects as any
    const newArr = arr.map((item: any) => {
      return Api.bizObjects.getOperators(item.id)
    })
    const newData = await Promise.all(newArr)
    this.buttonList = newData.map((item: any) => {
      return item.data.data
    })
    console.log(this.buttonList)
    // this.buttonList = data.data
  }
  async createData () {
    const arr = this.objects as any
    const {
      data: { data }
    } = await Api.mainData.getRoleObejctAuth(this.roleId)
    arr.forEach((item: any) => {
      this.dataList.push({ bizObjectId: item.id, buttonIds: [] })
    })
    this.dataList.forEach((item: any) => {
      data.forEach((item0: any) => {
        if (item.bizObjectId === item0.bizObjectId) {
          if (item0.buttons) {
            item0.buttons.forEach((item1: any) => {
              if (item.buttonIds.indexOf(item1.id) < 0) {
                item.buttonIds.push(item1.id)
              }
            })
          }
        }
      })
    })
  }
  async saveData () {
    const data = await Api.mainData.updateRoleObejctAuth(this.dataList, this.roleId)
    if (data.data.success) {
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
.subTitle {
  margin: 10px 0;
  span {
    display: inline-block;
    color: #666666;
  }
}
</style>
