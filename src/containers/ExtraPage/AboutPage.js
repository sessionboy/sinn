import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { IndexContent } from '../../components/index';
import { Subheader } from 'material-ui';
import './about.css';

const AboutPage=()=>{

  return (
   <div className="about-wraper">   
    <Subheader>关于作者</Subheader>
     <div className="list-box">
      <label>忘了怎么来的名字：</label>
      <span>sessionboy</span>
     </div>
     <div className="list-box">
      <label>姓名：</label>
      <span>梁富城</span>
     </div>
     <div className="list-box">
      <label>职业：</label>
      <span>全栈工程师（react+node路子）</span>
     </div>
     <div className="list-box">
      <label>坐标：</label>
      <span>深圳</span>
     </div>
     <div className="list-box">
      <label>My Github：</label>
      <span><a href="https://github.com/sessionboy" target="_blank">https://github.com/sessionboy</a></span>
     </div>
     <div className="list-box">
      <label>My Website：</label>
      <span><a href="http://sinn.boyagirl.com" target="_blank">http://sinn.boyagirl.com</a></span>
     </div>
     <div className="list-box">
      <label>知乎ID：</label>
      <span>sessionboy</span>
     </div>
     <div className="list-box">
      <label>前端技能：</label>
      <div>
       HTML5 + CSS3, Javascript, Jquery, Zepto.js, React, Redux, Dva, Angular.js,
       Es6, Gulp, Webpack, material-ui, ant design, ...
      </div>
     </div>
     <div className="list-box">
      <label>后端技能：</label>
      <div>
       nodejs, express, koa, mongoose, keystone.js, docker, nginx, Resful, Linux
      </div>
     </div>
     <div className="list-box">
      <label>正在关注：</label>
      <div>
       react-vr, pwa, graphql, 函数式编程 。。。
      </div>
     </div>

    <Subheader>关于sinn</Subheader>
    <div className="about-item">
     <div className="item">
     sinn(小客栈)是一个基于react+koa2技术栈开发的，纯手工、从零开始构建的小型社区，基于前后端分离的思想，前端采用react+dva作为基础架构，
     后端restful风格API, 以及ejs模板开发的管理后台
     </div>
     <div className="item">
      主要技术栈： react,webpack2,dva,redux,material-ui,fetch,generator,markdown,nodejs,koa2,mongoose,docker,shell,and async/await
     </div>
    @github地址: <a href="https://github.com/sessionboy/sinn" target="_blank">https://github.com/sessionboy/sinn</a>
    </div>
   </div>
  );
}

AboutPage.propTypes = {
};

export default connect()(AboutPage);
