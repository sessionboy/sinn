/*
* @ author sessionboy
* @ github  https://github.com/sessionboy
* @ website http://sinn.boyagirl.com
* @ 用户个人中心容器组件
*/
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { UserInfo,UserWork } from '../../components/index';
import LoadTip from '../../shared/loadedtip';

class PersonalPage extends Component{

 componentDidMount=()=>{
   const { dispatch,params } = this.props;
   dispatch({
   	 type: "users/query_userinfo",
   	 payload: params
   })
 }
render(){
 const { dispatch,params } = this.props;
 const { user,articles,current, totals } = this.props.users;
 if(!user) return <LoadTip msg="加载中..." />;
 const userInfo = { 
   user,
   dispatch,
   editorInfo(payload){
    dispatch({
      type: 'users/put_userinfo',
      payload
    })
   }
 };
 const userwork = { 
   user,
   articles,
   current,
   totals,
   dispatch,
   getpagination(pageSize,id,current){
   	const payload = { pageSize,id,current };
   	dispatch({
   	  type: 'users/query_userinfo',
   	  payload
   	})
   }
 };
 return (
 	<div >   
    <UserInfo {...userInfo}/>
    <UserWork {...userwork}/>
   </div>
  )
 }
}

PersonalPage.propTypes = {
};
const mapStateToProps=({ users })=>{
  return { users }; 
}

export default connect(mapStateToProps)(PersonalPage);
