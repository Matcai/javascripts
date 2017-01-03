
var chess = document.getElementById("chess");
var context = chess.getContext("2d");

var me = true;
var over = false;

// 定义一个赢法数组
var wins = [];

var myWin = [];
var computerWin = [];

// 一个棋盘数组变量， 用于记录该点是否下子或下子的黑白；
var chessBoard = [];



// 初始化三维数组
for(var i=0; i<15; i++){
    wins[i] = [];
    for(var j = 0; j < 15; j++) {
	wins[i][j] = [];
    }
}

// 赢法计时器
var count = 0;

// 统计所有的竖线赢法
for (var i=0; i<15; i++){
    for (var j=0; j<11; j++){
	for (var k=0; k<5; k++){
	    wins[i][j+k][count] = true;
	}
	count++ ;
    }
}

// 统计所有的横线赢法
for (var i=0; i<11; i++){
    for (var j=0; j<15; j++){
	for (var k=0; k<5; k++){
	    wins[i+k][j][count] = true;
	}
	count++ ;
    }
}

// 统计所有斜线的赢法
for (var i=0; i<11; i++){
    for (var j=0; j<11; j++){
	for (var k=0; k<5; k++){
	    wins[i+k][j+k][count] = true;
	}
	count++ ;
    }
}

// 统计所有反斜线的赢法
for (var i=14; i>3; i--){
    for (var j=0; j<11; j++){
	for (var k=0; k<5; k++){
	    wins[i-k][j+k][count] = true;
	}
	count++ ;
    }
}

//
for(var i = 0; i < count; i++) {
    myWin[i] = 0;
    computerWin[i] = 0;
}




// 初始化chessBoard
for (var i=0; i<15; i++){
    chessBoard[i] = [];
    for (var j=0; j<15; j++){
	chessBoard[i][j] = 0;
    }
}


// 绘制棋盘的函数
var drawChessBoard = function  () {
    context.strokeStyle = "#BFBFBF";
    for (var i = 0; i <= 15; i++){
	context.moveTo(15 + i*30, 15);
	context.lineTo(15 + i*30, 435);
	context.moveTo(15, 15 + i*30);
	context.lineTo(435, 15 + i*30);
    }
    context.stroke();
}

drawChessBoard();

// 检查是否赢的比赛
var checkWin = function(i, j, me){
    for(var k = 0; k < count; k++) {
	if (wins[i][j][k]) {
	    if(me){
		myWin[k]++ ;
		computerWin[k] = 6;
		if (myWin[k] == 5) {
		    window.alert("你赢了");
		    over = true;
		    return;
		}
	    }
	    else{
		myWin[k] = 6;
		computerWin[k]++ ;
		if (computerWin[k] == 5) {
		    window.alert("你输了");
		    over = true;
		    return;
		}
	    }
	}
    }
}

// 绘制棋子的函数，并通过createRadialGradient 进行描绘渐变，me 控制黑白棋
var drawChess = function (i, j, me){
    context.beginPath();
    context.arc(15 + i * 30, 15 + j * 30, 13, 0, 2 * Math.PI);
    context.closePath();
    var gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 15, 15 + i * 30 + 2, 15 + j * 30 - 2 , 1);
    if (me) {
	gradient.addColorStop(0, "#0A0A0A");
	gradient.addColorStop(1, "#636766");
    }
    else {
	gradient.addColorStop(0, "#D1D1D1");
	gradient.addColorStop(1, "#F9F9F9");
    }
    context.fillStyle = gradient;
    context.fill();
}


chess.onclick = function(e) {
    if (over) {
	return;
    }
    if (!me){return;}
    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.round((x - 15) / 30);
    var j = Math.round((y - 15) / 30);
    if (chessBoard[i][j] == 0){
	drawChess(i, j, me);
	chessBoard[i][j] = 1;
	checkWin(i, j, true);
	if (!over){
	    me = !me;
	    computerAI();
	}
    }
    else {
	alert("该处已经下子啦，不能再下。");
    }
    
}

var computerAI = function(){
    var myScore = [];
    var computerScore = [];
    var max = 0,
	u = 0,
	v = 0;
    for(var i = 0; i < 15; i++) {
	myScore[i] = [];
	computerScore[i] = [];
	for(var j = 0; j < 15; j++) {
	    myScore[i][j] = 0;
	    computerScore[i][j] = 0;
	}
    }
    
    for(var i = 0; i < 15; i++) {
	for(var j = 0; j < 15; j++) {
	    if(chessBoard[i][j] == 0){
		for(var k = 0; k < count; k++) {
		    if(wins[i][j][k]){
			if (myWin[k] == 1) {
			    myScore[i][j] += 200;
			}
			else if(myWin[k] == 2){
			    myScore[i][j] += 500;
			}
			else if(myWin[k] == 3){
			    myScore[i][j] += 2000;
			}
			else if(myWin[k] == 4){
			    myScore[i][j] += 10000;
			}
			

			if (computerWin[k] == 1) {
			    computerScore[i][j] += 220;
			}
			else if(computerWin[k] == 2){
			    computerScore[i][j] += 520;
			}
			else if(computerWin[k] == 3){
			    computerScore[i][j] += 2200;
			}
			else if(computerWin[k] == 4){
			    computerScore[i][j] += 20000;
			}
			
		    }
		}
		if (myScore[i][j] > max) {
		    max = myScore[i][j];
		    u = i;
		    v = j;
		}
		else if (myScore[i][j] == max) {
		    if (computerScore[i][j] > computerScore[u][v]) {
			u = i;			
			v = j;
		    }
		}

		if (computerScore[i][j] > max) {
		    max = computerScore[i][j];
		    u = i;
		    v = j;
		}
		else if (computerScore[i][j] == max) {
		    if (myScore[i][j] > myScore[u][v]) {
			u = i;			
			v = j;
		    }
		}
		
	    }
	}
    }
    drawChess(u, v, false);
    chessBoard[u][v] = 2;
    checkWin(u, v, false);
    if (!over){
	me = !me;
    }
}
