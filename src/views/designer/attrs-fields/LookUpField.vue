<template>
  <div class="singleLine">
    <el-form
      ref="fieldAttrForm"
      :label-position="position"
      label-width="120px"
      :rules="rules"
      :model="data">
      <base-field-attrs v-bind="$props"/>
      <el-form-item
        v-if="data.attrs && data.attrs.lookupConfig"
        prop="attrs.lookupConfig.lookupObjectId"
        label="相关项">
        <el-select
          style="width:100%"
          v-model="data.attrs.lookupConfig.lookupObjectId"
          placeholder="请选择">
          <el-option
            v-for="item in objects"
            :key="item.id"
            :label="item.name"
            :disabled="item.id === curObjectId"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <!--<el-form-item
        prop="name"
        label="字段名称">
        <el-input v-model="data.name"/>
      </el-form-item>-->
      <el-form-item
        v-if="data.attrs && data.attrs.lookupConfig"
        prop="attrs.lookupConfig.relatedListTitle"
        label="相关列表标签">
        <el-input v-model="data.attrs.lookupConfig.relatedListTitle"/>
      </el-form-item>
      <!--<el-form-item
        prop="apiName"
        label="API名称">
        <el-input :disabled="!!data.id"
                  v-model="data.apiName"/>
      </el-form-item>-->
      <el-form-item label="备注">
        <el-input type="textarea" :rows="6" v-model="data.remark"></el-input>
      </el-form-item>
      <el-form-item label="提示文字">
        <el-input v-model="data.helpText"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import fieldAttrBasicMixins
  from '@/views/designer/attrs-fields/mixins/fieldAttrBasicMixins'
import { IServerObject } from '@/store/modules/backstage/modules/customized'
import designerStore from '@/store/modules/designer'
import BaseFieldAttrs
  from '@/views/designer/attrs-fields/BaseFieldAttrs.vue'

@Component({
  name: 'LookUpField',
  components: { BaseFieldAttrs }
})
export default class LookUpField extends mixins(fieldAttrBasicMixins) {
  get objects (): IServerObject[] {
    return this.$store.getters['backstage/customized/objects']
  }

  // TODO 优化
  get curObjectId () {
    return this.$route.params.objectId || designerStore.object.id
  }

  created () {
    // store 没有对象的时候更新对象数据
    if (this.objects.length === 0) {
      this.$store.dispatch('backstage/customized/getObjects')
    }
  }
}
</script>
<style lang="scss" scoped>
/*/deep/ .el-form-item__label {
  width: 96px !important;
}

/deep/ .el-form-item__content {
  margin-left: 96px !important;
}*/
</style>
