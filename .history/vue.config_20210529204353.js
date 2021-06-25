var webpack = require('webpack');

module.exports = {
  // baseUrl: '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
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
  }
}