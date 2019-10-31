/**
 * Created by LiuLei on 2019/9/26
 */

export function arrToMap (arr: any[], prop: string) {
  return arr.reduce((pre: any, cur: any) => {
    pre[cur[prop]] = cur
    return pre
  }, {})
}
