<template>
  <div class="singleLine">
        <el-form label-position="right" label-width="80px" :model="data">
                <el-form-item label="标签">
                  <el-input v-model="data.name"></el-input>
                </el-form-item>
                <el-form-item label="整数位数">
                  <el-input v-model="data.internal"></el-input>
                </el-form-item>
                <el-form-item label="小数点位数">
                  <el-input v-model="data.decimalDigit"></el-input>
                </el-form-item>
                <el-form-item label="API名称">
                  <el-input v-model="data.apiName"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input type="textarea" :rows="6" v-model="data.description"></el-input>
                </el-form-item>
                <el-form-item label="帮助文本">
                  <el-input v-model="data.lookupConfig"></el-input>
                </el-form-item>
                <el-form-item label="默认值">
                  <el-input type="textarea" :rows="1" v-model="data.mandatory"></el-input>
                </el-form-item>
        </el-form>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IField } from '@/views/designer/config/components'

@Component({
  name: 'LangText'
})
export default class LangText extends Vue {
  @Prop({ required: true, type: Object }) readonly data!: IField
  @Prop({ default: 'right', type: String }) readonly position !: string
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
