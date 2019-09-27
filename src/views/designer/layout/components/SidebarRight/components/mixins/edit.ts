import { Component, Vue, Prop } from 'vue-property-decorator'
import { IField } from '@/views/designer/config/components'

@Component({
  name: 'UpdateCurrentField'
})
export default class extends Vue {
  dialogVisible: boolean = false
  checkList: string[] = []

  edit (data: any, attribute: string, key: string = 'key'): void {
    this.checkList = (data[attribute] as []).map(item => (item as any)[key])
    this.dialogVisible = true
  }
}
