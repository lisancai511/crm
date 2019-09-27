<template>
  <div>
    <el-card>
      <div class="typeRecordAdd">
          <div @click="$router.go(-1)" class="close"><dd-icon name="close"/></div>
          <h3 style="margin:10px 0 25px">
            新建记录类型
          </h3>
          <el-form label-position="top" label-width="100px" :model="formLabelAlign">
            <el-form-item label="记录类型标签">
              <el-input style="width:500px" v-model="formLabelAlign.name" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="formLabelAlign.enable">启用</el-checkbox>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" style="width:1000px" v-model="formLabelAlign.description" :rows="6"></el-input>
            </el-form-item>
          </el-form>
          <h3 style="margin:30px 0 17px">设置可以使用的角色及页面布局</h3>
          <el-table
            :data="tableData"
            border
            style="width: 517px; margin: 16px 0 54px;">
            <el-table-column
              prop="date"
              label="角色"
              width="151px">
            </el-table-column>
            <el-table-column
              prop="name"
              label="启用"
              width="68px">
            </el-table-column>
            <el-table-column
              prop="address"
              label="默认设置"
              width="110px">
            </el-table-column>
            <el-table-column
              prop="address"
              label="请选择要使用的布局">
            </el-table-column>
          </el-table>
          <el-button @click="submit" style="width:68px;" type="primary">保存</el-button>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import Api from '@/api'
@Component({
  name: 'FiledList',
  computed: {
    ...mapState('daoda/test', ['active'])
  }
})
export default class FiledList extends Vue {
  private tableData:any = []
  private input:string = ''
  private formLabelAlign:any = {}
  created () {
    this.formLabelAlign = JSON.parse(this.$route.query.id as string)
    console.log(this.formLabelAlign, 8898)
  }
  async submit () {
    try {
      await Api.bizObjects.addRecordTypes(this.formLabelAlign, this.$route.query.id)
      this.$message.success('添加成功')
      this.$router.go(-1)
    } catch (err) {
      this.$message.error('添加失败')
    }
  }
}
</script>
<style lang="scss" scoped>
.dd-title {
  font-size:14px;
  font-family:'PingFangSC';
  font-weight:400;
  color:rgba(34,45,62,1);
  line-height:20px;
  margin:0 0 8px;
}
.typeRecordAdd {
  position: relative;
  display: flex;
  flex-direction: column;
}
.close {
  position: absolute;
  right: 0px;
  cursor: pointer;
}
</style>
