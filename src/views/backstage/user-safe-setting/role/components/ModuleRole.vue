<template>
  <div class="p-l-20 m-b-20"
       style="border-top: 1px solid rgba(1, 8, 19, 0.12);">
    <el-row>
      <div v-for="(item,index) in modules"
           :key="item.id"
           class="m-t-30">
        <el-col :span="9">
          <span class="m-b-10"
                style="display:block">{{item.name}}</span>
          <el-select :disabled="roleId==='-1'" v-if="data[index]"
                     v-model="data[index].visibility"
                     class="m-b-20"
                     style="width:60%"
                     placeholder="请选择">
            <el-option v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </div>
    </el-row>
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

  mounted () {}
  handleClick (tab: any) {
    sessionStorage.setItem('activeName', tab.name)
  }

  get roleId () {
    return this.$route.params.id
  }

  get modules () {
    return this.$store.state.backstage.customized.modules
  }

  async getData () {
    await this.$store.dispatch('backstage/customized/getModules')
    const res = await Api.mainData.getRoleModuleAuth(this.roleId)
    this.data = []
    this.modules.forEach((item: any) => {
      this.data.push({ menuId: item.id, visibility: null })
    })
    this.data.forEach((item:any) => {
      res.data.data.forEach((item0:any) => {
        if (item0.menuId === item.menuId) {
          item.visibility = item0.visibility
        }
      })
    })
  }

  async saveData () {
    const arr = this.data.filter((item:any) => {
      return item.visibility
    })
    const data = await Api.mainData.updateRoleModuleAuth(arr, this.roleId)
    if (data.data.success) {
      this.$message.success('保存成功')
      this.getData()
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
