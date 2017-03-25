/*
 * @ author sessionboy
 * @ github  https://github.com/sessionboy
 * @ website http://sinn.boyagirl.com
 * @ use 集中定义异步请求逻辑，在model层调用
 */
import qs from 'qs';
import request from '../utils/request'; // 引入统一的请求库

/*
* 首页数据相关请求
*/
export async function query(payload) {
  return request('/api/query?'+qs.stringify(payload));
}


/*
* ---用户相关请求
*/
// @用户登录
export async function login(payload) {
  return request('/api/user/login',{
  	method: 'post',
  	body: qs.stringify(payload),
  });
}

// @用户注册
export async function register(payload) {
  return request('/api/user/register',{
  	method: 'post',
  	body: qs.stringify(payload)
  });
}

// @编辑用户资料
export async function editor(payload) {
  return request('/api/user/put_userinfo',{
    method: 'put',
    body: qs.stringify(payload)
  });
}

// @上传用户头像
export async function avatar(payload) {
  return request('/api/files/upload_alioss',{
    method: 'post',
    body:JSON.stringify(payload),
    headers: { 
     'Content-Type':'application/x-www-form-urlencoded',
    }
  });
}

// @用户退出
export async function logout(payload) {
  return request('/api/user/logout?'+qs.stringify(payload));
}

// @获取用户信息
export async function get_userinfo(payload) {
  return request('/api/user/personal?'+qs.stringify(payload));
}

/* 
* 文章相关请求
*/ 
// @获取文章详情
export async function article_detail(payload) {
  return request('/api/article/get_detail?'+qs.stringify(payload));
}

// @获取二级分类
export async function get_category() {
  return request('/api/article/get_category');
}

// @获取左侧菜单栏
export async function getmenu_category() {
  return request('/api/article/getmenu_category');
}

// @发表文章
export async function create(payload) {
  return request('/api/article/create',{
  	method: 'post',
  	body: qs.stringify(payload)
  });
}

// @发表评论
export async function create_comment(payload) {
  return request('/api/article/create_comment',{
    method: 'post',
    body: qs.stringify(payload)
  });
}

// @点赞文章
export async function article_praise(payload) {
  return request('/api/article/article_praise',{
    method: 'put',
    body: qs.stringify(payload)
  });
}


