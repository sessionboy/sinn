const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
     vendor: ['react','react-dom','material-ui','dva']
    },
    output: {
        path: path.join(__dirname,'build/dll'),
        filename: '[name].[chunkhash].dll.js',
        library: '[name]_library',
    },
    plugins: [
        new CleanWebpackPlugin(['build/dll'],{
          root: __dirname,
          try: true
        }),
        new webpack.DllPlugin({
            path: path.join(__dirname,'build/dll/bundle.manifest.json'),
            name: '[name]_library',
            context: __dirname
        })
    ]
};




