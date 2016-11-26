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

		this.gameStatus = "stop";//'stop','run','pause'
	}

	//返回游戏状态，共3种情况：未运行，运行中，暂停中
	//对应的字符串分别是'stop','run','pause'
	getGameStatus(){
		return this.gameStatus;
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

	//获取下一个要出场的方块类型
	getNextCubeType(){
		return (Math.round(Math.random()*10)%7)+1;//范围1~7，代表七种方块
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
	}

	//获取新出场的方块初始位置
	getInitCubePos(){
		return {
			x:this.hSize/2-3,
			y:0
		};
	}

	start(){
		if(this.autoDownMoveTimer){
			clearTimeout(this.autoDownMoveTimer);
		}
		this.reset();
		this.currentType = this.getNextCubeType();//范围1~7，代表七种方块
		this.nextType = this.getNextCubeType();//范围1~7，代表七种方块

		this.prevTypeIndex = this.currentTypeIndex = this.getCubeTypeIndex(this.currentType);
		this.prevCube = this.currentCube = this.cubes[this.currentTypeIndex];
		this.prevPos = this.currentPos = this.getInitCubePos();
		//通知渲染层渲染新生的游戏方块
		this.cubeTransformCallback(this.prevPos,this.prevCube,this.currentPos,this.currentCube);

		this.autoDownMove();
		this.gameStatus = 'run';
	}

	//在方块下移后存在满行时参数callback代表的函数将被调用
	onFullRow(callback){
		this.fullRowCallback = callback;
		// callback(startRow,endRow,map);
		// startRow代表地图从上往下看第一个存在方块的行索引
		// endRow代表地图所有满行中最靠近底部的行索引
		// map代表地图，二维数组类型，值为true代表相应位置有方块，值为false代表没有
	}

	//判断当前游戏地图中的方块是否存在满行现象，存在消去满行部分，返回true，否则返回false
	fullRowDeal(){
		var fullRowIndexs = [];//记录满行行索引，比如高度20行第17,18,20行满行则数组值为[16,17,19]
		//遍历存在满行的行并将行索引保存到数组fullRowIndexs中
		for(let i = this.vSize-1;i>=0;i--){
			for(var j = 0;j<this.hSize;j++){
				if(!this.map[i][j]){
					break;
				}
			}
			if(j===this.hSize){
				fullRowIndexs.push(i);
			}
			if(fullRowIndexs.length===4){//每次方块下落后最多造成4行满行
				break;
			}
		}
		//将满行的行状态设置为false
		for(let i = 0;i<fullRowIndexs.length;i++){
			let rowIndex = fullRowIndexs[i];
			for(let j = 0;j<this.hSize;j++){
				this.map[rowIndex][j] = false;
			}
		}
		var lastUpRow = 0;//记录有方块的最上面一行的行索引
		//查找有方块的最上面一行的行索引
		for(let i = 0;i<this.vSize;i++){
			for(var j = 0;j<this.hSize;j++){
				if(this.map[i][j]){
					break;
				}
			}
			if(j<this.hSize){
				lastUpRow = i;
			}
		}
		//消去满行后满行上方的方块需要做下移处理
		if(fullRowIndexs.length>0){
			let downSize = 1;
			let index = 1;
			for(let i = fullRowIndexs[0]-1;i>=lastUpRow;i--){
				if(index<fullRowIndexs.length&&fullRowIndexs[index]===i){//当前行是满行
					index++;
					downSize++;
					continue;
				}
				//对于不是满行的行做下移处理
				for(let j = 0;j<this.hSize;j++){
					this.map[i][j] = false;
					this.map[i+downSize][j] = true;
				}
			}
		}

		if(fullRowIndexs.length>0){
			//通知渲染层进行消行处理
			this.fullRowCallback(lastUpRow, fullRowIndexs[0], this.map);
			return true;
		}else{
			return false;
		}
	}

	autoDownMove(){
		var self = this;
		var f = function(){
			if(self.downMoveDeal()&&!self.fullRowDeal()){//方块下移成功并且不存在满行
				self.autoDownMoveTimer = setTimeout(f,self.currentInterval);
			}else{
				self.currentType = self.nextType;
				self.nextType = self.getNextCubeType();//范围1~7，代表七种方块
				self.prevTypeIndex = self.currentTypeIndex = self.getCubeTypeIndex(self.currentType);
				self.prevCube = self.currentCube = self.cubes[self.currentTypeIndex];
				self.prevPos = self.currentPos = self.getInitCubePos();
				if(self.enablePlaceCube(self.currentTypeIndex,self.currentPos)){//新生的方块可以放置
					//通知渲染层渲染新生的游戏方块
					self.cubeTransformCallback(self.prevPos,self.prevCube,self.currentPos,self.currentCube);
					//启动自动下移
					self.autoDownMoveTimer = setTimeout(f,self.currentInterval);
				}else{//游戏结束
					self.pause();
					alert("游戏结束");
				}
			}
		};
		this.autoDownMoveTimer = setTimeout(f,this.currentInterval);
	}

	pause(){
		clearTimeout(this.autoDownMoveTimer);
		this.gameStatus = 'pause';
	}

	continue(){
		this.autoDownMove();
		this.gameStatus = 'run';
	}

	stop(){
		clearTimeout(this.autoDownMoveTimer);
		this.reset();
		this.gameStatus = 'stop';
	}

	getRotateTypeIndex(typeIndex){
		// 0-1
		// 2
		// 3-6
		// 7-10
		// 11-12
		// 13-14
		// 15-18
		const rotateTypeIndexs = [1,0,
									2,
									4,5,6,3,
									8,9,10,7,
									12,11,
									14,13,
									16,17,18,15];
		return rotateTypeIndexs[typeIndex];
	}

	//判断pos位置typeIndex类型的方块是否能放置到地图中
	//typeIndex代表方块类型，范围0~18，对应this.cubes数组下标
	//pos格式{x,y}，x代表方块所在的4*4矩形左上角横坐标，范围0~this.hSize-1，
	//y代表方块所在的4*4矩形左上角纵坐标，范围0~this.vSize-1
	//横坐标是从左到有右为正，纵坐标是从上到下为正
	enablePlaceCube(typeIndex,pos){
		var cube = this.cubes[typeIndex];
		for(let i = 0;i<4;i++){
			for(let j = 0;j<4;j++){
				if(cube[i][j]){
					//判断当前方块所处位置是否超出边界或已存在其它方块，是返回true
					let x = pos.x+j,y = pos.y+i;
					if(x<0||x>(this.hSize-1)||y<0||y>(this.vSize-1)||this.map[y][x]){
						return false;
					}
				}
			}
		}
		return true;
	}

	//将地图中typeIndex类型pos位置的方块所处位置全部重置为state的值
	//typeIndex代表方块类型，范围0~18，对应this.cubes数组下标
	//pos格式{x,y}，x代表方块所在的4*4矩形左上角横坐标，范围0~this.hSize-1，
	//y代表方块所在的4*4矩形左上角纵坐标，范围0~this.vSize-1
	//横坐标是从左到有右为正，纵坐标是从上到下为正
	//state值为true或false，代表地图指定位置是否有方块存在
	updateMapCubeState(typeIndex,pos,state){
		var cube = this.cubes[typeIndex];
		for(let i = 0;i<4;i++){
			for(let j = 0;j<4;j++){
				if(cube[i][j]){
					let x = pos.x+j,y = pos.y+i;
					this.map[y][x] = state;
				}
			}
		}
	}

	//旋转成功返回true，旋转失败返回false
	rotate(){
		this.updateMapCubeState(this.currentTypeIndex,this.currentPos,false);
		var typeIndex = this.getRotateTypeIndex(this.currentTypeIndex);
		if(this.enablePlaceCube(typeIndex,this.currentPos)){
			this.prevTypeIndex = this.currentTypeIndex;
			this.currentTypeIndex = typeIndex;
			this.prevCube = this.cubes[this.prevTypeIndex];
			this.currentCube = this.cubes[this.currentTypeIndex];
			this.updateMapCubeState(this.currentTypeIndex,this.currentPos,true);
			this.cubeTransformCallback(this.currentPos,this.prevCube,this.currentPos,this.currentCube,this.currentType);
			this.prevTypeIndex = this.currentTypeIndex;
			this.prevCube = this.currentCube;
			return true;
		}else{
			this.updateMapCubeState(this.currentTypeIndex,this.currentPos,true);
			return false;
		}
	}

	//左移成功返回true，失败返回false
	leftMove(){
		this.updateMapCubeState(this.currentTypeIndex,this.currentPos,false);
		var pos = {
			x:this.currentPos.x-1,
			y:this.currentPos.y
		};
		if(this.enablePlaceCube(this.currentTypeIndex,pos)){
			this.prevPos = this.currentPos;
			this.currentPos = pos;
			this.updateMapCubeState(this.currentTypeIndex,this.currentPos,true);
			this.cubeTransformCallback(this.prevPos,this.prevCube,this.currentPos,this.currentCube,this.currentType);
			return true;
		}else{
			this.updateMapCubeState(this.currentTypeIndex,this.currentPos,true);
			return false;
		}
	}

	//右移成功返回true，失败返回false
	rightMove(){
		this.updateMapCubeState(this.currentTypeIndex,this.currentPos,false);
		var pos = {
			x:this.currentPos.x+1,
			y:this.currentPos.y
		};
		if(this.enablePlaceCube(this.currentTypeIndex,pos)){
			this.prevPos = this.currentPos;
			this.currentPos = pos;
			this.updateMapCubeState(this.currentTypeIndex,this.currentPos,true);
			this.cubeTransformCallback(this.prevPos,this.prevCube,this.currentPos,this.currentCube,this.currentType);
			return true;
		}else{
			this.updateMapCubeState(this.currentTypeIndex,this.currentPos,true);
			return false;
		}
	}

	downMove(){
		if(this.downMoveDeal()){
			this.fullRowDeal();
		}
	}

	//下移成功返回true，失败返回false
	downMoveDeal(){
		this.updateMapCubeState(this.currentTypeIndex,this.currentPos,false);
		var pos = {
			x:this.currentPos.x,
			y:this.currentPos.y+1
		};
		if(this.enablePlaceCube(this.currentTypeIndex,pos)){
			this.prevPos = this.currentPos;
			this.currentPos = pos;
			this.updateMapCubeState(this.currentTypeIndex,this.currentPos,true);
			this.cubeTransformCallback(this.prevPos,this.prevCube,this.currentPos,this.currentCube,this.currentType);
			return true;
		}else{
			this.updateMapCubeState(this.currentTypeIndex,this.currentPos,true);
			return false;
		}
	}

	//加速下移
	accelerateDownMove(){
		while(this.downMoveDeal()&&!this.fullRowDeal()){

		}
	}

	//在方块左移、右移、下移、旋转时参数callback代表的回调函数将被调用
	onCubeTransform(callback){
		this.cubeTransformCallback = callback;
		// callback(this.prevPos,this.prevCube,this.currentPos,this.currentCube,this.currentType);
		// this.prevPos和this.currentPos格式{x,y}，x代表方块所在的4*4矩形左上角横坐标，范围0~this.hSize-1，
		// y代表方块所在的4*4矩形左上角纵坐标，范围0~this.vSize-1
		// 横坐标是从左到有右为正，纵坐标是从上到下为正
		// ----------------------------------------------------
		// this.prevCube和this.currentCube格式4*4的二维布尔数组，数组中值为true的元素代表方块
		// -----------------------------------------------------
		// this.currentType代表当前方块的类型，范围是1~7
	}
}