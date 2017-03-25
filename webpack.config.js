/*
* @ author sessionboy 
* @ github https://github.com/sessionboy
* @ website http://sinn.boyagirl.com
* @ dev Params 开发环境webpack构建
* @ prod Params 生产环境webpack构建
*/ 

const basewebpack = require('./build/webpack.base');
const webpackConfig = {
	dev: require('./build/webpack.dev'),
	prod: require('./build/webpack.prod')
}

// 获取运行环境
const command = process.argv.slice(2)[0];
const env = command.substring(command.indexOf('=')+1);

function buildConfig(env) {
  return webpackConfig[env]({ env: env });
}

module.exports = buildConfig(env);