<template>
  <div>
    <el-card class="card p-l-10">
      <div>
        <h3>{{!roleId? '新建角色':'修改角色'}}</h3>
        <el-form label-position="top"
                 :model="saveData"
                 ref="saveData"
                 label-width="100px"
                 class="demo-ruleForm">
          <el-row v-if="!roleId">
            <el-col class="m-t-10"
                    :span="6">
              <el-checkbox class="m-b-10"
                           v-model="checkbox">复制</el-checkbox>
              <el-select :disabled="!checkbox"
                         style="width: 100%"
                         v-model="saveData.copyFromRoleId"
                         placeholder="请选择">
                <el-option v-for="item in roleList"
                           :key="item.id"
                           :label="item.name"
                           :value="item.id">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="m-t-20"
                    :span="6">
              <el-form-item label="角色名称"
                            :rules="[
                          { required: true, message: '请填写角色名'}
                        ]">
                <el-input v-model="saveData.name"
                          autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="m-t-20"
                    :span="16">
              <el-form-item label="备注">
                <el-input type="textarea"
                          v-model="saveData.description"
                          :rows="6"
                          autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-button @click="nextStep"
                   type="primary"
                   class="m-t-30">下一步</el-button>
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
  saveData: any = {}
  roleList: any = []
  checkbox: boolean = false

  created () {
    if (this.roleId) {
      this.getData()
    }
    this.getRolesData()
  }

  get roleId () {
    return this.$route.params.id
  }

  async getRolesData () {
    try {
      const {
        data: { data }
      } = await Api.mainData.getRoles()
      this.roleList = data
    } catch (err) {
      throw err
    }
  }

  async getData () {
    try {
      const {
        data: { data }
      } = await Api.mainData.getRole(this.roleId)
      this.saveData = data
    } catch (err) {
      throw err
    }
  }

  async nextStep () {
    if (!this.roleId) {
      try {
        const {
          data: { data }
        } = await Api.mainData.addRole(this.saveData)
        this.$router.push({
          path: `/backstage/user-setting/role/${data.id}/editAuths`
        })
      } catch (err) {
        throw err
      }
    } else {
      try {
        const { data } = await Api.mainData.updateRole(this.saveData)
        console.log(data)
        this.$router.push({
          path: `/backstage/user-setting/role/${this.roleId}/editAuths`
        })
      } catch (err) {
        throw err
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.card {
  min-height: calc(100vh - 150px);
}
/deep/ .el-form-item__label {
  line-height: 24px;
  padding-bottom: 5px;
}
</style>
