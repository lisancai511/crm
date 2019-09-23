import { Component, Vue, Prop, Inject } from 'vue-property-decorator'
import { field } from '@/views/form-designer/config/components'

@Component({
  name: 'UpdateCurrentField'
})
export default class extends Vue {
  @Inject('designer') readonly designer!: boolean
  @Prop({ required: true, type: Object }) readonly layout!: field

  updateCurrentField (layout: field | null) {
    if (!this.designer) {
      return
    }
    this.$bus.$emit('selectLayout', layout)
  }

  deleteCurField (index: number) {
    if (!this.designer) {
      return
    }
    (this.layout.children as []).splice(index, 1)
    this.updateCurrentField(null)
  }
}
