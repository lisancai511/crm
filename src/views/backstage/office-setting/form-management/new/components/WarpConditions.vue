<!--Created by LiuLei on 2019/12/2-->
<template>
  <draggable
    :list="conditions"
    @start="onStart"
    @end="onEnd"
    handle=".workflow-group-handle-class"
    ghostClass="workflow-group-ghost-class"
    dragClass="workflow-group-drag-class"
    chosenClass="workflow-group-ghost-class"
    tag="transition-group"
    :component-data="{
      props:{
        type:'transition',
        name:!dragging ? 'flip-list' : null,
        tag:'div'
      }
    }"
    class="conditions-wrap">
    <template v-for="(condition,index) in conditions">
      <wrap-condition
        :class="{
          'is-first':index === 0,
          'is-last':index === conditions.length - 1,
          'dragging':dragging
        }"
        :key="condition.id"
        :condition="condition">
        <el-button
          slot="close"
          @click.stop="removeCondition(index)"
          class="button__close"
          type="text">
          <i class="el-icon-close"/>
        </el-button>
      </wrap-condition>
    </template>
  </draggable>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ICondition } from '@/views/backstage/office-setting/form-management/types'
import WrapCondition from '@/views/backstage/office-setting/form-management/new/components/WrapCondition.vue'

@Component({
  name: 'WarpConditions',
  components: { WrapCondition }
})
export default class WarpConditions extends Vue {
  @Prop({ required: true, type: Array }) readonly conditions !: ICondition[]

  dragging: boolean = false

  removeCondition (index: number) {
    if (this.conditions.length > 2) {
      this.conditions.splice(index, 1)
    } else {
      this.$emit('removeGateway')
    }
  }

  onStart () {
    this.dragging = true
    console.log('onStart')
  }

  onEnd () {
    console.log('onEnd')
    this.dragging = false
  }
}
</script>

<style lang="scss" scoped>
.conditions-wrap {
  display: flex;
  justify-content: center;

  .workflow-group-ghost-class {
    background-color: rgba($dd--primary-color, .3);
  }

  .workflow-group-drag-class {
    background-color: rgba($dd--primary-color, .7);
    border-color: transparent;
    width: 222px;
    overflow-x: hidden;

    &::before, &::after {
      display: none;
    }

    /deep/ * {
      visibility: hidden !important;
    }

    /deep/ .condition-wrap__padding {
      display: none;
    }
  }

  .flip-list-move {
    transition: transform 0.5s;
  }
}
</style>
