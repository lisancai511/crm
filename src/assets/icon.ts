/**
 * Created by LiuLei on 2019/11/26
 */

export const icons = JSON.parse(process.env.VUE_APP_ICONS)
export const iconMaps: {
  app: string,
  object: string
  form: string
} = icons.reduce((pre: any, cur: any) => {
  pre[cur.name] = cur.url
  return pre
}, {})
