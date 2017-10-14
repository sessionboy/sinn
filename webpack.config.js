/*
* @ author sessionboy 
* @ github https://github.com/sessionboy
* @ website http://sinn.boyagirl.com
* @ dev Params 开发环境webpack构建
* @ prod Params 生产环境webpack构建
*/ 
const webpackConfig = {
	development: require('./build/webpack.dev'),
	production: require('./build/webpack.prod')
}

module.exports = webpackConfig[process.env.NODE_ENV];