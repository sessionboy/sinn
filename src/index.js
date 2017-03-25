
/*
 * @ author sessionboy
 * @ github  https://github.com/sessionboy
 * @ website http://sinn.boyagirl.com
 * @ use dva提供的应用初始化构建模块
 * @ 引入polyfill支持es6新的API，比如Iterator、Generator、Set、Maps、Promise等等
 */
import 'babel-polyfill'; 
import './index.css';
import dva from 'dva';
import createLogger from 'redux-logger';
import { browserHistory } from 'dva/router';
import router from './router';
import {
  ArticleModel,
  AppModel,
  UserModel
} from './models/index';

// app初始化
const app = dva({
	history:browserHistory,
	//onAction: createLogger(), 
	onError(e){
     // dva提供的统一错误处理机制
     // 由于在/src/utils/request做了统一处理，这里不再做处理
	}
});

// 注入插件
//app.use({});

// 注入model
app.model(AppModel);
app.model(ArticleModel);
app.model(UserModel);

// 注入路由
app.router(router);

// 启动app
app.start('#root');



