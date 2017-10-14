/*
* @ author sessionboy
* @ github  https://github.com/sessionboy
* @ website http://sinn.boyagirl.com
* @ 首页容器组件
*/
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { IndexContent } from '../../components/index';
import ImageBanner from 'assets/images/banner-01.jpg';

const IndexPage=({
  apps,
  location,
  dispatch,
})=>{
  const { data,categoryId,lists,hot,catehot,totals,current,isNoMoredata } = apps;
  const ContentProps = {
    hot,
    totals,
    current,
    location,
    isNoMoredata,
    categoryId,
    data: lists,
    getPagination(pageSize,categoryId,current){
     const payload = { pageSize,categoryId,current }
      dispatch({
        type: 'apps/query',
        payload
      })
    },
    loadmoredata(current,pageSize,categoryId){
     const payload = { current,pageSize,categoryId }
     dispatch({
        type: 'apps/query',
        payload
      })
    }
  }
  const sidebarprops = {
    hot,
    catehot
  }
  const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }
  return (
   <div>
   <div className="main-banner">
    <img src={ImageBanner} alt=""/>
    <div className="breadcrumb">
     <span style={{fontStyle:'oblique'}}>SInn</span>
     <span>-小客栈</span>
     </div>
   </div>   
   <div className="main-box">
    <IndexContent {...ContentProps} />
   </div>
   </div>
  );
}

IndexPage.propTypes = {
};
const mapStateToProps=({ apps })=>{
  return { apps }; 
}

export default connect(mapStateToProps)(IndexPage);
