<template>
  <div class="singleLine">
    <el-form
      ref="fieldAttrForm"
      :rules="rules"
      :label-position="position"
      label-width="120px"
      :model="data">
      <!--<el-form-item prop="name" label="字段名称">
        <el-input v-model="data.name"/>
      </el-form-item>-->
      <base-field-attrs v-bind="$props"/>
      <el-form-item prop="attrs.valueCandidates" label="选项列表值">
        <el-input @change="changeStr"
                  placeholder="在下面为选项列表字段输入一列值，每个值应单独占一行"
                  type="textarea" :rows="4"
                  v-model="data.attrs.valueCandidates"/>
      </el-form-item>
      <!--<el-form-item prop="apiName" label="API名称">
        <el-input :disabled="!!data.id"
                  v-model="data.apiName"/>
      </el-form-item>-->
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
  name: 'OptionListField',
  components: { BaseFieldAttrs }
})
export default class OptionListField extends mixins(fieldAttrBasicMixins) {
  changeStr () {
  }
}
</script>
<style lang="scss" scoped>

/*/deep/ .el-form-item__label {
  width: 92px !important;
}

/deep/ .el-form-item__content {
  margin-left: 92px !important;
}*/
</style>
