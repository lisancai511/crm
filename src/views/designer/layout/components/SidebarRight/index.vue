<!--Created by LiuLei on 2019/9/5-->
<template>
  <el-aside width="285px"
            class="form-design-sidebar--right">
    <div class="form-design-sidebar--right__inner">
      <template v-if="curLayout">
        <!--如果是Tab组件-->
        <info-tab-attrs
          :data="curLayout"
          v-if="curLayout.type===ComponentTypes.InfoTab"/>
        <!--如果是表单设计器内字段修改-->
        <field-component-attrs
          v-else-if="fieldComponentTypes.includes(curLayout.type)"
          :data="curLayout"/>
        <!--如果是表单Header组件-->
        <form-header-attrs :data="curLayout"
                               v-else-if="curLayout.type === ComponentTypes.FormHeader"/>
        <!--如果是Tab相关列表组件-->
        <tab-related-list-attrs
          :data="curLayout"
          v-else-if="curLayout.type === ComponentTypes.InfoTabRelatedList"
        />
        <!--如果是相关列表的每一项-->
        <tab-related-list-item-attrs
          :data="curLayout"
          v-else-if="curLayout.type === ComponentTypes.InfoTabRelatedListItem"
        />
        <!--如果是跟进记录-->
        <tab-follow-up-attrs
          :data="curLayout"
          v-else-if="curLayout.type === ComponentTypes.InfoTabFollowUp"
        />
      </template>
    </div>
  </el-aside>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IField, fieldComponents } from '@/views/designer/config/components'
import ComponentTypes from '@/views/designer/config/ComponentTypes'
import InfoTabAttrs from '@/views/designer/layout/components/SidebarRight/components/InfoTabAttrs.vue'
import FieldComponentAttrs
  from '@/views/designer/layout/components/SidebarRight/components/FieldComponentAttrs.vue'
import FormHeaderAttrs from '@/views/designer/layout/components/SidebarRight/components/FormHeaderAttrs.vue'
import TabRelatedListAttrs from '@/views/designer/layout/components/SidebarRight/components/TabRelatedListAttrs.vue'
import TabRelatedListItemAttrs
  from '@/views/designer/layout/components/SidebarRight/components/TabRelatedListItemAttrs.vue'
import TabFollowUpAttrs from '@/views/designer/layout/components/SidebarRight/components/TabFollowUpAttrs.vue'

@Component({
  name: 'FormDesignSidebarRight',
  components: {
    TabFollowUpAttrs,
    TabRelatedListItemAttrs,
    FormHeaderAttrs,
    FieldComponentAttrs,
    InfoTabAttrs,
    TabRelatedListAttrs
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
    this.$bus.$on('designer/updateSelectLayout', this.updateLayout)
  }

  beforeDestroy () {
    this.$bus.$off('designer/updateSelectLayout', this.updateLayout)
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
    this.$nextTick(() => {
      //  验证当前显示的表单
      this.$bus.$emit('designer/layout/valid')
    })
    //  隐藏当前错误红框
    this.$set(layout, 'isError', false)
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
