const externalsConfig = require('./externals.config')
const css = process.env.NODE_ENV === 'development'
  ? {} : { extract: { filename: 'css/dd.[hash:8].css' } }

module.exports = {
  productionSourceMap: false,
  css: {
    sourceMap: process.env.NODE_ENV === 'development',
    loaderOptions: {
      sass: {
        sourceMap: process.env.NODE_ENV === 'development',
        data: `
          @import "@/styles/_variables.scss";
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
    proxy: 'http://192.168.3.107:8001'
  }
}
