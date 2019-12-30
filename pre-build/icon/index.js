/**
 * Created by LiuLei on 2019/11/26
 */
const icons = require('./urls')

let script = ''
const usedUrls = {}
icons.forEach(icon => {
  if (usedUrls[icon.url]) {
    usedUrls[icon.url] = usedUrls[icon.url] + '_' + icon.name
  } else {
    usedUrls[icon.url] = icon.name
  }
})
Object.entries(usedUrls).forEach(([url, name]) => {
  script += `<script async src="${url}" ${name.split('_').map(n => `data-name-${n}`).join(' ')}></script>`
})
module.exports = {
  script
}
