
/*
 * @ author sessionboy
 * @ github  https://github.com/sessionboy
 * @ website http://sinn.boyagirl.com
 * @ use webpack基本配置
 */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports={
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname,'/../dist/'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },{
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
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
        loader: [ 'url-loader?limit=30000&name=/images/[name].[ext]' ]
      },
    ],
  },
  resolve: {
     modules: [
        path.join(__dirname, "src"),
        "node_modules"
      ],
     extensions: [".js", ".json", ".jsx", ".css"],
     alias: {
       config: path.resolve(__dirname, 'src/config/'),
       shared: path.resolve(__dirname, 'src/shared/'),
       utils: path.resolve(__dirname, 'src/utils/'),
     }
  },
};

