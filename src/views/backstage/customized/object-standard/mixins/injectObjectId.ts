/**
 * Created by LiuLei on 2019/10/15
 */
import { Component, Vue, Inject } from 'vue-property-decorator'

@Component({
  name: 'InjectObjectId'
})
export default class extends Vue {
  @Inject('objectId') readonly objectId!: string

  created () {
    if (this.objectId) {
      this.getData(this.objectId)
    }
  }

  getData (objectId: string) {
    console.log(objectId)
  }
}
