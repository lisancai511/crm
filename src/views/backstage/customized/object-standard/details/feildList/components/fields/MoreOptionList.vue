<template>
  <div class="singleLine">
    <div v-if="MoreOptionList==='one'">
      <div class="title">选项列表(多选)</div>
      <div class="title_second">允许用户从定义的列表中选择多个值。</div>
      <el-form label-position="right" label-width="80px" :model="formLabelAlign">
        <el-row>
          <el-col :span="12" :offset="1">
              <el-form-item label="标签">
                <el-input v-model="formLabelAlign.name"></el-input>
              </el-form-item>
              <el-form-item label="选项列表值">
                <el-input placeholder="在下面为选项列表字段输入一列值，每个值应单独占一行" type="textarea" :rows="4" v-model="formLabelAlign.type"></el-input>
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
                <el-input type="textarea" :rows="1" v-model="formLabelAlign.type"></el-input>
              </el-form-item>
              <el-button type="primary" @click="changeTabs" style="margin:40px 80px">下一步</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <OneStep :saveData="formLabelAlign" v-if="MoreOptionList==='two'"></OneStep>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import OneStep from './OneStep.vue'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
const missionModule = namespace('daoda/tabs')

@Component({
  name: 'MoreOptionList',
  components: { OneStep }
})
export default class MoreOptionList extends Vue {
  private formLabelAlign = {
    name: 'li', region: '13', type: 'sd'
  }
  @missionModule.Mutation('changeTab') changeTab:any
  @missionModule.State('MoreOptionList') MoreOptionList:any

  changeTabs () {
    this.$store.commit('daoda/tabs/changeTab', 'MoreOptionList')
    this.changeTab('MoreOptionList')
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
/deep/.el-form-item__label {
  width: 82px !important;
}
/deep/.el-form-item__content {
  margin-left: 82px !important;
}
</style>
