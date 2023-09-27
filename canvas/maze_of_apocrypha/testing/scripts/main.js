// Maze of Apocrypha JS

//Debug HTML box
//var debug = document.getElementById('debugText').innerHTML;

// declare a bunch of variable we will need later
var startTime	= Date.now();
var container;

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
	// test if webgl is supported
	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	//This is the 2D set up
	canvas = document.getElementById('myCanvas');
	ctx = canvas.getContext('2d');	//Sets a value for draw.js
	//setInterval(mainLoop,32); //This is the old crappy way to do this

	//Start the input listening
	window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
	window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);

	// create the container for stats
	container = document.createElement( 'div' );
	document.body.appendChild( container );

	// init the Stats and append it to the Dom - performance vuemeter
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild( stats.domElement );
	
	//initialize the time
	timeNow = Date.now();

	// begin the mainLoop 
	requestAnimationFrame( mainLoop );
}

function mainLoop()
{
	clearCanvas();

	//Establish a change in time
	var temptime = Date.now();
	timeChange = temptime - timeNow;
	timeNow = temptime;

	playerUpdate();
	worldUpdate[progress](facing);


	document.getElementById('debugText').innerHTML ="<br>progress: " + progress +
							"<br>facing: " + facing +
							"<br>isPlayerForward: " + isPlayerForward +
							"<br>change in time: " + timeChange +
							"<br>midTile value " + map[12][12] +
							"<br>xoffset: " + xoffset + 
							"<br>yoffset: " + yoffset +
							"<br>keyDir: " + keyDir;

	drawPlayer();
	if(isMonster) drawMonster();
	drawMap(map);
	
	
	animation++;
	if(animation == 360) animation = 0;	

	// relaunch the 'timer' 
	requestAnimationFrame( mainLoop );
	// update the stats
	stats.update();
}







