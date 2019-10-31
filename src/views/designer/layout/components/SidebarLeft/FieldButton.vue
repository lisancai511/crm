<!--Created by LiuLei on 2019/9/11-->
<template>
  <div class="form-designer__field">
    <dd-icon v-if="icon" class="field__icon" :name="icon"></dd-icon>
    <span class="field__title">{{title}}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'FieldButton'
})
export default class Field extends Vue {
  @Prop({ type: String, default: '' }) readonly icon!: string | undefined
  @Prop() readonly title!: string
}
</script>

<style lang="scss" scoped>
.form-designer__field {
  width: 139px;
  height: 36px;
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
  border: 1px solid rgba(138, 150, 160, 0.3);
  display: flex;
  align-items: center;
  padding: 0 20px;
  font-size: 12px;
  cursor: move;
  user-select: none;

  .field {
    &__icon {
      color: rgba(138, 150, 160, 1);
    }

    &__title {
      margin-left: 10px;
    }
  }
}
</style>
