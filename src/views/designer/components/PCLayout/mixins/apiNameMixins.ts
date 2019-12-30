/**
 * Created by LiuLei on 2019/12/24
 */
import { Component, Vue } from 'vue-property-decorator'
import { DESIGNER_EXEC_TYPES } from '@/views/designer/config/Designer'
import { toFormApiName } from '@/views/app/utils'
import { IField } from '@/views/designer/config/components'
import { IDesigner } from '@/views/designer/types'

@Component({
  name: 'ApiNameMixins'
})
export default class ApiNameMixins extends Vue {
  // @ts-ignore
  layout: IField
  // @ts-ignore
  designer: IDesigner

  get apiName () {
    let apiName = this.layout.apiName
    if (this.designer.setting.execType === DESIGNER_EXEC_TYPES.FORM) {
      apiName = toFormApiName(apiName, this.layout.type as any)
    }
    return apiName
  }
}
