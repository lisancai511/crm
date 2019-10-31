import { Component, Vue } from 'vue-property-decorator'
import designerStore from '@/store/modules/designer'
import api from '@/api'

/**
 * Created by LiuLei on 2019/10/11
 */
@Component({
  name: 'InitLayoutBaseData'
})
export default class extends Vue {
  get objectId () {
    return this.$route.query.objectId as string
  }

  get layoutId () {
    return this.$route.query.layoutId as string
  }

  async initLayoutBaseData () {
    designerStore.initStage(this.objectId)
    designerStore.updateLayoutId(this.layoutId)
    try {
      const [
        { data: { data: objectData } }
      ] =
        await Promise.all([
          api.bizObjects.getObjectById(this.objectId),
          designerStore.getAllFields(),
          designerStore.getAllButtons(),
          designerStore.getLayoutSimple(),
          designerStore.getAllLookups()
        ])
      // 更新设计器当前对象信息
      designerStore.updateObject(objectData)
    } catch (e) {
      console.log(e)
    }
  }
}
