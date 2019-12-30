<template>
  <div class="singleLine">
    <el-form
      ref="fieldAttrForm"
      :rules="rules"
      :label-position="position"
      label-width="120px"
      :model="data">
      <base-field-attrs v-bind="$props"/>
      <el-form-item label="提示文字">
        <el-input v-model="data.helpText"/>
      </el-form-item>
      <el-form-item label="最大文件数量">
        <el-select v-model="data.attrs.limitNumber">
          <el-option
            :key="i"
            :value="i"
            :label="i"
            v-for="i in 5"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="24">
            <el-checkbox v-model="data.attrs.onlyUsedCellPhoneCamera">
              只能通过手机拍照方式上传图片
            </el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="isAddWatermarks">
              图片加水印
            </el-checkbox>
          </el-col>
          <el-col
            class="watermarks"
            :span="24">
            <el-checkbox-group
              v-model="data.attrs.watermarks">
              <el-checkbox
                :key="watermark.type"
                :label="watermark.type"
                v-for="watermark in WATERMARK_LIST">
                {{watermark.name}}
              </el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
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
import { WATERMARK_LIST, WATERMARK_TYPES } from '@/views/designer/config/components'

@Component({
  name: 'ImageField',
  components: { BaseFieldAttrs }
})
export default class ImageField extends mixins(fieldAttrBasicMixins) {
  get WATERMARK_LIST () {
    return WATERMARK_LIST
  }

  get isAddWatermarks (): boolean {
    return (this.data.attrs.watermarks?.length || []) > 0
  }

  set isAddWatermarks (flag: boolean) {
    if (flag) {
      this.data.attrs.watermarks = [WATERMARK_TYPES.USERNAME]
    } else {
      this.data.attrs.watermarks = []
    }
  }
}
</script>
<style lang="scss" scoped>
.watermarks {
  padding-left: 30px;

  .el-checkbox-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    overflow: hidden;
  }

  .el-checkbox {
    min-width: 40%;
    margin-right: 0;
    height: 30px;
    line-height: 30px;
  }
}
</style>
