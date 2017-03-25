/*
* 编辑器组件
*/
import React, { Component } from 'react';
import {findDOMNode} from 'react-dom';
import highlight from 'highlight.js';
import marked from 'marked';
import 'github-markdown-css';
import 'highlight.js/styles/docco.css'; 
import './style.css';

marked.setOptions({
  highlight: function (code, lang, callback) {
    return highlight.highlightAuto(code).value;
  }
 });

class MyEditor extends Component {
    state = {
        text: this.props.source || '',
        html: marked(this.props.source || '')
    }
    componentDidMount(){
       this.editor = findDOMNode(this.refs.editor);
    }
    handleChange=(e)=>{
      this.setState({
        text: this.editor.value,
        html: marked(this.editor.value),
      });
    }
    render() {
        return (
         <div className="Elfmd">
            <div className="elf-entry">
              <textarea className="elf-text" ref="editor" name="content" onChange={this.handleChange}></textarea>
            </div>
            <div className="elf-output markdown-body" dangerouslySetInnerHTML={{ __html: this.state.html }}></div>
            <div>{this.state.text}</div>
         </div>
        );
    }
}

export default MyEditor;