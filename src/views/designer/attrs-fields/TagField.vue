<!--Created by LiuLei on 2019/12/19-->
<template>
  <div class="TagField">
    <el-form
      ref="fieldAttrForm"
      :rules="rules"
      :label-position="position"
      label-width="120px"
      :model="data">
      <base-field-attrs v-bind="$props"/>
      <el-form-item label="备注">
        <el-input type="textarea" :rows="2" v-model="data.remark"/>
      </el-form-item>
      <el-form-item label="提示文字">
        <el-input v-model="data.helpText"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import BaseFieldAttrs from '@/views/designer/attrs-fields/BaseFieldAttrs.vue'
import { mixins } from 'vue-class-component'
import fieldAttrBasicMixins from '@/views/designer/attrs-fields/mixins/fieldAttrBasicMixins'

@Component({
  name: 'TagField',
  components: { BaseFieldAttrs }
})
export default class TagField extends mixins(fieldAttrBasicMixins) {
}
</script>

<style lang="scss" scoped>

</style>
