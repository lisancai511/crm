<template>
  <div>
    <el-card style="min-height:800px;">
      <div class="typeRecordAdd">
          <h3 style="margin:10px 0 25px">
            分配页面布局
          </h3>
          <div class="typeRecordAdd_main">
              <el-radio style="margin-bottom:8px" v-model="radio" label="1">从现有的布局复制</el-radio>
              <el-select style="margin-bottom:23px;width:360px;" v-model="saveData.copyFrom" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-radio style="margin-bottom:40px" v-model="radio" label="2">不复制，直接新建</el-radio>
          </div>
      </div>
      <el-button @click="nextStep" type="primary">下一步</el-button>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Api from '@/api'
@Component({
  name: 'NewLay'
})
export default class NewLay extends Vue {
  private radio:any = '1'
  private options:any = []
  private saveData:any = {
    name: '张三',
    description: '张三啊'
  }
  private value:any = ''
  created () {
    this.getData()
  }
  async getData () {
    const { data } = await Api.bizObjects.getLayouts(this.$route.query.id)
    this.options = data
  }
  async nextStep () {
    await Api.bizObjects.addLayots(this.$route.query.id, this.saveData)
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
  display: flex;
  flex-direction: column;
  &_main {
    display: flex;
    flex-direction: column;
  }
}
</style>
