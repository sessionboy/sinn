/*
 * @ author sessionboy
 * @ github  https://github.com/sessionboy
 * @ website http://sinn.boyagirl.com
 * @ use article这个model主要应用于处理文章，以及文章相关的业务逻辑
*/

import Alert from 'react-s-alert';
import {
	create,
  article_detail,
  get_category,
  create_comment,
  article_praise
} from '../services/IndexServer';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'articles',
  state: {
    postdata: {},
    category: [],
    data: null,
    comments: {}
  },
  
   subscriptions: {
   setup({ dispatch, history }) {
    history.listen(location => { 

    })
   },
  },

  effects: { 

    // 发表文章
    *post({ payload }, { call, put }) {
     const result = yield call(create,payload);
     yield put(routerRedux.push(`/detail/${result.data._id}`));
    },

    // 加载文章详情
    *detail({ payload },{ call, put }){
      const { data } = yield call(article_detail,payload);
      const { totals,current,comments } = data;
      yield put({
       type: 'querySuccess',
       payload: { totals,current,comments,data: data.data }
     })
    },

    // 发表评论
    *comment({ payload },{ call, put }){
      const { data } = yield call(create_comment,payload);
      yield put({
       type: 'querySuccess',
       payload: { comments: data.comments }
     })
    },

    // 点赞文章
    *praise({ payload },{ call, put }){
      const { data } = yield call(article_praise,payload);
      yield put({
       type: 'querySuccess',
       payload: { data: data.data }
     })
    },

    // 获取文章分类
    *query_category({ payload }, { call, put }) {
     const category = yield call(get_category);
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
  },

}
