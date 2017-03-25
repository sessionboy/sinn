/* 
* @ author sessionboy
* @ github  https://github.com/sessionboy
* @ website http://sinn.boyagirl.com
* @ 用户资料编辑组件
*/
import React,{ PropTypes,Component } from 'react';
import { Divider,MenuItem,RaisedButton,TextField,Subheader,FlatButton } from 'material-ui';
import Alert from 'react-s-alert';
import './style.css';

class EditorPage extends Component {

  state = {
     name: null,
     email: null,
     profile: null
  }
  handdleOnChange=(field,e)=>{
    this.setState({
       field: e.target.value
    })
  }
  handdleeditor=(id,e)=>{
   e.preventDefault();
   const editorform = this.refs.editorform;
   const formData = new FormData(editorform);
   const { user } = this.props;
   const payload = {
   	  id,
      name: formData.get('name'), 
      nickname: formData.get('nickname'),     
      email: formData.get('email'),
      profile: formData.get('profile')
    }
   const regemail =/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
   if(!id) {  
   	 Alert.error('用户id不能为空!'); 
     return false;
    }
   if(payload.email&&!regemail.test(payload.email)){
     Alert.error('邮箱格式不正确!');
     return false;
   }
   if(!payload.name||!payload.nickname){
   	 Alert.error('用户名和昵称均不能为空!');
     return false;
   }
   if(payload.profile&&payload.profile.length>200){
   	 Alert.error('个人简介请不要超过200字符!');
     return false;
   }
   if(payload.profile){
     payload.profile = payload.profile;
   }
   this.props.editorInfo(payload);
   this.props.complateeditor();
  }
  render(){
   const { user } = this.props;
   return <div >
     <Divider />
     <Subheader> 编辑个人资料 </Subheader>
     <form ref="editorform" className="editor-box">

      <div className="form-list">      
       <TextField
        defaultValue = { this.state.name?this.state.name:user.name }
        name = "name"
        className = "form-list-input"
  	    hintText= '用户名'
  	    fullWidth={true}
  	    onChange = { this.handdleOnChange.bind(this,'name') }
  	    floatingLabelText="用户名" />
      </div>

      <div className="form-list">      
       <TextField
        defaultValue = { this.state.nickname?this.state.nickname:user.nickname }
        name = "nickname"
        className = "form-list-input"
        hintText= '昵称'
        fullWidth={true}
        onChange = { this.handdleOnChange.bind(this,'nickname') }
        floatingLabelText="用户昵称" />
      </div>

      <div className="form-list">      
       <TextField
        defaultValue = { this.state.email?this.state.email:user.email }
        name = "email"
        className = "form-list-input"
  	    hintText= '邮箱'
  	    fullWidth={true}
  	    onChange = { this.handdleOnChange.bind(this,'email') }
  	    floatingLabelText="邮箱" />
      </div>

      <div className="form-list">      
       <TextField
        defaultValue = { this.state.profile?this.state.profile:user.profile }
        name = "profile"
        className = "form-list-input"
  	    hintText= '个人简介'
  	    errorText=""
  	    fullWidth={true}
        multiLine = {true}
        rows = {5}
        textareaStyle = {{border:'1px solid #eee',padding:15}}
  	    onChange = { this.handdleOnChange.bind(this,'profile') }
  	    floatingLabelText="个人简介" />
      </div>

      <RaisedButton 
       primary={true} 
       label="确定" 
       onClick = { this.handdleeditor.bind(this,user._id)}
       style={{margin:'20px 0px'}} />
      <RaisedButton 
       label="取消" 
       onClick = { this.props.complateeditor.bind(this)}
       style={{margin:'20px 20px'}} />

     </form>
    </div>
  }
}

export default EditorPage;


