// const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/server.ts'), //入口文件
  output: {
    path: path.resolve(__dirname, '../dist'), //输出路径
    filename: 'app.js'             // 输出项目根目录
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        include: [path.resolve(__dirname, '../src')],
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        // 排除node_modules底下的
        exclude: /node_modules/
      }
    ]
  },
  externals: [
    nodeExternals()
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.vue', '.less', '.scss'],
    alias: {
      "@src": path.resolve(__dirname, '../src'),
      "@config": path.resolve(__dirname, '../src/config'),
      "@constants": path.resolve(__dirname, '../src/constants'),
      "@utils": path.resolve(__dirname, '../src/utils'),
      "@routes": path.resolve(__dirname, '../src/routes'),
      "@models": path.resolve(__dirname, '../src/models'),
      "@crawlies": path.resolve(__dirname, '../src/crawlies'),
      "@controllers": path.resolve(__dirname, '../src/controllers'),
      "@middlewares": path.resolve(__dirname, '../src/middlewares')
    }
  },
  target: 'node', // 服务端打包
  plugins: [
    new CleanWebpackPlugin()
  ]
};