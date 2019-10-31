<template>
  <div class="field-add">
    <el-card :body-style="{padding:0,position:'relative'}">
      <div @click="$router.go(-1)" class="close m-r-20">
        <dd-icon name="close"/>
      </div>
      <h3 style="margin:30px 0 30px 20px">{{title}}</h3>
      <div class="tabs__wrap">
        <el-tabs v-model="activeName"
                 class="tabs"
                 :class="{
                    'hide-content':!showFieldForm,
                    'show-content':showFieldForm
                 }"
                 @tab-click="handleClick"
                 tab-position="left">
          <el-tab-pane :lazy="true" v-for="field in basicFields"
                       :key="field.type"
                       :name="field.type"
                       :label="field.name">
            <div v-if="showFieldForm">
              <div class="title">{{field.name}}</div>
              <div class="title_second">{{field.description}}</div>
              <!--            -->
              <component
                :is="field.type"
                :ref="field.type"
                class="title_public"
                @changeShowNext="changeShowNext"
                position='right'
                :data="dataObj"/>
            </div>
            <el-button type="primary"
                       v-if="showFieldForm"
                       style="margin:40px 80px"
                       @click="changeTabs">下一步
            </el-button>
          </el-tab-pane>
        </el-tabs>
        <keep-alive>
          <template v-if="showFieldForm"></template>
          <div v-else class="layout__wrap">
            <FieldDistributeLayout
              :data='dataObj'
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
import TextField from './components/FeildList/components/fields/TextField.vue'
import LongTextField from './components/FeildList/components/fields/LongTextField'
import NumberField from './components/FeildList/components/fields/NumberField.vue'
import DateField from './components/FeildList/components/fields/DateField.vue'
import DateTimeField from './components/FeildList/components/fields/DateTimeField'
import EmailField from './components/FeildList/components/fields/EmailField'
import PhoneField from './components/FeildList/components/fields/PhoneField'
import WebsiteField from './components/FeildList/components/fields/WebsiteField.vue'
import CheckBoxField from './components/FeildList/components/fields/CheckBoxField.vue'
import LookUpField from './components/FeildList/components/fields/LookUpField.vue'
import SearchMoreField from './components/FeildList/components/fields/SearchMoreField.vue'
import OptionListField from './components/FeildList/components/fields/OptionListField.vue'
import AutoNumberField from './components/FeildList/components/fields/AutoNumberField.vue'
import FieldDistributeLayout from './components/FeildList/FieldDistributeLayout.vue'

import ComponentTypes from '@/views/designer/config/ComponentTypes'
import Api from '@/api'
import { serverFieldToLocalField, localFieldToServerField } from '@/views/designer/utils'
import lodash from 'lodash'

@Component({
  name: 'FieldAdd',
  components: {
    TextField,
    LongTextField,
    NumberField,
    DateField,
    DateTimeField,
    EmailField,
    PhoneField,
    WebsiteField,
    CheckBoxField,
    LookUpField,
    SearchMoreField,
    OptionListField,
    AutoNumberField,
    FieldDistributeLayout
  }
})

export default class FieldAdd extends Vue {
  private activeName: any = 'TextField'
  private basicFields: any = ''
  private showFieldForm: any = true
  private dataObj: any = {}
  private title: any = '新建字段'

  get objectId () {
    return this.$attrs.objectId
  }

  get fieldId () {
    return this.$attrs.fieldId
  }

  created () {
    if (this.fieldId) {
      this.getData()
    } else {
      this.dataObj = lodash.cloneDeep(Object.assign(this.dataObj, lodash.cloneDeep(fieldComponents[0])))
      this.basicFields = fieldComponents
    }
  }

  get ComponentTypes () {
    return ComponentTypes
  }

  handleClick (tab: any) {
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
        await Api.bizObjects.updateFields(this.objectId, this.fieldId, localFieldToServerField(this.dataObj))
        this.$router.go(-1)
        this.$message.success('修改成功')
      } else {
        this.showFieldForm = false
      }
    })
  }

  changeShowNext () {
    this.showFieldForm = true
  }

  async getData () {
    const { data: { data } } = await Api.bizObjects.getFieldDetails(this.objectId, this.fieldId)
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
  margin-top: 20px;
  border-top: 1px solid #F1F2F6;
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

  /deep/ .el-tabs__item.is-active {
    background: #E8F1FF;
  }

  /deep/ .el-tabs--left .el-tabs__item.is-left {
    text-align: left;
  }

  /deep/ .el-tabs__item {
    padding: 0 100px 0 60px;
  }

  /deep/ .el-tabs__content {
    border-left: 1px solid #F1F2F6;
    background: #F8FAFC;
    min-height: calc(100vh - 220px);
  }

  /deep/ .el-tabs--left .el-tabs__header.is-left {
    margin: 0;
  }

  /deep/ .el-tabs__nav-wrap::after {
    height: 0;
    background-color: transparent !important;
  }

  .show-content {
    flex: 1
  }

  .hide-content {
    /deep/ .el-tabs__content {
      display: none;
    }
  }

  .layout__wrap {
    flex: 1;
    background-color: #F8FAFC;
    border-left: 1px solid #F1F2F6;
    border-top: 1px solid #F1F2F6;
    margin-top: 20px;
  }

  .tabs__wrap {
    display: flex;
  }
}
</style>
