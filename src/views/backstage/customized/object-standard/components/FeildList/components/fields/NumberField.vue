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
      <el-form-item prop="attrs.integerDigit" label="整数位数">
        <el-input v-model.number="data.attrs.integerDigit"></el-input>
      </el-form-item>
      <el-form-item label="小数点位数">
        <el-input v-model.number="data.attrs.decimalDigit"></el-input>
      </el-form-item>
      <el-form-item prop="apiName" label="API名称">
        <el-input v-model="data.apiName"></el-input>
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
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import fieldAttrBasicMixins
  from '@/views/backstage/customized/object-standard/components/FeildList/components/fields/mixins/fieldAttrBasicMixins'

@Component({
  name: 'NumberField'
})
export default class NumberField extends mixins(fieldAttrBasicMixins) {
}
</script>
<style lang="scss" scoped>
/*/deep/ .el-form-item__label {
  width: 82px !important;
}

/deep/ .el-form-item__content {
  margin-left: 82px !important;
}*/
</style>
