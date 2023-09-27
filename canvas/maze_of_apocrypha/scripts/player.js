// File contains all data and functions associated with the player

var facing = 0;
var speed = 75;
var wallspace = 50;

//Offsets take each square to be offsetMax on a side, remember canvas has positive y down!
var offsetMax = 1000;
var xoffset = 500;
var yoffset = 500;
var xVec = 0;
var yVec = -1;

var moved = false; // did player move this turn?

//new X and Y positions after movement (to help check collison)
var newX = xoffset;
var newY = yoffset;

var turnSpeed = 10;

function playerUpdate()
{
	//input
	moved = false;
	newX = xoffset;
	newY = yoffset;

	//change facing
	if (Key.isDown(Key.LEFT)) facing+=turnSpeed;
	if (Key.isDown(Key.RIGHT)) facing-=turnSpeed;
	if ((Key.isDown(Key.LEFT))||(Key.isDown(Key.RIGHT)))
	{
		if (facing >= 360) facing -= 360;
		else if (facing < 0) facing += 360;
		xVec = playerVectorX();
		yVec = playerVectorY();
	}


	//Move around
	if (Key.isDown(Key.W)) 
	{
		newX+=speed*xVec;
		newY+=speed*yVec;
		moved = true;
		isPlayerForward = true;
	}
	if (Key.isDown(Key.S)) 
	{
		newX+=-speed*xVec;
		newY+=-speed*yVec;
		moved = true;
		isPlayerForward = false;
	}
	if (Key.isDown(Key.A)) 
	{
		newX+=+speed*yVec;
		newY+=-speed*xVec;
		moved = true;
		isPlayerForward = false;
	}
	if (Key.isDown(Key.D)) 
	{
		newX+=-speed*yVec;
		newY+=+speed*xVec;
		moved = true;
		isPlayerForward = false;
	}

	//Check for collisons before doing this eventually
	if(moved = true)
	{
		playerCollision();

		xoffset = newX;
		yoffset = newY;
	}
	
}

function playerCollision()
{
	if(newX > offsetMax) 
	{
		if(map[midTile+1][midTile] > 20) {newX-=offsetMax; shiftRight(); monsterX--;}
		else newX = offsetMax - wallspace;
	}
	else if(newX < 0)
	{
		if(map[midTile-1][midTile] > 20) {newX+=offsetMax; shiftLeft(); monsterX++;}
		else newX = wallspace;
	}


	if(newY > offsetMax)
	{
		if(map[midTile][midTile+1] > 20) {newY-=offsetMax; shiftDown(); monsterY--;}
		else newY = offsetMax - wallspace;
	}
	else if(newY < 0)
	{
		if(map[midTile][midTile-1] > 20) {newY+=offsetMax; shiftUp(); monsterY++;}
		else newY = wallspace;
	}
}

//These are the shift functions, the map generation will be done somewhere else

//Up is negative y
function shiftUp()
{
	//alert("array length " + map.length + " " + map[2].length);

	for(i=0;i<mapSize;i++)
	{
		for(j=0;j<(mapSize-1);j++)
		{
			tempMap[i][j+1] = map[i][j];
		}
		tempMap[i][0] = 0;
	}
	copyMap()
	levelUpdate[progress]();
}

function shiftDown()
{

	for(i=0;i<mapSize;i++)
	{
		for(j=1;j<mapSize;j++)
		{
			tempMap[i][j-1] = map[i][j];
		}
		tempMap[i][mapSize-1] = 0;
	}
	copyMap()
	levelUpdate[progress]();
}

function shiftLeft()
{
	//I switched i and j from shift right
	for(i=0;i<mapSize;i++)
	{
		for(j=0;j<(mapSize-1);j++)
		{
			tempMap[j+1][i] = map[j][i];
		}
		tempMap[0][i] = 0;
	}
	copyMap()
	levelUpdate[progress]();
}

function shiftRight()
{
	//I switched i and j from shift down
	for(i=0;i<mapSize;i++)
	{
		for(j=1;j<mapSize;j++)
		{
			tempMap[j-1][i] = map[j][i];
		}
		tempMap[mapSize-1][i] = 0;
	}
	copyMap()
	levelUpdate[progress]();
}

//It seems I need to copy each array element manually
function copyMap()
{
	for(i=0;i<mapSize;i++)
	{
		for(j=0;j<(mapSize);j++)
		{
			map[i][j] = tempMap[i][j];
		}
	}
}


function playerVectorX()
{
	return -Math.sin(facing/180*Math.PI);
}

function playerVectorY()
{
	return -Math.cos(facing/180*Math.PI);
}

