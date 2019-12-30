import { APPROVAL_TARGET_TYPES } from '@/views/backstage/office-setting/form-management/types'
<!--Created by LiuLei on 2019/11/5-->
<template>
  <div class="BasicSetting">
    <div class="basic-setting__inner">
      <el-card>
        <el-form
          :model="form"
          :rules="rules"
          class="basic-form"
          label-position="top">
          <el-form-item
            prop="name"
            label="表单名称">
            <el-input v-model="form.name"/>
          </el-form-item>
          <el-form-item
            prop="categoryId"
            label="表单类型">
            <el-select v-model="form.categoryId" style="width: 100%">
              <el-option
                v-for="item in categories"
                :label="item.name"
                :value="item.id"
                :key="item.id">{{item.name}}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="谁可以发起这个审批">
            <user-select-dialog
              mode="orguser"
              :checked.sync="workflow[0].config.targets">
              <div class="submit__user">
                <user-box
                  :users="users"
                  :departments="departments"
                  :closable="false"
                  :targets="workflow[0].config.targets"/>
              </div>
            </user-select-dialog>
            <!--<el-select
              style="width: 100%"
              v-model="startPeople"
              multiple
              placeholder="请选择">
              <el-option
                v-for="user in this.users"
                :key="user.id"
                :label="user.name"
                :value="user.id">
              </el-option>
            </el-select>-->
          </el-form-item>
          <!--暂时去掉-->
          <!--<el-form-item>
            <span slot="label">
              谁可以设置模板
              <span class="fs-12 label-tips">有权限的人可以编辑这个表单、导出数据</span>
            </span>
            <el-select style="width: 100%" value="1"/>
          </el-form-item>-->
          <el-form-item label="模板图标">
            <icon-select-dialog
              :size="36"
              v-model="form.iconUrl"
              :icon-names="iconNames">
              <div class="template__icon">
                <dd-icon v-if="!form.iconUrl" class="fs-20" name="Addto"/>
                <dd-icon
                  v-else
                  class="icon_url"
                  :full-name="form.iconUrl"/>
              </div>
            </icon-select-dialog>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import IconSelectDialog from '@/components/IconSelectDialog.vue'
import api from '@/api'
import { iconMaps } from '@/assets/icon'
import FormDataStore from '../mixins/form-data-store'
import { mixins } from 'vue-class-component'
import UserSelectDialog
  from '@/components/UserSelectDialog.vue'
import UserBox
  from '@/views/backstage/office-setting/form-management/new/components/WorkflowDrawer/components/UserBox.vue'

@Component({
  name: 'BasicSetting',
  components: { UserBox, UserSelectDialog, IconSelectDialog }
})
export default class BasicSetting extends mixins(FormDataStore) {
  static title = '基础设置'
  iconNames: any[] = []

  // get startPeople () {
  //   return (this.workflow[0] as INodePeople).config.targets.map((target: any) => target.id)
  // }
  //
  // set startPeople (val: string[]) {
  //   (this.workflow[0] as INodePeople).config.targets = val.map((targetId: string) => {
  //     return {
  //       id: targetId,
  //       type: APPROVAL_TARGET_TYPES.USER
  //     }
  //   })
  // }

  get rules () {
    return {
      name: {
        required: true,
        message: '请输入表单名称'
      },
      categoryId: {
        required: true,
        message: '请选择表单类型'
      }
    }
  }

  created () {
    api.utils.getIconNames(iconMaps.form).then((res: any) => {
      this.iconNames = res
      // 增加默认图标
      if (!this.form.iconUrl) {
        this.form.iconUrl = this.iconNames[0]
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.basic-setting {
  &__inner {
    width: 600px;
    margin: 20px auto auto;

    .label-tips {
      color: #9A9A9A;
      margin-left: 6px;
    }

    .template__icon {
      overflow: hidden;
      $color: rgba(221, 221, 221, 1);
      border: 1px dashed $color;
      height: 60px;
      width: 60px;
      text-align: center;
      line-height: 60px;
      color: $color;
      cursor: pointer;
    }

    .icon_url {
      font-size: 66px;
      margin-left: -2px;
      margin-top: -2px;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
}

.submit__user {
  width: 100%;
  border: 1px solid $dd--border-color-base;
  min-height: 40px;
  border-radius: 4px;
  display: flex;
  align-content: center;
  padding: 5px;
  cursor: pointer;
}

.basic-form {
  /deep/ .el-form-item {
    &__label {
      padding-bottom: 0;
    }
  }
}
</style>
