<!--Created by LiuLei on 2019/12/25-->
<template>
  <div class="ImageFieldDetails">
    <el-image
      v-for="img in formattedModel"
      :key="img"
      :src="img"
      fit="contain"
      :preview-src-list="[img]">
    </el-image>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import detailsMixins from '@/views/designer/components/PCLayout/mixins/detailsMixins'
import modelMixins from '@/views/designer/components/PCLayout/mixins/modelMixins'
import apiNameMixins from '@/views/designer/components/PCLayout/mixins/apiNameMixins'

@Component({
  name: 'ImageFieldDetails'
})
export default class ImageFieldDetails extends mixins(detailsMixins, modelMixins, apiNameMixins) {
  get formattedModel () {
    if (typeof this.model === 'string') {
      return this.model.split('^&^')
    }
    return this.model
  }
}
</script>

<style lang="scss" scoped>
.el-image {
  width: 40px;
  height: 40px;

  & + .el-image {
    margin-left: 10px;
  }
}
</style>
