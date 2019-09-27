<!--Created by LiuLei on 2019/9/23-->
<template>
  <div class="sort-box">
    <div class="sort-box__title">
      <strong class="sort-box__title__text">
        {{title}}
      </strong>
      <slot name="header-right"></slot>
    </div>
    <draggable
      class="sort-box__inner"
      tag="ul"
      v-model="data[attribute]"
      v-bind="dragOptions"
      @start="isDragging = true"
      @end="isDragging = false"
    >
      <transition-group type="transition" :name="!isDragging ? 'flip-list' : null">
        <li
          class="sort-box__item"
          v-for="element in data[attribute]"
          :key="element.key"
        >
          {{ element.name }}
          <dd-icon name="edit"/>
        </li>
      </transition-group>
    </draggable>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import nanoid from 'nanoid'

@Component({
  name: 'SortableBox'
})
export default class SortableBox extends Vue {
  @Prop({ type: Object, required: true }) readonly data !: object
  @Prop({ type: String, default: 'children' }) readonly attribute !: string
  @Prop({ type: String, default: '' }) readonly title !: string
  isDragging = false

  get dragOptions () {
    return {
      animation: 200,
      group: nanoid() + '_' + 'group',
      disabled: false,
      ghostClass: 'sort-box__item-ghost',
      dragClass: 'sort-box__item-drag'
    }
  }
}
</script>

<style lang="scss" scoped>
.sort-box {
  flex: 1;
  display: flex;
  flex-direction: column;

  &__inner {
    border-radius: 4px;
    border: 1px solid rgba(230, 230, 230, 1);
    flex: 1;
    padding: 8px 0;
    list-style-type: none;
    margin: 0;
  }

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__text{
      padding: 12px 0
    }
  }

  &__item {
    height: 30px;
    line-height: 30px;
    padding: 0 15px;
    color: #666;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: move;

    &-ghost {
      /*opacity: 0.5;*/
      background: $dd--primary-color;
      color: #fff;
    }

    &-drag {
      opacity: 0;
      cursor: move;
    }
  }

  .flip-list-move {
    transition: transform 0.5s;
  }

  .no-move {
    transition: transform 0s;
  }
}
</style>
