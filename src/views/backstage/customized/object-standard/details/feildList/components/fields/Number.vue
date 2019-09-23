<template>
  <div class="singleLine">
    <div v-if="Number1==='one'">
        <div class="title">数字</div>
        <div class="title_second">适用于填写数字，如年龄、数量。定义数字的长度，例如，输入长度为8，小数位数为2，可接受最大值位数即为
    12345678</div>
        <el-form label-position="right" label-width="80px" :model="formLabelAlign">
          <el-row>
            <el-col :span="12" :offset="1">
                <el-form-item label="标签">
                  <el-input v-model="formLabelAlign.name"></el-input>
                </el-form-item>
                <el-form-item label="整数位数">
                  <el-input v-model="formLabelAlign.region"></el-input>
                </el-form-item>
                <el-form-item label="小数点位数">
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
                <el-form-item label="默认值">
                  <el-input type="textarea" :rows="1" v-model="formLabelAlign.type"></el-input>
                </el-form-item>
                <el-button type="primary" @click="changeTabs" style="margin:40px 80px">下一步</el-button>
            </el-col>
          </el-row>
        </el-form>
    </div>
    <OneStep :saveData="formLabelAlign" v-if="Number1==='two'"></OneStep>
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
  @missionModule.State('Number1') Number1:any

  changeTabs () {
    this.$store.commit('daoda/tabs/changeTab', 'Number1')
    this.changeTab('Number1')
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
