<template>
  <div class="field-add">
    <el-card :body-style="{padding:0,position:'relative'}">
      <div @click="$router.go(-1)"
           class="close m-r-20">
        <dd-icon name="close"/>
      </div>
      <h3 style="margin:20px 0 20px 20px">{{title}}</h3>
      <div class="tabs__wrap">
        <el-tabs v-model="activeName"
                 class="tabs"
                 :class="{
                    'hide-content':!showFieldForm,
                    'show-content':showFieldForm
                 }"
                 @tab-click="handleClick"
                 tab-position="left">
          <el-tab-pane :lazy="true"
                       v-for="(field, index) in basicFields"
                       :key="field.type"
                       :name="field.type"
                       :label="field.name">
            <div v-if="showFieldForm">
              <div class="title">{{field.name}}</div>
              <div class="title_second">{{field.description}}</div>
              <!--            -->
              <component v-if="!fieldId" :is="field.type"
                         :ref="field.type"
                         class="title_public"
                         @changeShowNext="changeShowNext"
                         position='right'
                         :data="newbasicFields[index]"/>
              <component v-else :is="field.type"
                         :ref="field.type"
                         class="title_public"
                         @changeShowNext="changeShowNext"
                         position='right'
                         :data="dataObj"/>
            </div>
            <el-button type="primary"
                       v-if="showFieldForm"
                       style="margin:40px 80px"
                       @click="changeTabs">{{fieldId?'保存':'下一步'}}
            </el-button>
          </el-tab-pane>
        </el-tabs>
        <keep-alive>
          <template v-if="showFieldForm"/>
          <div v-else
               class="layout__wrap">
            <FieldDistributeLayout v-if="!fieldId" :data='newbasicFields[num]'
                                   :field-id="fieldId"
                                   :object-id="objectId"
                                   @changeShowNext='changeShowNext'/>
            <FieldDistributeLayout v-else :data='dataObj'
                                   :field-id="fieldId"
                                   :object-id="objectId"
                                   @changeShowNext='changeShowNext'/>
          </div>
        </keep-alive>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { fieldComponents } from '@/views/designer/config/components'
import FieldDistributeLayout from './components/FeildList/FieldDistributeLayout.vue'
import basicFieldComponents from '@/views/designer/attrs-fields'
import ComponentTypes from '@/views/designer/config/ComponentTypes'
import Api from '@/api'
import {
  serverFieldToLocalField,
  localFieldToServerField
} from '@/views/designer/utils'
import lodash from 'lodash'

@Component({
  name: 'FieldAdd',
  components: {
    ...basicFieldComponents,
    FieldDistributeLayout
  }
})
export default class FieldAdd extends Vue {
  num:any = 0
  private activeName: any = 'TextField'
  private basicFields: any = ''
  private newbasicFields: any = ''
  private showFieldForm: any = true
  private dataObj: any = fieldComponents.reduce((pre: any, cur: any) => {
    const attrs = {
      ...pre.attrs,
      ...(cur.attrs || {})
    }

    pre = {
      ...pre,
      ...cur,
      attrs
    }
    return pre
  }, {
    attrs: {}
  })

  private title: any = '新建字段'

  get objectId () {
    return this.$attrs.objectId
  }

  get fieldId () {
    return this.$attrs.fieldId
  }

  created () {
    this.basicFields = lodash.cloneDeep(fieldComponents)
    this.newbasicFields = lodash.cloneDeep(fieldComponents)
    if (this.fieldId) {
      this.getData()
    } else {
      this.dataObj = lodash.cloneDeep(
        Object.assign(this.dataObj, lodash.cloneDeep(fieldComponents[0]))
      )
    }
  }

  get ComponentTypes () {
    return ComponentTypes
  }

  handleClick (tab: any) {
    this.num = tab.index
    this.showFieldForm = true
    this.basicFields.forEach((item: any) => {
      if (item.type === tab.name) {
        this.$nextTick(() => {
          this.dataObj = Object.assign(this.dataObj, lodash.cloneDeep(item))
        })
      }
    })
  }

  changeTabs () {
    const targetField = this.$refs[this.activeName] as any
    targetField[0].validateForm().then(async () => {
      if (this.$route.params.fieldId) {
        await Api.bizObjects.updateFields(
          this.objectId,
          this.fieldId,
          localFieldToServerField(this.dataObj)
        )
        this.$router.go(-1)
        this.$message.success('修改成功')
      } else {
        this.showFieldForm = false
      }
    })
  }

  changeShowNext (val: any) {
    if (val === 'saveAndAdd') {
      this.dataObj = lodash.cloneDeep(
        Object.assign(this.dataObj, lodash.cloneDeep(fieldComponents[0]))
      )
      this.basicFields = fieldComponents
      this.activeName = 'TextField'
    }
    this.showFieldForm = true
  }

  async getData () {
    const {
      data: { data }
    } = await Api.bizObjects.getFieldDetails(this.objectId, this.fieldId)
    this.dataObj = serverFieldToLocalField(data)
    this.title = '修改字段'
    this.basicFields = fieldComponents.filter((item: any) => {
      return item.type === this.dataObj.type
    })
    this.activeName = this.dataObj.type
  }
}
</script>
<style lang="scss" scoped>
.tabs {
  border-top: 1px solid #f1f2f6;
}

.title {
  font-size: 16px;
  font-weight: 500;
  color: rgba(34, 45, 62, 1);
  margin: 22px 0 3px 24px;

  &_second {
    margin: 0 0 25px 24px;
    font-size: 12px;
    font-weight: 400;
    color: rgba(138, 150, 160, 1);
  }

  &_public {
    width: 700px;
    margin-left: 60px;
  }
}

.close {
  position: absolute;
  right: 0;
  cursor: pointer;
}

.field-add {
  /deep/ .el-tabs--left .el-tabs__active-bar.is-left {
    left: 0;
    width: 4px;
  }

  /deep/.el-tabs__nav {
    margin: 15px 0 0 0;
  }

  /deep/ .el-tabs__item.is-active {
    background: #e8f1ff;
  }

  /deep/ .el-tabs--left .el-tabs__item.is-left {
    text-align: left;
  }

  /deep/ .el-tabs__item {
    padding: 0 100px 0 60px;
  }

  /deep/ .el-tabs__content {
    border-left: 1px solid #f1f2f6;
    background: #f8fafc;
    min-height: calc(100vh - 160px);
  }

  /deep/ .el-tabs--left .el-tabs__header.is-left {
    margin: 0;
  }

  /deep/ .el-tabs__nav-wrap::after {
    height: 0;
    background-color: transparent !important;
  }

  .show-content {
    flex: 1;
  }

  .hide-content {
    /deep/ .el-tabs__content {
      display: none;
    }
  }

  .layout__wrap {
    flex: 1;
    background-color: #f8fafc;
    border-left: 1px solid #f1f2f6;
    border-top: 1px solid #f1f2f6;
    margin-top: 20px;
  }

  .tabs__wrap {
    display: flex;
  }
}
</style>
