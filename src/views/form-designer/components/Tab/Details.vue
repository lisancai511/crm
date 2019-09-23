<!--Created by LiuLei on 2019/9/16-->
<template>
  <div class="fd-components-tab-details">
    <el-form class="fd-components-tab-details__form">
      <!-- TODO PCLayout Row and Col-->
      <PCLayout v-for="(component,index) in layout"
                v-bind="component.attrs"
                form
                :container="component.type === LayoutTypes.Container"
                :main="component.type === LayoutTypes.Main"
                :header="component.type === LayoutTypes.Header"
                :footer="component.type === LayoutTypes.Footer"
                :aside="component.type === LayoutTypes.Aside"
                :row="component.type === LayoutTypes.Row"
                :col="component.type === LayoutTypes.Col"
                :layout="component"
                :key="index"></PCLayout>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import LayoutTypes from '@/views/form-designer/config/LayoutTypes'

@Component({
  name: 'FdComponentsTabDetails',
  components: {
    PCLayout: () => import('@/views/form-designer/components/PCLayout/index.vue')
  }
})
export default class FdComponentsTabDetails extends Vue {
  @Prop({ required: true, type: Array }) readonly layout!: []

  get LayoutTypes () {
    return LayoutTypes
  }
}
</script>

<style lang="scss" scoped>
.fd-components-tab-details {
  height: 100%;

  &__form {
    height: 100%;

    > .pc-layout {
      /deep/ > .el-main {
        width: 50%;
        padding-top: 0;
        overflow: hidden;

        &:first-child {
          padding-left: 0;
          padding-right: 25px;
        }

        &:last-child {
          padding-right: 0;
          padding-left: 25px;
        }

        .draggable-tab-details-ghost-class {
          border: 1px dashed $dd--primary-color;
          height: 102px;
          overflow: hidden;
          width: 100%;
          &.LongTextField{
            height: 205px;
          }
        }
      }
    }
  }
}
</style>
