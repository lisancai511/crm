<template>
  <div>
    <el-card :body-style="{padding:0,position:'relative'}">
      <div @click="$router.go(-1)" class="close m-r-20"><dd-icon name="close"/></div>
      <h3 style="margin:30px 0 30px 20px">新建字段</h3>
      <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick" tab-position="left">
        <el-tab-pane v-for="field in basicFields"
                     :key="field.type"
                     :name="field.type"
                     :label="field.name">
          <template v-if="field.type === ComponentTypes.TextField">
            <div v-if="showNext">
               <div class="title">单行文本</div>
               <div class="title_second">适用于填写简短的文字，如"姓名"</div>
               <TextField class="title_public" position='right' :data="dataObj"/>
            </div>
            <OneStep :saveData='dataObj' @changeShowNext='changeShowNext' v-else></OneStep>
          </template>

          <template v-else-if="field.type === ComponentTypes.LongTextField">
            <div v-if="showNext">
                <div class="title">长文本</div>
                <div class="title_second">用于填写大段的文字，如“备注”、“建议”</div>
                <LongTextField class="title_public" position='right' :data="dataObj"/>
            </div>
            <OneStep :saveData='dataObj' @changeShowNext='changeShowNext' v-else></OneStep>
          </template>

          <template v-else-if="field.type === ComponentTypes.NumberField">
            <div v-if="showNext">
                <div class="title">数字</div>
                <div class="title_second">用于填写大段的文字，如“备注”、“建议”</div>
                <NumberField class="title_public" position='right' :data="dataObj"/>
            </div>
            <OneStep :saveData='dataObj' @changeShowNext='changeShowNext' v-else></OneStep>
          </template>

          <template v-else-if="field.type === ComponentTypes.DateField">
            <div v-if="showNext">
                <div class="title">日期</div>
                <div class="title_second">用于填写大段的文字，如“备注”、“建议”</div>
                <DateField class="title_public" position='right' :data="dataObj"/>
            </div>
            <OneStep :saveData='dataObj' @changeShowNext='changeShowNext' v-else></OneStep>
          </template>

          <template v-else-if="field.type === ComponentTypes.DateTimeField">
            <div v-if="showNext">
                <div class="title">日期时间</div>
                <div class="title_second">用于填写大段的文字，如“备注”、“建议”</div>
                <DateTimeField class="title_public" position='right' :data="dataObj"/>
            </div>
            <OneStep :saveData='dataObj' @changeShowNext='changeShowNext' v-else></OneStep>
          </template>

          <template v-else-if="field.type === ComponentTypes.EmailField">
            <div v-if="showNext">
                <div class="title">电子邮件</div>
                <div class="title_second">用于输入邮件地址</div>
                <EmailField class="title_public" position='right' :data="dataObj"/>
            </div>
            <OneStep :saveData='dataObj' @changeShowNext='changeShowNext' v-else></OneStep>
          </template>

          <template v-else-if="field.type === ComponentTypes.PhoneField">
            <div v-if="showNext">
                <div class="title">电话</div>
                <div class="title_second">用于填写大段的文字，如“备注”、“建议”</div>
                <PhoneField class="title_public" position='right' :data="dataObj"/>
            </div>
            <OneStep :saveData='dataObj' @changeShowNext='changeShowNext' v-else></OneStep>
          </template>

          <template v-else-if="field.type === ComponentTypes.WebsiteField">
            <div v-if="showNext">
                <div class="title">网址</div>
                <div class="title_second">用于填写大段的文字，如“备注”、“建议”</div>
                <WebsiteField class="title_public" position='right' :data="dataObj"/>
            </div>
            <OneStep :saveData='dataObj' @changeShowNext='changeShowNext' v-else></OneStep>
          </template>

          <template v-else-if="field.type === ComponentTypes.CheckBoxField">
            <div v-if="showNext">
                <div class="title">复选框</div>
                <div class="title_second">用于填写大段的文字，如“备注”、“建议”</div>
                <CheckBoxField class="title_public" position='right' :data="dataObj"/>
            </div>
            <OneStep :saveData='dataObj' @changeShowNext='changeShowNext' v-else></OneStep>
          </template>

          <template v-else-if="field.type === ComponentTypes.LookUpField">
            <div v-if="showNext">
                <div class="title">查找</div>
                <div class="title_second">创建一个将此对象链接到另一对象的关系，仅单选</div>
                <LookUpField class="title_public" position='right' :data="dataObj"/>
            </div>
            <OneStep :saveData='dataObj' @changeShowNext='changeShowNext' v-else></OneStep>
          </template>

          <template v-else-if="field.type === ComponentTypes.LookUpMoreField">
            <div v-if="showNext">
                <div class="title">查找多选</div>
                <div class="title_second">创建一个将此对象链接到另一对象的关系，支持多选</div>
                <LookUpField class="title_public" position='right' :data="dataObj"/>
            </div>
            <OneStep :saveData='dataObj' @changeShowNext='changeShowNext' v-else></OneStep>
          </template>

          <template v-else-if="field.type === ComponentTypes.OptionListField">
            <div v-if="showNext">
                <div class="title">选项列表</div>
                <div class="title_second">允许用户从自定义的列表中选择值。</div>
                <OptionListField class="title_public" position='right' :data="dataObj"/>
            </div>
            <OneStep :saveData='dataObj' @changeShowNext='changeShowNext' v-else></OneStep>
          </template>

          <template v-else-if="field.type === ComponentTypes.MoreOptionListField">
            <div v-if="showNext">
                <div class="title">选项列表（多选）</div>
                <div class="title_second">用于填写大段的文字，如“备注”、“建议”</div>
                <MoreOptionListField class="title_public" position='right' :data="dataObj"/>
            </div>
            <OneStep :saveData='dataObj' @changeShowNext='changeShowNext' v-else></OneStep>
          </template>

          <template v-else-if="field.type === ComponentTypes.AutoNumberField">
            <div v-if="showNext">
                <div class="title">自动编号</div>
                <div class="title_second">系统按照规则自动生成编码，不可修改。</div>
                <AutoNumberField class="title_public" position='right' :data="dataObj"/>
            </div>
            <OneStep :saveData='dataObj' @changeShowNext='changeShowNext' v-else></OneStep>
          </template>

          <el-button type="primary" v-show="showNext" style="margin:40px 80px" @click="changeTabs">下一步</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IField, fieldComponents } from '@/views/designer/config/components'
