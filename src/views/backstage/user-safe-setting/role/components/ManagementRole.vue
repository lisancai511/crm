<template>
  <div class="p-l-20 m-b-20"
       style="border-top: 1px solid rgba(1, 8, 19, 0.12);">
    <el-row>
      <el-col :span="12">
        <div class="m-t-20 m-b-20">
          <strong class="fs-18">请设置管理权限</strong>
        </div>
        <div>
          <el-checkbox :disabled="roleId==='-1'" class="m-t-20"
                       v-for="item in data.managerFuncs"
                       :key="item.code"
                       v-model="item.hasAuth">{{item.name}}</el-checkbox>
        </div>
      </el-col>
    </el-row>
    <el-row class="m-t-30">
      <el-col :span="12">
        <div class="m-t-20 m-b-20">
          <strong class="fs-18">请设置一般用户权限</strong>
        </div>
        <div>
          <el-checkbox :disabled="roleId==='-1'" class="m-t-20"
                       v-for="item in data.commonUserFuncs"
                       :key="item.code"
                       v-model="item.hasAuth">{{item.name}}</el-checkbox>
        </div>
      </el-col>
    </el-row>
    <div v-if="roleId!=='-1'" class="m-t-30">
      <el-button @click="saveData"
                 type="primary">保存</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Api from '@/api'

@Component({
  name: 'MangementRole'
})
export default class StandardDetails extends Vue {
  data:any = {
  }

  created () {
    this.getData()
  }

  async saveData () {
    await Api.mainData.updateRoleManageAuth(
      this.roleId,
      this.data
    )
    this.$message.success('保存成功')
  }

  get roleId () {
    return this.$route.params.id
  }

  async getData () {
    const data = await Api.mainData.getRoleManageAuth(this.roleId)
    this.data = data.data.data
  }
}
</script>
<style lang="scss" scoped>
.title {
  font-size: 15px;
  font-weight: bold;
}
</style>
