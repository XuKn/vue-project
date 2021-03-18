const px2rem = require('postcss-px2rem')
module.exports ={
  //是否使用编译器版本的vue
  runtimeCompiler : true,

  //eslint 语法检查 关闭
  lintOnSave : false,

  // 关闭source map 文件
  productionSourceMap : false,

  devServer: {
    proxy: {
      '/api': { 
        target: 'http://localhost:4000',
        changeOrigin: true, 
        pathRewrite: { 
          '^/api': ''
        },
      }
    }
  },

  css:{
    loaderOptions: {
      postcss: {
          plugins: [
             px2rem({
               remUnit : 37.5 //换算的基数
             })
          ]
      }
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'zh_CN',
      fallbackLocale: 'zh_CN',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
