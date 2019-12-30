/**
 * Created by LiuLei on 2019/11/28
 */
import { Component, Vue } from 'vue-property-decorator'
import { INode } from '@/views/backstage/office-setting/form-management/types'

@Component({
  name: 'FormDataStore'
})
export default class FormDataStore extends Vue {
  // @Prop({ required: true }) readonly form !: any

  get form () {
    return this.$store.state.backstage.form.data.form
  }

  get workflow (): INode[] {
    return this.$store.state.backstage.form.data.workflow
  }

  get categories () {
    return this.$store.state.backstage.form.categories
  }

  get users () {
    return this.$store.state.backstage.form.users
  }

  get roles () {
    return this.$store.state.backstage.form.roles
  }

  get departments () {
    return this.$store.state.backstage.form.departments
  }

  get fields () {
    return this.$store.state.backstage.form.formFields
  }
}
