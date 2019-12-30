import { Component, Vue, Prop, Inject } from 'vue-property-decorator'
import { IField } from '@/views/designer/config/components'
import { IDesigner } from '@/views/designer/types'
import { DESIGNER_EXEC_TYPES } from '@/views/designer/config/Designer'

@Component({
  name: 'UpdateCurrentField'
})
export default class extends Vue {
  @Inject('designer') readonly designer!: IDesigner
  @Prop({ required: true, type: Object }) readonly layout!: IField

  updateCurrentField (layout: IField | null) {
    // console.log(2212121)
    if (!this.designer.setting) {
      return
    }
    this.$bus.$emit('designer/updateSelectLayout', layout)
  }

  deleteCurField (index: number) {
    console.log('deleteCurField', index)
    // 如果不是后台设置页面则返回
    if (this.designer.setting.execType !== DESIGNER_EXEC_TYPES.DESIGNER) {
      return
    }
    (this.layout.children as []).splice(index, 1)
    this.updateCurrentField(null)
  }
}
