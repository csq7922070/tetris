import React from 'react'
import { render } from 'react-dom'
import {Router,Route,hashHistory,IndexRoute} from 'react-router'
import App from './modules/app'
import CommentBox from './modules/comment-box'
import About from './modules/about'
import Repos from './modules/repos'
import Home from './modules/home'
import TetrisGame from './modules/tetris-game'

window.apiPath = "http://localhost:3000/api";

render((
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Home}/>
			<Route path="comment-box/:id" component={CommentBox}/>
			<Route path="about" component={About}/>
			<Route path="repos" component={Repos}/>
		</Route>
	</Router>
), document.getElementById('app'));