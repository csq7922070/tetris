import React, {Component} from 'react';
import {connect} from 'react-redux';
import PreviewList from '../components/home/preview-list';
import {actions} from './home-redux';
import {push} from 'react-router-redux';

@connect(state => {
	return {
		articleList: state.home.list.articleList
	};
}, {
	push,
	...actions
})
class Home extends Component{
	const {loadArticles, articleList, push} = this.props;
	render(){
		return (
			<div>
				<h1>Home</h1>
				<PreviewList {...this.props}></PreviewList>
			</div>
		);
	}
}

export default Home;