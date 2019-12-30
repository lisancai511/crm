/**
 * Created by LiuLei on 2019/11/20
 */
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'HandleClickButton'
})
export default class extends Vue {
  async getQuery () {
    const recordType = await (this.$refs as any).recordTypeDialog.selectRecordType()
    const query: any = {}
    if (recordType) {
      query.recordTypeId = recordType.id
    }
    return query
  }

  async newRecord (path: string) {
    const query = await this.getQuery()
    await this.$router.push({
      path,
      query
    })
  }

  async batchNewRecord (path: string) {
    const query = await this.getQuery()
    await this.$router.push({
      path,
      query
    })
  }
}
