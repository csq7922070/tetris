export default class TetrisView{
	// param = {
	//  canvas,
	// 	hSize,
	// 	vSize,
	// 	cubeSize,//方块尺寸，以像素为单位（方块是正方形哦）
	// 	x,//地图左上角横坐标，单位像素
	// 	y//地图左上角纵坐标，单位像素
	// }
	constructor(param){
		this.canvas = param.canvas;
		this.ctx = this.canvas.getContext('2d');
		this.hSize = param.hSize;
		this.vSize = param.vSize;
		this.cubeSize = param.cubeSize;
		this.mapWidth = this.hSize*this.cubeSize;
		this.mapHeight = this.vSize*this.cubeSize;
		this.mapPos = {
			x:param.x,
			y:param.y
		};
		this.mapBackgroundColor = "#000";
		this.cubeFillColor = "#f00";
		redrawMap();
	}

	redrawMap(){
		this.ctx.fillStyle = this.mapBackgroundColor;
		this.ctx.fillRect(this.mapPos.x,this.mapPos.y,this.mapWidth,this.mapHeight);
	}

	//map是二维数组，值为true代表相应位置有方块，false代表没有
	redrawPart(startRow,endRow,map){
		this.ctx.fillStyle = this.mapBackgroundColor;
		this.ctx.fillRect(this.mapPos.x,this.mapPos.y+startRow*this.cubeSize,this.mapWidth,this.mapPos.y+endRow*this.cubeSize);
		this.ctx.fillStyle = this.cubeFillColor;
		for(let i = startRow;i<=endRow;i++){
			for(let j = 0;j<this.hSize;j++){
				if(map[i][j]){
					this.fillRect(this.mapPos.x+this.cubeSize*j,this.mapPos.y+this.cubeSize*i,this.cubeSize,this.cubeSize);
				}
			}
		}
	}

	// prevPos和currentPos格式{x,y}，x代表方块所在的4*4矩形左上角横坐标，范围0~this.hSize-1，
	// y代表方块所在的4*4矩形左上角纵坐标，范围0~this.vSize-1
	// 横坐标是从左到有右为正，纵坐标是从上到下为正
	// ----------------------------------------------------
	// prevCube和currentCube格式4*4的二维布尔数组，数组中值为true的元素代表方块
	drawTransformCube(prevPos,prevCube,currentPos,currentCube){
		drawCube(prevPos,prevCube,true);//用地图背景色绘制变换之前的方块
		drawCube(currentPos,currentCube,false);//用方块填充色绘制变换之后的方块
	}

	//pos格式{x,y}，cube格式4*4的二维布尔数组，数组中值为true的元素代表方块，clear为true代表用地图背景色绘制方块，否则用方块填充色绘制方块
	drawCube(pos,cube,clear){
		var vSize = cube.length;
		var hSize = cube[0].length;
		for(let i = 0;i<vSize;i++){
			for(let j = 0;j<hSize;j++){
				if(cube[i][j]){
					var fillColor = this.mapBackgroundColor;
					if(!clear){
						fillColor = this.cubeFillColor;
					}
					this.ctx.fillStyle = this.fillColor;
					this.fillRect(this.mapPos.x+this.cubeSize*(pos.x+j),this.mapPos.y+this.cubeSize*(pos.y+i),this.cubeSize,this.cubeSize);
				}
			}
		}
	}
}