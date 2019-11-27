/**
 * Created by LiuLei on 2019/10/10
 */
import { Component, Vue } from 'vue-property-decorator'
import designerStore from '@/store/modules/designer'
import LayoutTypes from '@/views/designer/config/LayoutTypes'
import api from '@/api'
import {
  compressStringToBase64,
  decompressBase64ToString,
  localLayoutToServer,
  serverLayoutToLocal
} from '@/views/designer/utils'
import PredefinedLayouts from '@/views/designer/config/PredefinedLayouts'

@Component({
  name: 'InitLayout'
})
export default class extends Vue {
  get layoutType () {
    return LayoutTypes.PC
  }

  get layout () {
    return designerStore.layout[this.layoutType].define
  }

  async created () {
    this.$bus.$on(`designer/${this.layoutType}/initLayout`, this.initLayoutAfterSave)
    this.initLayout()
  }

  beforeDestroy () {
    this.$bus.$off(`designer/${this.layoutType}/initLayout`, this.initLayoutAfterSave)
  }

  async initLayoutAfterSave () {
    designerStore.updateIsStopWatchingLayout(true)
    await this.initLayout()
    designerStore.updateIsStopWatchingLayout(false)
  }

  async initLayout () {
    const defaultUI = designerStore.layout[this.layoutType]
    //  编辑
    // 获取UI详情
    try {
      const { data: { data } } = await api.bizObjects.getLayoutUIDetails(
        defaultUI.id,
        designerStore.object.id,
        designerStore.layoutId
      )
      if (!data.define) {
        // data.define = designerStore.updateLayoutByType({
        //   layout: PredefinedLayouts.layout1({
        //     buttons: designerStore.buttons,
        //     fields: designerStore.fields
        //     // standObject: designerStore.object
        //   })[this.layoutType],
        //   type: this.layoutType
        // })
        data.define = compressStringToBase64(
          JSON.stringify(localLayoutToServer(
            PredefinedLayouts.layout1({
              buttons: designerStore.buttons,
              fields: designerStore.fields
              // standObject: designerStore.object
            })[this.layoutType].define
          ))
        )
      }
      const localDefine = serverLayoutToLocal({
        serverLayout: JSON.parse(decompressBase64ToString(data.define)),
        needAddFields: data.needAddFields,
        fields: designerStore.fields,
        lookups: designerStore.lookups,
        uiId: defaultUI.id
      })
      designerStore.updateLayoutByType({
        layout: {
          ...data,
          needAddFields: [],
          define: localDefine
        },
        type: this.layoutType
      })
    } catch (e) {
      console.error(e)
    }
  }
}
