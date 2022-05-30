/*
 * @Description:
 * @Version: 1.0
 * @Author: chengweihang
 * @Date: 2022-05-30 14:57:13
 * @LastEditors: chengweihang
 * @LastEditTime: 2022-05-30 15:17:29
 */
// webpack.config.dev.js

// 合并规则
const { merge } = require("webpack-merge");

const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
// 导入基础配置
const { baseConfig } = require("./webpack.config.base");
module.exports = merge(baseConfig, {
  // 环境设置：开发环境
  mode: "development",
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
