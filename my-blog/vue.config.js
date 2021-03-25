
module.exports = {
    configureWebpack:{
      // 配置路径文件名
      resolve:{
        alias:{
            '@':'/src'
        },
        extensions: ['.js', '.json', '.vue', '.scss', '.css']
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