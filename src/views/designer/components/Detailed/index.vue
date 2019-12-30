<!--Created by LiuLei on 2019/12/18-->
<template>
  <div
    :class="{isSelect:layout.isSelect}"
    class="component-detailed">
    <div class="component-detailed__header">
      <span class=component-detailed__name>{{layout.name}}</span>
      <div
        v-if="layout.children.length === 0"
        class="draggable__tips">可拖入多个组件（不包含明细组件）
      </div>
      <div
        v-if="layout.isSelect"
        class="delete__button">
        <slot name="delete"/>
      </div>
    </div>
    <!--<draggable
      tag="div"
      v-model="layout.children"
      v-bind="draggableOptions"
      class="component-detailed__body">
      {{layout.children.map(item => item.name)}}
      &lt;!&ndash;<PCLayout :layout="layout"/>&ndash;&gt;
    </draggable>-->
    <div
      :class="{'has-children':layout.children.length>0}"
      class="component-detailed__body">
      <slot/>
    </div>
    <div class="component-detailed__footer">
      <el-button type="text">
        <i class="el-icon-plus"/>
        {{layout.attrs.actionName}}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Inject, Prop, Vue } from 'vue-property-decorator'
import PCLayout from '@/views/designer/components/PCLayout/index.vue'
import { IField } from '@/views/designer/config/components'

@Component({
  name: 'Detailed',
  components: { PCLayout }
})
export default class Detailed extends Vue {
  @Inject('designer') readonly designer!: any
  @Prop({ type: Object, required: true }) readonly layout!: IField
}
</script>

<style lang="scss" scoped>
@mixin add_border__line() {
  content: '';
  position: absolute;
  width: 100%;
  left: 10px;
  bottom: 0;
  height: 1px;
  background-color: #e6e6e6;
  z-index: 999;
}

.component-detailed {
  position: relative;
  border: 1px solid rgba($dd--color-text-secondary, .3);
  border-radius: 5px;
  &.isSelect {
    border: 1px dashed $dd--primary-color;
  }

  .delete__button{
    cursor: pointer;
    position: absolute;
    z-index: 99999;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }

  &__name {
    font-size: 12px;
    color: $dd--color-text-regular;
    line-height: $dd-design-mobile-item-height;
  }

  &__header {
    position: relative;
  }

  &__body {
    position: relative;
    display: flex;
    flex-direction: column;

    > * {
      flex: 1;
      min-height: $dd-design-mobile-item-height;
      overflow: hidden;
    }
  }

  .draggable__tips {
    font-size: 12px;
    color: $dd--color-text-placeholder;
    position: absolute;
    text-align: center;
    left: 0;
    right: 0;
    height: $dd-design-mobile-item-height;
    line-height: $dd-design-mobile-item-height;
  }
}

.designer--mobile {
  position: relative;
  overflow: hidden;

  &::after {
    @include add_border__line;
  }

  .component-detailed {

    &__header {
      height: $dd-design-mobile-item-height;
      padding-left: 10px;

      &::after {
        @include add_border__line;
      }

      .el-form-item {
        margin: 0;
        height: $dd-design-mobile-item-height;
        line-height: $dd-design-mobile-item-height;
        display: flex;
        align-items: center;
      }
    }

    &__body {
      min-height: $dd-design-mobile-item-height;
      background-color: rgba($dd--primary-color, .1);

      &.has-children {
        background-color: #fff;
      }
    }

    &__footer {
      background-color: rgba($dd--primary-color, .03);
      height: $dd-design-mobile-item-height;
      text-align: center;
      display: flex;
      align-content: center;
      justify-content: center;
    }
  }
}
</style>
