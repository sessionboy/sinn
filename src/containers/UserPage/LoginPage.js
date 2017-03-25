/*
* @ author sessionboy
* @ github  https://github.com/sessionboy
* @ website http://sinn.boyagirl.com
* @ 用户登录组件
*/
import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { TextField,RaisedButton,Subheader,FontIcon,Divider } from 'material-ui';
import PersonIcon from 'material-ui/svg-icons/Social/person';
import LockIcon from 'material-ui/svg-icons/action/lock';
import Arrowright from 'material-ui/svg-icons/navigation/subdirectory-arrow-right';
import Alert from 'react-s-alert';
import './style.css';

class LoginPage extends Component{

handdleloginSubmit=()=>{
  const { dispatch } = this.props;
  const loginForm = this.refs.loginForm;
  const formData = new FormData(loginForm);
  let payload = {
  	name: formData.get('username'),
    password: formData.get('password')
  }
  const namereg =new RegExp("^[A-Za-z]+$");
  if(!payload.name||!payload.password){
    Alert.error('用户名和密码不能为空!');
    return false;
  }
  if(!namereg.test(payload.name)){
  	Alert.error('用户名格式不正确!');
  	return false;
  }
  dispatch({
  	type:'users/login',
  	payload
  })
}

render(){
 return (
   <div className="user-box">   
     <form style={{marginTop:18}}  ref="loginForm" className="user-form">
     <Subheader> 用户登录 </Subheader>
      <div>
       <PersonIcon viewBox="0 -8 28 28" />
       <TextField
        name="username"
        fullWidth={true}
        floatingLabelFixed = {true}
        floatingLabelText="请输入用户名,由英文组成"
        hintText="用户名" />
      </div>

      <div>
       <LockIcon viewBox="0 -8 28 28" />
       <TextField
        name="password"
        type="password"
        fullWidth={true}
        floatingLabelFixed = {true}
        floatingLabelText="请输入6-20位密码"
        hintText="密码" />     
      </div>

      <RaisedButton 
       label="立马登录" secondary={true}  
       onClick={this.handdleloginSubmit.bind(this)} 
       buttonStyle = {{background:'#FF4081'}}
       icon={<Arrowright />}
       style={{margin:'14px 0px'}}/>
    </form>
   </div>
  )
 }
}

LoginPage.propTypes = {
};

const mapStateToProps=({ users })=>{
  return { users }; 
}

export default connect(mapStateToProps)(LoginPage);
