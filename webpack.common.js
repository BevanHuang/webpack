const path = require('path');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  resolve: {
    alias: {  // 配置别名
      // vue$: path.resolve(__dirname, 'src/lib/vue/dist/vue.esm.js'),
      '@': path.resolve(__dirname, 'src/')
    },
    extensions: [".js", ".vue", ".json"],  // 默认值: [".js", ".json"], 引入时可以省略后缀
  },
  externals: {  // 把一个模块做成外部依赖，不会打包到 js 文件中。
    jquery: 'jQuery',
    lodash: '_'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,   // 加快编译速度，不包含 node_modules 文件内容
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        },{
          loader: 'eslint-loader',
          options: {
            fix: true
          }
        }]
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        include: [path.resolve(__dirname, 'src/')],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-98',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',  // 默认值：Webpack app
      filename: 'main.html',  // 默认值： 'index.html' , 最终生成的文件名
      template: path.resolve(__dirname, 'src/main.html'),  // 把css和js的引用注入到这里
      minify: {
        collapseWhitespace: true,
        removeComments: true,   // 是否移除注释
        removeAttributeQuotes: true  // 移除属性的引号
      }
    }),
    new CleanWebpackPlugin()
  ]
}
