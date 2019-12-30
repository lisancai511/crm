<template>
  <div class="singleLine">
    <el-form
      ref="fieldAttrForm"
      :rules="rules"
      :label-position="position"
      label-width="120px"
      :model="data">
      <base-field-attrs v-bind="$props"/>
      <el-form-item prop="attrs.maxlength" label="长度">
        <el-input v-model.number="data.attrs.maxlength"/>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" :rows="2" v-model="data.remark"/>
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
  name: 'TextField',
  components: { BaseFieldAttrs }
})
export default class TextField extends mixins(fieldAttrBasicMixins) {}
</script>
