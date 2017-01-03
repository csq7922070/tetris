export default class TetrisView{
	// param = {
	//  mainCanvas,
	//  nextCanvas,
	// 	hSize,
	// 	vSize,
	// 	cubeSize,//方块尺寸，以像素为单位（方块是正方形哦）
	// 	x,//地图左上角横坐标，单位像素
	// 	y//地图左上角纵坐标，单位像素
	// }
	constructor(param){
		this.mainCanvas = param.mainCanvas;
		this.nextCanvas = param.nextCanvas;
		this.mainCtx = this.mainCanvas.getContext('2d');
		this.nextCtx = this.nextCanvas.getContext('2d');
		this.hSize = param.hSize;
		this.vSize = param.vSize;
		this.cubeSize = param.cubeSize;
		this.mapWidth = this.hSize*this.cubeSize;
		this.mapHeight = this.vSize*this.cubeSize;
		this.mainCanvas.width = this.mapWidth;
		this.mainCanvas.height = this.mapHeight;
		this.nextCanvas.width = this.nextCanvas.height = 4 * this.cubeSize;
		this.mapPos = {
			x:param.x,
			y:param.y
		};
		this.mapBackgroundColor = "#000";//地图背景色
		this.cubeFillColors = ["#f00","#0f0","#00f","#ff0","#ff0080","#0ff","#8000ff"];//方块填充色，共7种类型
		this.cubeLineWidth = 1;
		this.cubeStrokeStyle = "#333";
	}

	//重绘游戏主地图，之前地图中存在的方块将被清除
	redrawMap(){
		this.mainCtx.fillStyle = this.mapBackgroundColor;
		this.mainCtx.fillRect(this.mapPos.x,this.mapPos.y,this.mapWidth,this.mapHeight);
	}

	//重绘下一个方块显示区域，之前存在的方块将被清除
	redrawNextBackground(){
		this.nextCtx.fillStyle = this.mapBackgroundColor;
		this.nextCtx.fillRect(0,0,this.nextCanvas.width,this.nextCanvas.height);
	}

	//map是二维数组，值为true代表相应位置有方块，false代表没有
	redrawPart(startRow,endRow,map){
		this.mainCtx.fillStyle = this.mapBackgroundColor;
		this.mainCtx.fillRect(this.mapPos.x,this.mapPos.y+startRow*this.cubeSize,this.mapWidth,this.mapPos.y+endRow*this.cubeSize);
		this.mainCtx.strokeStyle = this.cubeStrokeStyle;
		this.mainCtx.lineWidth = this.cubeLineWidth;
		for(let i = startRow;i<=endRow;i++){
			for(let j = 0;j<this.hSize;j++){
				if(map[i][j].exist){
					this.mainCtx.fillStyle = this.cubeFillColors[map[i][j].type-1];
					this.mainCtx.fillRect(this.mapPos.x+this.cubeSize*j,this.mapPos.y+this.cubeSize*i,
						this.cubeSize,this.cubeSize);
					this.mainCtx.strokeRect(this.mapPos.x+this.cubeSize*j+1,this.mapPos.y+this.cubeSize*i+1,
						this.cubeSize-2,this.cubeSize-2);
				}
			}
		}
	}

	// prevPos和currentPos格式{x,y}，x代表方块所在的4*4矩形左上角横坐标，范围0~this.hSize-1，
	// y代表方块所在的4*4矩形左上角纵坐标，范围0~this.vSize-1
	// 横坐标是从左到有右为正，纵坐标是从上到下为正
	// ----------------------------------------------------
	// prevCube和currentCube格式4*4的二维布尔数组，数组中值为true的元素代表方块
	// -----------------------------------------------------
	// currentType代表当前方块的类型，范围是1~7
	drawTransformCube(prevPos,prevCube,currentPos,currentCube,currentType){
		var cubeFillColor = this.cubeFillColors[currentType-1];
		this.drawCube(prevPos,prevCube,true,cubeFillColor);//用地图背景色绘制变换之前的方块
		this.drawCube(currentPos,currentCube,false,cubeFillColor);//用方块填充色绘制变换之后的方块
	}

	// cube格式4*4的二维布尔数组，数组中值为true的元素代表方块
	// type代表方块的类型，范围是1~7
	drawNextCube(cube, type){
		this.redrawNextBackground();
		var cubeFillColor = this.cubeFillColors[type-1];
		this.nextCtx.strokeStyle = this.cubeStrokeStyle;
		this.nextCtx.lineWidth = this.cubeLineWidth;
		this.nextCtx.fillStyle = cubeFillColor;
		for(let i = 0; i < 4; i++){
			for(let j = 0;j < 4; j++){
				if(cube[i][j]){
					this.nextCtx.fillRect(this.cubeSize*j,this.cubeSize*i,this.cubeSize,this.cubeSize);
					this.nextCtx.strokeRect(this.cubeSize*j,this.cubeSize*i,this.cubeSize,this.cubeSize);
				}
			}
		}
	}

	//pos格式{x,y}，cube格式4*4的二维布尔数组，数组中值为true的元素代表方块，clear为true代表用地图背景色绘制方块，否则用方块填充色绘制方块
	drawCube(pos,cube,clear,cubeFillColor){
		var vSize = cube.length;
		var hSize = cube[0].length;
		this.mainCtx.strokeStyle = this.cubeStrokeStyle;
		this.mainCtx.lineWidth = this.cubeLineWidth;
		for(let i = 0;i<vSize;i++){
			for(let j = 0;j<hSize;j++){
				if(cube[i][j]){
					var fillColor = this.mapBackgroundColor;
					if(!clear){
						fillColor = cubeFillColor;
					}
					this.mainCtx.fillStyle = fillColor;
					this.mainCtx.fillRect(this.mapPos.x+this.cubeSize*(pos.x+j),this.mapPos.y+this.cubeSize*(pos.y+i),
						this.cubeSize,this.cubeSize);
					if(!clear){
						this.mainCtx.strokeRect(this.mapPos.x+this.cubeSize*(pos.x+j)+1,this.mapPos.y+this.cubeSize*(pos.y+i)+1,
							this.cubeSize-2,this.cubeSize-2);
					}
				}
			}
		}
	}
}