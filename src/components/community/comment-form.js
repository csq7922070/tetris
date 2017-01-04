import React from 'react'

export default React.createClass({
	getInitialState: function() {
		return {
			author: '',
			text: ''
		};
	},
	handleAuthrChange: function(e) {
		this.setState({
			author: e.target.value
		});
	},
	handleTextChange: function(e) {
		this.setState({
			text: e.target.value
		});
	},
	handleSubmit: function(e) {
		e.preventDefault();
		var author = this.state.author.trim();
		var text = this.state.text.trim();
		if (!text || !author) {
			return;
		}
		this.props.onCommentSubmit({
			author: author,
			text: text
		});
		this.setState({
			author: '',
			text: ''
		});
	},
	render: function() {
		return (
			<form className="commentForm" onSubmit={this.handleSubmit}>
				<input type="text" placeholder="your name" onChange={this.handleAuthrChange} />
				<input type="text" placeholder="your description" onChange={this.handleTextChange} />
				<input type="submit" value="POST" />
			</form>
		);
	}
});