/**
 * Created by LiuLei on 2019/11/4
 */
import { Component, Vue } from 'vue-property-decorator'
import api from '@/api'

@Component({
  name: 'DictionariesUtils'
})
export default class DictionariesUtils extends Vue {
  deleteDictionary (id: string) {
    return new Promise((resolve, reject) => {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.globalData.deleteDictionary(id).then((res: any) => {
          this.$message({
            type: 'success',
            message: '删除成功!',
            duration: 500
          })
          resolve(res)
        })
          .catch((e: any) => {
            console.error(e)
            // this.$message({
            //   type: 'info',
            //   message: '删除失败',
            //   duration: 500
            // })
            reject(e)
          })
      }).catch((e) => {
        this.$message({
          type: 'info',
          message: '已取消删除',
          duration: 500
        })
        reject(e)
      })
    })
  }
}
