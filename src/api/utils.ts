/**
 * Created by LiuLei on 2019/11/26
 */
import axios from 'axios'

export function getIconNames (url: string) {
  return new Promise((resolve, reject) => {
    axios.get(url).then((res: any) => {
      const svg = res.data.match(/<svg[^>]*>[\s\S]*?<\/[^>]*svg>/gi)[0]
      const symbol = svg.match(/<symbol[^>]*>[\s\S]*?<\/[^>]*symbol>/gi)
      const symbolIds = symbol.map((s: any) => {
        return s.match(/id="[\s\S]*?"/gi)[0].match(/"[\s\S]*?"/)[0].replace(/"/g, '')
      })
      resolve(symbolIds)
    }).catch(reject)
  })
}
