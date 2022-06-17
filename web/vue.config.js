const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    port: 8081,
    proxy: {
      '^/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/api': '' },
        logLevel: 'debug',
      },
    },
  },
  transpileDependencies: true
})
