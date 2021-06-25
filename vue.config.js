var webpack = require('webpack');

module.exports = {
  // baseUrl: '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:9000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  configureWebpack: {
  },

  pwa: {
    iconPaths: {
    //   favicon32: 'favicon.png',
    //   favicon16: 'favicon.png',
    //   appleTouchIcon: 'favicon.png',
    //   maskIcon: 'favicon.png',
    //   msTileImage: 'favicon.png'
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'cn',
      fallbackLocale: 'cn',
      localeDir: 'locales',
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true
    }
  }
}
