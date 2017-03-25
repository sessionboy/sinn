/*
* @ author sessionboy
* @ github  https://github.com/sessionboy
* @ website http://sinn.boyagirl.com
* @ 信息提示组件
* @ data 需要进行marked解析的内容
* @ style 自定义root element样式
* @ msg 自定提示信息
* @ msgStyle 提示信息样式
* @ msgClassName 提示信息class
*/
import React,{ PropTypes } from 'react';

const LoadedTip =({
   style,
   msg,
   msgStyle,
   className,
   msgClassName
})=>{
  const styles = {
     root: {
       width: '100%',
       margin: '15px 0px'
     },
     msg: {
       textAlign: 'center',
       color: '#999',
       fontSize: 14
     }
  }
  let message = "o(╯□╰)o没有更多数据了…";
  if(msg) message = msg;
 return <div style={style?style:styles.root} className={className} >
         <p style={msgStyle?msgStyle:styles.msg} className={ msgClassName }> { message } </p>
        </div>
}

export default LoadedTip;