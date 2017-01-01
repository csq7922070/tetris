import React, {Component} from 'react';
import './preview.css';

class Preview extends Component{
	static propTypes = {
		title: React.PropTypes.string,
		link: React.PropTypes.string,
		push: React.PropTypes.func
	};

	handleNavigate(id, e){
		e.preventDefault();

		this.props.push(`/detail/${id}`);
	}

	render(){
		return (
			<article className="article-preview-item">
				<h1 className="title">
					<a href={`/detail/${this.props.id}`} onClick={this.handleNavigate.bind(this, this.props.id)}>
						{this.props.title}
					</a>
				</h1>
				<span className="date">{this.props.date}</span>
				<p className="desc">{this.props.description}</p>
			</article>
		);
	}
}

export default Preview;