<!--Created by LiuLei on 2019/10/15-->
<template>
  <div class="EssentialInformationDetails">
    <div class="main">
      <span class="main_left">对象名称</span>
      <span class="main_right">{{sizeForm.name}}</span>
      <span class="main_edit" @click="edit">
          <dd-icon name="edit"/>编辑</span>
    </div>
    <div class="main">
      <span class="main_left">API Name</span>
      <span class="main_right">{{sizeForm.apiName}}</span>
    </div>
    <div class="main">
      <span class="main_left">创建人</span>
      <span class="main_right">{{sizeForm.creatorName}}</span>
    </div>
    <div class="main">
      <span class="main_left">Name字段类型</span>
      <span class="main_right">{{sizeForm.nameFieldType | filterNameType }}</span>
    </div>

    <div v-if="sizeForm.nameFieldType === 'AutoNumberField'" class="main">
      <span class="main_left">格式</span>
      <span class="main_right">{{sizeForm.autoNumberFormat}}</span>
    </div>
    <div v-if="sizeForm.nameFieldType === 'AutoNumberField'" class="main">
      <span class="main_left">起始编号</span>
      <span class="main_right">{{sizeForm.beginNumber}}</span>
    </div>
    <div v-if="sizeForm.nameFieldType === 'AutoNumberField'" class="main">
      <span class="main_left">编号长度</span>
      <span class="main_right">{{sizeForm.autoNumberLength}}</span>
    </div>

    <div class="main">
      <span class="main_left">图标</span>
      <span class="main_right"><dd-icon :name="sizeForm.iconUrl?sizeForm.iconUrl:''"></dd-icon></span>
    </div>
    <div class="main">
      <span class="main_left">最后修改人</span>
      <span class="main_right">{{sizeForm.lastModifierName}}</span>
    </div>
    <div class="main">
      <span class="main_left">启用</span>
      <span class="main_right"><el-checkbox v-model="sizeForm.enable" disabled></el-checkbox></span>
    </div>
    <div class="main">
      <span class="main_left">Name字段名称</span>
      <span class="main_right">{{sizeForm.nameFieldName}}</span>
    </div>
    <div class="main">
      <span class="main_left">备注</span>
      <span class="main_right">{{sizeForm.description}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  name: 'EssentialInformationDetails',
  filters: {
    filterNameType (val:any) {
      if (val === 'TextField') {
        return '文本'
      }
      if (val === 'AutoNumberField') {
        return '编号文本'
      }
    }
  }
})
export default class EssentialInformationDetails extends Vue {
  @Prop({ required: true, type: Object }) readonly sizeForm !: any

  NameType: any = [{
    label: '文本',
    value: 'TextField'
  }, {
    label: '编号文本',
    value: 'AutoNumberField'
  }]

  edit () {
    this.$emit('edit', true)
  }
}
</script>

<style lang="scss" scoped>
.EssentialInformationDetails {
  .main {
    margin: 20px 20px 0 0;
    width: 800px;

    &_left {
      display: inline-block;
      width: 120px;
      text-align: right;
      margin-right: 20px;
      color: rgba(144, 156, 165, 1);
      vertical-align: top;
    }

    &_right {
      display: inline-block;
      max-width: 430px;
    }

    &_edit {
      color: #FE723F;
      float: right;
      cursor: pointer;
    }
  }
}
</style>
