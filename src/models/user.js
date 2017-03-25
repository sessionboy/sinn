
/*
 * @ author sessionboy
 * @ github  https://github.com/sessionboy
 * @ website http://sinn.boyagirl.com
 * @ use user这个model主要应用于处理用户，以及用户相关的业务逻辑
*/
import Alert from 'react-s-alert';
import {
  login,
  logout,
  register,
  editor,
  avatar,
  get_userinfo
} from '../services/IndexServer';
import { routerRedux } from 'dva/router';
import cookies from 'js-cookie';

export default {
  namespace: 'users',
  state: {
    user: null,
    articles: null,
    totals:null,
    current:null
  },
  
   subscriptions: {
   setup({ dispatch, history }) {
    history.listen(location => { 

    })
   },
  },

  effects: { 

    // 用户注册
    *register({ payload }, { call, put }){
     const { code } = yield call(register,payload);
     if(code==200){
        cookies.remove(cookies.get('userid'));
        cookies.remove(cookies.get('username'));
        yield put(routerRedux.push('/login'))
      }
    },

    // 用户登录
    *login({ payload }, { call, put }){     
      const { code } = yield call(login,payload);
      if(code==200){
        cookies.remove(payload.userid);
        cookies.remove(cookies.get('username'));
        yield put(routerRedux.push('/'));
      }
    },
    
    // 用户退出
    *logout({ payload },{ call, put }){
      const { code } = yield call(logout,payload);
      if(code==200){
        cookies.remove(cookies.get('userid'));
        cookies.remove(cookies.get('username'));
        cookies.remove(cookies.get('avatar'));
        yield put(routerRedux.push('/'));
      }
    },

    // 加载用户主页信息
    *query_userinfo({ payload },{ call, put }){
      const { data } = yield call(get_userinfo,payload);
      yield put({
        type: 'querySuccess',
        payload: data
      })
    },

    // 修改用户资料 
    *put_userinfo({ payload },{ call, put }){
      const { data } = yield call(editor,payload);
      yield put({
        type: 'querySuccess',
        payload: data
      })
    },

    // 上传头像 
    *upload_avatar({ payload },{ call, put }){
      const { data } = yield call(avatar,payload);
      yield put({
        type: 'querySuccess',
        payload: data
      })
    }

  },

  reducers: {
    querySuccess(state, action) {
      return { ...state, ...action.payload };
    },
  },

}
