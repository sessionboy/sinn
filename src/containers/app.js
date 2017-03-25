/*
* @ author sessionboy
* @ github  https://github.com/sessionboy
* @ website http://sinn.boyagirl.com
* @ 应用顶层组件
*/
import React, { Component, PropTypes } from 'react';
import { AppBar,IconButton,TextField,Snackbar,FloatingActionButton } from 'material-ui';
import CreateIcon from 'material-ui/svg-icons/Content/create';
import { connect } from 'dva';
import { AppHead,AppDrawer } from '../components/index';
import styles from './layout.css';
import '../assets/styles/global.css';
import '../index.css';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import Alert from 'react-s-alert';

const App =props=>{
  const { apps, dispatch, location, children } = props;
  const { open,alert,propState,optype,category }=apps;
  const headerProps = {
    optype,
    propState,
    updatePropState(optype){
      let status = true;
      if(optype=="close") status=false;
      dispatch({
        type:'apps/query',
        payload: {
          propState: status,
          optype
        }       
      })
    },
    handleOnDrawer(){
      dispatch({
        type:'apps/drawer',
      })
    },
    loginSubmit(payload){
      dispatch({
        type:'apps/login',
        payload
      })
    },
    registerSubmit(payload){
      dispatch({
        type:'apps/register',
        payload
      })
    },
    logoutSubmit(payload){
      dispatch({
        type:'users/logout',
        payload
      })
    }
  }
  const DrawerProps = {
    open,
    category,
    dispatch,
    docked: false,
    onRequestDrawer(open){
      dispatch({
        type:'apps/drawer',
      })
    }   
  }
 const Footer=()=>{
   return <div className="app-footer-wraper">
          <div className="footer-content"> SInn <a href="https://github.com/sessionboy">@github</a> 纯手工搭建的小型社区 </div>          
         </div>
 }
 const ActionPost=()=>{
  return <FloatingActionButton 
           href = "/article"
           className="action-create"
           label="发布" secondary={true}
           backgroundColor = '#FF4081'
           secondary = {true} 
           style={{margin:'14px 0px'}}>
           <span className = "action-create-icon"><CreateIcon style={{margin:15,color:"#fff"}} /></span>
         </FloatingActionButton>
 }
  return (
    <div className='app-box'>
     <Alert 
      style= {{width:120}}
      stack={{limit: 0, spacing: 0}} />
     <AppHead { ...headerProps } />
     <div className="app-main-wraper" >
      { React.cloneElement(children,{}) }
     </div>
      <AppDrawer { ...DrawerProps } />
     <ActionPost />
     <Footer />
    </div>
    )
}

const mapStateToProps=({ apps })=>{
  return { apps }; 
}
export default connect(mapStateToProps)(App);
