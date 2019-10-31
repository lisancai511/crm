<template>
  <div class="m-l-30 m-r-30 user" style="min-width:1200px">
      <el-row>
          <div style="float:left">
            <el-button @click="goToNewUser" type="primary">新建用户</el-button>
            <el-button type="success">导入用户</el-button>
          </div>
          <div style="float:right">
            <span class="m-r-20">用户列表</span>
            <el-select style="width:400px" @change="chooseActive" clearable v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.label"
                :label="item.label"
                :value="item.isActive">
              </el-option>
            </el-select>
          </div>
      </el-row>
      <el-row class="user_main" :gutter="30">
        <el-col class="m-t-20 user_main_col" v-for="item in tableData" :key="item.id" :span="4">
          <el-card :body-style="{padding:0}" class="user_main_col_card" style="min-height:300px">
            <div class="main">
              <el-avatar :size="60" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
              <h2>{{item.name}}</h2>
              <div class="m-b-10">{{item.roleName}}</div>
              <div class="m-b-10">{{item.email}}</div>
              <div class="m-b-10">{{item.mobile}}</div>
            </div>
            <div class="footer">
              <el-row style="width:100%; height:100%">
                <el-col @click.native="goToEdit(item)" class="footer_left dd-click" :span="8">编辑</el-col>
                <el-col @click.native="deleteUser(item)" class="footer_mid dd-click" :class="!item.deleted?'footer_mid dd-click':'footer_mid dd-click active'" :span="8">{{!item.deleted?'停用':'启用'}}</el-col>
                <el-col class="footer_right dd-click" :span="8">重置密码</el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Api from '@/api'

@Component({
  name: 'Standard'
})
export default class Standard extends Vue {
  private tableData: any = [
  ]
  private options: any = [
    {
      label: '激活',
      isActive: true
    },
    {
      label: '未激活',
      isActive: false
    }
  ]
  private value:any = ''

  created () {
    this.getData()
  }
  goToEdit (row:any) {
    this.$router.push({
      path: this.$route.path + `/${row.id}/edit`
    })
  }
  goToNewUser () {
    this.$router.push({
      path: this.$route.path + '/add'
    })
  }
  async deleteUser (item:any) {
    if (!item.deleted) {
      try {
        const data = await Api.mainData.deleteUser(item.id)
        if (data.status === 204) {
          this.$message.success('停用成功')
          this.getData(this.value)
        }
      } catch (err) {
        throw err
      }
    } else {
      try {
        const data = await Api.mainData.enableUser(item.id)
        if (data.data.success) {
          this.$message.success('启用成功')
          this.getData(this.value)
        }
      } catch (err) {
        throw err
      }
    }
  }
  async getData (isActive?:any) {
    try {
      const { data } = await Api.mainData.getUsersList(isActive)
      this.tableData = data.data
    } catch (err) {
      throw err
    }
  }
  chooseActive (val:any) {
    this.getData(val)
  }
}
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  height: 300px;
  display: flex;
  color:#8A96A0;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  h2 {
    color: #222D3E;
  }
  &_img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
}
.footer {
  width: 100%;
  height: 40px;
  border-top: 1px solid #F6F9FE;
  color:#8A96A0;
  &_left{
    height: 100%;
    text-align: center;
    line-height: 40px;
  }
  &_mid{
    height: 100%;
    text-align: center;
    line-height: 40px;
    border-left: 1px solid #F6F9FE;
    border-right: 1px solid #F6F9FE;
  }
  &_right{
    height: 100%;
    text-align: center;
    line-height: 40px;
  }
}
.active {
  color: $dd--primary-color;
}
</style>
