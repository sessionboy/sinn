/*
 * @ author  sessionboy
 * @ github  https://github.com/sessionboy
 * @ website http://sinn.boyagirl.com
 * @ use 统一的前端fetch请求库，基本上所有的请求都经过这个请求库，
 * @ 具体的请求内容和方式则在/services里面定义，采用restful API规范
 * @ whatwg-fetch  github自己开源的fetch请求库，兼容性较其他fetch库要好
 *   https://github.com/github/fetch
 */
import 'whatwg-fetch';
import Alert from 'react-s-alert';

const parseJSON=response=>{
  return response.json();
}

/*
* @code 后台返回的统一响应状态码, 200表示成功，-200表示失败
* @msg  后台返回的响应请求信息
* @use  判断请求状态和响应信息，并弹出信息提示用户
*/
const handledata=data=>{
 const { code, msg } = data;
 if(code==200&&msg){
   Alert.success(msg,{ timeout:2600, effect:'slide',position:'top-right' });
 }
 if(code==-200&&msg){
   Alert.error(msg,{ timeout:2600, effect:'jelly',position:'top-right' });
 }
 return data;
}

/**
 * @ url      请求地址
 * @ options  请求相关配置，包括请求方式，请求头，发送的数据等等，在services中定义
 * @ fetch请求发出后返回一个promise对象
 */

export default (url, options)=>{

  let config = {
    credentials:'same-origin', // 解决fetch不发送cookie到服务端的问题
  }
  if(options && options.method && options.method=="post"||"put"){
    config.headers = {
      'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
    }
  }
  return fetch(url,Object.assign(config,options))
          .then(parseJSON)
          .then(handledata)
          .catch((err) => ({ err }));
}


