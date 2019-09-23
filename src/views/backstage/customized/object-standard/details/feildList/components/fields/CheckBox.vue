<template>
  <div class="singleLine">
     <div v-if="CheckBox==='one'">
        <div class="title">复选框</div>
        <div class="title_second">允许用户选择“真”（选取）或“假”（不选取）值。</div>
        <el-form label-position="right" label-width="80px" :model="formLabelAlign">
          <el-row>
            <el-col :span="12" :offset="1">
                <el-form-item label="标签">
                  <el-input v-model="formLabelAlign.name"></el-input>
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
                <el-form-item label="默认值">
                  <el-radio style="margin-left:20px" v-model="formLabelAlign.type" label="1">已选中</el-radio>
                  <el-radio v-model="formLabelAlign.type" label="2">未选中</el-radio>
                </el-form-item>
                <el-button type="primary" style="margin:40px 80px" @click="changeTabs">下一步</el-button>
            </el-col>
          </el-row>
        </el-form>
     </div>
     <OneStep :saveData="formLabelAlign" v-if="CheckBox==='two'"></OneStep>
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
    name: 'li', region: '13', type: 'sd'
  }
  @missionModule.Mutation('changeTab') changeTab:any
  @missionModule.State('CheckBox') CheckBox:any

  changeTabs () {
    this.$store.commit('daoda/tabs/changeTab', 'CheckBox')
    this.changeTab('CheckBox')
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
