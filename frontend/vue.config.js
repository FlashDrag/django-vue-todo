const { defineConfig } = require('@vue/cli-service')
import backendUrl from './src/config.js'
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: [backendUrl],
  },
})
