


var chess = document.getElementById("chess");
var context = chess.getContext("2d");
var me = true;

// 一个棋盘数组变量， 用于记录该点是否下子或下子的黑白；
var chessBoard = [];

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
  var x = e.offsetX;
  var y = e.offsetY;
  var i = Math.round((x - 15) / 30);
  var j = Math.round((y - 15) / 30);
  if (chessBoard[i][j] == 0){
    drawChess(i, j, me);
    if(me){
      chessBoard[i][j] = 1;
    }
    else {
      chessBoard[i][j] = 2;
    }
    me = !me;
  }
  else {
    alert("can not type!");
  }
}
