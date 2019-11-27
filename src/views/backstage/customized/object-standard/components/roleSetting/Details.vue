<template>
  <div class="m-t-30 m-l-20">
    <h3 v-if="objectDetails.name">{{objectDetails.name}}</h3>
    <div>
      <el-checkbox v-for="item in buttonList"
                   :key="item.id">{{item.name}}</el-checkbox>
    </div>
    <div class="m-t-30">
      <h3>记录类型</h3>
    </div>
    <div class="m-t-30">
      <h3>字段权限</h3>
      <div class="subTitle"
           v-for="(item,index) in fieldList"
           :key="item.id">
        <el-row>
          <el-col :span="3"><span>{{item.name}}</span></el-col>
          <el-col :span="8">
            <el-radio v-model="fieldCheckGroup[index].authCode" label="ReadWrite">读写</el-radio>
            <el-radio v-model="fieldCheckGroup[index].authCode" label="Read">只读</el-radio>
            <el-radio v-model="fieldCheckGroup[index].authCode" label="Hide">不可见</el-radio>
          </el-col>
        </el-row>
      </div>
    </div>
    <div>
      <el-button @click="saveData">保存</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Api from '@/api'
@Component({
  name: 'Details'
})
export default class NewField extends Vue {
  objectDetails: any = {}
  buttonList: any = []
  typeList: any = []
  roleRecordTypeAuths: any = []
  fieldList: any = []
  fieldCheckGroup:any = []
  @Prop() roleId: any
  async created () {
    const data = await Api.mainData.getRoleObejctAuth(this.roleId, this.objectId)
    console.log(data, 123)
    await this.getData()
  }
  get objectId () {
    return this.$route.params.objectId
  }
  async saveData () {
    await Api.mainData.updateRoleObejctField(this.roleId, this.fieldCheckGroup)
    console.log(this.fieldCheckGroup)
  }
  async getData () {
    const arr = [
      Api.bizObjects.getObjectById(this.objectId),
      Api.bizObjects.getOperators(this.objectId),
      Api.bizObjects.getAllRecordTypes(this.objectId),
      // Api.mainData.getRoleRecordTypeAuths(this.roleId),
      Api.bizObjects.getFields(this.objectId)
    ]
    try {
      ;[
        {
          data: { data: this.objectDetails }
        },
        {
          data: { data: this.buttonList }
        },
        {
          data: { data: this.typeList }
        },
        // {
        //   data: { data: this.roleRecordTypeAuths }
        // },
        {
          data: { data: this.fieldList }
        }
      ] = await Promise.all(arr)
    } catch (e) {
      throw e
    }
    this.fieldList.forEach((item:any) => {
      this.fieldCheckGroup.push({ fieldId: item.id, bizObjectId: this.objectId, authCode: 'ReadWrite' })
    })
    const data = await Api.mainData.getRoleObejctField(this.roleId, this.objectId)
    console.log(data, 90)
  }
}
</script>
<style lang="scss" scoped>
.subTitle {
  margin: 10px 0;
  span {
    display: inline-block;
    color: #666666;
  }
}
</style>
