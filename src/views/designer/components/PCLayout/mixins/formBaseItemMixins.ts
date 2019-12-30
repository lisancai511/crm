import { Component, Inject, Prop, Vue } from 'vue-property-decorator'
import { IDesigner } from '@/views/designer/types'
import { IField } from '@/views/designer/config/components'
import { DESIGNER_EXEC_TYPES, DESIGNER_UI_TYPES } from '@/views/designer/config/Designer'
import { serverFieldToLocalField } from '@/views/designer/utils'
import { arrToMap } from '@/utils'

/**
 * Created by LiuLei on 2019/12/24
 */
@Component({
  name: 'FormBaseItemMixins'
})
export default class FormBaseItemMixins extends Vue {
  @Inject('designer') readonly designer!: IDesigner
  @Prop({ required: true }) readonly value!: any
  @Prop({ type: Object, required: true }) readonly layout!: IField
  @Prop({ type: Number }) readonly index!: number

  get model () {
    return this.value
  }

  set model (val: any) {
    this.$emit('input', val)
  }

  get record () {
    if (this.designer?.setting.uiType === DESIGNER_UI_TYPES.LINEAR) {
      return this.$store?.state?.app?.record?.linear?.[this.index] || {}
    }
    return this.$store?.state?.app?.record?.form || {}
  }

  get fieldById () {
    let fields = this.$store?.state?.app?.record?.fields || []
    if (fields.length === 0) {
      return {}
    }
    if (!fields[0].addrs && fields[0].dataType) {
      fields = fields.map(serverFieldToLocalField)
    }
    return arrToMap(fields, 'id')
  }

  // 获取全部字段依赖
  get fieldDependencies () {
    if (this.designer.setting.execType === DESIGNER_EXEC_TYPES.FORM) {
      return this.$store.state.app.record?.fieldDependencies || []
    }
    return []
  }
}
