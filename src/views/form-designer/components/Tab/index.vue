<!--Created by LiuLei on 2019/9/12-->
<template>
  <div
    v-if="layout.children && layout.children.length > 0"
    class="com-tab">
    <el-tabs v-model="activeName"
             :class="{'is-select':layout.isSelect && this.designer}">
      <el-tab-pane v-for="(tab) in layout.children"
                   :key="tab.key"
                   :label="tab.name"
                   :name="tab.type">
        <!--        <div v-for="i in 100" :key="i">测试</div>-->
        <div class="com-tab-content-inner">
          <fd-components-tab-details
            v-bind="tab.attrs"
            :layout="tab.children"
            v-if="tab.type === LayoutTypes.InfoTabDetails"/>
          <fd-components-tab-activity
            v-bind="tab.attrs"
            v-else-if="tab.type === LayoutTypes.InfoTabActivity"/>
          <fd-components-tab-related-list
            v-bind="tab.attrs"
            v-else-if="tab.type === LayoutTypes.InfoTabRelatedList"/>
          <fd-components-tab-file
            v-bind="tab.attrs"
            v-else-if="tab.type === LayoutTypes.InfoTabFile"/>
          <fd-components-tab-follow-up
            v-bind="tab.attrs"
            v-else-if="tab.type === LayoutTypes.InfoTabFollowUp"/>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject } from 'vue-property-decorator'
import FdComponentsTabDetails from '@/views/form-designer/components/Tab/Details.vue'
import LayoutTypes from '@/views/form-designer/config/LayoutTypes'
import FdComponentsTabActivity from '@/views/form-designer/components/Tab/Activity.vue'
import FdComponentsTabFile from '@/views/form-designer/components/Tab/File.vue'
import FdComponentsTabRelatedList from '@/views/form-designer/components/Tab/RelatedList.vue'
import FdComponentsTabFollowUp from '@/views/form-designer/components/Tab/FollowUp.vue'

import { field } from '@/views/form-designer/config/components'

@Component({
  name: 'FdComponentsTab',
  components: {
    FdComponentsTabFollowUp,
    FdComponentsTabRelatedList,
    FdComponentsTabFile,
    FdComponentsTabActivity,
    FdComponentsTabDetails
  }
})
export default class FdComponentsTab extends Vue {
  @Prop({ required: true, type: Object }) readonly layout!: field
  @Inject('designer') readonly designer!: boolean
  activeName = LayoutTypes.InfoTabDetails

  get LayoutTypes () {
    return LayoutTypes
  }
}
</script>

<style lang="scss" scoped>
.com-tab {
  height: 100%;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(1, 8, 19, 0.12);

  &-content-inner {
    height: 100%;
    min-height: 120px;
  }

  .el-tabs {
    height: 100%;
    display: flex;
    flex-direction: column;

    .el-tab-pane {
      height: 100%;
    }

    /deep/ .el-tabs {
      &__header {
      }

      &__nav-wrap {
        &:after {
          height: 1px;
        }
      }

      &__nav-scroll {
        padding: 10px 25px 10px 25px;
      }

      &__content {
        padding: 0 25px 25px 25px;
        flex: 1
      }
    }

    &.is-select {
      /deep/ .el-tabs {
        &__nav-wrap {
          &.is-top {
            &::before {
              content: '';
              @include dd-fence;
            }
          }

          &:after {
            background-color: transparent;
          }
        }
      }
    }
  }
}
</style>
