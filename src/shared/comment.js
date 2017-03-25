/*
* @ author sessionboy
* @ github  https://github.com/sessionboy
* @ website http://sinn.boyagirl.com
* @ 用户评论组件
* @ data 需要进行marked解析的内容
* @ style 自定义样式
* @ className 自定义类
*/
import React, { Component,PropTypes } from 'react';
import { TextField,RaisedButton } from 'material-ui';

class MarkedComent extends Component{

 render(){
  const styles = {
   root: {
     width: '90%',
     height: 'auto',
     borderRadius: 5
   },
   textareaStyle: {
     width: '100%',
     height: 120,
     margin: '10px auto',
     border: '1px solid #f4f4f4',
     resize: 'none',
     outline: 'none',
     padding: 20
   },
   btnWraper: {
     textAlign: 'right',
     padding: '12px'
   },
   btnStyle: {
     width: 80,
     height: 35,
     textAlign: 'center',
     color: '#fff',
     border: 'none',
     fontSize: 15,
     borderRadius: 2,
     cursor: 'pointer',
     background: '#3F51B5'
   },
   titleStyle: {
    width: '100%',
    paddingLeft: 12,
    fontSize: 12,
    height: 34,
    border: '1px solid #f4f4f4',
   }
  }
  const { 
   style,
   textStyle,
   className, 
   name,
   rows,
   textTip,
   titleTip,
   textclassName,
   btnclassName,
   btnStyle,
   placeholder,
   titleName,
   titleHolder 
  } = this.props;
   return (
     <div className={className?className:null} style={ style?style:styles.root }>
      <TextField 
       name={titleName} 
       fullWidth={true}
       floatingLabelFixed = {true}
       floatingLabelText={ titleTip } 
       hintText={ titleHolder } />
      <TextField 
       name={name} 
       rows = {rows?rows:3}
       fullWidth={true}
       multiLine = {true}
       className = {textclassName}
       floatingLabelFixed = {true}
       floatingLabelText={ textTip }
       style={ textStyle } 
       hintText={ placeholder } />
      <div style={styles.btnWraper} >
       <RaisedButton 
        type = 'submit'
        label = "提交"
        primary={true}
        buttonStyle = { btnStyle } />
      </div>
     </div>
   )
 }
}
export default MarkedComent;


