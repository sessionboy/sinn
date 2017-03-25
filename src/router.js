
/*
 * @ author sessionboy
 * @ github  https://github.com/sessionboy
 * @ website http://sinn.boyagirl.com
 * @ use 路由配置
 */

import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';
import {
   App, 
	 IndexPage,
   AboutPage,
   ArticlePage,
   ArticleDetail,
   PersonalPage,
   LoginPage,
   RegisterPage
  } from './containers/exports';

 injectTapEventPlugin();

export default function({ history }) {
	const muiTheme = getMuiTheme({
	  palette: {
	    accent1Color: deepOrange500,
    },
  });
  return (
  	<MuiThemeProvider muiTheme={muiTheme} >
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={IndexPage} />
        <Route path="article" component={ArticlePage} />
        <Route path="detail" component={ArticleDetail}>
         <Route path=":id" component={ArticleDetail} />
        </Route>
        <Route path="about" component={AboutPage} />
        <Route path="login" component={LoginPage} />
        <Route path="register" component={RegisterPage} />
        <Route path="user" component={PersonalPage}>
         <Route path=":id" component={PersonalPage} />
        </Route>
      </Route>
    </Router>
   </MuiThemeProvider>
  );
};
