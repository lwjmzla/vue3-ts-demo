const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: [/bb-ui-vue3/],
  configureWebpack: (config) => {
    // 调试JS
    config.devtool = 'source-map';
  },
  css: {
    // 查看CSS属于哪个css文件
    sourceMap: true
  }
});
