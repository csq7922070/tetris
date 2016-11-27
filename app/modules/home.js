import React from 'react'
import TetrisGame from './tetris-game'

export default React.createClass({
	render(){
		return (<div>
			<TetrisGame></TetrisGame>
			<TetrisGame></TetrisGame>
		</div>);
	}
});