<!--Created by LiuLei on 2019/11/27-->
<template>
  <div class="FormGroup">
    <el-row
      :class="{'is-sort':isSortFormGroup}"
      class="group__header p-l-20 p-r-20">
      <el-col :span="8">
        <span
          class="form-group-handle-class"
          v-show="isSortFormGroup">
          <dd-icon name="change1"/>
        </span>
        {{group.categoryName}}({{group.forms.length}})
      </el-col>
      <el-col :span="8">
        <span style="visibility: hidden">到答</span>
      </el-col>
      <el-col
        v-show="!isSortFormGroup"
        style="text-align: right"
        :span="8">
        <el-button
          v-if="!group.standard"
          @click="renameCategory"
          class="dd-button__text dd-button__text--info"
          type="text">
          <el-icon name="edit"/>
          重命名
        </el-button>
        <el-button
          v-if="!group.standard"
          @click="deleteCategory"
          class="dd-button__text dd-button__text--info"
          type="text">
          <el-icon name="edit"/>
          删除
        </el-button>
        <el-button
          class="dd-button__text dd-button__text--info"
          v-show="!isSortFormGroupItem"
          @click="isSortFormGroupItem = true"
          :disabled="group.forms.length <= 1"
          type="text">
          <el-icon name="edit"/>
          排序
        </el-button>
        <el-button
          class="dd-button__text dd-button__text--info"
          v-show="isSortFormGroupItem"
          @click="submitSortedForms"
          type="text">
          <el-icon name="edit"/>
          完成
        </el-button>
      </el-col>
    </el-row>
    <draggable
      tag="div"
      v-model="group.forms"
      handle=".form-group-item-handle-class"
      v-show="!isSortFormGroup"
      class="group__body p-l-20 p-r-20">
      <el-row
        class="form-item__wrap"
        :class="{'no-border':index === group.forms.length - 1}"
        v-for="(form,index) in group.forms"
        :key="form.id">
        <el-col class="form-item form-item__header" :span="8">
          <span v-show="isSortFormGroupItem" class="form-group-item-handle-class">
              <dd-icon name="change1"/>
            </span>
          <slot name="header" v-bind="form">
            <form-item-header :form="form"/>
          </slot>
        </el-col>
        <el-col
          class="form-item form-item__body"
          v-loading="isSortFormGroupItem"
          element-loading-spinner="''"
          element-loading-background="rgba(255, 255, 255, 0.7)"
          :span="8">
          <slot name="body" v-bind="form">
            <form-item-body :form="form"/>
          </slot>
        </el-col>
        <el-col
          class="form-item form-item__footer"
          v-loading="isSortFormGroupItem"
          element-loading-spinner="''"
          element-loading-background="rgba(255, 255, 255, 0.7)"
          :span="8">
          <slot name="footer" v-bind="form">
            <form-item-footer :form="form"/>
          </slot>
        </el-col>
      </el-row>
    </draggable>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import FormItemHeader from '@/views/backstage/office-setting/form-management/components/FormItemHeader.vue'
import FormItemBody from '@/views/backstage/office-setting/form-management/components/FormItemBody.vue'
import FormItemFooter from '@/views/backstage/office-setting/form-management/components/FormItemFooter.vue'

@Component({
  name: 'FormGroup',
  components: { FormItemFooter, FormItemBody, FormItemHeader }
})
export default class FormGroup extends Vue {
  @Prop({ required: true }) readonly group !: any
  @Prop({ default: false, type: Boolean }) readonly isSortFormGroup !: boolean
  isSortFormGroupItem: boolean = false

  deleteCategory () {
    this.$emit('deleteCategory')
  }

  renameCategory () {
    this.$emit('renameCategory')
  }

  submitSortedForms () {
    this.isSortFormGroupItem = false
    this.$emit('submitSortedForms', () => {
      this.isSortFormGroupItem = false
    })
  }
}
</script>

<style lang="scss" scoped>
.FormGroup {
  .group {
    &__header {
      height: 40px;
      line-height: 40px;
      background: rgba(245, 246, 250, 1);

      &.is-sort {
        margin-bottom: 10px;
      }

      .el-button {
        padding: 0;
      }
    }

    &__body {
      .form-item {
        height: 100%;
        display: flex;
        align-items: center;

        &__wrap {
          border-bottom: 1px solid rgba(242, 243, 246, 1);
          height: 90px;
          display: flex;
          align-items: center;

          &.no-border {
            border-bottom: none;
          }
        }

        &__footer {
          text-align: right;
          justify-content: flex-end;
        }
      }
    }
  }

  .form-group-handle-class, .form-group-item-handle-class {
    cursor: move;
    padding-right: 10px;
  }
}
</style>
