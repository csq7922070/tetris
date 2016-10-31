import React from 'react'
import {Link,IndexLink} from 'react-router'

export default React.createClass({
  render() {
    return (
    	<div>
	    	<h1>app</h1>
	    	<ul role="nav">
	    		<li><IndexLink to="/" activeStyle={{color:'red'}}>Home</IndexLink></li>
	    		<li><Link to="/comment-box/1" activeStyle={{color:'red'}}>CommentBox</Link></li>
	    		<li><Link to="/about" activeStyle={{color:'red'}}>About</Link></li>
	    		<li><Link to="/repos" activeStyle={{color:'red'}}>Repos</Link></li>
	    	</ul>
	    	{this.props.children}
    	</div>
    )
  }
})