const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let devConfig = {
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
      hot: true,
      contentBase: path.join(__dirname, 'dist'),
      open: true,
      publicPath: '/',   // 此路径下的打包文件可在浏览器中访问
      proxy: {  // 设置代理
        "/api": {  // 访问 api 开头的请求，会跳转到下面的 target 配置
          target: "http://192.168.0.102:8080",
          pathRewrite: {"^/api": "/mockjsdata/5/api"}
          // /api/getuser  =>  http://192.168.0.102:8080/mockjsdata/5/api/getuser
        }
      }
  },
  module: {
    rules: [
      {
        test: /\.(sc|c|sa)ss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: loader => [
                require('autoprefixer')({ browsers: ['> 0.15% in CN'] }) // 添加前缀
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin(),  // 打包模块报表
    new webpack.NamedModulesPlugin(),  // 更容易查看（patch）的依赖
    new webpack.HotModuleReplacementPlugin()  // 替换插件
  ]
}

module.exports = merge(common, devConfig);
