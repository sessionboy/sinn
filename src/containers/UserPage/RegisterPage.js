/*
* @ author sessionboy
* @ github  https://github.com/sessionboy
* @ website http://sinn.boyagirl.com
* @ 用户注册组件
*/
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { TextField,RaisedButton,Subheader,FontIcon } from 'material-ui';
import PersonIcon from 'material-ui/svg-icons/Social/person';
import LockIcon from 'material-ui/svg-icons/action/lock';
import LockIconOutline from 'material-ui/svg-icons/action/lock-outline';
import Permidentity from 'material-ui/svg-icons/action/perm-identity';
import Arrowright from 'material-ui/svg-icons/navigation/subdirectory-arrow-right';
import Alert from 'react-s-alert';
import './style.css';

class RegisterPage extends Component{

registerSubmit=()=>{
   const { dispatch } = this.props;
   const registerForm = this.refs.registerForm;
   const formData = new FormData(registerForm);
   let payload = {
  	name: formData.get('username'),
  	nickname: formData.get('nickname'),
    password: formData.get('password'),
    apassword: formData.get('apassword'),
    profile: formData.get('profile')
  }
  const namereg =/^[A-Za-z]+$/;
  const nickreg = /^[\u0391-\uFFE5A-Za-z]+$/;
  if(!payload.name||!payload.nickname||!payload.password){
    Alert.error('用户名,昵称和密码均不能为空哦!');
    return false;
  }
  if(!namereg.test(payload.name)){
  	Alert.error('您输入的用户名格式不正确!');
  	return false;
  }
  if(!nickreg.test(payload.nickname)){
  	Alert.error('您输入的昵称格式不正确!');
  	return false;
  }
  if(payload.password!=payload.apassword){
    Alert.error('两次输入的密码不一致!');
    return false;
  }
  dispatch({
  	type:'users/register',
  	payload
  })
 }

render(){
 const iconStyle = {
   position:'absolute',
   left:0,
   bottom:22
 }
 const textareaStyle = {
   border:'1px solid #eee',
   padding:15,
   fontSize:14
 }
 return (
   <div className="user-box">   
    <form style={{marginTop:18}}  ref="registerForm" className="user-form">
     <Subheader> 用户注册 </Subheader>
      <div className="text-wrap">
       <PersonIcon viewBox="0 -8 28 28" style={iconStyle}/>
       <TextField
        name="username"
        fullWidth={true}
        style={{left:35}}
        floatingLabelFixed = {true}
        floatingLabelText = "由6-20位英文字母"
        hintText="用户名" /><br />
      </div>

      <div className="text-wrap">
       <Permidentity viewBox="0 -8 28 28" style={iconStyle}/>
       <TextField
        type="text"
        name="nickname"
        fullWidth={true}
        style={{left:35}}
        floatingLabelFixed = {true}
        floatingLabelText = "起个有个性的名称吧"
        hintText="用户昵称" /><br />      
      </div>

      <div className="text-wrap">
       <LockIcon viewBox="0 -8 28 28" style={iconStyle}/>
       <TextField
        type="password"
        name="password"
        fullWidth={true}
        style={{left:35}}
        floatingLabelFixed = {true}
        floatingLabelText = "6-20位密码"
        hintText="账户密码" /><br />      
      </div>

      <div className="text-wrap">
       <LockIconOutline viewBox="0 -8 28 28" style={iconStyle}/>
       <TextField
        type="password"
        name="apassword"
        fullWidth={true}
        style={{left:35}}
        floatingLabelFixed = {true}
        floatingLabelText = "再次输入密码"
        hintText="请再次输入密码" /><br />      
      </div>

      <div className="text-wrap">
       <TextField
        name="profile"
        rows = {3}
        multiLine = {true}
        fullWidth={true}
        style={{left:35}}
        floatingLabelFixed = {true}
        textareaStyle = {textareaStyle}
        floatingLabelText="来吧，说几句话讲述你自己"
        hintText="个人简介" />     
      </div>

      <RaisedButton 
       label="立即注册" 
       secondary={true} 
       icon={<Arrowright />}
       buttonStyle = {{background:'#FF4081'}}
       onClick={this.registerSubmit.bind(this)} 
       style={{margin:'14px 0px'}}/>

    </form>
   </div>
  )
 }
}

RegisterPage.propTypes = {
};

const mapStateToProps=({ users })=>{
  return { users }; 
}

export default connect(mapStateToProps)(RegisterPage);
