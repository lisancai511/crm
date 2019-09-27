<!--Created by LiuLei on 2019/9/18-->
<template>
  <div
    class="fd-form-item"
    :class="[layout.type]">
    <el-form-item
      :rules="[{ required: layout.attrs.required}]"
      :label="layout.name">
      <template v-if="layout.type === ComponentTypes.TextField">
        <el-input :disabled="layout.attrs.disabled"/>
      </template>
      <template v-if="layout.type === ComponentTypes.LongTextField">
        <el-input
          :disabled="layout.attrs.disabled"
          :rows="6"
          class="fd-form-item__textarea"
          resize="none"
          type="textarea"/>
      </template>
      <template v-if="layout.type === ComponentTypes.DateField">
        <el-date-picker
          :disabled="layout.attrs.disabled"
          type="date"
          placeholder="选择日期"
          style="width: 100%;"></el-date-picker>
      </template>
      <template v-if="layout.type === ComponentTypes.DateTimeField">
        <el-date-picker
          :disabled="layout.attrs.disabled"
          type="datetime"
          placeholder="选择日期时间"
          style="width: 100%;"></el-date-picker>
      </template>
      <template v-if="layout.type === ComponentTypes.PhoneField">
        <el-input :disabled="layout.attrs.disabled"/>
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
import ComponentTypes from '@/views/designer/config/ComponentTypes'
import { IField } from '@/views/designer/config/components'

@Component({
  name: 'FdFormItem'
})
export default class FdFormItem extends Vue {
  @Prop({ type: Object, required: true }) readonly layout!: IField

  @Inject('designer') readonly designer!: boolean

  get ComponentTypes () {
    return ComponentTypes
  }

  @Emit('delete')
  deleteField (layout: IField) {
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
