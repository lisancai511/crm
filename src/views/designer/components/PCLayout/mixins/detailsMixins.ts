/**
 * Created by LiuLei on 2019/12/24
 */
import { Component, Inject, Prop, Vue } from 'vue-property-decorator'
import { toFormApiName } from '@/views/app/utils'
import { IField } from '@/views/designer/config/components'
import { IDesigner } from '@/views/designer/types'

@Component({
  name: 'DetailsMixins'
})
export default class DetailsMixins extends Vue {
  @Prop({ type: Object, required: true }) readonly layout!: IField
  @Inject('designer') readonly designer!: IDesigner
  apiName: any

  get modelId () {
    const apiName = toFormApiName(this.apiName, this.layout.type as any)
    return this.$store.state.app.record?.form?.[apiName] || ''
  }

  get moduleId () {
    return this.layout.attrs.lookupConfig?.moduleId
  }
}
