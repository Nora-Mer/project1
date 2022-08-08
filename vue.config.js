const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭语法错误提示
  lintOnSave:false,
  // 关闭map
  productionSourceMap:false,

  // 代理跨域
  devServer:{
    proxy:{
      '/api':{
        target:'http://gmall-h5-api.atguigu.cn',
        // pathRewrite:{'^/api' : ''}
      }
    }
  }
})
