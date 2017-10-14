
/*
 * @ author sessionboy
 * @ github  https://github.com/sessionboy
 * @ website http://sinn.boyagirl.com
 * @ use webpack基本配置
 */
const path = require('path');
const webpack = require('webpack');
const config = require('./config');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const baseConfig = config[process.env.NODE_ENV];

module.exports={
  entry: ['./src/index.js'],
  output: {
    path: baseConfig.assetsRootPath,
    filename: '[name].js',
    publicPath: baseConfig.assetsPublicPath
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },{
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader?minimize' })
      },{
        test: /\.sass/,
        use: ['style-loader','css-loader','sass-loader?outputStyle=expanded&indentedSyntax']
      },{
        test: /\.scss/,
        use: ['style-loader','css-loader','sass-loader?outputStyle=expanded']
      },{
        test: /\.less/,
        use: ['style-loader','css-loader','less-loader']
      },{
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: [ 'url-loader?limit=30000&name=images/[hash:8].[name].[ext]' ]
      },
    ],
    noParse: /node_modules\/(jquey|moment\.js)/
  },
  resolve: {
     modules: [
        path.join(__dirname, "../src"),
        "node_modules"
      ],
     extensions: [".js", ".json", ".jsx", ".css"],
     alias: {
       config: path.resolve(__dirname, '../src/config/'),
       shared: path.resolve(__dirname, '../src/shared/'),
       utils: path.resolve(__dirname, '../src/utils/'),
       assets: path.resolve(__dirname, '../src/assets/')
     }
  },
};

