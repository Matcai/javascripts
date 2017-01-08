var numbs = [
    [0x00,0x18,0x24,0x24,0x24,0x24,0x24,0x18], //0
    [0x00,0x18,0x1c,0x18,0x18,0x18,0x18,0x18], //1
    [0x00,0x1e,0x30,0x30,0x1c,0x06,0x06,0x3e], //2
    [0x00,0x1e,0x30,0x30,0x1c,0x30,0x30,0x1e], //3
    [0x00,0x30,0x38,0x34,0x32,0x3e,0x30,0x30], //4
    [0x00,0x1e,0x02,0x1e,0x30,0x30,0x30,0x1e], //5
    [0x00,0x1c,0x06,0x1e,0x36,0x36,0x36,0x1c], //6
    [0x00,0x3f,0x30,0x18,0x18,0x0c,0x0c,0x0c], //7
    [0x00,0x1c,0x36,0x36,0x1c,0x36,0x36,0x1c], //8
    [0x00,0x1c,0x36,0x36,0x36,0x3c,0x30,0x1c]  //9

]


var digit = [
    [0x1c,0x36,0x63,0x63,0x63,0x63,0x63,0x63,0x36,0x1c], //0
    [0x0c,0x3c,0x0c,0x0c,0x0c,0x0c,0x0c,0x0c,0x0c,0x7f], //1
    [0x3e,0x63,0x03,0x06,0x0c,0x18,0x30,0x60,0x63,0x7f], //2
    [0x7f,0x03,0x06,0x0c,0x1c,0x06,0x03,0x03,0x63,0x3e], //3
    [0x06,0x0e,0x1e,0x36,0x66,0x7f,0x06,0x06,0x06,0x0f], //4
    [0x7f,0x60,0x60,0x7e,0x03,0x03,0x03,0x03,0x63,0x3e], //5
    [0x06,0x18,0x30,0x60,0x6e,0x63,0x63,0x63,0x63,0x3e], //6
    [0x7f,0x63,0x06,0x06,0x0c,0x0c,0x18,0x18,0x18,0x18], //7
    [0x3e,0x63,0x63,0x63,0x3e,0x63,0x63,0x63,0x63,0x3e], //8
    [0x3e,0x63,0x63,0x63,0x3b,0x03,0x03,0x06,0x0c,0x30], //9
    [0x00,0x00,0x06,0x06,0x00,0x00,0x06,0x06,0x00,0x00]  //:
]

var matrix = [];

for(var j = 0; j < digit.length; j++) {
    matrix[j] = [];
    for(var i = 0; i < digit[j].length; i++) {
	matrix[j][i] = [];
	var str = digit[j][i];
	var toBit = str.toString(2);
	for(var m = 0; m < 7-toBit.length; m++) {
	    matrix[j][i][m] = 0;
	}
	for(var k = 0; k < toBit.length; k++) {
	    matrix[j][i][k+(7-toBit.length)] = parseInt(toBit[k]);
	}
    }
}