/**
 * Created by LiuLei on 2019/12/24
 */
import { Component, Inject, Prop, Vue } from 'vue-property-decorator'
import ComponentTypes from '@/views/designer/config/ComponentTypes'
import { DESIGNER_EXEC_TYPES, DESIGNER_UI_TYPES } from '@/views/designer/config/Designer'
import { IDesigner } from '@/views/designer/types'
import { IField } from '@/views/designer/config/components'

@Component({
  name: 'ModelMixins'
})
export default class ModelMixins extends Vue {
  @Inject('designer') readonly designer!: IDesigner
  @Prop({ type: Number }) readonly index!: number
  apiName: any
  // @ts-ignore
  layout: IField
  $store: any

  get model () {
    if (this.designer?.setting.execType === DESIGNER_EXEC_TYPES.DESIGNER) {
      return this.layout.model
    }
    if (this.designer?.setting.uiType === DESIGNER_UI_TYPES.LINEAR) {
      return this.$store.state.app.record?.linear?.[this.index]?.[this.apiName] || ''
    }
    return this.$store.state.app.record?.form?.[this.apiName] || ''
  }

  set model (value: any) {
    if (this.designer?.setting.execType === DESIGNER_EXEC_TYPES.DESIGNER) {
      this.layout.model = value
    } else {
      try {
        switch (this.layout.type) {
          case ComponentTypes.NumberField:
          case ComponentTypes.MoneyField: {
            const decimalDigit = this.layout.attrs.decimalDigit || 2
            const integerDigit = this.layout.attrs.integerDigit || 20
            value = (value.match(new RegExp(`^\\d*(\\.?\\d{0,${decimalDigit}})`, 'g'))[0]) || 0
            if (typeof value === 'string') {
              const integerDigitVal = value.split('.')[0]
              if (integerDigitVal.length > integerDigit) {
                value = value.substring(0, integerDigit)
              }
            }
          }
            break
          default:
        }

        if (this.designer?.setting.uiType === DESIGNER_UI_TYPES.LINEAR) {
          this.$store.dispatch('app/record/updateLinear',
            {
              index: this.index,
              form: {
                key: this.apiName,
                value
              }
            })
        } else {
          this.$store.dispatch('app/record/updateForm',
            {
              key: this.apiName,
              value
            })
        }
      } catch (e) {
        console.error(e)
      }
    }
  }
}
