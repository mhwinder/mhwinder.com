// Maze of Apocrypha JS

//Debug HTML box
//var debug = document.getElementById('debugText').innerHTML;

var animation = 0;

//Holds the state of the keyboard
var Key = {
	_pressed: {},

	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,

	A: 65,
	S: 83,
	D: 68,
	Q: 81,
	W: 87,
	E: 69,
  
	isDown: function(keyCode) {
		return this._pressed[keyCode];
	},
  
	onKeydown: function(event) {
		this._pressed[event.keyCode] = true;
	},
  
	onKeyup: function(event) {
		delete this._pressed[event.keyCode];
	}
};

function init()
{
	canvas = document.getElementById('myCanvas')
	ctx = canvas.getContext('2d');	//Sets a value for draw.js
	setInterval(mainLoop,32);

	window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
	window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
}

function mainLoop()
{
	
	clearCanvas();
	playerUpdate();
	worldUpdate[progress](facing);


	document.getElementById('debugText').innerHTML ="<br>progress: " + progress +
							"<br>facing: " + facing +
							"<br>isPlayerForward: " + isPlayerForward +
							"<br>midTile value " + map[12][12] +
							"<br>xoffset: " + xoffset + 
							"<br>yoffset: " + yoffset +
							"<br>keyDir: " + keyDir;

	drawPlayer();
	if(isMonster) drawMonster();
	drawMap(map);
	
	
	animation++;
	if(animation == 360) animation = 0;
}







