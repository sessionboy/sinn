/* 
* @ author sessionboy
* @ github  https://github.com/sessionboy
* @ website http://sinn.boyagirl.com
* @ 用户个人资料组件
*/
import React,{ PropTypes,Component } from 'react';
import { List,ListItem,Avatar,Divider,RaisedButton,Dialog,Subheader,FlatButton } from 'material-ui';
import Dropzone from 'react-dropzone';
import Upload from 'rc-upload';
import EditorForm from './Editor';
import cookies from 'js-cookie';
import Alert from 'react-s-alert';
import { routerRedux } from 'dva/router';

class UserInfo extends Component{
 state = {
    open: false
  }

  handleOpen = () => {
    this.setState({open: true});
  }
  RenderEditor =()=>{
   return <div>
    <Form />
   </div>
 }
 handdleUpload=(id, files)=>{
   const { dispatch } = this.props;
   if(!files||files.length==0){
     Alert.error('上传失败');
     return false;
   }
   const payload = { id, files };
   dispatch({
     type: 'users/upload_avatar',
     payload
   })
 }
 render(){
  const This = this;
  const { user,editorInfo,dispatch } = this.props;
  if(!user) return <div />;
  const childrenprops = {
     user,
     editorInfo,
     complateeditor(){
      This.setState({
        open: false
      })
      window.scroll(0,0);
     }
  }
  const AvatarStyle = {
    width:85,
    height:85,
    position:'absolute',
    left:16,
    top:5,
    cursor:'pointer'
  }
  const  userid = cookies.get('userid');
  const  username = cookies.get('username');
  const  avatar = cookies.get('avatar');
  const accept="image/png,image/jpeg,image/jpg";
  const uploadprops = {
    action: "/api/user/put_avatar",
    data: { id: user._id },
    accept,
    multiple: true,
    maxSize: 1048576,
    component: "div",
    beforeUpload(file){
     if(file.size>1048576){
       Alert.error('头像图大小不能大于1M!');
       return false;
     }
    },
    onSuccess(file){
     if(file.code==200){
      Alert.success('头像上传成功，重新登录生效!',{position: 'top'});
      cookies.remove('userid');
      cookies.remove('username');
      cookies.remove('avatar');
      setTimeout(()=>{
       dispatch(routerRedux.push('/login'));
      }, 2000);    
     }
    }
  }
  return (
   <div className="Info-box">
   <Subheader> 个人资料 </Subheader>
    <List style={{minHeight:160}}>
     <ListItem 
       hoverColor="#fff"
       disabled = {true}
       leftAvatar={
        <div>
        <Upload 
         {...uploadprops}
         className = "avatar-upload"
         disabled ={userid==user._id?false:true}
         onDrop={this.handdleUpload.bind(this,user._id)} />
         <Avatar 
          style={ AvatarStyle } 
          src={user.avatar?user.avatar:require("../../assets/images/guest.jpg")}/>
         <p className="change-avatar">{userid==user._id?'点击可更换头像':null}</p>
        </div>
       }
       primaryText={
         <div className="article_author" style={{marginLeft:20}}>
          <span>{user._id===userid?'客官':'作者'}</span> 
          <a style={{color:'#3849AB'}}>{ user.name } - {user.nickname}</a> 
          <label> 邮箱: { user.email?user.email:'' } </label>          
         </div>
       }
       secondaryText={ 
        <div className="author_profile detail-author-box" style={{marginLeft:20}}>
        <p>简介：</p><br/>
        <div 
         className="profile-text" 
         dangerouslySetInnerHTML = {{ 
          __html: user.profile?
          user.profile.replace(/\n|\r\n/g,"<br>"):
          '主人很懒，什么都没有😢' 
         }} >
        </div>
        </div> 
       }
       rightIconButton = {
        this.state.open===false&&userid&&userid===user._id?
         <RaisedButton 
          primary={true} 
          label="编辑个人资料" 
          onClick = {this.handleOpen.bind(this)} 
          style={{margin:'20px 80px'}} />:null
       }
       secondaryTextLines={2} />
    </List>
    {this.state.open?<EditorForm { ...childrenprops }/>:null}
    <Divider />
   </div>
  )
 }
}

export default UserInfo;