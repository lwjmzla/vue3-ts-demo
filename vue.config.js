const { defineConfig } = require('@vue/cli-service');
const path = require('path');
module.exports = defineConfig({
  transpileDependencies: [/bb-ui-vue3/],
  chainWebpack (config) {
    config.resolve.symlinks(false);
    config.resolve.alias.set('vue', path.resolve('./node_modules/vue'));
  },
  configureWebpack: (config) => {
    // 调试JS
    config.devtool = 'source-map';
  },
  css: {
    // 查看CSS属于哪个css文件
    sourceMap: true
  }
});

// import { execa } from 'execa';
// import childProcess from 'child_process';

// // execa 返回的 promise 与对象解析。
// const { stdout } = await execa('echo', ['Process execution for humans']);
// console.log(stdout);

// const getGitRevParseCommitId = async (short = true) => {
//   const { stdout } = await execa('git', ['rev-parse', `${short ? '--short' : ''}`, 'HEAD']);
//   return stdout;
// };

// console.log(await getGitRevParseCommitId());
// console.log(childProcess.execSync('git rev-parse --short HEAD').toString());
