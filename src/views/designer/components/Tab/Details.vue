<!--Created by LiuLei on 2019/9/16-->
<template>
  <div class="fd-components-tab-details"
       :class="{'designer--mobile':designer.setting && designer.setting.platform === DESIGNER_PLATFORMS.MOBILE}">
    <el-form class="form__wrap"
             :label-position="(designer.setting && designer.setting.platform === DESIGNER_PLATFORMS.MOBILE) ? 'left' :'top'">
      <!-- TODO PCLayout Row and Col-->
      <PCLayout v-for="(component,index) in layout"
                v-bind="component.attrs"
                form
                :container="component.type === ComponentTypes.Container"
                :main="component.type === ComponentTypes.Main"
                :header="component.type === ComponentTypes.Header"
                :footer="component.type === ComponentTypes.Footer"
                :aside="component.type === ComponentTypes.Aside"
                :row="component.type === ComponentTypes.Row"
                :col="component.type === ComponentTypes.Col"
                :layout="component"
                :key="index"></PCLayout>
      <div class="ButtonField">
        <el-button
          v-if="designer.setting && designer.setting.platform === DESIGNER_PLATFORMS.MOBILE"
          type="text" icon="el-icon-edit">编辑资料
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject } from 'vue-property-decorator'
import ComponentTypes from '@/views/designer/config/ComponentTypes'
import { DESIGNER_PLATFORMS } from '@/views/designer/config/Designer'

@Component({
  name: 'FdComponentsTabDetails',
  components: {
    PCLayout: () => import('@/views/designer/components/PCLayout/index.vue')
  }
})
export default class FdComponentsTabDetails extends Vue {
  @Prop({ required: true, type: Array }) readonly layout!: []
  @Inject('designer') readonly designer!: any

  get ComponentTypes () {
    return ComponentTypes
  }

  get DESIGNER_PLATFORMS () {
    return DESIGNER_PLATFORMS
  }
}
</script>

<style lang="scss" scoped>
.fd-components-tab-details {
  height: 100%;

  @import "~@/styles/designer-mobile-form-wrap";

  &.designer--mobile {
    .form__wrap {
      .ButtonField {
        position: relative;

        &::after {
          content: '';
          display: table;
          position: absolute;
          width: 100%;
          height: 1px;
          top: 0;
          left: 10px;
          background-color: rgba(230, 230, 230, 1);

        }
      }

      .el-button {
        width: 100%;
      }
    }
  }
}
</style>
