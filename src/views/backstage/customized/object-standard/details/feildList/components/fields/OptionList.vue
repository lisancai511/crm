<template>
  <div class="singleLine">
      <el-form :label-position="position" label-width="80px" :model="data">
              <el-form-item label="标签">
                <el-input v-model="data.name"></el-input>
              </el-form-item>
              <el-form-item label="选项列表值">
                <el-input @change="changeStr" placeholder="在下面为选项列表字段输入一列值，每个值应单独占一行" type="textarea" :rows="4" v-model="data.valueCandidates"></el-input>
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
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IField } from '@/views/designer/config/components'

@Component({
  name: 'OptionList'
})
export default class OptionList extends Vue {
  @Prop({ required: true, type: Object }) readonly data!: IField
  @Prop({ default: 'right', type: String }) readonly position !: string
  changeStr () {
  }
  mounted () {
  }
}
</script>
<style lang="scss" scoped>

/deep/.el-form-item__label {
  width: 82px !important;
}
/deep/.el-form-item__content {
  margin-left: 82px !important;
}
</style>
