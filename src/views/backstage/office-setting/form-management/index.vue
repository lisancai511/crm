<!--Created by LiuLei on 2019/11/4-->
<template>
  <div v-loading.lock="loading" class="form-management">
    <el-card :body-style="{padding:0}">
      <div slot="header">
        <strong class="fs-16">表单管理</strong>
        <div class="header__buttons p-t-20">
          <span v-show="!isSortFormGroup">
            <el-button
              @click="newForm"
              type="primary" size="small">
              新增表单
            </el-button>
            <el-button
              plain
              @click="newFormType"
              type="primary"
              size="small">
              新增表单类型
            </el-button>
            <el-button
              @click="isSortFormGroup = true"
              size="small"
              type="info">分组排序
            </el-button>
          </span>
          <span v-show="isSortFormGroup" style="float: right">
            <el-button
              @click="isSortFormGroup = false"
              size="small">取消</el-button>
            <el-button
              @click="sortCategories"
              size="small"
              type="primary">保存</el-button>
          </span>
        </div>
      </div>
      <draggable
        v-model="categories"
        handle=".form-group-handle-class"
        tag="div">
        <form-group
          :class="{'m-b-10':group.forms.length === 0}"
          :is-sort-form-group="isSortFormGroup"
          v-for="(group,index) in categories"
          :group="group"
          @deleteCategory="deleteCategory(group,index)"
          @renameCategory="renameCategory(group)"
          @submitSortedForms="submitSortedForms(group,$event)"
          :key="group.id">
          <template v-slot:footer="form">
            <form-item-footer
              @edit="editForm(form)"
              @toggleState="toggleFormState(form,group)"
              @deleteForm="deleteForm(form,group)"
              :form="form"/>
          </template>
        </form-group>
      </draggable>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import api from '@/api'
import FormGroup from '@/views/backstage/office-setting/form-management/components/FormGroup.vue'
import FormItemFooter from '@/views/backstage/office-setting/form-management/components/FormItemFooter.vue'
import { FORM_ACTION_TYPES, IForm } from '@/views/backstage/office-setting/form-management/types'

interface ICategory {
  categoryId?: string,
  categoryName: string,
  forms: {
    id: string,
    name: string,
    description: string
    createdTime: string
    approvalFlowId: string,
    enable: boolean,
    targets: {
      id: string
      type: string
    }[]
  }[]
}

@Component({
  name: 'FormManagement',
  components: { FormItemFooter, FormGroup }
})
export default class FormManagement extends Vue {
  categories: ICategory[] = []
  isSortFormGroup: boolean = false
  loading: boolean = false

  async created () {
    try {
      this.loading = true
      await this.getForms()
    } catch (e) {
      console.error(e)
    } finally {
      this.loading = false
    }
  }

  async getForms () {
    try {
      const {
        data: {
          data
        }
      } = await api.paasApprovalFlow.getForms()
      this.categories = data
    } catch (e) {
      console.error(e)
    }
  }

  newForm () {
    this.$router.push({
      path: `${this.$route.path}/design`,
      query: {
        action: FORM_ACTION_TYPES.NEW as unknown as string
      }
    })
  }

  newFormType () {
    this.$prompt('', '新建表单类型', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /\S/,
      inputValue: '',
      inputErrorMessage: '请输入表单类型名称'
    }).then((data: any) => {
      return api.paasApprovalFlow.newFormCategories({
        name: data.value,
        description: ''
      })
    }).then(this.getForms)
  }

  deleteCategory (group: ICategory, index: number) {
    this.$confirm('删除后组内审批单不会被删除，将会进入到“其他”分组', '确认删除', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      return api.paasApprovalFlow.deleteCategory(group.categoryId as string)
    }).then(() => {
      this.categories = this.categories.filter((category: ICategory, i: number) => index !== i)
      this.getForms()
    })
  }

  renameCategory (group: ICategory) {
    this.$prompt('', '重命名分组', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /\S/,
      inputValue: group.categoryName,
      inputErrorMessage: '请输入表单类型名称'
    }).then(async (data: any) => {
      try {
        await api.paasApprovalFlow.putCategory(
          group.categoryId as string,
          { name: data.value }
        )
        group.categoryName = data.value
      } catch (e) {
        console.error(e)
      }
    })
  }

  async sortCategories () {
    try {
      await api.paasApprovalFlow.sortCategories(
        this.categories.map((category: ICategory) => {
          return category.categoryId as string
        }))
      this.isSortFormGroup = false
    } catch (e) {
      console.error(e)
    }
  }

  editForm (from: IForm) {
    this.$router.push({
      path: `${this.$route.path}/design`,
      query: {
        f_id: from.id,
        action: FORM_ACTION_TYPES.EDIT as unknown as string
      }
    })
  }

  async deleteForm (form: IForm, group: ICategory) {
    try {
      await api.paasApprovalFlow.deleteForm(form.id)
      group.forms = group.forms.filter((f: any) => f.id !== form.id)
      this.$message.success('删除成功')
    } catch (e) {
      console.error(e)
    }
  }

  async toggleFormState (form: IForm, group: ICategory) {
    try {
      await api.paasApprovalFlow.putFormEnable({
        formId: form.id,
        enable: !form.enable
      })
      this.$message.success(`${form.enable ? '停用' : '启用 '}成功`)
      const curForm: any = group.forms.find((f: any) => f.id === form.id)
      curForm.enable = !curForm.enable
    } catch (e) {
      console.error(e)
    }
  }

  async submitSortedForms (group: ICategory, done: Function) {
    try {
      await api.paasApprovalFlow.sortForms({
        categoryId: group.categoryId as string,
        formIds: group.forms.map((form: any) => form.id)
      })
    } catch (e) {
      console.error(e)
    } finally {
      done()
    }
  }
}
</script>

<style lang="scss" scoped>
.form-management {
  .header__buttons {
    height: 52px;
  }
}
</style>
