<template>
  <div class="singleLine">
    <el-form
      ref="fieldAttrForm"
      :rules="rules"
      :label-position="position"
      label-width="80px"
      :model="data">
      <el-form-item prop="name" label="标签">
        <el-input v-model="data.name"></el-input>
      </el-form-item>
      <el-form-item prop="attrs.maxlength" label="长度">
        <el-input v-model.number="data.attrs.maxlength"></el-input>
      </el-form-item>
      <el-form-item prop="apiName" label="API名称">
        <el-input :disabled="!!data.id"
                  v-model="data.apiName"></el-input>
      </el-form-item>
      <el-form-item label="模式">
        <!--        <el-input v-model="data.attrs.urlModel"></el-input>-->
        <el-select
          placeholder="请选择"
          v-model="data.attrs.urlModel">
          <el-option
            :key="target.key"
            :label="target.label"
            :value="target.key"
            v-for="target in targets">
            <span style="float: left">{{ target.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 12px">{{ target.description }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea"
                  :rows="6"
                  v-model="data.remark"></el-input>
      </el-form-item>
      <el-form-item label="帮助文本">
        <el-input
          v-model="data.helpText"></el-input>
      </el-form-item>
      <el-form-item label="默认值">
        <el-input type="textarea"
                  :rows="1"
                  v-model="data.modal"></el-input>
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
  name: 'WebsiteField'
})
export default class WebsiteField extends mixins(fieldAttrBasicMixins) {
  get targets () {
    return [
      {
        key: '_self',
        label: '_self',
        description: '在相同的框架中打开被链接文档'
      },
      {
        key: '_blank',
        label: '_blank',
        description: '在新窗口中打开被链接文档'
      }
    ]
  }

  // created () {
  //   this.data.attrs.urlModel = '_self'
  // }
}
</script>
