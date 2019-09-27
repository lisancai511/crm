<!--Created by LiuLei on 2019/9/5-->
<template>
  <el-aside width="285px"
            class="form-design-sidebar--right">
    <div class="form-design-sidebar--right__inner">
      <template v-if="curLayout">
        <!--如果是Tab组件-->
        <the-info-tab-attrs
          :data="curLayout"
          v-if="curLayout.type===ComponentTypes.InfoTab"/>
        <!--如果是表单设计器内字段修改-->
        <the-field-component-attrs
          v-else-if="fieldComponentTypes.includes(curLayout.type)"
          :data="curLayout"/>
        <!--如果是表单Header组件-->
        <the-form-header-attrs :data="curLayout"
                               v-else-if="curLayout.type === ComponentTypes.FormHeader"/>
      </template>
    </div>
  </el-aside>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IField, fieldComponents } from '@/views/designer/config/components'
import ComponentTypes from '@/views/designer/config/ComponentTypes'
import TheInfoTabAttrs from '@/views/designer/layout/components/SidebarRight/components/TheInfoTabAttrs.vue'
import TheFieldComponentAttrs
  from '@/views/designer/layout/components/SidebarRight/components/TheFieldComponentAttrs.vue'
import TheFormHeaderAttrs from '@/views/designer/layout/components/SidebarRight/components/TheFormHeaderAttrs.vue'

@Component({
  name: 'FormDesignSidebarRight',
  components: {
    TheFormHeaderAttrs,
    TheFieldComponentAttrs,
    TheInfoTabAttrs
  }
})
export default class SidebarRight extends Vue {
  curLayout: IField | null = null

  // 全部的基础表单类型
  get fieldComponentTypes (): string[] {
    return fieldComponents.map(item => item.type)
  }

  get ComponentTypes () {
    return ComponentTypes
  }

  created () {
    this.$bus.$on('selectLayout', this.updateLayout)
  }

  beforeDestroy () {
    this.$bus.$off('selectLayout', this.updateLayout)
  }

  updateLayout (layout: IField | null) {
    if (this.curLayout !== null) {
      this.$set(this.curLayout, 'isSelect', false)
    }
    if (layout === null) {
      this.curLayout = layout
      return
    }
    this.$set(layout, 'isSelect', true)
    this.curLayout = layout
  }
}
</script>

<style lang="scss" scoped>
.form-design-sidebar--right {
  display: flex;
  flex-direction: column;
  padding: 25px 20px;
  background-color: #fff;
  height: 100%;
  overflow: auto;

  &__inner {
    flex: 1;
  }
}
</style>
