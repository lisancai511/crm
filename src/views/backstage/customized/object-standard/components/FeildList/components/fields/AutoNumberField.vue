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
      <el-form-item
        prop="autoNumberConfig.prefix"
        label="格式">
        <el-select
          style="width:100%"
          v-model="data.autoNumberConfig.prefix">
          <el-option
            v-for="prefix in prefixes"
            :key="prefix.value"
            :value="prefix.value"
            :label="prefix.label"
          >{{prefix.label}}
          </el-option>
        </el-select>
        <span v-if="data.autoNumberConfig.prefix" class="fs-12">
          示例：{{$moment().format(prefixByValue[data.autoNumberConfig.prefix].label)}}{{String(data.autoNumberConfig.beginNumber).padStart(+data.attrs.maxlength,'0')}}
        </span>
      </el-form-item>
      <el-form-item prop="autoNumberConfig.beginNumber" label="起始编号">
        <el-input v-model.number="data.autoNumberConfig.beginNumber"></el-input>
      </el-form-item>
      <el-form-item prop="autoNumberConfig.beginNumber" label="编号长度">
        <el-input v-model.number="data.attrs.maxlength"></el-input>
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
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import fieldAttrBasicMixins
  from '@/views/backstage/customized/object-standard/components/FeildList/components/fields/mixins/fieldAttrBasicMixins'
import { arrToMap } from '@/utils'

@Component({
  name: 'AutoNumberField'
})
export default class AutoNumberField extends mixins(fieldAttrBasicMixins) {
  get prefixes () {
    return [
      {
        label: 'YYYY-MM-DD',
        value: 'yyyy-MM-dd'
      },
      {
        label: 'MM-DD',
        value: 'MM-dd'
      },
      {
        label: 'DD',
        value: 'dd'
      }
    ]
  }

  get prefixByValue () {
    return arrToMap(this.prefixes, 'value')
  }
}
</script>
