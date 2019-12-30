<!--Created by LiuLei on 2019/12/5-->
<template>
  <div class="drawer-node-form-auth">
    <!--{{permissions}}-->
    <table
      class="form-auth-table">
      <thead class="form-auth-thead">
      <tr>
        <th width="40%">
          <div class="cell">表单字段</div>
        </th>
        <th width="20%">
          <div class="cell">
            <el-radio
              v-model="allSelectedPermissionType"
              :label="PERMISSION_TYPES.EDITABLE">
              {{''}}
              {{PERMISSION_BY_TYPE[PERMISSION_TYPES.EDITABLE].name}}
            </el-radio>
          </div>
        </th>
        <th width="20%">
          <div class="cell">
            <el-radio
              v-model="allSelectedPermissionType"
              :label="PERMISSION_TYPES.READONLY">
              {{''}}
              {{PERMISSION_BY_TYPE[PERMISSION_TYPES.READONLY].name}}
            </el-radio>
          </div>
        </th>
        <th width="20%">
          <div class="cell">
            <el-radio
              v-model="allSelectedPermissionType"
              :label="PERMISSION_TYPES.HIDDEN">
              {{''}}
              {{PERMISSION_BY_TYPE[PERMISSION_TYPES.HIDDEN].name}}
            </el-radio>
          </div>
        </th>
      </tr>
      </thead>
      <tbody class="form-auth-tbody">
      <tr v-for="permission in permissions"
          :key="permission.fieldApiName">
        <td>
          <div class="cell">
            {{(fieldByApiName[permission.fieldApiName] || {}).name}}
          </div>
        </td>
        <td>
          <div class="cell">
            <el-radio
              v-model="permissionMaps[permission.fieldApiName]"
              :label="PERMISSION_TYPES.EDITABLE">
              {{''}}
              <!--              {{PERMISSION_BY_TYPE[PERMISSION_TYPES.EDITABLE].name}}-->
            </el-radio>
          </div>
        </td>
        <td>
          <div class="cell">
            <el-radio
              v-model="permissionMaps[permission.fieldApiName]"
              :label="PERMISSION_TYPES.READONLY">
              {{''}}
              <!--              {{PERMISSION_BY_TYPE[PERMISSION_TYPES.READONLY].name}}-->
            </el-radio>
          </div>
        </td>
        <td>
          <div class="cell">
            <el-radio
              v-model="permissionMaps[permission.fieldApiName]"
              :label="PERMISSION_TYPES.HIDDEN">
              {{''}}
              <!--              {{PERMISSION_BY_TYPE[PERMISSION_TYPES.HIDDEN].name}}-->
            </el-radio>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Inject } from 'vue-property-decorator'
import {
  INodePermission,
  PERMISSION_LIST,
  PERMISSION_TYPES
} from '@/views/backstage/office-setting/form-management/types'
import { arrToMap } from '@/utils'
import { IField } from '@/views/designer/config/components'

@Component({
  name: 'DrawerNodeFormAuth'
})
export default class DrawerNodeFormAuth extends Vue {
  @Inject() readonly workflowGlobal!: {
    fields: IField[]
  }

  @Prop({ required: true, type: Array }) readonly permissions !: INodePermission[]

  get allSelectedPermissionType () {
    const initPermission = {
      [PERMISSION_TYPES.EDITABLE]: true,
      [PERMISSION_TYPES.READONLY]: true,
      [PERMISSION_TYPES.HIDDEN]: true
    }
    this.permissions.forEach((permission: INodePermission) => {
      if (!permission.editable) {
        initPermission[PERMISSION_TYPES.EDITABLE] = false
      }
      if (!permission.readonly) {
        initPermission[PERMISSION_TYPES.READONLY] = false
      }
      if (!permission.hidden) {
        initPermission[PERMISSION_TYPES.HIDDEN] = false
      }
    })
    if (initPermission[PERMISSION_TYPES.EDITABLE]) {
      return PERMISSION_TYPES.EDITABLE
    }
    if (initPermission[PERMISSION_TYPES.READONLY]) {
      return PERMISSION_TYPES.READONLY
    }
    if (initPermission[PERMISSION_TYPES.HIDDEN]) {
      return PERMISSION_TYPES.HIDDEN
    }
    return ''
  }

  set allSelectedPermissionType (permissionType: PERMISSION_TYPES | '') {
    if (!permissionType) {
      return
    }
    const tempPermissions = this.permissions.map((permission: INodePermission) => {
      const tempPermission: INodePermission = {
        fieldApiName: permission.fieldApiName,
        editable: false,
        readonly: false,
        hidden: false
      }
      tempPermission[permissionType] = true
      return tempPermission
    })
    this.$emit('update:permissions', tempPermissions)
  }

  get PERMISSION_TYPES () {
    return PERMISSION_TYPES
  }

  get PERMISSION_LIST () {
    return PERMISSION_LIST
  }

  get PERMISSION_BY_TYPE () {
    return arrToMap(this.PERMISSION_LIST, 'type')
  }

  get permissionMaps () {
    return this.permissions.reduce((pre: any, cur: INodePermission) => {
      let tempPermission: PERMISSION_TYPES = PERMISSION_TYPES.READONLY
      if (cur.editable) {
        tempPermission = PERMISSION_TYPES.EDITABLE
      } else if (cur.readonly) {
        tempPermission = PERMISSION_TYPES.READONLY
      } else if (cur.hidden) {
        tempPermission = PERMISSION_TYPES.HIDDEN
      }
      const that = this
      Object.defineProperty(pre, cur.fieldApiName, {
        get (): any {
          return tempPermission
        },
        set (v: any): void {
          that.$emit('update:permissions', that.permissions.map((permission: INodePermission) => {
            if (permission.fieldApiName !== cur.fieldApiName) {
              return permission
            }
            return {
              fieldApiName: cur.fieldApiName,
              editable: v === PERMISSION_TYPES.EDITABLE,
              readonly: v === PERMISSION_TYPES.READONLY,
              hidden: v === PERMISSION_TYPES.HIDDEN
            }
          }))
        }
      })
      return pre
    }, {})
  }

  get fieldByApiName () {
    return arrToMap(this.workflowGlobal.fields, 'apiName')
  }
}
</script>

<style lang="scss" scoped>

@mixin td-padding() {

  &:first-child {
    .cell {
      padding-left: 20px;
    }
  }

  &:last-child {
    .cell {
      padding-right: 20px;
    }
  }
}

.drawer-node-form-auth {
  margin-left: -20px;
  margin-right: -20px;

  .form-auth {
    &-table {
      width: 100%;
      border-collapse: collapse;
    }

    &-thead {
      > tr {
        > th {
          height: 36px;
          color: #333;
          background: rgba(248, 250, 252, 1);
          text-align: left;
          @include td-padding;
        }
      }
    }

    &-tbody {
      > tr {
        > td {
          height: 40px;
          border-bottom: 1px solid rgba(230, 230, 230, 1);
          @include td-padding;
        }
      }
    }
  }
}
</style>
