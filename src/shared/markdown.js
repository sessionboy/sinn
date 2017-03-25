
/*
* @ author sessionboy
* @ github  https://github.com/sessionboy
* @ website http://sinn.boyagirl.com
* @ markdown 语法解析组件
* @ data 需要解析的内容
* @ style 自定义root element样式
* @ className 自定类
*/
import React, { PropTypes } from 'react';
import highlight from 'highlight.js';
import marked from 'marked';
import 'github-markdown-css';
import 'highlight.js/styles/docco.css'; 

marked.setOptions({
  highlight: function (code, lang, callback) {
    return highlight.highlightAuto(code).value;
  }
});

const Makedhtml =({
  data,
  style,
  className
})=>{
 const content = marked(data);
 return <div 
         style = { style }
         className = { className }
         dangerouslySetInnerHTML = {{ __html: content }}>
        </div>
}

export default Makedhtml;


