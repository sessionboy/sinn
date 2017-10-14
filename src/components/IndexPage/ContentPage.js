import React,{ PropTypes,Component } from 'react';
import moment from 'moment';
import { FlatButton, Subheader,RaisedButton,Badge,FontIcon,IconButton,FloatingActionButton,Avatar } from 'material-ui';
import LoadTip from '../../shared/loadedtip';
import Makedhtml from '../../shared/markdown';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Iconvisibility from 'material-ui/svg-icons/action/bookmark-border';
import Iconfavorite from 'material-ui/svg-icons/action/favorite-border';
import Icontextsms from 'material-ui/svg-icons/Communication/chat-bubble-outline';
import Arrowright from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import Pagination  from 'rc-pagination';
import Recoment  from './Recoment';
import { sourcetype,styles } from './styles';
import Styles from './main.css';
import 'rc-pagination/assets/index.css';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import StackGrid,{ transitions,easings } from "react-stack-grid";
const transition = transitions.scaleDown;

class ContentPage extends Component {
  constructor(props){
    super(props);
  }
  renderContent=()=>{
    const { data,totals,current,categoryId,getPagination } = this.props;

  }
  render() {
   const { data,hot,totals,current,isNoMoredata,categoryId,getPagination,loadmoredata } = this.props;
   const ClientWidth=document.body.clientWidth; 
   if(!data||data.length==0) return <LoadTip msg="加载中..." />;
   const renderContent = data.map((item,i)=>{
    let content = item.content;
     if(content&&content.length>65){
       content = content.substring(0,65)+'…'
     }
   return <Card 
      style={styles.card} 
      key={item._id}>
     {item.cover?<CardMedia>
       <a href={`/detail/${item._id}`} className="img-box">
        <span><Arrowright style={{color:'#fff',marginTop:5}}/></span>
        <img src={item.cover} style={{maxWidth:'100%'}}/>
       </a>
      </CardMedia>:null}
      <CardTitle
       style={{ padding:'16px 16px 5px' }}
       titleStyle = {{fontSize:16,lineHeight:1.3,paddingLeft:14,fontWeight:500}}
       title={
        <a href={`/detail/${item._id}`} style={{color:'#111'}}>{item.title}</a>
       } />
        <CardText style={styles.CardText} >
         <Makedhtml data={content} className="item-read-review" />
        </CardText>
        
        <CardActions
         style={{position:'relative',padding:'14px 18px 24px',fontSize:13}}
         >
          <span className={sourcetype[item.modality]?sourcetype[item.modality].className:null} > 
            {sourcetype[item.modality]?sourcetype[item.modality].content:null} 
         </span>                   
         <a href={`/detail/${item._id}`} className="main-icon-item">
          <Iconvisibility style={styles.secondIcon} viewBox="0 -8 28 28"/>
          <span> {item.review} </span>
         </a>
         <a href={`/detail/${item._id}`} className="main-icon-item">
          <Icontextsms style={styles.secondIcon} viewBox="0 -8 28 28"/>
          <span> {item.comments?item.comments.length:0} </span>
         </a>
         <a href={`/detail/${item._id}`} className="main-icon-item">
          <Iconfavorite style={styles.secondIcon} viewBox="0 -8 28 28"/> 
          <span> {item.praise&&item.praise.num?item.praise.num:0} </span>
         </a>  
        </CardActions>
    
      </Card>
  })
    return (
     <div className="main-content-wraper">
      <StackGrid
        monitorImagesLoaded
        columnWidth= {ClientWidth<769?300:"33%"}
        duration={600}
        gutterWidth={20}
        gutterHeight={20}
        easing={easings.cubicOut}
        appearDelay={60}
        appear={transition.appear}
        appeared={transition.appeared}
        enter={transition.enter}
        entered={transition.entered}
        leaved={transition.leaved}
        monitorImagesLoaded = {true}
        vendorPrefix = {true}
      >
      { renderContent }
      </StackGrid>
      {isNoMoredata?<LoadTip msg="o(╯□╰)o 没有更多数据了！" />:
       <Pagination 
        current={Number(current)?Number(current):1}
        className = "Pagination"
        pageSize = { 20 }
        onChange = { getPagination.bind(this,20,categoryId) }
        total={totals} />}
     </div>
    );
  }
}

export default ContentPage;