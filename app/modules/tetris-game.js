import React from 'react'
import TetrisView from './tetris-view'
import TetrisEngine from './tetris-engine'

export default React.createClass({
	getInitialState(){
		return {
			canvas:null,
			tetrisView:null,
			tetrisEngine:null
		};
	},
	componentDidMount(){
		var canvas = this.state.canvas = document.getElementById("gameCanvas");
		var tetrisView = this.state.tetrisView = new TetrisView({
			canvas:canvas,
			hSize:10,
			vSize:15,
			cubeSize:20,
			x:0,
			y:0
		});
		tetrisView.redrawMap();
		var tetrisEngine = this.state.tetrisEngine = new TetrisEngine({
			hSize:10,
			vSize:15,
			interval:1000
		});
		var redrawMap = tetrisView.redrawMap.bind(tetrisView);
		tetrisEngine.onReset(redrawMap);
		var redrawPart = tetrisView.redrawPart.bind(tetrisView);
		tetrisEngine.onFullRow(redrawPart);
		var drawTransformCube = tetrisView.drawTransformCube.bind(tetrisView);
		tetrisEngine.onCubeTransform(drawTransformCube);
	},
	start(){
		this.state.tetrisEngine.start();
	},
	render(){
		return (<div>
			<button onClick={this.start}>开始</button>
			<canvas id="gameCanvas"></canvas>
		</div>);
	}
});