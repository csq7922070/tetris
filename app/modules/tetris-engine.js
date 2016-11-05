export default class TetrisEngine{
	// param = {
	// 	hSize,
	// 	vSize,
	//  interval//方块下落初始时间间隔，以毫秒为单位，比如1000
	// }
	constructor(param){
		this.hSize = param.hSize;
		this.vSize = param.vSize;
		//this.interval代表方块下落初始时间间隔，this.currentInterval代表方块下落当前时间间隔
		//因为方块下落的速度随着积分提高而变快，方块下落时间间隔也因此而变小
		this.currentInterval = this.interval = param.interval;
		this.map = [];
		for(let i = 0;i<this.vSize;i++){
			let hArray = new Array(this.hSize);
			for(let j = 0;j<this.hSize;j++){
				hArray[j] = false;
			}
			this.map.push(hArray);
		}

		this.cubes = [
		//第一种
		// X
		// X
		// X
		// X
			[
				[false,true,false,false],
				[false,true,false,false],
				[false,true,false,false],
				[false,true,false,false]
			],
		//第一种变形，顺时针旋转
		// X X X X
			[
				[false,false,false,false],
				[false,false,false,false],
				[true,true,true,true],
				[false,false,false,false]
			],
		//第二种
		// X X
		// X X
			[
				[false,false,false,false],
				[false,true,true,false],
				[false,true,true,false],
				[false,false,false,false]
			],
		//第三种
		// X
		// X X X
			[
				[false,false,false,false],
				[true,false,false,false],
				[true,true,true,false],
				[false,false,false,false]
			],
		//第三种变形1，顺时针旋转
		// X X
		// X
		// X
			[
				[false,false,false,false],
				[false,true,true,false],
				[false,true,false,false],
				[false,true,false,false]
			],
		//第三种变形2，顺时针旋转
		// X X X
		//     X
			[
				[false,false,false,false],
				[false,false,false,false],
				[true,true,true,false],
				[false,false,true,false]
			],
		//第三种变形3，顺时针旋转
		//   X
		//   X
		// X X
			[
				[false,false,false,false],
				[false,true,false,false],
				[false,true,false,false],
				[true,true,false,false]
			],
		//第四种
		//     X
		// X X X
			[
				[false,false,false,false],
				[false,false,false,true],
				[false,true,true,true],
				[false,false,false,false]
			],
		//第四种变形1，顺时针旋转
		// X
		// X
		// X X
			[
				[false,false,false,false],
				[false,false,true,false],
				[false,false,true,false],
				[false,false,true,true]
			],
		//第四种变形2，顺时针旋转
		// X X X
		// X
			[
				[false,false,false,false],
				[false,false,false,false],
				[false,true,true,true],
				[false,true,false,false]
			],
		//第四种变形3，顺时针旋转
		// X X
		//   X
		//   X
			[
				[false,false,false,false],
				[false,true,true,false],
				[false,false,true,false],
				[false,false,true,false]
			],
		//第五种
		//   X X
		// X X
			[
				[false,false,false,false],
				[false,true,true,false],
				[true,true,false,false],
				[false,false,false,false]
			],
		//第五种变形1，顺时针旋转
		// X
		// X X
		//   X
			[
				[false,false,false,false],
				[false,true,false,false],
				[false,true,true,false],
				[false,false,true,false]
			],
		//第六种
		// X X
		//   X X
			[
				[false,false,false,false],
				[false,true,true,false],
				[false,false,true,true],
				[false,false,false,false]
			],
		//第六种变形1，顺时针旋转
		//   X
		// X X
		// X
			[
				[false,false,false,false],
				[false,false,false,true],
				[false,false,true,true],
				[false,false,true,false]
			],
		//第七种
		//   X
		// X X X
			[
				[false,false,false,false],
				[false,true,false,false],
				[true,true,true,false],
				[false,false,false,false]
			],
		//第七种变形1，顺时针旋转
		// X
		// X X
		// X
			[
				[false,false,false,false],
				[false,true,false,false],
				[false,true,true,false],
				[false,true,false,false]
			],
		//第七种变形2，顺时针旋转
		// X X X
		//   X
			[
				[false,false,false,false],
				[false,false,false,false],
				[true,true,true,false],
				[false,true,false,false]
			],
		//第七种变形3，顺时针旋转
		//   X
		// X X
		//   X
			[
				[false,false,false,false],
				[false,true,false,false],
				[true,true,false,false],
				[false,true,false,false]
			]
		];
	}

	//在游戏重新开始需要对整个游戏地图进行重置时参数callback代表的回调函数将被调用
	onReset(callback){
		this.resetCallback = callback;
	}

	reset(){
		for(let i = 0;i<this.vSize;i++){
			for(let j = 0;j<this.hSize;j++){
				this.map[i][j] = false;
			}
		}
		this.resetCallback();
	}

	//根据方块类别type（范围1~7）获取其在this.cubes中对应的数组下标（范围0~18）
	//七种方块通过变形能得到19种方块，在this.cubes中的数组下标分别是0~18
	getCubeTypeIndex(type){
		if(type===1){
			return 0;
		}else if(type===2){
			return 2;
		}else if(type===3){
			return 3;
		}else if(type===4){
			return 7;
		}else if(type===5){
			return 11;
		}else if(type===6){
			return 13;
		}else if(type===7){
			return 15;
		}
	}

	start(){
		reset();
		this.currentType = (Math.round(Math.random()*10)%7)+1;//范围1~7，代表七种方块
		// 这七种方块分别是
		// 1.
		// X
		// X
		// X
		// X
		// 2.
		// X X
		// X X
		// 3.
		// X
		// X X X
		// 4.
		//     X
		// X X X
		// 5.
		//   X X
		// X X
		// 6.
		// X X
		//   X X
		// 7.
		//   X
		// X X X

		this.prevTypeIndex = this.currentTypeIndex = getCubeTypeIndex(this.currentType);
		this.prevCube = this.currentCube = this.cubes[this.currentTypeIndex];
		this.prevPos = this.currentPos = {
			x:this.hSize/2-3,
			y:0
		};
		//通知渲染层渲染初始游戏方块
		cubeTransformCallback(this.prevPos,this.prevCube,this.currentPos,this.currentCube);

		autoDownMove();
	}

	autoDownMove(){
		setTimeout(function(){
			if(downMove()){
				setTimeout(arguments.callee,this.currentInterval);
			}
		},this.currentInterval);
	}

	pause(){

	}

	continue(){

	}

	stop(){

	}

	//旋转成功返回true，旋转失败返回false
	rotate(){

	}

	//左移成功返回true，失败返回false
	leftMove(){

	}

	//右移成功返回true，失败返回false
	rightMove(){

	}

	//下移成功返回true，失败返回false
	downMove(){

	}

	//加速下移
	accelerateDownMove(){
		while(downMove()){

		}
	}

	//在方块左移、右移、下移、旋转时参数callback代表的回调函数将被调用
	onCubeTransform(callback){
		this.cubeTransformCallback = callback;
		// callback(this.prevPos,this.prevCube,this.currentPos,this.currentCube);
		// this.prevPos和this.currentPos格式{x,y}，x代表方块所在的4*4矩形左上角横坐标，范围0~this.hSize-1，
		// y代表方块所在的4*4矩形左上角纵坐标，范围0~this.vSize-1
		// 横坐标是从左到有右为正，纵坐标是从上到下为正
		// ----------------------------------------------------
		// this.prevCube和this.currentCube格式4*4的二维布尔数组，数组中值为true的元素代表方块
	}
}