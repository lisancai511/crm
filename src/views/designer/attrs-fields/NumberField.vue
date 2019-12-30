<template>
  <div class="singleLine">
    <el-form
      ref="fieldAttrForm"
      :rules="rules"
      :label-position="position"
      label-width="120px"
      :model="data">
      <base-field-attrs v-bind="$props"/>
      <el-form-item prop="attrs.integerDigit" label="整数位数">
        <el-input v-model.number="data.attrs.integerDigit"/>
      </el-form-item>
      <el-form-item prop="attrs.decimalDigit" label="小数点位数">
        <el-input v-model.number="data.attrs.decimalDigit"/>
      </el-form-item>
      <el-form-item prop="attrs.unit" label="单位">
        <el-input v-model.number="data.attrs.unit"/>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" :rows="6" v-model="data.remark"/>
      </el-form-item>
      <el-form-item label="提示文字">
        <el-input v-model="data.helpText"/>
      </el-form-item>
      <el-form-item label="默认值">
        <el-input type="textarea" v-model="data.model"/>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import fieldAttrBasicMixins
  from '@/views/designer/attrs-fields/mixins/fieldAttrBasicMixins'
import BaseFieldAttrs
  from '@/views/designer/attrs-fields/BaseFieldAttrs.vue'

@Component({
  name: 'NumberField',
  components: { BaseFieldAttrs }
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
