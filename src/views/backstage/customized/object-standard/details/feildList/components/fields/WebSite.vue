<template>
  <div class="singleLine">
    <div v-if="WebSite==='one'">
      <div class="title">网址</div>
      <div class="title_second">用于输入网站地址，如果用户单击该字段，将根据用户选择的模式在浏览器中打开</div>
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
                <el-input type="textarea" :rows="1" v-model="formLabelAlign.type"></el-input>
              </el-form-item>
              <el-button type="primary" @click="changeTabs" style="margin:40px 80px">下一步</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <OneStep :saveData="formLabelAlign" v-if="WebSite==='two'"></OneStep>
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
  @missionModule.State('WebSite') WebSite:any

  changeTabs () {
    this.$store.commit('daoda/tabs/changeTab', 'WebSite')
    this.changeTab('WebSite')
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
