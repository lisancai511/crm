<!--Created by LiuLei on 2019/9/12-->
<template>
  <div
    class="form-title__button__wrap">
    <div class="form-title__button__inner">
      <transition-group name="list-complete" tag="span">
        <el-button
          v-for="button in displayedButtons"
          :key="button.apiName"
          size="small"
          type="primary"
          plain
          @click="handleClickButton(button)"
          class="form-title__button">
          {{button.name || (buttonByApiName[button.apiName] || {}).name}}
        </el-button>
      </transition-group>
      <el-dropdown
        v-if="hiddenButtons.length > 0"
        @command="handleCommand"
        class="m-l-10">
        <el-button
          type="primary"
          plain
          size="small">
          更多
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="button in hiddenButtons"
            :key="button.apiName"
            :command="button"
          >{{button.name || (buttonByApiName[button.apiName] || {}).name}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject } from 'vue-property-decorator'
import designerStore from '@/store/modules/designer'

@Component({
  name: 'TheButtons'
})
export default class TheButtons extends Vue {
  @Prop({ type: Array, required: true }) readonly usedButtons!: []
  @Inject('designer') readonly designer!: any
  defaultShowLength: number = 3

  get buttonByApiName (): any {
    if (this.designer.setting) {
      return designerStore.buttonByApiName
    } else {
      return (this.$store.state.app || {}).record.buttonByApiName || {}
    }
  }

  get displayedButtons () {
    if (this.usedButtons.length <= this.defaultShowLength) {
      return this.usedButtons
    }
    return this.usedButtons.filter((item, i) => i < 3)
  }

  get hiddenButtons () {
    if (this.usedButtons.length <= this.defaultShowLength) {
      return []
    }
    return this.usedButtons.filter((item, i) => i >= 3)
  }

  handleClickButton (button: any) {
    if (this.designer.running) {
      this.$bus.$emit('app/record/details/click', this.buttonByApiName[button.apiName])
    }
  }

  handleCommand (command: any) {
    this.handleClickButton(command)
  }
}
</script>

<style lang="scss" scoped>
.form-title {
  &__button {
    display: inline-block;
    transition: all 0.3s;
    /*  &__wrap {
        margin-top: -15px;
        height: 62px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }*/
  }
}
</style>
