const webpack = require('webpack')
module.exports = {
    // 解决Cli3 quill-image-resize-module的报错
    chainWebpack: config => {
        config.plugin('provide').use(webpack.ProvidePlugin, [{
            'window.Quill': 'quill',
            'Quill': 'quill/dist/quill.js'
        }]);
    },
    configureWebpack:{
      // 配置路径文件名
      resolve:{
        alias:{
            '@':'/src'
        }
      }
    },
    devServer:{
      proxy:{
        '/api':{
          target:'http://127.0.0.1:25371',
          changeOrigin:true,
          pathRewrite:{
              '^/api':''
          }
        }
      }
    }
  }