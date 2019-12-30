<!--Created by LiuLei on 2019/12/17-->
<template>
  <div>
    <el-form-item prop="name" label="字段名称">
      <el-input v-model="data.name"/>
    </el-form-item>
    <el-form-item prop="apiName" label="API名称">
      <el-input :disabled="!!data.id"
                v-model="data.apiName"/>
    </el-form-item>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import fieldAttrBasicMixins
  from '@/views/designer/attrs-fields/mixins/fieldAttrBasicMixins'

@Component({
  name: 'BaseFieldAttrs'
})
export default class BaseFieldAttrs extends mixins(fieldAttrBasicMixins) {
}
</script>

<style lang="scss" scoped>

</style>
