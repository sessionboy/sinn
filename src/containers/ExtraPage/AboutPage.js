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
      <span>资深前端工程师、全栈工程师</span>
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
     <Subheader>技能列表</Subheader>
     <div className="list-box skills-item">
      <p><span>基本技能：</span><span> HTML5 / CSS3 / Javascript / es6 </span></p>
      <p><span>工具库：</span><span> jquery / zepto / leaflet / lodash / async </span></p>
      <p><span>前端框架：</span><span> react / redux / dva / angular1.x </span></p>
      <p><span>构建工具：</span><span> webpack / gulp </span></p>
      <p><span>UI组件库：</span><span> ant design / material-ui </span></p>
      <p><span>后端技能：</span><span> node / express / koa2 / keystone.js / resful </span></p>
      <p><span>运维部署：</span><span> docker / linux / nginx / shell / jenkins </span></p>
      <p><span>版本管理：</span><span> git / svn / gitlab </span></p>
      <p><span>云平台：</span><span> 阿里云ecs / 阿里云oss </span></p>
      <p><span>平台搭建：</span><span> confluence / jira / gitlab </span></p>
      <p><span>架构能力：</span><span> 前端架构设计 / 后端微服务架构(了解) </span></p>
     </div>
     <div className="list-box skills-item">
      <p><span>正在关注：</span><span> react-vr / pwa / graphql / 函数式编程 。。。 </span></p>
     </div>

    <Subheader>关于sinn</Subheader>
    <div className="about-item">
     <div className="item">
     sinn(小客栈)是一个基于react+koa2技术栈开发的，从零开始构建的小型社区(目前是雏形)，基于前后端分离的思想，前端采用react+dva作为基础架构，
     后端基于koa2+mongodb, 以及基于docker的容器化部署。
     </div>  
    </div>
    <Subheader>github地址</Subheader>
    <div className="github-base">   
     <p>前端: <a href="https://github.com/sessionboy/sinn" target="_blank">https://github.com/sessionboy/sinn</a></p>
     <p>后端: <a href="https://github.com/sessionboy/sinn-server" target="_blank">https://github.com/sessionboy/sinn-server</a></p>
    </div>   
   </div>
  );
}

AboutPage.propTypes = {
};

export default connect()(AboutPage);
