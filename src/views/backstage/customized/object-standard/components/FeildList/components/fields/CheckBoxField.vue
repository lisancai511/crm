<template>
  <div class="singleLine">
    <el-form :rules="rules"
             ref="fieldAttrForm"
             :label-position="position"
             label-width="120px"
             :model="data">
      <el-form-item prop="name" label="标签">
        <el-input v-model="data.name"></el-input>
      </el-form-item>
      <el-form-item prop="apiName" label="API名称">
        <el-input v-model="data.apiName"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" :rows="2" v-model="data.remark"></el-input>
      </el-form-item>
      <el-form-item label="帮助文本">
        <el-input v-model="data.helpText"></el-input>
      </el-form-item>
      <el-form-item label="默认值">
        <el-radio-group v-model="data.model">
          <el-radio style="margin-left:20px"
                    v-model="data.model" :label="1">已选中
          </el-radio>
          <el-radio v-model="data.type" :label="0">未选中</el-radio>
        </el-radio-group>
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
  name: 'checkBoxField'
})
export default class checkBoxField extends mixins(fieldAttrBasicMixins) {
}
</script>