import TextField from '../components/fields/TextField.vue'
import LongTextField from '../components/fields/LongTextField'
import NumberField from '../components/fields/NumberField.vue'
import DateField from '../components/fields/DateField.vue'
import DateTimeField from '../components/fields/DateTimeField.vue'
import EmailField from '../components/fields/EmailField.vue'
import PhoneField from '../components/fields/PhoneField.vue'
import WebsiteField from '../components/fields/WebsiteField.vue'
import CheckBoxField from '../components/fields/CheckBox.vue'
import LookUpField from '../components/fields/LookUp.vue'
import SearchMoreField from '../components/fields/SearchMore.vue'
import OptionListField from '../components/fields/OptionList.vue'
import MoreOptionListField from '../components/fields/MoreOptionList.vue'
import AutoNumberField from '../components/fields/AutoNumberField.vue'
import OneStep from './OneStep.vue'

import AutoNumber from '../components/fields/AutoNumber.vue'

import ComponentTypes from '@/views/designer/config/ComponentTypes'
import Api from '@/api'
import { serverFieldToLocalField } from '@/views/designer/config/presetLayouts/index.ts'
import lodash from 'lodash'

@Component({
  name: 'NewField',
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
    MoreOptionListField,
    AutoNumberField,
    OneStep
  }
})

export default class NewField extends Vue {
  private activeName: any = 'TextField'
  private basicFields:any = ''
  private showNext:any = true
  private dataObj:any = {
    attrs: {}
  }
  private valueCandidates:any = {}

  created () {
    this.basicFields = fieldComponents
    if (this.$route.query.fieldId) {
      this.getData()
    } else {
      this.dataObj = lodash.cloneDeep(fieldComponents[0])
    }
  }

  mounted () {
  }

  get ComponentTypes () {
    return ComponentTypes
  }

  handleClick (tab: any, event: any) {
    this.showNext = true
    this.basicFields.forEach((item:any) => {
      if (item.type === tab.name) {
        this.dataObj = lodash.cloneDeep(item)
      }
    })
    if (this.dataObj.type === 'OptionListField' || this.dataObj.type === 'MoreOptionListField') {
      this.valueCandidates = this.dataObj.valueCandidates
      let ary:any = []
      this.dataObj.valueCandidates.forEach((item:any) => {
        ary.push(item.v)
      })
      this.dataObj.valueCandidates = ary.join('\n')
    }
  }

  changeTabs () {
    if (this.dataObj.type === 'OptionListField' || this.dataObj.type === 'MoreOptionListField') {
      let arr = this.dataObj.valueCandidates.split(/\n/)
      let newArr:any = []
      arr.forEach((item:any, index:any) => {
        let obj:any = {}
        if (this.valueCandidates[index] && this.valueCandidates[index].id) {
          obj.v = item
          obj.id = this.valueCandidates[index].id
        } else {
          obj.v = item
        }
        newArr.push(obj)
      })
      this.dataObj.valueCandidates = newArr
    }
    this.showNext = false
  }
  changeShowNext (data:any) {
    this.showNext = true
  }
  async getData () {
    const { data } = await Api.bizObjects.getSingleFields(this.$route.query.id as string, this.$route.query.fieldId)
    this.dataObj = serverFieldToLocalField(data)
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
  font-size:16px;
  font-family:'PingFangSC';
  font-weight:500;
  color:rgba(34,45,62,1);
  margin: 22px 0 3px 24px;
  &_second {
    margin: 0px 0 25px 24px;
    font-size:12px;
    font-family:'PingFangSC';
    font-weight:400;
    color:rgba(138,150,160,1);
  }
  &_public {
    width: 700px;
    margin-left: 60px;
  }
}
.close {
  position: absolute;
  right: 0px;
  cursor: pointer;
}

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
  min-height: 800px;
}

/deep/ .el-tabs--left .el-tabs__header.is-left {
  margin: 0;
}

/deep/ .el-tabs__nav-wrap::after {
  height: 0px;
  background-color: transparent !important;
}
</style>
