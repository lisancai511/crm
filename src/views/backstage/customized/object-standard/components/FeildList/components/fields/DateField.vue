<template>
  <div class="singleLine">
    <div>
      <el-form
        ref="fieldAttrForm"
        :rules="rules"
        :label-position="position"
        label-width="120px"
        :model="data">
        <el-form-item prop="name" label="标签">
          <el-input v-model="data.name"></el-input>
        </el-form-item>
        <el-form-item prop="apiName" label="API名称">
          <el-input
            :disabled="!!data.id"
            v-model="data.apiName"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" :rows="2" v-model="data.remark"></el-input>
        </el-form-item>
        <el-form-item label="帮助文本">
          <el-input v-model="data.helpText"></el-input>
        </el-form-item>
        <el-form-item label="默认值">
          <el-input type="textarea" :rows="1" v-model="data.model"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import fieldAttrBasicMixins
  from '@/views/backstage/customized/object-standard/components/FeildList/components/fields/mixins/fieldAttrBasicMixins'

@Component({
  name: 'DateField'
})
export default class DateField extends mixins(fieldAttrBasicMixins) {
}
</script>
