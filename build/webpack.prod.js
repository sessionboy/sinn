
/*
 * @ author sessionboy
 * @ github  https://github.com/sessionboy
 * @ website http://sinn.boyagirl.com
 * @ use 生产环境webpack构建, 最终根目录下生成dist文件夹
 */

const commonConfig = require('./webpack.base.js');
const path = require('path');
const webpack = require('webpack');
const config = require('./config');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const baseConfig = config[process.env.NODE_ENV];

module.exports = merge(commonConfig,{
    cache: false,
    devtool: 'nosources-source-map',
    entry: {
      app: './src/index.js',
      lib: ['moment','marked','react-s-alert','react-dropzone','react-stack-grid','whatwg-fetch','rc-upload']
    },
    output: {
      path: baseConfig.assetsRootPath,
      filename: 'js/[name].[chunkhash].js',
      publicPath: baseConfig.assetsPublicPath
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
        new webpack.DefinePlugin({
            'process.env': {
              'NODE_ENV': JSON.stringify('production')
            }
        }),
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
        })
    ],
  })
