<template>
  <div class="m-t-30 m-l-20">
    <h3 v-if="objectDetails.name">{{objectDetails.name}}
      <el-checkbox :indeterminate="isIndeterminate"
                   v-model="checkAll"
                   @change="handleCheckAllChange">全选
      </el-checkbox>
    </h3>
    <div>
      <el-checkbox-group @change="handleCheckedCitiesChange" v-model="buttonAuth">
        <el-checkbox v-for="item in buttonList"
                     :label="item.id"
                     :key="item.id">{{item.name}}
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="m-t-30">
      <h3>记录类型</h3>
      <div>
        <el-checkbox-group v-model="typeAuths">
          <el-checkbox v-for="item in typeList"
                       :label="item.id"
                       :key="item.id">{{item.name}}
          </el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="m-t-30">
      <h3>字段权限</h3>
      <div class="subTitle"
           v-for="(item,index) in fieldList"
           :key="item.id">
        <el-row v-if="fieldCheckGroup[index]">
          <el-col :span="3"><span>{{item.name}}</span></el-col>
          <el-col :span="8">
            <el-radio v-model="fieldCheckGroup[index].authCode"
                      label="ReadWrite">读写
            </el-radio>
            <el-radio v-model="fieldCheckGroup[index].authCode"
                      label="Read">只读
            </el-radio>
            <el-radio v-model="fieldCheckGroup[index].authCode"
                      label="Hide">不可见
            </el-radio>
          </el-col>
        </el-row>
      </div>
    </div>
    <div>
      <el-button class="m-t-30"
                 type="primary"
                 @click="saveData">确定
      </el-button>
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
  checkAll: any = false
  isIndeterminate: any = false
  allButonAuth: any = []
  objectDetails: any = {}
  buttonList: any = []
  buttonAuth: any = []
  typeList: any = []
  roleRecordTypeAuths: any = []
  typeAuths: any = []
  fieldList: any = []
  fieldCheckGroup: any = []
  @Prop() roleId: any

  async created () {
    await this.getData()
  }

  get objectId () {
    return this.$route.params.objectId
  }

  handleCheckAllChange (val: any) {
    this.buttonAuth = val ? this.allButonAuth : []
    this.isIndeterminate = false
  }

  handleCheckedCitiesChange (value: any) {
    const checkedCount = value.length
    this.checkAll = checkedCount === this.allButonAuth.length
    this.isIndeterminate = checkedCount > 0 && checkedCount < this.allButonAuth.length
  }

  async saveData () {
    const recordTypes = this.typeAuths.map((item: any) => {
      return { id: item }
    })
    const RecordAuth = [
      {
        bizObjectId: this.objectId,
        recordTypes
      }
    ]
    const data = [
      {
        bizObjectId: this.objectId,
        buttonIds: this.buttonAuth
      }
    ]
    const res = await Api.mainData.updateRoleObjectAuth(data, this.roleId)
    const res1 = await Api.mainData.updateRoleObjectField(
      this.roleId,
      this.fieldCheckGroup
    )
    const res2 = await Api.mainData.updateRoleObejctRecordTypesAuth(
      RecordAuth,
      this.roleId
    )
    if (res.data.success && res1.data.success && res2.data.success) {
      this.$message.success('保存成功')
      this.getData()
    }
  }

  async getData () {
    const arr = [
      Api.bizObjects.getObjectById(this.objectId),
      Api.bizObjects.getOperators(this.objectId),
      Api.bizObjects.getAllRecordTypes(this.objectId),
      Api.mainData.getRoleRecordTypeAuths(this.roleId),
      Api.bizObjects.getFields({ objectId: this.objectId })
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
        {
          data: { data: this.roleRecordTypeAuths }
        },
        {
          data: { data: this.fieldList }
        }
      ] = await Promise.all(arr)
    } catch (e) {
      console.error(e)
    }
    this.allButonAuth = this.buttonList.map((item: any) => {
      return item.id
    })
    const objAuth = await Api.mainData.getRoleObejctAuth(
      this.roleId,
      this.objectId
    )
    if (objAuth.data.data[0] && objAuth.data.data[0].buttons) {
      this.buttonAuth = objAuth.data.data[0].buttons.map((item: any) => {
        return item.id
      })
    }
    if (
      this.roleRecordTypeAuths[0] &&
      this.roleRecordTypeAuths[0].recordTypes
    ) {
      this.typeAuths = this.roleRecordTypeAuths[0].recordTypes.map(
        (item: any) => {
          return item.id
        }
      )
    }
    this.fieldCheckGroup = []
    this.fieldList.forEach((item: any) => {
      this.fieldCheckGroup.push({
        fieldId: item.id,
        bizObjectId: this.objectId,
        authCode: null
      })
    })
    const res = await Api.mainData.getRoleObjectField(
      this.roleId,
      this.objectId
    )
    res.data.data.forEach((item: any) => {
      this.fieldCheckGroup.forEach((item0: any) => {
        if (item.field.id === item0.fieldId) {
          if (item) {
            item0.authCode = item.authCode
            item0.id = item.field.id
          }
        }
      })
    })
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
