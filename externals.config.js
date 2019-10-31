/**
 * Created by LiuLei on 2019-01-28
 */

const hasExternals = process.env.VUE_APP_HAS_WEBPACK_EXTERNALS === 'true'
const externals = [
  {
    name: 'vue',
    externalName: 'Vue',
    url: 'https://cdn.bootcss.com/vue/2.6.10/vue.min.js'
  },
  {
    name: 'vuex',
    externalName: 'Vuex',
    url: 'https://cdn.bootcss.com/vuex/3.1.1/vuex.min.js'
  },
  {
    name: 'vue-router',
    externalName: 'VueRouter',
    url: 'https://cdn.bootcss.com/vue-router/3.1.0/vue-router.min.js'
  },
  {
    name: 'element-ui',
    externalName: 'ELEMENT',
    url: 'https://cdn.bootcss.com/element-ui/2.11.1/index.js'
  },
  {
    name: 'lodash',
    externalName: '_',
    url: 'https://cdn.bootcss.com/lodash.js/4.17.15/lodash.min.js'
  },
  {
    name: 'moment',
    externalName: 'moment',
    url: 'https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js'
  }
]

module.exports = {
  hasExternals,
  externals: hasExternals ? externals.reduce((pre, cur) => {
    pre[cur.name] = cur.externalName
    return pre
  }, {}) : {},
  externalsScript: hasExternals ? externals.map(external => `<script src="${external.url}"></script>`).join('') : ``
}
