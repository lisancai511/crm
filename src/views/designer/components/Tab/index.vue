<!--Created by LiuLei on 2019/9/12-->
<template>
  <div
    v-if="layout.children && layout.children.length > 0"
    :class="{'designer--mobile':designer.isMobile}"
    class="com-tab">
    <el-tabs v-model="tabValue"
             :class="{'is-select':layout.isSelect && this.designer.isBackstage}">
      <el-tab-pane v-for="(tab) in layout.children.filter(tab => tab.show)"
                   lazy
                   :key="tab.key"
                   :label="tab.name"
                   :name="tab.type">
        <!--<div v-for="i in 100" :key="i">测试</div>-->
        <div class="com-tab-content-inner">
          <fd-components-tab-details
            v-bind="tab.attrs"
            :layout="tab.children"
            v-if="tab.type === ComponentTypes.InfoTabDetails"/>
          <fd-components-tab-activity
            v-bind="tab.attrs"
            v-else-if="tab.type === ComponentTypes.InfoTabActivity"/>
          <fd-components-tab-related-list
            :class="{'dd-fence':tab.isSelect}"
            :layout="tab"
            @click.native.stop="updateCurrentField(tab)"
            v-bind="tab.attrs"
            v-else-if="tab.type === ComponentTypes.InfoTabRelatedList"/>
          <fd-components-tab-file
            v-bind="tab.attrs"
            v-else-if="tab.type === ComponentTypes.InfoTabFile"/>
          <fd-components-tab-follow-up
            :class="{'dd-fence':tab.isSelect}"
            v-bind="tab.attrs"
            :layout="tab"
            @click.native.stop="updateCurrentField(tab)"
            v-else-if="tab.type === ComponentTypes.InfoTabFollowUp"/>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import FdComponentsTabDetails from '@/views/designer/components/Tab/Details.vue'
import ComponentTypes from '@/views/designer/config/ComponentTypes'
import FdComponentsTabActivity from '@/views/designer/components/Tab/Activity.vue'
import FdComponentsTabFile from '@/views/designer/components/Tab/File.vue'
import FdComponentsTabRelatedList from '@/views/designer/components/Tab/RelatedList/index.vue'
import FdComponentsTabFollowUp from '@/views/designer/components/Tab/FollowUp.vue'

import { mixins } from 'vue-class-component'
import updateCurrentField from '@/views/designer/mixins/updateCurrentField'

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
export default class FdComponentsTab extends mixins(updateCurrentField) {
  tabValue: string = 'tabValue'

  get ComponentTypes () {
    return ComponentTypes
  }

  created () {
    this.tabValue = this.layout.attrs.tabValue
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
      /deep/ > .el-tabs__header {
        .el-tabs {
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

  &.designer--mobile {
    .com-tab {
      &-content-inner {
      }
    }

    .el-tabs {
      .el-tab-pane {
      }

      /deep/ .el-tabs {
        &__header {
          margin-bottom: 1px;
        }

        &__item {
          padding: 0 10px;
        }

        &__nav-wrap {
          &:after {
          }
        }

        &__nav-scroll {
          padding-left: 15px;
          padding-right: 15px;
        }

        &__content {
          padding: 0;
        }
      }

      &.is-select {
        /deep/ .el-tabs {
          &__nav-wrap {
            &.is-top {
              &::before {
              }
            }

            &:after {
            }
          }
        }
      }
    }
  }
}
</style>
