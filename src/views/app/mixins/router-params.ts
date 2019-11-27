/**
 * Created by LiuLei on 2019/11/12
 */
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'RouterParams'
})
export default class extends Vue {
  get ['moduleId_objectId'] () {
    return this.$route.params['moduleId_objectId'] || ''
  }

  get moduleId () {
    return this['moduleId_objectId'].split('_')[0]
  }

  get objectId () {
    return this['moduleId_objectId'].split('_')[1]
  }

  get appId () {
    return this.$route.params.appId
  }

  get uniqueKey () {
    return this.moduleId + '_' + this.objectId + '_' + this.appId
  }
}
