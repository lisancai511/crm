<!--Created by LiuLei on 2019/11/4-->
<template>
  <header-tab-steps
    :tabs="tabs"
    v-model="activeTabName"
    back-title="表单管理"
    back-path="/backstage/office-setting/form-management">
    <template slot="right">
      <el-button
        plain
        type="primary">预览
      </el-button>
      <el-button
        @click="submit"
        type="primary">保存
      </el-button>
    </template>
    <keep-alive>
      <div style="height: 100%"
           v-loading.fullscreen.lock="loading">
        <div style="height: 100%"
             v-if="!loading">
          <component :is="activeTabName"/>
        </div>
      </div>
    </keep-alive>
  </header-tab-steps>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HeaderTabSteps from '@/layout/header-tab-steps.vue'
import FormDesign from '@/views/backstage/office-setting/form-management/new/components/FormDesign.vue'
import BasicSetting from '@/views/backstage/office-setting/form-management/new/components/BasicSetting.vue'
import ApprovalProcess from '@/views/backstage/office-setting/form-management/new/components/ApprovalProcess.vue'
import api from '@/api'
import {
  defaultWorkflow,
  handleNodePermissions
} from '@/views/backstage/office-setting/form-management/new/utils'
import PredefinedFormLayouts from '@/views/designer/config/PredefinedFormLayouts'
import LayoutTypes from '@/views/designer/config/LayoutTypes'
import {
  compressStringToBase64,
  decompressBase64ToString,
  getLocalLayoutFields,
  localFieldToServerField,
  localLayoutToServer,
  serverFieldToLocalField,
  serverLayoutToLocal, validLocalLayout
} from '@/views/designer/utils'
import {
  FORM_ACTION_TYPES,
  IForm,
  IWorkflow
} from '@/views/backstage/office-setting/form-management/types'
import { IField } from '@/views/designer/config/components'
import {
  getPermissionNodes,
  localWorkflowToServer,
  removeDeletedConditions,
  serverWorkflowToLocal
} from '@/views/backstage/office-setting/form-management/utils'
import { arrToMap } from '@/utils'

@Component({
  name: 'FormManagementNew',
  components: {
    ApprovalProcess,
    BasicSetting,
    FormDesign,
    HeaderTabSteps
  }
})
export default class FormManagementNew extends Vue {
  activeTabName = ''
  users: any[] = []
  departments: any[] = []
  loading: boolean = true
  categories: any[] = []
  roles: any[] = []
  forms: {
    form: IForm,
    workflow: IWorkflow
  } = {
    form: {
      id: '',
      name: '',
      description: '',
      categoryId: '',
      standard: false,
      fieldsDefine: [],
      uiDefine: PredefinedFormLayouts()[LayoutTypes.Mobile].define,
      enable: true,
      iconUrl: ''
    },
    workflow: defaultWorkflow()
  }

  get ACTION_TYPE_CODE (): FORM_ACTION_TYPES {
    return +this.$route.query.action
  }

  get tabs () {
    return [
      {
        label: (BasicSetting as any).title,
        name: 'BasicSetting'
      },
      {
        label: (FormDesign as any).title,
        name: 'FormDesign'
      },
      {
        label: (ApprovalProcess as any).title,
        name: 'ApprovalProcess'
      }
    ]
  }

  async created () {
    await this.initData()
    await this.initStore()
  }

  async initStore () {
    try {
      if (this.$store.state.backstage.form) {
        this.$store.unregisterModule(['backstage', 'form'])
      }
      const formFields = this.forms.form.fieldsDefine.map((item: any) => {
        return serverFieldToLocalField(
          {
            ...item,
            id: item.apiName
          }
        )
      })
      handleNodePermissions(getPermissionNodes(this.forms.workflow), formFields)
      this.$store.registerModule(['backstage', 'form'], {
        namespaced: true,
        state: {
          data: {
            form: this.forms.form,
            workflow: this.forms.workflow
          },
          formFields,
          categories: this.categories,
          users: this.users,
          departments: this.departments,
          roles: this.roles
        },
        mutations: {
          UPDATE_FORM_FIELDS (stage, payload) {
            stage.formFields = payload
          },
          UPDATE_WORKFLOW (state, payload) {
            state.data.workflow = payload
          }
        },
        actions: {
          updateFormFields ({ commit, state }, payload) {
            commit('UPDATE_FORM_FIELDS', payload)
            // TODO 优化
            handleNodePermissions(getPermissionNodes(state.data.workflow as any), payload)
            commit('UPDATE_WORKFLOW', removeDeletedConditions({
              workflow: state.data.workflow,
              fields: state.formFields
            }))
          }
        }
      })
      this.loading = false
    } catch (e) {
      console.log(e)
    }
  }

