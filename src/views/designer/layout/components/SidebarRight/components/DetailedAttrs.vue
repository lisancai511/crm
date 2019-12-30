<!--Created by LiuLei on 2019/12/18-->
<template>
  <div class="DetailedAttrs">
    <el-form>
      <base-field-attrs v-bind="$props"/>
      <div style="margin-top: -22px">
        <el-form-item label="动作名称">
          <el-input v-model="data.attrs.actionName"/>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import edit from '@/views/designer/layout/components/SidebarRight/components/mixins/edit'
import { IField } from '@/views/designer/config/components'
import BaseFieldAttrs
  from '@/views/designer/attrs-fields/BaseFieldAttrs.vue'

@Component({
  name: 'DetailedAttrs',
  components: { BaseFieldAttrs }
})
export default class DetailedAttrs extends mixins(edit) {
  @Prop({ required: true }) readonly data !: IField
}
</script>

<style lang="scss" scoped>

</style>
