<!--Created by LiuLei on 2019/9/5-->
<template>
  <div class="FormDesignHover">
    <div class="form-design-hover__wrap">
      <div class="form-design-hover__inner">
        <h6 class="form-design-hover-title fs-16">悬停页面布局</h6>
        <p class="form-design-hover-subtitle">应用于前台悬停窗口所显示的布局</p>
        <div class="form-design-hover__main">
          <div class="form-design-hover__main__item">
            <fd-transfer
              v-model="usedFields"
              :props="{label:'name'}"
              filterable
              filter-placeholder="请输入搜索关键字"
              :data="fields"/>
          </div>
          <div class="form-design-hover__main__item">
            <div class="m-b-10">
              <strong>选择需要显示的相关列表</strong>
            </div>
            <div class="lookup__wrap__wrap">
              <div class="lookup__wrap">
                <el-collapse
                  @change="handleCollapseChange"
                  v-model="activeCollapseNames">
                  <el-collapse-item
                    v-for="lookup in lookups"
                    :disabled="lookup.loadingFields"
                    v-loading="lookup.loadingFields"
                    element-loading-text="加载字段中"
                    element-loading-background="rgba(255, 255, 255, 0.6)"
                    :key="lookup.id"
                    :name="lookup.id">
                    <template slot="title">
                      <div
                        :class="{checked:lookup.checked}"
                        class="collapse-item__title">
                        <div class="collapse-item__title__item collapse-item__title__item--left">
                          <el-checkbox
                            v-on:click.native.stop
                            :disabled="lookup.loadingFields"
                            @change="handleChangeCheckbox($event,lookup)"
                            v-model="lookup.checked"/>
                          <the-item-label :label="lookup.relatedListTitle">
                            <span class="collapse-item__name">{{lookup.relatedListTitle}}</span>
                          </the-item-label>
                        </div>
                        <div class="collapse-item__title__item collapse-item__title__item--right">
                        <span>
                          <span v-show="lookup.usedFields.length">已选 {{lookup.usedFields.length}} 字段</span>
                        </span>
                          <span>
                          {{activeCollapseNames.includes(lookup.id) ? '收起':'展开'}}
                          <i :class="{active:activeCollapseNames.includes(lookup.id)}"
                             class="el-icon-arrow-right collapse-item__title__arrow"></i>
                        </span>
                        </div>
                      </div>
                    </template>
                    <fd-transfer
                      class="lookup-transfer"
                      v-model="lookup.usedFields"
                      :props="{label:'name'}"
                      filterable
                      filter-placeholder="请输入搜索关键字"
                      :data="lookup.fields"/>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import FdTransfer from '@/views/designer/components/Transfer/index.vue'
import designerStore from '@/store/modules/designer'
import { arrToMap } from '@/utils'
import _ from 'lodash'
import api from '@/api'
import { base64DecompressToString, serverFieldToLocalField } from '@/views/designer/utils'
import LayoutTypes from '@/views/designer/config/LayoutTypes'
import { ILookup, IHoverLookup } from '@/views/designer/types'
import TheItemLabel from '@/views/designer/components/Transfer/TheItemLabel.vue'
import { mixins } from 'vue-class-component'
import initLayout from '@/views/designer/mixins/initLayout'

@Component({
  name: 'FormDesignHover',
  components: { TheItemLabel, FdTransfer }
})
export default class FormDesignHover extends mixins(initLayout) {
  fields: any[] = []
  // usedFields: any[] = []
  allLookups: IHoverLookup[] = []
  activeCollapseNames: any[] = []

  get layoutType () {
    return LayoutTypes.Hover
  }

  get usedFields (): any[] {
    return designerStore.layout[LayoutTypes.Hover].define.usedFields
  }

  set usedFields (val) {
    this.updateLayout({ usedFields: val })
  }

  get lookups (): IHoverLookup[] {
    return designerStore.layout[LayoutTypes.Hover].define.lookups
  }

  set lookups (val) {
    this.updateLayout({ lookups: val })
  }

  get fieldById () {
    return arrToMap(this.fields, 'id')
  }

  get lookupById (): any {
    return designerStore.lookupById
  }

  // 获取全部的相关列表
  async getLookups () {
    try {
      if (designerStore.lookups.length === 0) {
        await designerStore.getAllLookups()
      }
      this.allLookups = _.cloneDeep(designerStore.lookups).map((lookup: ILookup) => {
        return {
          ...lookup,
          usedFields: [],
          checked: false,
          fields: [],
          loadedFields: false,
          loadingFields: false
        }
      })
    } catch (e) {
      console.error(e)
    }
  }

