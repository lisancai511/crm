/**
 * Created by LiuLei on 2019/11/26
 */
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'RouterWatch'
})
export default class RouterWatch extends Vue {
  edit () {
    this.$router.push({
      path: this.$route.path,
      query: {
        t: 'edit'
      }
    })
  }

  cancel () {
    this.$router.push(this.$route.path)
  }
}
