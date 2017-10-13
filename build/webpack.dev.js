/*
 * @ author sessionboy
 * @ github  https://github.com/sessionboy
 * @ website http://sinn.boyagirl.com
 * @ use 开发环境webpack构建
 */
const commonConfig = require('./webpack.base.js');
const path = require('path');
const webpack = require('webpack');
const config = require('./config');
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const baseConfig = config[process.env.NODE_ENV];

module.exports = merge(commonConfig,{
     cache: true,
     devtool: '#cheap-module-eval-source-map',
     entry: {
       app: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8000',
        'webpack/hot/only-dev-server',
        './src/index.js'
        ],
       lib: ['moment','marked','react-s-alert','react-dropzone','react-stack-grid','whatwg-fetch','rc-upload']
     },
     output: {
        sourceMapFilename: '[name].map',
        filename: 'js/[name].[hash].js'
     },
     stats: {
       colors: true,
       errorDetails: true
     },
     devServer: {
      historyApiFallback: true,
      noInfo: false,
      hot: true,
      stats: 'errors-only',
      contentBase: baseConfig.assetsRootPath,
      publicPath: baseConfig.assetsPublicPath,
      compress: true,
      port: 8000,
      proxy: {
       '/api' : {
         target: 'http://www.boyagirl.com:8080',
       //  target: 'http://localhost:8080',
         secure: false
       }
      }
     },
     plugins: [
       new webpack.DllReferencePlugin({
          context: path.join(__dirname,'..'),
          manifest: require.resolve("./dll/bundle.manifest.json")
       }),
       new CleanWebpackPlugin(['dist'],{
          root: path.join(__dirname,'..'),
          try: true
       }),
       new webpack.NoEmitOnErrorsPlugin(),
       new webpack.HotModuleReplacementPlugin(),
       new FriendlyErrorsPlugin(),
       new webpack.optimize.CommonsChunkPlugin({
         names: ['app','lib'],
         minChunks:2
       }),
       new HtmlWebpackPlugin({
         inject: true,
         template: config.template.templatePath
       }),
       new AddAssetHtmlPlugin({ 
         filepath: path.resolve(__dirname,'dll/*.dll.js'),
         outputPath: 'js',
         publicPath:'/js',
         includeSourcemap: false 
       }),
       new ExtractTextPlugin({ 
         filename: 'css/[name].[contenthash].css', 
         disable: false, 
         allChunks: true 
       }),
       new OpenBrowserPlugin({ url: 'http://localhost:8000' })
     ]
  })
