
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  publicPath:'./',
  // 打包沐目录
  // outputDir:"aaa",
  // 生成资源目录 /dist/aaa
  // assetsDir:"aaa",
    configureWebpack:{
      // 配置路径文件名
      resolve:{
        alias:{
            '@':'/src'
        },
        extensions: ['.js', '.json', '.vue', '.scss', '.css']
      },
      plugins:[
        new CompressionWebpackPlugin({
          filename:'[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(js|css)$'),
          threshold: 10240,
          minRatio: 0.8
        })
      ]
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
    },
    css:{
      loderOptions:{
        sass:{
          prependData:`
            @import "@/assets/css/theme.scss"
          `
        }
      }
    }
  }