import { Component, Vue } from 'vue-property-decorator'
import _ from 'lodash'

interface IEditPushItemFunc {
  (checkValue: string): any
}

@Component({
  name: 'UpdateCurrentField'
})
export default class extends Vue {
  dialogVisible: boolean = false
  checkList: string[] = []

  edit (data: any, attribute: string, key: string = 'id'): void {
    this.checkList = (data[attribute] as []).map(item => (item as any)[key])
    this.dialogVisible = true
  }

  confirmEdit (
    data: any,
    attribute: string,
    key: string = 'id',
    pushCallback: IEditPushItemFunc,
    callback?: Function
  ): void {
    // 过滤删除项
    data[attribute] = data[attribute]
      .filter((item: any) => this.checkList.includes(item[key]))
    // 追加新增项
    const usedKeys: string[] = data[attribute].map((item: any) => item[key])
    this.checkList.forEach((checkedType: string) => {
      if (!usedKeys.includes(checkedType)) {
        if (_.isFunction(pushCallback)) {
          data[attribute].push(pushCallback(checkedType))
        }
      }
    })
    this.dialogVisible = false
    if (_.isFunction(callback)) {
      callback()
    }
  }
}
