import React from 'react'
import TetrisView from './tetris-view'
import TetrisEngine from './tetris-engine'

export default React.createClass({
	getInitialState(){
		return {
			id:'game-canvas-'+(new Date()).getTime(),
			canvas:null,
			tetrisView:null,
			tetrisEngine:null,
			score:0,
			startMenuText:'开始',
			pauseMenuText:'暂停'
		};
	},
	componentDidMount(){
		var canvas = this.state.canvas = document.getElementById(this.state.id);
		var hSize = 15,vSize = 20;
		var tetrisView = this.state.tetrisView = new TetrisView({
			canvas:canvas,
			hSize:hSize,
			vSize:vSize,
			cubeSize:20,
			x:0,
			y:0
		});
		tetrisView.redrawMap();
		var tetrisEngine = this.state.tetrisEngine = new TetrisEngine({
			hSize:hSize,
			vSize:vSize,
			interval:1000
		});
		var redrawMap = tetrisView.redrawMap.bind(tetrisView);
		tetrisEngine.onReset(redrawMap);
		var redrawPart = tetrisView.redrawPart.bind(tetrisView);
		tetrisEngine.onFullRow(redrawPart);
		tetrisEngine.onScoreChange(function(score){
			this.setState({score:score});
		}.bind(this));
		var drawTransformCube = tetrisView.drawTransformCube.bind(tetrisView);
		tetrisEngine.onCubeTransform(drawTransformCube);
	},
	start(){
		this.state.tetrisEngine.start();
		this.setState({startMenuText:'重新开始',pauseMenuText:'暂停'});
	},
	pause(){
		var tetrisEngine = this.state.tetrisEngine;
		var gameStatus = tetrisEngine.getGameStatus();
		if(gameStatus==='run'){//游戏运行中，需要暂停
			tetrisEngine.pause();
			this.setState({pauseMenuText:'继续'});
		}else if(gameStatus==='pause'){//游戏暂停中，需要继续运行
			tetrisEngine.continue();
			this.setState({pauseMenuText:'暂停'});
		}
	},
	stop(){
		this.state.tetrisEngine.stop();
		this.setState({startMenuText:'开始',pauseMenuText:'暂停'});
	},
	leftMove(){
		this.state.tetrisEngine.leftMove();
	},
	rightMove(){
		this.state.tetrisEngine.rightMove();
	},
	rotate(){
		this.state.tetrisEngine.rotate();
	},
	accelerateDownMove(){
		this.state.tetrisEngine.accelerateDownMove();
	},
	render(){
		return (<div className="tetris-game">
			<div>
				<div>
					<button onClick={this.start}>{this.state.startMenuText}</button>
					<button onClick={this.pause}>{this.state.pauseMenuText}</button>
					<button onClick={this.stop}>停止</button>
				</div>
				<div>
					<button onClick={this.leftMove}>左移</button>
					<button onClick={this.rightMove}>右移</button>
					<button onClick={this.rotate}>旋转</button>
					<button onClick={this.accelerateDownMove}>加速下移</button>
				</div>
			</div>
			<canvas id={this.state.id}></canvas>
			<div>
				<label>游戏得分：</label><span>{this.state.score}</span>
			</div>
		</div>);
	}
});