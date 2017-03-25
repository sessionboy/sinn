
/*
 * @ author sessionboy
 * @ github  https://github.com/sessionboy
 * @ website http://sinn.boyagirl.com
 * @ use app这个model主要应用于首页信息加载，公共模块，布局模块数据如侧边栏等
 */

import {
	query,
  getmenu_category
} from '../services/IndexServer';
import Alert from 'react-s-alert';
import cookies from 'js-cookie';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'apps',
  state: {
    open: false,
    propState: false,
    optype: null, // action/操作类型
    alert: { open: false, message: null },
    categoryId: null,     // 二级分类id
    data: [],
    category: [],         // 菜单分类
    current: 1,           // 当前页
    totals: 0,            // 数据总数
    hot: [],              // 首页热门推荐
    lists: [],            // 首页列表数据
    isNoMoredata: false,      // 是否没有更多数据了
    iscategory: false     // 是否已切换为分类查询
  },
  subscriptions: {
   setup({ dispatch, history }) {
    history.listen(location => { 
      if(location.pathname === '/'){
        dispatch({
          type: 'query',
          payload: location.query
        })
      }
    })
   },
  },

  effects: {

    // 加载蒙版
    *drawer({ payload }, { call, put }){
      yield put({ type: 'handleOnDrawer' });
    },

    // 加载首页数据
    *query({ payload }, { call, put,select }) {

      const { pageSize,categoryId,current } = payload;
      const params = { pageSize,categoryId,current };

      let { data } = yield call(query,params);     
      let { isNoMoredata } = yield select(({ apps })=>apps.isNoMoredata);
      const { lists } = data;

      if(lists.length<20){
        isNoMoredata = true;
      }
      delete data.lists;
      yield put({ 
       type: 'querySuccess',
       payload:{ ...payload, ...data, lists, open:false,isNoMoredata } 
     });

    }, 

    // 加载左侧菜单数据
    *query_category({ payload }, { call, put }) {
     const category = yield call(getmenu_category);
     yield put({
       type: 'querySuccess',
       payload: { category: category.data }
     })
    },
    
  },

  reducers: {
    querySuccess(state, action) {
      return { ...state, ...action.payload };
    },
    handleOnDrawer(state, action){
      return { ...state, open:!state.open };
    },
  },

}
