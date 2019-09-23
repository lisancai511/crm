<template>
  <div>
    <el-card :body-style="{padding:0, minHeight: '770px'}">
      <h3 style="margin:30px 0 30px 20px">新建字段依赖</h3>
      <el-form style="margin-left:20px;" label-position="top" label-width="200px">
        <el-form-item label="控制字段">
          <el-select v-model="value" filterable placeholder="请选择">
            <el-option
              v-for="item in data[0]"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="依赖字段">
          <el-select v-model="value" filterable placeholder="请选择">
            <el-option
              v-for="item in data[0]"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-button @click="$router.go(-1)" type="primary" style="margin-top:20px">下一步</el-button>
      </el-form>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'NewField'
})

export default class NewField extends Vue {
  private data:any = [
    [{
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
  ]
  private value:any = ''
}
</script>
<style lang="scss" scoped>
.tabs {
  margin-top: 20px;
  border-top: 1px solid #F1F2F6;
}
.el-select {
  width: 400px;
}
</style>
