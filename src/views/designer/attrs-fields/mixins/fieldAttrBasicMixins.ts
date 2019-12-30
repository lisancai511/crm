/**
 * Created by LiuLei on 2019/10/14
 */

import { Component, Vue, Prop } from 'vue-property-decorator'
import { fieldComponents, IField } from '@/views/designer/config/components'
import { arrToMap } from '@/utils'
import _ from 'lodash'

const fieldComponentByType: { [prop: string]: IField } = arrToMap(fieldComponents, 'type')

@Component({
  name: 'fieldAttrBasicMixins'
})
export default class extends Vue {
  @Prop({ required: true, type: Object }) readonly data!: IField
  @Prop({ default: 'right', type: String }) readonly position !: string
  @Prop({
    default () {
      return {}
    },
    type: Object
  }) readonly dynamicRules !: { [prop: string]: any[] }

  currentData:any = {}

  created () {
    this.currentData = _.cloneDeep(this.data)
  }

  get rules (): any {
    const copyRules = _.cloneDeep(fieldComponentByType[this.currentData.type].configRules)
    Object.entries(copyRules as any).forEach(([k, v]) => {
      if (this.dynamicRules[k]) {
        (v as any[]).push(this.dynamicRules[k])
      }
    })
    return copyRules
  }

  validateForm () {
    return new Promise((resolve, reject) => {
      this.$nextTick(() => {
        try {
          const fieldAttrForm = this.$refs.fieldAttrForm as any
          fieldAttrForm.validate((valid: any) => {
            if (valid) {
              resolve(this.currentData)
            } else {
              // eslint-disable-next-line prefer-promise-reject-errors
              reject('错误')
            }
          })
        } catch (e) {
          reject(e)
          console.error(e)
        }
      })
    })
  }
}
