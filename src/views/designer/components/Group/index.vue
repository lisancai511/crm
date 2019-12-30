<!--Created by LiuLei on 2019/9/25-->
<template>
  <el-main :class="{
  isSelect:layout.isSelect,
  'designer--mobile':designer.setting.execType === DESIGNER_EXEC_TYPES.DESIGNER && designer.setting.uiType === DESIGNER_UI_TYPES.MOBILE
  }"
           class="FdComponentsGroup">
    <div class="group__title">
      <div>
        <span v-show="!editing">{{layout.name}}</span>
        <el-input
          v-if="designer.setting.execType === DESIGNER_EXEC_TYPES.DESIGNER"
          v-show="editing"
          @blur="blur"
          size="mini"
          class="group__title__input"
          v-model="layout.name"/>
        <dd-icon
          v-if="designer.setting.execType === DESIGNER_EXEC_TYPES.DESIGNER"
          name="edit"
          class="group__title__button"
          @click.native.stop="edit"/>
      </div>
      <dd-icon
        v-if="layout.isSelect"
        class="group__title__button"
        slot="delete"
        name="delete" @click.native.stop="deleteGroup"/>
    </div>
    <slot/>
  </el-main>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject } from 'vue-property-decorator'
import { Main } from 'element-ui'
import { IField } from '@/views/designer/config/components'
import { DESIGNER_EXEC_TYPES, DESIGNER_UI_TYPES } from '@/views/designer/config/Designer'
import { IDesigner } from '@/views/designer/types'

@Component({
  name: 'FdComponentsGroup',
  props: {
    ...(Main as any).props
  }
})
export default class FdComponentsGroup extends Vue {
  @Prop({ required: true, type: Object }) readonly layout!: IField
  @Inject('designer') readonly designer!: IDesigner

  get DESIGNER_EXEC_TYPES () {
    return DESIGNER_EXEC_TYPES
  }

  get DESIGNER_UI_TYPES () {
    return DESIGNER_UI_TYPES
  }

  editing: boolean = false

  edit (): void {
    this.editing = !this.editing
  }

  blur (): void {
    this.editing = !this.editing
  }

  deleteGroup () {
    this.$emit('delete', this.layout)
  }
}
</script>

<style lang="scss" scoped>
.FdComponentsGroup {
  border: 1px solid rgba(242, 243, 246, 1);
  border-radius: 12px;
  margin-bottom: 20px;
  padding: 0;

  &.isSelect {
    border: 1px dashed $dd--primary-color;
  }

  &:last-child {
    margin-bottom: 0;
  }

  .group {
    &__title {
      height: 40px;
      line-height: 40px;
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &__input {
        width: auto;
        padding: 0;
        font-size: 14px;

        /deep/ .el-input__inner {
          padding-left: 0;
          padding-right: 0;
        }
      }

      &__button {
        cursor: pointer;
      }
    }
  }

  &.designer--mobile {
    border-radius: 0;
    border-color: #fff;

    &.isSelect {
      border: 1px dashed $dd--primary-color;
    }
  }
}
</style>
