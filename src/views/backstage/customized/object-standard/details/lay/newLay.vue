<template>
  <div>
    <el-card style="min-height:800px;">
      <div class="typeRecordAdd">
          <h3 style="margin:10px 0 25px">
            分配页面布局
          </h3>
          <div class="typeRecordAdd_main">
              <el-radio style="margin-bottom:8px" v-model="radio" label="1">从现有的布局复制</el-radio>
              <el-select style="margin-bottom:23px;width:360px;" v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-radio style="margin-bottom:40px" v-model="radio" label="2">不复制，直接新建</el-radio>
          </div>
      </div>
      <el-button type="primary">下一步</el-button>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'NewLay'
})
export default class NewLay extends Vue {
  private radio:any = '1'
  private options:any = [{
    value: '选项1',
    label: '黄金糕'
  }, {
    value: '选项2',
    label: '双皮奶'
  }, {
    value: '选项3',
    label: '蚵仔煎'
  }, {
    value: '选项4',
    label: '龙须面'
  }, {
    value: '选项5',
    label: '北京烤鸭'
  }]
  private value:any = ''
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
