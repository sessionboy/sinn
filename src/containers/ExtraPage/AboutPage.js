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
