/**
 * Created by LiuLei on 2019/11/12
 */
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'AppObjects'
})
export default class extends Vue {
  objectId: any
  get objectById () {
    return this.$store.getters['app/objectById']
  }

  get curObject () {
    return this.objectById[this.objectId] || {}
  }

  async created () {
    if (this.$store.getters['app/objects'].length === 0) {
      await this.$store.dispatch('app/getObjects')
    }
  }
}
