<template>
  <div class="invitation__wrap">
    <div class="invitation">
      <div v-if="showMain">
        <el-card :body-style="{padding:'10px 10px 40px 10px'}">
          <div class="title">
            <div>
              <span class="title_name">{{user}}<span>邀请您加入企业</span></span>
            </div>

            <span class="title_company">{{company}}</span>
          </div>
          <div>
            <input v-model="formData.name"
                   placeholder="请输入真实姓名"
                   class="input" />
            <input v-model="formData.account"
                   placeholder="请输入手机号"
                   class="input" />
            <div class="mainCode">
              <input placeholder="验证码"
                     class="code" />
              <span class="vcode">发送验证码</span>
            </div>
          </div>
        </el-card>
        <div class="footer">
          <el-button style="width:70%"
                     @click="saveData"
                     size="small"
                     type="primary"
                     round>立即加入
          </el-button>
        </div>
      </div>
      <div v-else>
        链接失效了，啦啦啦啦
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Api from '@/api'

@Component({
  name: 'Login'
})
export default class Login extends Vue {
  user: string = '张杉'
  formData: any = {
    type: 'Cellphone',
    account: '',
    name: '',
    expireTime: new Date()
  }

  company: string = '白洋淀科技'
  showMain: boolean = false
  minWidth: string = '1200px'

  created () {
    document.body.style.minWidth = '0px'
    this.getData()
  }

  beforeDestroy () {
    document.body.style.minWidth = this.minWidth
  }

  get linkId () {
    return this.$route.query.id
    // return '6605398141191720961'
  }

  async sureLinkIsExpired () {
    const res = await Api.jiliOa.linkIsTimeout(this.linkId)
    if (res.data.success === true) {
      this.showMain = true
      const data = await Api.jiliOa.getInfo(this.linkId)
      this.user = data.data.data.inviterName
    }
  }

  async saveData () {
    if (!this.formData.name) {
      this.$message.error('请输入姓名')
      return
    }
    if (!this.formData.account) {
      this.$message.error('请输入手机号')
      return
    }
    const data = await Api.jiliOa.joinCompany(this.formData)
    if (data.data.success) {
      this.$message.success('加入成功')
    }
  }

  getData () {
    this.sureLinkIsExpired()
  }
}
</script>
<style lang="scss" scoped>
.invitation {
  padding: 15px 15px;

  .title {
    display: flex;
    justify-content: center;
    flex-direction: column;

    &_company {
      text-align: center;
      margin: 20px;
      font-size: 20px;
    }

    &_name {
      span {
        margin-left: 10px;
        color: #666;
        font-size: 12px;
      }
    }
  }
}

/deep/ .el-form-item__label {
  padding: 0 !important;
}

/deep/ .input {
  border: none;
  border-bottom: 1px solid #ccc;
  margin-left: 10px;
  margin-top: 15px;
  width: 90%;
  outline: medium;
}

/deep/ .el-form-item {
  margin: 0px;
}

.code {
  border: none;
  border-bottom: 1px solid #ccc;
  width: 60%;
  outline: medium;
  margin-left: 10px;
  margin-top: 10px;
}

.vcode {
  margin-left: 5%;
  color: #778bff;
  padding-top: 5px;
}

.mainCode {
  display: flex;
  text-align: center;
  line-height: 1;
}

.footer {
  margin-top: 20px;
  width: 100%;
  text-align: center;
}
</style>
