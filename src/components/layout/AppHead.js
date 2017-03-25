/* 布局组件
* @ author sessionboy
* @ github  https://github.com/sessionboy
* @ website http://sinn.boyagirl.com
* @ 顶部导航组件
*/
import React,{Component} from 'react';
import { Link } from 'dva/router';
import cookies from 'js-cookie';
import { AppBar,Tabs,MenuItem,Tab,FontIcon, 
  IconButton,IconMenu,Dialog,Avatar } from 'material-ui';
import SearchIcon from 'material-ui/svg-icons/action/search';
import HomeIcon from 'material-ui/svg-icons/action/home';
import ViewModuleIcon from 'material-ui/svg-icons/action/view-module';
import FavoriteIcon from 'material-ui/svg-icons/Action/favorite';
import RefreshIcon from 'material-ui/svg-icons/Navigation/refresh';
import MoreIcon from 'material-ui/svg-icons/Navigation/more-vert';
import PersonAddIcon from 'material-ui/svg-icons/Social/person-add';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { white } from 'material-ui/styles/colors';
import { routerRedux } from 'dva/router';


class AppHead extends Component {
  state = {
    open:false,
    type:null,
    sign:false
  }
 renderDialog(type){
   this.setState({
     open: !this.state.open,
     type
   })
 }
 handleLogout(){
  const  userid = cookies.get('userid');
  this.props.logoutSubmit({
    userid: userid
  });
  this.setState({
    sign: false
  })
 }
 onChangeSign(){
   this.setState({
     sign: !this.state.sign
   })
 }
 renderNoLogin(){
   return <div>
      <MenuItem 
        value="1" 
        primaryText={
          <a href="/login" style={{color:'#444'}}>登录</a>
        }
        leftIcon={<HomeIcon />} />
       <MenuItem 
        value="2" 
        primaryText={
          <a href="/register" style={{color:'#444'}}>注册</a>
        }
        leftIcon={<PersonAddIcon />} />
      </div>
 }
 renderLogout(){
   return <div>
       <MenuItem 
        value="1" 
        primaryText="退出"
        leftIcon={<HomeIcon />} 
        onClick={ this.handleLogout.bind(this) } />
      </div>
 }
 handdleRightIcon(){
    const  userid = cookies.get('userid');
    const  username = cookies.get('username');
    const  avatar = cookies.get('avatar');
    const updatePropState = this.props.updatePropState;
    return (
     <div>
      <IconButton tooltip="About Author" >
       <a href="/about"><FavoriteIcon color={white}/></a>
      </IconButton>
      <IconButton tooltip="待开发" >
       <ViewModuleIcon color={white}/>
      </IconButton>
      {userid?<a href={`/user/${userid}`} >
       <Avatar 
         size={30} 
         src={avatar?avatar:require("../../assets/images/guest.jpg")} /></a>: null}
      <IconMenu
       open = { this.state.sign }
       onTouchTap = {this.onChangeSign.bind(this)}
       iconButtonElement={<IconButton> <MoreIcon color={white} /> </IconButton>}
       anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
       targetOrigin={{horizontal: 'left', vertical: 'top'}}
      >
       {userid?this.renderLogout():this.renderNoLogin()}
      </IconMenu>
     </div>
   )
 }
 render(){
  const { logit,handleOnDrawer,onSearch,propState,optype } = this.props;
  const oprops = {
    login: '登陆',
    register: '注册',
  }
  return (
    <div className='app-head-wraper'>
       <div className='app-head-box' >
        <AppBar
         title={<div style={{ height:70,lineHeight:'70px' }}><a href="/" style={{color:'#fff'}}><h4>SInn</h4></a></div>}
         titleStyle={{ textAlign:'left',fontSize:18 }}
         style={{ background:'#3849AB',height:70,zIndex:555 }}      
         iconElementLeft={
           <IconButton onTouchTap = { handleOnDrawer } >
            <FontIcon 
             style={{color:'#fff',fontSize:34}}           
             className="material-icons">
             menu
            </FontIcon>
           </IconButton>
         }
         iconElementRight={ this.handdleRightIcon() }       
        />
       </div>
     </div>
   );
  }
}
AppHead.propTypes = {

};

export default AppHead;
