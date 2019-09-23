<template>
  <div class="singleLine">
    <div>
      <el-form :label-position="position" label-width="80px" :model="data">
          <el-form-item label="标签">
            <el-input v-model="data.name"></el-input>
          </el-form-item>
          <el-form-item label="API名称">
            <el-input v-model="data.type"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" :rows="6" v-model="data.type"></el-input>
          </el-form-item>
          <el-form-item label="帮助文本">
            <el-input v-model="data.type"></el-input>
          </el-form-item>
          <el-form-item label="默认值">
            <el-input type="textarea" :rows="1" v-model="data.type"></el-input>
          </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'LangText'
})
export default class LangText extends Vue {
  @Prop() data:any
  @Prop() position:any
}
</script>
