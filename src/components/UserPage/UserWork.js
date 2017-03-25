/* 布局组件
* @ author sessionboy
* @ github  https://github.com/sessionboy
* @ website http://sinn.boyagirl.com
* @ 用户作品信息组件
*/
import React,{ PropTypes,Component } from 'react';
import { List,ListItem,Avatar,Subheader } from 'material-ui';
import Pagination  from 'rc-pagination';
import moment from 'moment';
import './style.css';

const UserWork=({
  articles,
  current,
  totals,
  user,
  getpagination
})=>{
  
  if(!articles) return <div />;
  const mapArticleList = articles.map((item)=>{
   return <ListItem
         key = { item._id } 
	       disabled = {true}
	       style={{padding:10}}
	       rightAvatar={<span className="list-date"> 
	         { moment(item.createdAt).format("YYYY-MM-DD HH:mm") } 
	        </span>
	       }
	       primaryText={
	         <div className="personal-article">
	          <a href={`/detail/${item._id}`}>{ item.title }</a>       
	         </div>
	       }/>
  })
  return <div className="article-box" >
    <Subheader> 文章列表 </Subheader>
    <List>
     { mapArticleList }
    </List>
    <Pagination 
     current={Number(current)?Number(current):1}
     onChange = { getpagination.bind(this,10,user._id)}
     total={totals} />
   </div>
}
export default UserWork;