<template>
  <div class="singleLine">
        <el-form :label-position="position" label-width="80px" :model="data">
                <el-form-item label="标签">
                  <el-input v-model="data.name"></el-input>
                </el-form-item>
                <el-form-item label="格式">
                  <el-input v-model="data.type"></el-input>
                </el-form-item>
                <el-form-item label="起始编号">
                  <el-input v-model="data.type"></el-input>
                </el-form-item>
                <el-form-item label="API名称">
                  <el-input v-model="data.type"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input type="textarea" :rows="6" v-model="data.type"></el-input>
                </el-form-item>
                <el-form-item label="帮助文本">
                  <el-input v-model="data.type"></el-input>
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
