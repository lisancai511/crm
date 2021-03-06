const externalsConfig = require('./externals.config')
const staticEnvConfig = require('./static.env.config')
const icons = require('./pre-build/icon/urls')
const iconConfig = require('./pre-build/icon')
process.env.VUE_APP_EXTERNALS_SCRIPT = externalsConfig.externalsScript
process.env.VUE_APP_ENV_SCRIPT = staticEnvConfig.script
process.env.VUE_APP_ICONS = JSON.stringify(icons)
process.env.VUE_APP_ICON_SCRIPT = iconConfig.script
const css = process.env.NODE_ENV === 'development'
  ? {} : { extract: { filename: 'css/dd.[hash:8].css' } }

module.exports = {
  productionSourceMap: false,
  css: {
    sourceMap: process.env.NODE_ENV === 'development',
    loaderOptions: {
      sass: {
        sourceMap: process.env.NODE_ENV === 'development',
        prependData: `
          @import "@/styles/_variables.scss";
          @import "@/styles/_design.scss";
        `
      }
    },
    ...css
  },
  configureWebpack: {
    // plugins: [
    //   new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)()
    // ],
    externals: externalsConfig.externals,
    output: {
      filename: 'js/dd.[hash:8].js'
      // chunkFilename: 'js/vs-[name].[hash:8].js',
    }
  },
  devServer: {
    host: '0.0.0.0',
    // proxy: process.env.VUE_APP_API || ''
    proxy: {
      // '/biz-objects': {
      //   target: 'http://192.168.3.107:8001',
      //   ws: true,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '/paas-metadata': ''
      //   }
      // },
      // '/paas-portal': {
      //   target: 'http://192.168.3.132:8000',
      //   ws: true,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '/paas-portal': ''
      //   }
      // },
      // '/main-data': {
      //   target: 'http://192.168.3.128:9100',
      //   ws: true,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '/main-data': '/'
      //   }
      // },
      '/jili-score': {
        target: 'http://192.168.3.143:9201',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '/jili-score': ''
        }
      },
      // '/': {
      //   target: 'http://192.168.3.105:8100/api/v1'
      // }
      '/api': {
        target: 'http://192.168.3.151:8084',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '/paas-metadata/api/v1': '/api'
        }
      }
    }
  }
}
