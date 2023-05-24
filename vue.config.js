const path = require('path')

// const CompressionWebpackPlugin = require('compression-webpack-plugin');
const resolve = (dir) => {
  return path.join(__dirname, dir)
}
const projectConfig = {
  devServerProxy: {
    [process.env.VUE_APP_BASE_URL]: {
      target: process.env.VUE_APP_BASE_API + '/jzy',
      changeOrigin: true,
      pathRewrite: {
        ['^' + process.env.VUE_APP_BASE_URL]: ''
      }
    }
  }
}

module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  publicPath: './',
  devServer: {
    open: true,
    port: 8888,
    // https: true,
    disableHostCheck: true,
    hotOnly: false,
    host: 'wyb.puge.net',
    proxy: {
      ...projectConfig.devServerProxy
    }
  },
  css: {
    sourceMap: false
  },
  chainWebpack: (config) => {
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod.js')
      config.plugins.delete('prefetch').delete('preload')
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        'element-ui': 'ELEMENT'
      })
      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })
    config.when(process.env.NODE_ENV === 'test', config => {
      config.entry('app').clear().add('./src/main-prod.js')
      config.plugins.delete('prefetch').delete('preload')
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        'element-ui': 'ELEMENT'
      })
      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })
    config.optimization.usedExports = true
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')
      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json', '.css'],
      alias: {
        '~': resolve('src'),
        assets: resolve('src/assets'),
        components: resolve('src/components')
      }
    }
  }
}
