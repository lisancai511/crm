<!--Created by LiuLei on 2019/12/2-->
<template>
  <div class="button-node-add__wrap">
    <el-popover
      popper-class="approval-button-node-add__popper"
      placement="right-start"
      title=""
      v-model="visiblePopover"
      width="310"
      trigger="click">
      <el-button
        slot="reference"
        size="small"
        class="button-node-add"
        type="primary"
        icon="el-icon-plus"
        circle/>
      <div class="case-button__wrap">
        <i @click="visiblePopover = false" class="el-icon-close"></i>
        <div
          @click="handleClickAddButton(WORKFLOW_TYPES.APPROVAL)"
          class="case-button__outer">
          <div class="case-button case-button--approval">
            <dd-icon full-name="dd-icon-peopleone"/>
          </div>
          <span class="case-button__title">审批人</span>
        </div>
        <div
          @click="handleClickAddButton(WORKFLOW_TYPES.CC)"
          class="case-button__outer">
          <div class="case-button case-button--cc">
            <dd-icon full-name="dd-icon-contract"/>
          </div>
          <span class="case-button__title">抄送人</span>
        </div>
        <div
          @click="handleClickAddButton(WORKFLOW_TYPES.EXCLUSIVE_GATEWAY)"
          class="case-button__outer">
          <div class="case-button case-button--condition">
            <dd-icon full-name="dd-icon-group"/>
          </div>
          <span class="case-button__title">条件分支</span>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { WORKFLOW_TYPES } from '@/views/backstage/office-setting/form-management/types'

@Component({
  name: 'ButtonNodeAdd'
})
export default class ButtonNodeAdd extends Vue {
  visiblePopover: boolean = false

  get WORKFLOW_TYPES () {
    return WORKFLOW_TYPES
  }

  handleClickAddButton (type: WORKFLOW_TYPES) {
    this.$emit('addNode', type)
    this.visiblePopover = false
  }
}
</script>

<style lang="scss">
.approval-button-node-add__popper {
  padding: 45px 20px 30px;
}
</style>
<style lang="scss" scoped>
@import "../styles/_var.scss";

.button-node-add {
  font-size: 24px;
  transform: scale(0.6818);
  margin-top: 15px;

  &__wrap {
    z-index: 999;
    text-align: center;
  }
}

.case-button {
  font-size: 30px;
  border: 1px solid rgba(233, 233, 233, 1);
  height: 78px;
  width: 78px;
  border-radius: 78px;
  display: flex;
  align-items: center;
  justify-content: center;

  &__wrap {
    display: flex;
    justify-content: space-between;

    .el-icon-close {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }
  }

  &--approval {
    color: map_get($colors, 'Approval');
  }

  &--cc {
    color: map_get($colors, 'CC');
  }

  &--condition {
    color: $color-condition;
  }

  &__outer {
    text-align: center;
    cursor: pointer;
  }

  &__title {
    display: inline-block;
    margin-top: 15px;
  }
}
</style>
