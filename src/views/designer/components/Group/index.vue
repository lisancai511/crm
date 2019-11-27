<!--Created by LiuLei on 2019/9/25-->
<template>
  <el-main :class="{
  isSelect:layout.isSelect,
  'designer--mobile':designer.setting && designer.setting.platform === DESIGNER_PLATFORMS.MOBILE
  }"
           class="FdComponentsGroup">
    <div class="group__title">
      <span v-show="!editing">{{layout.name}}</span>
      <el-input
        v-if="designer.setting"
        v-show="editing"
        @blur="blur"
        size="mini" class="group__title__input"
        v-model="layout.name"/>
      <dd-icon
        v-if="designer.setting"
        name="edit" class="group__title__button" @click.native.stop="edit"></dd-icon>
    </div>
    <slot/>
  </el-main>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject } from 'vue-property-decorator'
import { Main } from 'element-ui'
import { IField } from '@/views/designer/config/components'
import { DESIGNER_PLATFORMS } from '@/views/designer/config/Designer'

@Component({
  name: 'FdComponentsGroup',
  props: {
    ...(Main as any).props
  }
})
export default class FdComponentsGroup extends Vue {
  @Prop({ required: true, type: Object }) readonly layout!: IField
  @Inject('designer') readonly designer!: any

  get DESIGNER_PLATFORMS () {
    return DESIGNER_PLATFORMS
  }

  editing: boolean = false

  edit (): void {
    this.editing = !this.editing
  }

  blur (): void {
    this.editing = !this.editing
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
      padding-left: 10px;

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
