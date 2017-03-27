/*
* 发表文章组件 
*/
import React, { Component, PropTypes } from 'react';
import { TextField,RadioButton,RadioButtonGroup,RaisedButton,Toggle,SelectField,MenuItem,Subheader } from 'material-ui';
import Uploadfile from 'material-ui/svg-icons/file/file-upload';
import { connect } from 'dva';
import {findDOMNode} from 'react-dom';
import highlight from 'highlight.js';
import './style.css';
import Upload from 'rc-upload';
import { validate_empty } from './validate';
import Makedhtml from '../../shared/markdown';
import Alert from 'react-s-alert';
import cookies from 'js-cookie';

class ArticlePage extends Component {
   state = {
    text: '',
    retitle: null,
    isreview: false,
    selected: null,
    article_type: null,
    cover: null
   }
   componentDidMount=()=>{
     this.editor = findDOMNode(this.refs.editor);
     this.props.dispatch({
      type: 'articles/query_category'
     })
   }
   handleChange =(e)=>{
      this.setState({
        text: this.editor.value,
      });
    }
  hanndleditor=()=>{
   return <div className="Elfmd">
           <div className="elf-entry">
            <textarea 
             className="elf-text" 
             ref="editor" 
             name="content" 
             placeholder="此处挥洒你的笔墨( 支持markdown语法 ) ……"
             onChange={this.handleChange}>
            </textarea>
            <div className="length-tip">
            <span style={{color:'#f33'}}>{this.state.text?this.state.text.length:0}</span> / <span>15000</span>(字节)
            </div>
           </div>         
        </div>
  }
  onChangeTitle=(e)=>{
    this.setState({
      retitle: e.target.value
    })
  }
  onToggleReview=(e,isreview)=>{
    this.setState({
      isreview
    })
  }
  hanndleReview=()=>{
    return <div className="review-box">
       <div className="review-title"><h2>{this.state.retitle}</h2></div>
       {this.state.cover?<div><img src={this.state.cover} className="article-cover" /></div>:null}
       <Makedhtml data={this.state.text} className="elf-output markdown-body" />
      </div>
  }
  handleSelected=(event, index, selected)=>{
    this.setState({
      selected
    })
  }
  onSelectType=(e,article_type)=>{
   this.setState({
    article_type
   })
  }
  rendergenoptryk=()=>{
    return <div className="etr-reprint">
         <h3>原文地址：</h3>
         <TextField name="In_situ" style={{height:34,width:300}} />
         <span>( 请合法转载 )</span>
       </div>
  }
  handdleSubmit=()=>{
    const sbtform = this.refs.post;
    const formData = new FormData(sbtform);
    const data = {
      title: formData.get('title'),
      cover: this.state.cover,
      categoryId: this.state.selected,
      modality: formData.get('modality'),
      content: this.state.text,
    }
    if(this.state.article_type=='genoptryk') {
      data.In_situ = formData.get('In_situ');
    }
    const empty = validate_empty(data);
    if(empty&&empty.length>0) {
      Alert.error('['+empty+'] 不能为空');
      return false;
    }
    if(data.content.length<200||data.content.length>15000){
      Alert.error('文章字数请控制在200-15000字节以内!');
      return false;
    }
    this.props.dispatch({
      type: 'articles/post',
      payload: data
    })
  }
  handlepost =()=>{
   const This = this;
   const titleStyle = {
   	 width:'90%',
   	 height:58,
   }
   const styles={
     toggle: {
       width: '140px',
       float: 'right'
     }
   }
   const  userid = cookies.get('userid');
   const category_data = this.props.articles.category;
   const category=category_data.map((item,i)=>{
      return <MenuItem key={i} value={item._id} primaryText={item.cate_name} />
   })
   const accept="image/png,image/jpeg,image/jpg";
   const uploadprops = {
    action: "/api/article/create_upload",
    data: { id: userid },
    accept,
    multiple: true,
    maxSize: 1572864,
    component: "div",
    beforeUpload(file){
     if(!userid) {
       Alert.error('您还没有登录哦!');
       return false;
     }
     if(file.size>1572864){
       Alert.error('头像不能大于1.5M哦!');
       return false;
     }
    },
    onSuccess(file){
     if(file.code==200){
      Alert.success('封面上传成功,右下角可开启预览!',{position: 'top'});
      This.setState({
        cover: file.data.url
      })
     }
    }
  }
   return <div className="etr-box">
     <form className="etr-form" ref="post">
       <div className="etr-title">
        <h3>标题：</h3>
        <input 
         className = "etr-title-input"
         name = 'title'
         onChange={this.onChangeTitle}
         placeholder="请输入文章标题" />
       </div>
       <div className="article-info-item">
       <RadioButtonGroup 
        name="modality"
        onChange={this.onSelectType} 
        defaultSelected="original"
        style={{height:20,width:400,margin:'15px 0px',float:'left'}}>
        <RadioButton label="原创" value="original" style={{width:120,float:'left'}}/>
        <RadioButton label="转载" value="genoptryk" style={{width:120,float:'left'}}/>
        <RadioButton label="连载" value="serial" style={{width:120,float:'left'}}/>
       </RadioButtonGroup>
       <SelectField 
        name="categoryId"
        id="category"
        style={{height:46,width:150}}
        hintText="请选择文章类别"
        value={this.state.selected}
        floatingLabelFixed= {true}
        onChange={this.handleSelected}>
        { category }
       </SelectField>
       <div className="upload-box">
        <Upload 
         {...uploadprops}
         className = "upload-util" />
         <RaisedButton 
          label={this.state.cover?'已上传':"上传封面图"}
          secondary={true} 
          buttonStyle = {{background:'#FF4081'}}
          icon={<Uploadfile />}
          className = "upload-btn" />
         <span className="upload-tip"> 提示：给文章配个封面图吧，有机会上头条哦! （可选） </span>
        </div>
       </div>
        {this.state.article_type=='genoptryk'?this.rendergenoptryk():null}
        {this.hanndleditor()}
       <div className="etr-submit">
        <RaisedButton label="发表" primary={true} onClick={this.handdleSubmit.bind(this)} />
        <Toggle 
         label = {this.state.isreview?"关闭预览":"开启下方预览"}
         style={styles.toggle}
         onToggle = {this.onToggleReview}
         defaultToggled={false} />
       </div>
     </form>
       {this.state.isreview?this.hanndleReview():null}
    </div>
  }
 render(){
  return (
   <div className="main-box">
    {this.handlepost()}
   </div>
 )}
}

ArticlePage.propTypes = {
};
const mapStateToProps=({ articles,apps })=>{
  return { articles,apps }; 
}
export default connect(mapStateToProps)(ArticlePage);
