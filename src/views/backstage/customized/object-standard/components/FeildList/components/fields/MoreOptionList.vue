<template>
  <div class="singleLine">
    <el-form
      ref="fieldAttrForm"
      :rules="rules"
      :label-position="position"
      label-width="120px"
      :model="data">
      <el-form-item prop="name" label="标签">
        <el-input v-model="data.name"></el-input>
      </el-form-item>
      <el-form-item prop="valueCandidates" label="选项列表值">
        <el-input placeholder="在下面为选项列表字段输入一列值，每个值应单独占一行" type="textarea" :rows="4"
                  v-model="data.valueCandidates"></el-input>
      </el-form-item>
      <el-form-item prop="apiName" label="API名称">
        <el-input :disabled="!!data.id"
                  v-model="data.apiName"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" :rows="6" v-model="data.remark"></el-input>
      </el-form-item>
      <el-form-item label="帮助文本">
        <el-input v-model="data.helpText"></el-input>
      </el-form-item>
      <el-form-item label="默认值">
        <el-input type="textarea" :rows="1" v-model="data.model"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IField } from '@/views/designer/config/components'

@Component({
  name: 'MoreOptionListField'
})
export default class MoreOptionListField extends Vue {
  @Prop({ required: true, type: Object }) readonly data!: IField
  @Prop({ default: 'right', type: String }) readonly position !: string
  private rules: any = {
    name: [
      { required: true }
    ],
    apiName: [
      { required: true }
    ],
    valueCandidates: [
      { required: true }
    ]
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-form-item__label {
  width: 92px !important;
}

/deep/ .el-form-item__content {
  margin-left: 92px !important;
}
</style>
