//	Main JS for my platformer	-mhwinder


//Debug HTML box
//var debug = document.getElementById('debugText').innerHTML;



var animation = 0;

/*
var map = new Object();
map = test_map_3_safe;
var spikeMap = new Object();
spikeMap = test_map_3_spikes;
*/

var map = new Object();
map = map_1_safe;
var spikeMap = new Object();
spikeMap = map_1_special;

map.gravity = 1;


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
	updateBullets();

	document.getElementById('debugText').innerHTML = "Bullets: "+bulletHandler.count;
	
	drawUI();
	drawBullets();
	drawHero();
	drawMap(map);
	
	animation++;
	if(animation == 360) animation = 0;
}




























