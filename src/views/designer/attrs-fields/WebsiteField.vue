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
      <el-form-item label="模式">
        <!--        <el-input v-model="data.attrs.urlModel"></el-input>-->
        <el-select
          style="width: 100%"
          placeholder="请选择"
          v-model="data.attrs.urlModel">
          <el-option
            :key="target.key"
            :label="target.label"
            :value="target.key"
            v-for="target in targets">
            <span style="float: left">{{ target.label }}</span>
            <!--            <span style="float: right; color: #8492a6; font-size: 12px">{{ target.description }}</span>-->
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea"
                  :rows="6"
                  v-model="data.remark"/>
      </el-form-item>
      <el-form-item label="提示文字">
        <el-input
          v-model="data.helpText"/>
      </el-form-item>
      <el-form-item label="默认值">
        <el-input type="textarea"
                  v-model="data.model"/>
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
  name: 'WebsiteField',
  components: { BaseFieldAttrs }
})
export default class WebsiteField extends mixins(fieldAttrBasicMixins) {
  get targets () {
    return [
      {
        key: '_self',
        label: '在当前页面打开链接'
        // description: '在相同的框架中打开被链接文档'
      },
      {
        key: '_blank',
        label: '在新窗口打开链接'
        // description: '在新窗口中打开被链接文档'
      }
    ]
  }

  // created () {
  //   this.data.attrs.urlModel = '_self'
  // }
}
</script>
