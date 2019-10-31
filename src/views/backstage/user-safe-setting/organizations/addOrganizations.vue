<template>
  <div>
    <el-card :body-style="{padding:0}" style="min-height: calc(100vh - 150px)">
      <h3 class="m-l-10">新建</h3>
      <el-form class="m-l-10 m-t-30" label-position="top" label-width="60px" :model="formLabelAlign">
        <!-- <el-row>
          <el-col :span="6" :rules="{required: true, message: '请选择角色'}">
            <el-form-item label="上级部门">
              <el-select style="width: 100%" v-model="formLabelAlign.copyFromRoleId" placeholder="请选择">
                <el-option
                  v-for="item in roleList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row> -->
        <el-row>
          <el-col :span="6">
            <el-form-item :rules="{required: true, message: '请输入用户姓名'}" label="部门名称">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="m-t-30 m-l-10">
        <el-button @click="saveData" type="primary">保存</el-button>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Api from '@/api'

@Component({
  name: 'Standard'
})
export default class Standard extends Vue {
  formLabelAlign: any = {
    type: 'Department',
    parentId: null,
    name: null
  }
  roleList: any = []

  get parentId () {
    return this.$route.params.id
  }

  async saveData () {
    this.formLabelAlign.parentId = this.parentId
    try {
      const { data } = await Api.mainData.addOrganization(this.formLabelAlign)
      console.log(data)
      if (data.success) {
        this.$router.go(-1)
      }
    } catch (err) {}
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-form-item__label {
  padding: 0 0 1px 0;
  line-height: 28px;
  font-weight: 550;
}
</style>
