/*
* 文章详情组件 
*/
import React, { Component, PropTypes } from 'react';
import { List, ListItem, TextField,Avatar,Subheader,Divider,Paper,RaisedButton,FloatingActionButton } from 'material-ui';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import cookies from 'js-cookie';
import LoadTip from '../../shared/loadedtip';
import './style.css';
import moment from 'moment';
import Pagination  from 'rc-pagination';
import Makedhtml from '../../shared/markdown';
import MarkedComent from '../../shared/comment';
import LoadedTip from '../../shared/loadedtip';
import Alert from 'react-s-alert';
import 'rc-pagination/assets/index.css';

class ArticleDetail extends Component {
  state = {

   }
  componentDidMount=()=>{
    const { dispatch,params } = this.props;
    dispatch({
      type: 'articles/detail',
      payload: params
    })
  }
 getPagination=(pageSize,id,current)=>{
   const payload = { pageSize,id,current };
   this.props.dispatch({
      type: 'articles/detail',
      payload
   })
 }
 praisearticle=(id)=>{
   const userid = cookies.get('userid');
   if(!userid){
     Alert.error('您还没有登录哦!',{position: 'top'});
     setTimeout(function(){
      this.props.dispatch(routerRedux.push('/login'));
     }, 2000);
    return false;
   } 
   const payload = { id };
   this.props.dispatch({
      type: 'articles/praise',
      payload
   })
 }
 handdleComment=(e)=>{
   e.preventDefault();
   const { data } = this.props.articles;
   const commentForm = this.refs.commentForm;
   const formData = new FormData(commentForm);
   const payload = {
     article_id: data._id,
     comment_title: formData.get('comment_title'),
     contents: formData.get('contents')
   }
   if(!payload.contents) {
    Alert.error('评论内容不能为空哦!');
    return false;
   }
   if(!payload.comment_title) {
     Alert.error('标题不能为空哦!');
     return false;
   }
   if(payload.comment_title.length<3||payload.comment_title.length>50){
     Alert.error('标题需在3-50字符之间哦!');
     return false;
   }
   if(payload.contents.length>140||payload.contents.length<3){
     Alert.error('评论字数在3-140之间哦!');
     return false;
   }
   this.props.dispatch({
    type: 'articles/comment',
    payload
   })
   commentForm.reset(); // 重置表单
 }
 renderAuther=()=>{
  const { data } = this.props.articles;
  if(!data.author) return <div />;
  const AvatarStyle = {
    width:85,
    height:85,
    position:'absolute',
    left:16,
    top:16
  }
  return <List>
          <ListItem 
           hoverColor="#fff"
           disabled = {true}
           leftAvatar={<Avatar style={AvatarStyle} src={data.author.avatar?data.author.avatar:require("../../assets/images/guest.jpg")} />}
           primaryText={
             <div className="article_author">
              <span>作者</span><a href={`/user/${data.author._id}`}>{data.author.name} - {data.author.nickname}</a>              
             </div>
           }
           secondaryText={ 
            <span className="detail-author-box">
             <p style={{marginBottom:0,paddingTop:8}}>简介：</p>
            <div dangerouslySetInnerHTML = {{ __html: data.author.profile?data.author.profile.replace(/\n|\r\n/g,"<br>"):
              '该作者很懒，没留下什么线索😢' 
             }}
             className="profile-text" >
            </div> 
           </span>
           }
           secondaryTextLines={2} />
          </List>
 }
 render(){
  let author;
  let nickname;
  let commont_author;
  let commentList = <LoadedTip msg="暂无评论噢！快来点评或提问吧" />
  const  userid = cookies.get('userid');
  const  username = cookies.get('username');
  const  avatar = cookies.get('avatar');
  const { data,current,totals,getPagination,comments } = this.props.articles;
  if(!data) return <LoadTip msg="加载中..." />;
  if(data.author){
    author = data.author.name;
    nickname = data.author.nickname;
  }
  if(comments&&comments.length>0){
   commentList = comments.map((item)=>{
    if(data.author._id===item.author._id){
      commont_author="commont_author";
    }
    return <div key = {item._id} className="comment-list">
          <ListItem
           disabled = { true }         
           leftAvatar={<Avatar src={item.author.avatar?item.author.avatar:require("../../assets/images/guest.jpg")}/>}
           rightAvatar = { <div className="list-right" >
             <span className="time"> {moment(item.createdAt).format("YYYY-MM-DD HH:mm")} </span>
            </div>
           }
           primaryText={
            <div className="comment-author">
             <a href={`/user/${item.author._id}`} className={commont_author}> {item.author.name} - {item.author.nickname} </a> 
             <span>{item.comment_title?<span className="title">{item.comment_title}</span>:null}</span>
            </div>
           }
           secondaryText={ <div className="comment-box">{ item.contents }</div> }
           secondaryTextLines={2} />
          </div>
   })
  }
  return (
   <div className="main-box detail-wraper">
   <div className="detail-wraper-box">
    <Paper>
     {this.renderAuther()}
     <div className="detail-box markdown-body">
     <div className="detail-title"> 
      <h1> {data.title} </h1>
      <div className="title-item">
       <span>{moment(data.createdAt).format('YYYY-MM-DD HH:mm')}</span>
       <label><span>评论：</span>{data.comments.length}</label>
       <label><span>浏览：</span>{data.review}</label>
       <label><span>点赞：</span>{data.praise.num}</label>
      </div>
      {data.In_situ?<p className="In_situ"> (转载)原文地址: {data.In_situ} </p>:null}
     </div>
     {data.cover?<img src={data.cover} className="article-cover"/>:null}
     <Makedhtml data={data.content} className="article-detail"/>    
     </div>
     <div className="praise-wrap">
     <FloatingActionButton 
      backgroundColor = "#FF4081"
      iconStyle = {{color:'#fff',hoverColor:'#FF4081'}}
      onClick = {this.praisearticle.bind(this,data._id)}
      style={{color:'#fff'}}>      
      <span style={{height:'100%'}}> 点赞 </span>
     </FloatingActionButton>
     <p className="praise-tip">已有 <span>{data.praise&&data.praise.num?data.praise.num:0}</span> 人点赞该文章</p>
     </div>
    </Paper>
    <Paper className="comments-wrap">
    <div className="comments-box">
      <Subheader>用户评论</Subheader>
     <List>
      { commentList }
     </List>     
      {totals&&totals>10?<div className = "Pagination">
       <Pagination 
        current={Number(current)?Number(current):1}
        onChange = {this.getPagination.bind(this,10,data._id)}
        total={totals} /></div>:null}
     </div>
    </Paper>
    <Paper style={{marginBottom:'120px',padding:20}}>    
     <Subheader>写评论</Subheader>
     <form onSubmit={this.handdleComment} ref="commentForm" className="form-comment">
     <ListItem 
       disabled = { true }  
       leftAvatar={<Avatar src={avatar?avatar:require("../../assets/images/guest.jpg")}/>}
       primaryText={
         <div>
          <span>评论人</span>
         </div>
       }
       secondaryText={
        userid&&username?<div className="comment-author-option"> { author } - { nickname } </div>:<div>未登录</div>
       }
      secondaryTextLines={2} />
     <MarkedComent 
      titleName = "comment_title"
      titleTip = "限3-50字符哦"
      titleHolder = "评论标题"
      name="contents"
      btnStyle = {{background:'#3F51B5'}}
      textTip = "留下你的精彩评论吧 (限3-140字符)"
      placeholder = "分享你的观点"
      className="coments-box" />
     </form>
    </Paper>
    <Paper>
    </Paper>
   </div>
  </div>  
 )}
}

ArticleDetail.propTypes = {
};
const mapStateToProps=({ articles })=>{
  return { articles }; 
}
export default connect(mapStateToProps)(ArticleDetail);
