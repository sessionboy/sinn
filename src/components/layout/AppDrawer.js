/* 布局组件
* @ author sessionboy
* @ github  https://github.com/sessionboy
* @ website http://sinn.boyagirl.com
* @ 左侧菜单弹出层组件
*/
import React,{ PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { Drawer,MenuItem,Menu,Paper,Subheader,Avatar,Divider } from 'material-ui';
import { List, ListItem } from 'material-ui/List';
import FileFolder from 'material-ui/svg-icons/file/folder';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';
import FontIcon from 'material-ui/FontIcon';

 class AppDrawer extends React.Component {
 
 componentDidMount=()=>{
  const category = this.props.category;
  if(!category||category.length==0){
    this.props.dispatch({
      type: 'apps/query_category'
    })
  }
 }

 onKeyboardFocus=(id)=>{
  const { dispatch } = this.props;
  dispatch(routerRedux.push({
    pathname: '/',
    query: { categoryId: id },
  }));
 }
 
 render(){
  const { open, docked, onRequestDrawer,category }=this.props; 
  if(!category || !category.tcate) return <div />
  const { acate, tcate } = category;
  const RenderCateItem =({acate,tcate})=>{
    const mapAcate = acate.map((item)=>{
       if(item.cate_parent.tcate_name != tcate.tcate_name) return;
       return <div key = {item._id}>
        <ListItem
         onClick={this.onKeyboardFocus.bind(this,item._id)}
         leftAvatar={<Avatar icon={<FileFolder />} size={34} />}
         rightIcon={<span> {item.num} </span>}
         primaryText={item.cate_name}
         secondaryText={
          <span style={{fontSize:12.5,paddingTop:10}}>{item.cate_info}</span>
         } />
       </div>
    })
    return <div>
      { mapAcate }
    </div>
  }
  const rendermenu = tcate.map((item)=>{
    return <List key={item._id}>
      <Divider />   
      <Subheader>{item.tcate_name}</Subheader>
      <RenderCateItem 
       acate = {acate} 
       tcate = {item} />
    </List>
  })
  const RenderMenuList = () =>{
   const fStyle = {
     width:'100%',
     padding:20
   }
    return(
     <Paper>
      { rendermenu }
      <div style={fStyle}>
       <p>2017 by <a href="https://github.com/sessionboy" target="_blank" style={{color:'#5BC98A'}}>@sessionboy</a></p>
       <p>Github: <a href="https://github.com/sessionboy/sinn" target="_blank" style={{color:'#5BC98A'}}>
        https://github.com/sessionboy/sinn
       </a>
       </p>
      </div>
     </Paper>
    )
  }
  return (
    <div className="app-sidbar-wraper" >  
     <Drawer 
      width={324}
      docked={docked}
      onRequestChange={ onRequestDrawer }
      open={open}>
       <div className="app-sidbar-content"> 
        <h3> Sinn 程序员的小客栈 </h3>
       </div>
       <RenderMenuList />
     </Drawer>
    </div>
  )
 }
}

export default AppDrawer;