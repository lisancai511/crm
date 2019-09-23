<!--Created by LiuLei on 2019/9/12-->
<template>
  <div class="form-title__button__wrap p-15">
    <div class="form-title__button__inner">
      <!--      TODO update KEY-->
      <el-button
        v-for="(button,index) in displayedButtons"
        :key="index"
        size="small"
        class="form-title__button">
        {{button}}
      </el-button>
      <el-dropdown class="m-l-10">
        <el-button size="small">
          更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(button,index) in hiddenButtons"
            :key="index"
          >{{button}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div
      :class="{'dd-fence':usedButtons.isSelect}"
      class="dd-fence-mask">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { field } from '@/views/form-designer/config/components'

@Component({
  name: 'TheButtons'
})
export default class TheButtons extends Vue {
  @Prop({ type: Object, required: true }) readonly usedButtons!: field

  get displayedButtons () {
    return [...this.usedButtons.children as []].splice(0, 3)
  }

  get hiddenButtons () {
    return [...this.usedButtons.children as []].splice(3)
  }
}
</script>

<style lang="scss" scoped>
.form-title {
  &__button {
    &__wrap {
      margin-top: -15px;
      height: 62px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
  }
}
</style>
