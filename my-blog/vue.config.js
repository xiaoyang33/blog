
module.exports = {
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