import React,{ PropTypes,Component } from 'react';
import moment from 'moment';
import { FlatButton, Subheader,RaisedButton,Badge,FontIcon,IconButton,FloatingActionButton,Avatar,GridList, GridTile } from 'material-ui';
import LoadTip from '../../shared/loadedtip';
import Makedhtml from '../../shared/markdown';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Iconvisibility from 'material-ui/svg-icons/action/visibility';
import Iconfavorite from 'material-ui/svg-icons/action/favorite';
import Icontextsms from 'material-ui/svg-icons/Communication/textsms';
import Arrowright from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Pagination  from 'rc-pagination';
import { sourcetype,styles } from './styles';
import Styles from './main.css';
import 'rc-pagination/assets/index.css';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import StackGrid,{ transitions,easings } from "react-stack-grid";
const transition = transitions.scaleDown;

class Recoment extends Component {
  constructor(props){
    super(props);
  }
  renderGridList=()=>{
    const { data } = this.props;
    return <GridList
        style={{margin:12}}
        cellHeight={280} >
      <Subheader>最新热门</Subheader>
      {data.map((item) => (
        <GridTile
          key={item._id}
          title={
            <a href={`/detail/${item._id}`} className="recoment-title-box">
             <Avatar className="recoment-avatar" src={item.author.avatar?item.author.avatar:require("../../assets/images/guest.jpg")}
              size={30} />
             <span>{item.title}</span>
            </a>
          }
          subtitle={<span className="secondary-item" >by <span>{item.author.name+'-'+item.author.nickname}</span></span>}
        >
         <a href={`/detail/${item._id}`} className="recoment-cover"> <img src={item.cover} /> </a>
        </GridTile>
      ))}
    </GridList>
  }
render() {
  const { data } = this.props;
  if(!data||data.length==0) return <div />
  return <div>
      { this.renderGridList() }
    </div>
  }
}

export default Recoment;



