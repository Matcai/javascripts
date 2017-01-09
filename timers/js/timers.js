var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;

window.onload = function(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    setInterval(function(){render(context);}, 500);

}


function render(cxt){

    var hours = 12;
    var minutes = 34;
    var seconds = 56;
    var times = new Date();

    renderDigit(50, 50, parseInt(times.getHours()/10), cxt);
    renderDigit(50+100, 50, parseInt(times.getHours()%10), cxt);
    renderDigit(50+100*2, 50, 10, cxt);
    renderDigit(50+100*3, 50, parseInt(times.getMinutes()/10), cxt);
    renderDigit(50+100*4, 50, parseInt(times.getMinutes()%10), cxt);
    renderDigit(50+100*5, 50, 10, cxt);
    renderDigit(50+100*6, 50, parseInt(times.getSeconds()/10), cxt);
    renderDigit(50+100*7, 50, parseInt(times.getSeconds()%10), cxt);
}

function renderDigit(x, y, num, cxt){
  cxt.clearRect(x-5,y-5,220,220);
    cxt.fillStyle = "rgb(0, 102, 153)";

    for(var i = 0; i < matrix[num].length; i++) {
	  for(var j = 0; j < matrix[num][i].length; j++) {
	    if (matrix[num][i][j]) {
		cxt.beginPath();
		cxt.arc(j*12+x,i*12+y,5,0,2*Math.PI);
		cxt.closePath();
		cxt.fill();
	    }
	}
    }

}