  async initData () {
    const [
      {
        data: {
          data: roles
        }
      },
      {
        data: {
          data: users
        }
      }, {
        data: {
          data: departments
        }
      },
      {
        data: {
          data: categories
        }
      }, {
        data: {
          data: form
        }
      }
    ] = await Promise.all([
      api.mainData.getRoles(),
      api.mainData.getUsersList(),
      api.mainData.getOrganizationsList(),
      api.paasApprovalFlow.getCategories(),
      this.ACTION_TYPE_CODE === FORM_ACTION_TYPES.EDIT
        ? api.paasApprovalFlow.getForm(this.$route.query.f_id as string) : new Promise<any>(resolve => resolve({ data: { data: '' } }))
    ])
    this.roles = roles
    this.users = users
    this.departments = departments
    this.categories = categories
    if (this.ACTION_TYPE_CODE === FORM_ACTION_TYPES.EDIT) {
      this.forms = {
        ...form,
        workflow: serverWorkflowToLocal(form.workflow),
        form: {
          ...form.form,
          fieldsDefine: JSON.parse(form.form.fieldsDefine),
          uiDefine: serverLayoutToLocal({
            uiId: 1,
            serverLayout: JSON.parse(decompressBase64ToString(form.form.uiDefine)),
            fields: JSON.parse(form.form.fieldsDefine)
              .map((field: IField) => {
                return {
                  ...field,
                  id: field.apiName
                }
              })
          })
        }
      }
    } else if (this.ACTION_TYPE_CODE === FORM_ACTION_TYPES.NEW) {
      if (this.categories.length > 0) {
        this.forms.form.categoryId = categories[0].id
      }
    }
  }

  async submit () {
    try {
      const formStore: any = this.$store.state.backstage.form.data
      const { form, workflow } = formStore
      // 验证 start
      // TODO 以后细化
      if (!form.name) {
        this.$message.error('请输入表单名称')
        return
      }
      if (!form.categoryId) {
        this.$message.error('请选择表单分类')
        return
      }
      // 验证当前显示的表单
      this.$bus.$emit('designer/layout/valid')
      // 验证表单
      const localUiDefine = formStore.form.uiDefine
      const validResult = await validLocalLayout({
        vm: this,
        uiDefine: localUiDefine
      })
      console.log(validResult)
      if (validResult.some(item => item.status === 'rejected')) {
        this.$message.error((validResult as any).reduce((pre: any, cur: any) => {
          if (cur.status === 'rejected') {
            pre += ('【' + cur.reason.errors.map((item: any) => {
              return `${item.field}:${item.message}`
            }).join(';') + '】')
          }
          console.log('pre:', pre)
          return pre
        }, ''))
        return
      }
      // 验证 end layoutUiId
      const usedFields = getLocalLayoutFields(form.uiDefine)
      const localFieldByApiName = arrToMap(usedFields, 'apiName')
      const usedServerFields = usedFields.map(localFieldToServerField)
        // @ts-ignore
        .map((field: IField) => {
          return {
            ...field,
            layoutUiConfig: [
              {
                layoutUiId: 1,
                required: localFieldByApiName[field.apiName]?.attrs?.required,
                readOnly: localFieldByApiName[field.apiName]?.attrs?.disabled,
                show: true
              }
            ]
          }
        })
      const fieldsDefine = JSON.stringify(usedServerFields)
      const uiDefine = compressStringToBase64(JSON.stringify(localLayoutToServer(form.uiDefine)))
      const formParams = {
        form: {
          ...form,
          fieldsDefine,
          uiDefine
        },
        workflow: localWorkflowToServer(workflow)
      }
      let id: string = ''
      if (this.ACTION_TYPE_CODE === FORM_ACTION_TYPES.NEW) {
        const {
          data: {
            data: {
              id: _id
            }
          }
        } = await api.paasApprovalFlow.newForm(formParams)
        id = _id
      } else {
        const {
          data: {
            data: {
              id: _id
            }
          }
        } = await api.paasApprovalFlow.putForm(this.$route.query.f_id as string, formParams as any)
        id = _id
      }

      this.$confirm(`${formParams.form.name}发布成功`, '', {
        confirmButtonText: '继续编辑',
        cancelButtonText: '完成',
        type: 'success'
      }).then(() => {
        this.$router.replace({
          path: this.$route.path,
          query: {
            ...this.$route.query,
            f_id: id,
            action: FORM_ACTION_TYPES.EDIT as unknown as string
          }
        })
      }).catch(() => {
        this.$router.replace('/backstage/office-setting/form-management')
      })
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
