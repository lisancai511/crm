<template>
  <div class="singleLine">
     <div v-if="AutoNumber==='one'">
        <div class="title">自动编号</div>
        <div class="title_second">系统按照规则自动生成编码，不可修改。</div>
        <el-form label-position="right" label-width="80px" :model="formLabelAlign">
          <el-row>
            <el-col :span="12" :offset="1">
                <el-form-item label="标签">
                  <el-input v-model="formLabelAlign.name"></el-input>
                </el-form-item>
                <el-form-item label="格式">
                  <el-input v-model="formLabelAlign.type"></el-input>
                </el-form-item>
                <el-form-item label="起始编号">
                  <el-input v-model="formLabelAlign.type"></el-input>
                </el-form-item>
                <el-form-item label="API名称">
                  <el-input v-model="formLabelAlign.type"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input type="textarea" :rows="6" v-model="formLabelAlign.type"></el-input>
                </el-form-item>
                <el-form-item label="帮助文本">
                  <el-input v-model="formLabelAlign.type"></el-input>
                </el-form-item>
                <el-button type="primary" style="margin:40px 80px" @click="changeTabs">下一步</el-button>
            </el-col>
          </el-row>
        </el-form>
     </div>
     <OneStep :saveData="formLabelAlign" v-if="AutoNumber==='two'"></OneStep>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import OneStep from './OneStep.vue'

import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
const missionModule = namespace('daoda/tabs')

@Component({
  name: 'LangText',
  components: { OneStep }
})
export default class LangText extends Vue {
  private formLabelAlign = {
    name: 'li', region: '13', type: '{yyyy}{mm}{dd}{000}'
  }

  @missionModule.Mutation('changeTab') changeTab:any
  @missionModule.State('AutoNumber') AutoNumber:any

  changeTabs () {
    this.changeTab('AutoNumber')
  }
}
</script>
<style lang="scss" scoped>

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
}
</style>
