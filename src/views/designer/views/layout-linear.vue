<!--Created by LiuLei on 2019/9/5-->
<template>
  <div class="FormDesignLiner">
    <div class="form-design-liner__wrap">
      <div class="form-design-liner__inner">
        <h6 class="form-design-liner-title fs-16">行式布局</h6>
        <p class="form-design-liner-subtitle">应用于前台主从录入及批量新增时所显示的布局</p>
        <fd-transfer
          v-model="layout"
          :props="{label:'name'}"
          filterable
          filter-placeholder="请输入搜索关键字"
          :data="data">
          <span class="item__required" slot="right-header">
            设置必填项
          </span>
          <template v-slot:itemRight="{itemRight}">
            <el-switch
              v-model="itemRight.required">
            </el-switch>
          </template>
        </fd-transfer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import FdTransfer from '@/views/designer/components/Transfer/index.vue'
import designerStore from '@/store/modules/designer'
import LayoutTypes from '@/views/designer/config/LayoutTypes'
import api from '@/api'
import _ from 'lodash'
import { decompressBase64ToString } from '@/views/designer/utils'
import { mixins } from 'vue-class-component'
import initLayout from '@/views/designer/mixins/initLayout'

@Component({
  name: 'FormDesignLiner',
  components: { FdTransfer }
})
export default class FormDesignLiner extends mixins(initLayout) {
  data: any[] = []

  get layoutType () {
    return LayoutTypes.Linear
  }

  get layout () {
    return designerStore.layout[LayoutTypes.Linear].define
  }

  set layout (newDefine) {
    designerStore.updateLayoutByType({
      layout: {
        ...designerStore.layout[LayoutTypes.Linear],
        define: newDefine
      },
      type: LayoutTypes.Linear
    })
  }

  async initLayout () {
    this.data = _.cloneDeep(designerStore.fields)
    const defaultUI = designerStore.layout[LayoutTypes.Linear]
    if (defaultUI.id) {
      //  编辑
      // 获取UI详情
      const { data: { data } } = await api.bizObjects.getLayoutUIDetails(
        defaultUI.id,
        designerStore.object.id,
        designerStore.layoutId
      )
      data.define = JSON.parse(decompressBase64ToString(data.define))
      // console.log(data.define)
      this.layout = data.define.map((item: [string, boolean]) => {
        return {
          ..._.cloneDeep(designerStore.fieldByApiName[item[0]]),
          required: item[1]
        }
      })
    } else {
      designerStore.updateLayoutByType({
        layout: {
          ...defaultUI,
          define: []
        },
        type: LayoutTypes.Linear
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.FormDesignLiner {
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  .form-design-liner {
    &__wrap {
      flex: 1;
      padding: 20px;
      /*position: absolute;*/
      /*top: 20px;*/
      /*right: 20px;*/
      /*bottom: 20px;*/
      /*left: 20px;*/
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
  }

  .el-switch {
    transform: scale(0.8) translateX(40px * 0.1);
  }

  .item__required {
    font-size: 12px;
    color: #8A96A0;
    display: block;
    text-align: right;
    padding: 15px 15px 0;
  }
}
</style>