  // 初始化布局
  async initLayout () {
    await this.getLookups()
    this.fields = _.cloneDeep(designerStore.fields)
    const defaultUI = designerStore.layout[LayoutTypes.Hover]
    if (defaultUI.id) {
      try {
        const { data: { data } } = await api.bizObjects.getLayoutUIDetails(
          defaultUI.id,
          designerStore.object.id,
          designerStore.layoutId
        )
        data.define = JSON.parse(base64DecompressToString(data.define))
        data.define.usedFields = data.define.usedFields.map((id: any) => this.fieldById[id])
        data.define.lookups = data.define.lookups.map((item: any) => {
          return {
            ...item,
            checked: true,
            fields: [],
            usedFieldIds: item.usedFields,
            usedFields: [],
            loadedFields: false,
            loadingFields: false
          }
        })
        const layoutLookupIds = data.define.lookups.map((item: IHoverLookup) => item.id)
        this.allLookups.forEach((item: IHoverLookup) => {
          if (!layoutLookupIds.includes(item.id)) {
            data.define.lookups.push(item)
          }
        })
        designerStore.updateLayoutByType({
          layout: {
            ...data,
            define: _.cloneDeep(data.define)
          },
          type: LayoutTypes.Hover
        })
      } catch (e) {
        console.error(e)
      }
    } else {
      designerStore.updateLayoutByType({
        layout: {
          ...designerStore.layout[LayoutTypes.Hover],
          define: {
            usedFields: [],
            lookups: _.cloneDeep(this.allLookups)
          }
        },
        type: LayoutTypes.Hover
      })
    }
  }

  updateLayout (define: { usedFields?: any[], lookups?: any[] }) {
    designerStore.updateLayoutByType({
      layout: {
        ...designerStore.layout[LayoutTypes.Hover],
        define: {
          ...designerStore.layout[LayoutTypes.Hover].define,
          ...define
        }
      },
      type: LayoutTypes.Hover
    })
  }

  handleChangeCheckbox (checked: boolean, lookup: IHoverLookup): void {
    if (checked && !lookup.loadedFields) {
      this.updateLookupFields(lookup.objectId, lookup)
    }
  }

  handleCollapseChange (activeNames: Array<string>): void {
    activeNames.forEach((activeName: string) => {
      const curLookup: IHoverLookup = this.lookupById[activeName]
      curLookup.checked = true
      if (!curLookup.loadedFields) {
        this.updateLookupFields(curLookup.objectId, curLookup)
      }
    })
  }

  async updateLookupFields (objectId: string, lookup: IHoverLookup) {
    designerStore.updateIsStopWatchingLayout(true)
    lookup.loadingFields = true
    try {
      const { data: { data } } = await api.bizObjects.getFields(objectId)
      lookup.fields = data.map(serverFieldToLocalField)
      // 更新使用到的字段
      const filedById = arrToMap(lookup.fields, 'id')
      if (lookup.usedFieldIds && lookup.usedFieldIds.length !== 0 && lookup.usedFields.length === 0) {
        lookup.usedFields = lookup.usedFieldIds.map((id: string) => filedById[id])
      }
      lookup.loadedFields = true
    } catch (e) {
      console.error(e)
    } finally {
      lookup.loadingFields = false
    }
    this.$nextTick(() => {
      designerStore.updateIsStopWatchingLayout(false)
    })
  }
}
</script>

<style lang="scss" scoped>
.FormDesignHover {
  height: 100%;
  position: relative;

  .form-design-hover {
    &__wrap {
      position: absolute;
      top: 20px;
      right: 20px;
      bottom: 20px;
      left: 20px;
    }

    &__inner {
      background-color: #fff;
      height: 100%;
      box-shadow: 0 0 5px 0 rgba(1, 8, 19, 0.12);
      border-radius: 4px;
      padding: 20px 20px;
      display: flex;
      flex-direction: column;

      .FdTransfer {
        flex: 1;
      }
    }

    &-title, &-subtitle {
      margin: 0;
    }

    &-subtitle {
      color: #8A96A0;
      margin-top: 5px;
      margin-bottom: 20px;
    }

    &__main {
      /*border: 1px solid red;*/
      flex: 1;
      display: flex;

      &__item {
        display: flex;
        height: 100%;
        margin-left: 90px;
        position: relative;

        &:first-child {
          margin-left: 0;
        }

        &:last-child {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
      }

      .lookup__wrap {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        overflow-y: auto;

        &__wrap {
          position: relative;
          /*background-color: #FE723F;*/
          flex: 1;
          width: 100%;
          min-height: 300px;
        }
      }

      .lookup-transfer {
        margin-top: 10px;
      }
    }
  }

  .el-collapse {
    border: none;

    /deep/ .el-collapse-item__header {
      width: 325px;
      height: 28px;
      border: none;

      .el-collapse-item__arrow {
        display: none;
      }
    }

    /deep/ .el-collapse-item__wrap {
      border: none;
    }
  }

  .collapse-item__title {
    /*background-color: #FE723F;*/
    width: 325px;
    height: 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &.checked {
      background: rgba(228, 239, 255, 1);
    }

    &__item {
      display: flex;
      flex: 1;

      &--right {
        justify-content: space-between;
        color: #8A96A0;
        padding-right: 4px;
      }

      .el-checkbox {
        margin-right: 10px;
      }
    }

    &__arrow {
      transition: transform .3s, -webkit-transform .3s;

      &.active {
        transform: rotate(90deg);
      }
    }
  }

  .collapse-item__name {
    display: inline-block;
    word-break: keep-all;
    width: 100%;
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
