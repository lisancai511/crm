<template>
  <div>
    <el-card :body-style="{padding:0}">
      <h3 style="margin:30px 0 30px 20px">新建字段</h3>
      <el-tabs class="tabs" @tab-click="handleClick" tab-position="left">
        <el-tab-pane v-for="field in basicFields"
                     :key="field.type"
                     v-once
                     :label="field.name">
          <template v-if="field.type === LayoutTypes.TextField">
            <div class="title">单行文本</div>
            <div class="title_second">适用于填写简短的文字，如"姓名"</div>
            <TextField class="title_public" position='right' :data="field"/>
          </template>
          <template v-else-if="field.type === LayoutTypes.LongTextField">
            <div class="title">长文本</div>
            <div class="title_second">用于填写大段的文字，如“备注”、“建议”</div>
            <LongTextField class="title_public" position='right' :data="field"/>
          </template>
          <template v-else-if="field.type === LayoutTypes.DateField">
            <div class="title">日期</div>
            <div class="title_second">用于选择特定的日期，比如2088-08-08</div>
            <DateField class="title_public" position='right' :data="field"/>
          </template>
          <template v-else-if="field.type === LayoutTypes.DateTimeField">
            <div class="title">日期时间</div>
            <div class="title_second">用于选择特定的时间，比如2088-08-08 18:08:08</div>
            <DateTimeField class="title_public" position='right' :data="field"/>
          </template>
          <template v-else-if="field.type === LayoutTypes.PhoneField">
            <div class="title">电话</div>
            <div class="title_second">允许用户输入任何电话号码，可直接拨打。</div>
            <PhoneField class="title_public" position='right' :data="field"/>
          </template>
          <el-button type="primary" style="margin:40px 80px" @click="changeTabs">下一步</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TextField from '../components/fields/TextField.vue'
import LongTextField from '../components/fields/LongTextField.vue'
import Number from '../components/fields/Number.vue'
import DateField from '../components/fields/DateField.vue'
import DateTimeField from '../components/fields/DateTimeField.vue'
import Email from '../components/fields/Email.vue'
import PhoneField from '../components/fields/PhoneField.vue'
import WebSite from '../components/fields/WebSite.vue'
import CheckBox from '../components/fields/CheckBox.vue'
import Search from '../components/fields/Search.vue'
import SearchMore from '../components/fields/SearchMore.vue'
import OptionList from '../components/fields/OptionList.vue'
import MoreOptionList from '../components/fields/MoreOptionList.vue'
import AutoNumber from '../components/fields/AutoNumber.vue'
import { namespace } from 'vuex-class'
import { fieldComponents } from '@/views/form-designer/config/components'
import LayoutTypes from '@/views/form-designer/config/LayoutTypes'
import { field } from '../../../../../../form-designer/config/components'

const missionModule = namespace('daoda/tabs')

@Component({
  name: 'NewField',
  components: {
    TextField,
    LongTextField,
    Number,
    DateField,
    DateTimeField,
    Email,
    PhoneField,
    WebSite,
    CheckBox,
    Search,
    SearchMore,
    OptionList,
    MoreOptionList,
    AutoNumber
  }
})

export default class NewField extends Vue {
  private activeName: any = ''
  private basicFields:any = ''

  created () {
    this.basicFields = fieldComponents
  }

  get LayoutTypes () {
    return LayoutTypes
  }

  handleClick (tab: any, event: any) {
    console.log(tab, 898989)
  }

  changeTabs () {
    console.log(this.basicFields)
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
