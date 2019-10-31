<!--Created by LiuLei on 2019/10/15-->
<template>
  <el-tooltip
    effect="dark"
    :content="label"
    :disabled="disabled"
    placement="right">
    <slot>
      <span ref="label" class="el-checkbox__label__inner">{{label}}</span>
    </slot>
  </el-tooltip>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { getStyle } from 'element-ui/src/utils/dom'

@Component({
  name: 'TheItemLabel'
})
export default class TheItemLabel extends Vue {
  @Prop({ required: true }) readonly label !: string

  disabled: boolean = false

  @Watch('$slots.default', { immediate: true, deep: true })
  onSlotsChange (val: any) {
    if (val) {
      this.$nextTick(() => {
        this.setDisabled(val[0].elm)
        // console.log(val[0].elm)
      })
    }
    // console.log(this)
  }

  @Watch('label', { immediate: true })
  onLabelStrChange (newVal: string) {
    if (!newVal) {
      return
    }
    // return
    this.$nextTick(() => {
      this.setDisabled(this.$refs.label)
    })
  }

  setDisabled (el: any) {
    const $label: any = el
    const range = document.createRange()
    if (Object.prototype.toString.call($label) !== '[object HTMLSpanElement]') {
      return
    }
    range.setStart($label, 0)
    range.setEnd($label, $label.childNodes.length)
    const rangeWidth = range.getBoundingClientRect().width
    const padding = (parseInt(getStyle($label, 'paddingLeft'), 10) || 0) +
      (parseInt(getStyle($label, 'paddingRight'), 10) || 0)
    this.disabled = !(rangeWidth + padding > $label.offsetWidth || $label.scrollWidth > $label.offsetWidth)
  }
}
</script>

<style lang="scss" scoped>
.el-checkbox__label {
  &__inner {
    width: 100%;
    display: inline-block;
    word-break: keep-all;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &--right {
      width: 80%;
      /*vertical-align: bottom;*/
    }
  }
}
</style>
