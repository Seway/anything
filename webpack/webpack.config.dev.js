/*
 * @Description:
 * @Version: 1.0
 * @Author: chengweihang
 * @Date: 2022-05-30 14:57:13
 * @LastEditors: chengweihang
 * @LastEditTime: 2022-05-30 17:01:30
 */
// webpack.config.dev.js

// 合并规则
const {
  merge
} = require("webpack-merge");

const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
// 导入基础配置
const {
  baseConfig
} = require("./webpack.config.base");
module.exports = merge(baseConfig, {
  // 环境设置：开发环境
  mode: "development",

  watch: true,
  watchOptions: {
    // 不监听的文件或文件夹
    ignored: /node_modules/,
    // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高  
    aggregateTimeout: 300,
    // 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的
    poll: 1000
  },

  // 便于开发调试 这里开启source-map模式
  devtool: "source-map",
  // webpack-dev-server 的一下配置，webpack-dev-server 会提供一个本地服务(serve)
  devServer: {
    // host
    host: "127.0.0.1",
    // 端口
    port: 9000,
    // 热更新
    hot: true,
    // 启动时打开浏览器
    open: true,
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new ESLintPlugin({
      fix: true,
      extensions: ["js", "ts", "tsx", "json"],
      exclude: "/node_modules/",
    }),
  ],
});