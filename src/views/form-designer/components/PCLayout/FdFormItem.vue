<!--Created by LiuLei on 2019/9/18-->
<template>
  <div
    class="fd-form-item"
    :class="[layout.type]">
    <el-form-item
      :label="layout.name">
      <template v-if="layout.type === LayoutTypes.TextField">
        <el-input/>
      </template>
      <template v-if="layout.type === LayoutTypes.LongTextField">
        <el-input
          :rows="6"
          class="fd-form-item__textarea"
          resize="none"
          type="textarea"/>
      </template>
      <template v-if="layout.type === LayoutTypes.DateField">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          style="width: 100%;"></el-date-picker>
      </template>
      <template v-if="layout.type === LayoutTypes.DateTimeField">
        <el-date-picker
          type="datetime"
          placeholder="选择日期时间"
          style="width: 100%;"></el-date-picker>
      </template>
      <template v-if="layout.type === LayoutTypes.PhoneField">
        <el-input/>
      </template>
    </el-form-item>
    <div v-if="designer"
         :class="{'dd-fence':layout.isSelect}"
         class="dd-fence-mask">
      <div v-show="layout.isSelect" class="operation-buttons">
        <dd-icon name="delete" @click.native="deleteField(layout)"></dd-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject, Emit } from 'vue-property-decorator'
import LayoutTypes from '@/views/form-designer/config/LayoutTypes'
import { field } from '@/views/form-designer/config/components'

@Component({
  name: 'FdFormItem'
})
export default class FdFormItem extends Vue {
  @Prop({ type: Object, required: true }) readonly layout!: field

  @Inject('designer') readonly designer!: boolean

  get LayoutTypes () {
    return LayoutTypes
  }

  @Emit('delete')
  deleteField (layout: field) {
    console.log('wsasa')
    return layout
  }
}
</script>

<style lang="scss" scoped>

.fd-form-item {
  position: relative;
  padding: 0 10px 0;

  &::after {
    content: '';
    display: table;
  }

  &__textarea {
    /deep/ .el-textarea__inner {
      height: 142px;
    }
  }

  .dd-fence-mask {
    cursor: move;
  }

  .operation-buttons {
    float: right;
    padding-right: 10px;
    padding-top: 10px;

    > .dd-icon {
      cursor: pointer;
    }
  }
}
</style>
