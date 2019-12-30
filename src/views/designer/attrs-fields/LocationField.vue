<template>
  <div class="singleLine">
    <el-form
      ref="fieldAttrForm"
      :rules="rules"
      :label-position="position"
      label-width="120px"
      :model="data">
      <base-field-attrs v-bind="$props"/>
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
  name: 'LocationField',
  components: { BaseFieldAttrs }
})
export default class LocationField extends mixins(fieldAttrBasicMixins) {}
</script>
<style lang="scss" scoped>
</style>
