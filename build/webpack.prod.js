
/*
 * @ author sessionboy
 * @ github  https://github.com/sessionboy
 * @ website http://sinn.boyagirl.com
 * @ use 生产环境webpack构建, 最终根目录下生成dist文件夹
 */

const commonConfig = require('./webpack.base.js');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function(env) {
  return Object.assign({},commonConfig,{
    cache: false,
    devtool: false,
    entry: {
       bundle: './src/index.js',
       vendor: ['react','react-dom'],
       lib: ['material-ui']
    },
    output: {
       path: path.join(__dirname, '/../dist/assets/'),
       filename: '[name].js',
       publicPath: '/assets',
       sourceMapFilename: '[name].map'
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),
        new webpack.DefinePlugin({
            'process.env': {
              'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: { screw_ie8: true, keep_fnames: true },
            compress: { screw_ie8: true },
            comments: false,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['lib','vendor', 'manifest'],
            minChunks:2
        }),
        new ExtractTextPlugin({ 
            filename: 'style.css', 
            disable: false, 
            allChunks: true 
        })
    ],
  })
}