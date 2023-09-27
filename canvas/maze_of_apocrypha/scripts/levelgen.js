//This file holds the rules to generate the maze based on the progress
//The functions are put in an array for easy use later
//  (no giant if-then tree!)

//All these variables have to be here because I suck at coding and want them global
var progress = 0;
var counter = 0;		//counter is for keeping track of mid progress 
var isPlayerForward = true;	//This is used to keep the level gen less complicated
var keyDir = 0;

var isMonster = false;
var monsterTime = -1;
var monsterX = 3;
var monsterY = 3;
var monsterVX = 0;
var monsterVY = 0;

var levelUpdate = new Array();

levelUpdate[0] = levelUpdate00;
levelUpdate[1] = levelUpdate01;
levelUpdate[2] = levelUpdate02;
levelUpdate[3] = levelUpdate03;
levelUpdate[4] = levelUpdate04;
levelUpdate[5] = levelUpdate05;




function levelUpdate00()
{
	endlessMazeBehind();
	endlessMazeAhead();
	if(isPlayerForward)
	{		//8 tiles to check for a suitably long hallway then add the ghost event
		if(map[midTile+6][midTile+3] == 21) 
		{
			map[midTile+6][midTile+4] = 22; map[midTile+6][midTile+2] = 22;
			map[midTile+2][midTile+3] = 23; map[midTile+5][midTile+3] = 24;
		}
		if(map[midTile-6][midTile+3] == 21)
		{
			map[midTile-6][midTile+4] = 22; map[midTile-6][midTile+2] = 22;
			map[midTile-2][midTile+3] = 23; map[midTile-5][midTile+3] = 24;
		}
		if(map[midTile+6][midTile-3] == 21)
		{
			map[midTile+6][midTile-4] = 22; map[midTile+6][midTile-2] = 22;
			map[midTile+2][midTile-3] = 23; map[midTile+5][midTile-3] = 24;
		}
		if(map[midTile-6][midTile-3] == 21)
		{
			map[midTile-6][midTile-4] = 22; map[midTile-6][midTile-2] = 22;
			map[midTile-2][midTile-3] = 23; map[midTile-5][midTile-3] = 24;
		}	
		if(map[midTile+3][midTile+6] == 21)
		{
			map[midTile+2][midTile+6] = 22; map[midTile+4][midTile+6] = 22;
			map[midTile+3][midTile+2] = 23; map[midTile+3][midTile+5] = 24;
		}
		if(map[midTile+3][midTile-6] == 21)
		{
			map[midTile+2][midTile-6] = 22; map[midTile+4][midTile-6] = 22;
			map[midTile+3][midTile-2] = 23; map[midTile+3][midTile-5] = 24;
		}
		if(map[midTile-3][midTile+6] == 21)
		{
			map[midTile-2][midTile+6] = 22; map[midTile-4][midTile+6] = 22;
			map[midTile-3][midTile+2] = 23; map[midTile-3][midTile+5] = 24;
		}
		if(map[midTile-3][midTile-6] == 21)
		{
			map[midTile-2][midTile-6] = 22; map[midTile-4][midTile-6] = 22;
			map[midTile-3][midTile-2] = 23; map[midTile-3][midTile-5] = 24;
		}
	}
	//Set up the next level
	if((map[midTile][midTile] == 23) && isPlayerForward) 
	{
		progress++; 
		counter = 0;
		map[midTile][midTile] = 21;
		if ((facing > 45) && (facing <= 135)) 
		{
			keyDir = 270;
			for(i=(midTile+1);i<mapSize;i++)
			{
				for(j=0;j<mapSize;j++)
				{
					map[i][j] = 0;
				}
			}
			map[midTile+1][midTile] = 23;
			map[midTile+2][midTile] = 21;
			map[midTile+3][midTile] = 21;
			map[midTile+4][midTile] = 21;
			map[midTile+5][midTile] = 21;
			map[midTile+5][midTile+1] = 22;
			map[midTile+5][midTile-1] = 22;
		}
		else if ((facing > 135) && (facing <= 225)) 
		{
			keyDir = 0;
			for(j=0;j<(midTile);j++)
			{
				for(i=0;i<mapSize;i++)
				{
					map[i][j] = 0;
				}
			}
			map[midTile][midTile-1] = 23;
			map[midTile][midTile-2] = 21;
			map[midTile][midTile-3] = 21;
			map[midTile][midTile-4] = 21;
			map[midTile][midTile-5] = 21;
			map[midTile+1][midTile-5] = 22;
			map[midTile-1][midTile-5] = 22;
		}
		else if ((facing > 225) && (facing <= 315)) 
		{
			keyDir = 90;
			for(i=0;i<(midTile);i++)
			{
				for(j=0;j<mapSize;j++)
				{
					map[i][j] = 0;
				}
			}
			map[midTile-1][midTile] = 23;
			map[midTile-2][midTile] = 21;
			map[midTile-3][midTile] = 21;
			map[midTile-4][midTile] = 21;
			map[midTile-5][midTile] = 21;
			map[midTile-5][midTile-1] = 22;
			map[midTile-5][midTile+1] = 22;
		}
		else 
		{
			keyDir = 180;
			for(j=(midTile+1);j<(mapSize);j++)
			{
				for(i=0;i<mapSize;i++)
				{
					map[i][j] = 0;
				}
			}	
			map[midTile][midTile+1] = 23;
			map[midTile][midTile+2] = 21;
			map[midTile][midTile+3] = 21;
			map[midTile][midTile+4] = 21;
			map[midTile][midTile+5] = 21;
			map[midTile+1][midTile+5] = 22;
			map[midTile-1][midTile+5] = 22;
		}		
	}
}

function levelUpdate01()
{
	endlessMazeAhead();
	if(map[midTile][midTile] == 24) progress--;

	//make 2 halls and have monster run left or right
	if(map[midTile][midTile] == 23)
	{
		counter++;
		map[midTile][midTile] = 21;
		if(keyDir == 0)
		{
			//Deletes all the crap behind you (even if your looking, not sure if I care)
			for(j=(midTile+1);j<(mapSize);j++) for(i=0;i<mapSize;i++) map[i][j] = 0;

			for(i=(midTile-5);i<(midTile+6);i++) map[i][midTile-4] = 21;
			map[midTile-5][midTile-3] = 21; map[midTile-5][midTile-5] = 21;
			map[midTile+5][midTile-3] = 21; map[midTile+5][midTile-5] = 21;
			if(Math.floor(Math.random()*2))
			{
				keyDir = 270;
				monsterX = -2; monsterY = -5; isMonster = true;
				monsterVX = 0.125; monsterVY = 0; monsterTime = 60;
				map[midTile+1][midTile-4] = 23;
				map[midTile-1][midTile-4] = 24;
			}
			else
			{
				keyDir = 90;
				monsterX = +2; monsterY = -5; isMonster = true;
				monsterVX = -0.125; monsterVY = 0; monsterTime = 60;
				map[midTile-1][midTile-4] = 23;
				map[midTile+1][midTile-4] = 24;
			}
		}
		else if(keyDir == 90)
		{
			//Clears all behind
			for(i=(midTile+1);i<mapSize;i++) for(j=0;j<mapSize;j++) map[i][j] = 0;

			for(i=(midTile-5);i<(midTile+6);i++) map[midTile-4][i] = 21;
			map[midTile-3][midTile+5] = 21; map[midTile-5][midTile+5] = 21;
			map[midTile-3][midTile-5] = 21; map[midTile-5][midTile-5] = 21;
			if(Math.floor(Math.random()*2))
			{
				keyDir = 180;
				monsterX = -5; monsterY = -2; isMonster = true;
				monsterVX = 0; monsterVY = 0.125; monsterTime = 60;
				map[midTile-4][midTile+1] = 23;
				map[midTile-4][midTile-1] = 24;
			}
			else
			{
				keyDir = 0;
				monsterX = -5; monsterY = 2; isMonster = true;
				monsterVX = 0; monsterVY = -0.125; monsterTime = 60;
				map[midTile-4][midTile-1] = 23;
				map[midTile-4][midTile+1] = 24;
			}
		}
		else if(keyDir == 180)
		{
			//Clears all behind
			for(j=0;j<(midTile);j++) for(i=0;i<mapSize;i++) map[i][j] = 0;

			for(i=(midTile-5);i<(midTile+6);i++) map[i][midTile+4] = 21;
			map[midTile-5][midTile+3] = 21; map[midTile-5][midTile+5] = 21;
			map[midTile+5][midTile+3] = 21; map[midTile+5][midTile+5] = 21;
			if(Math.floor(Math.random()*2))
			{
				keyDir = 270;
				monsterX = -2; monsterY = +5; isMonster = true;
				monsterVX = 0.125; monsterVY = 0; monsterTime = 60;
				map[midTile+1][midTile+4] = 23;
				map[midTile-1][midTile+4] = 24;
			}
			else
			{
				keyDir = 90;
				monsterX = +2; monsterY = +5; isMonster = true;
				monsterVX = -0.125; monsterVY = 0; monsterTime = 60;
				map[midTile-1][midTile+4] = 23;
				map[midTile+1][midTile+4] = 24;
			}
		}
		else
		{
			//Clears all behind
			for(i=0;i<(midTile);i++) for(j=0;j<mapSize;j++) map[i][j] = 0;

			for(i=(midTile-5);i<(midTile+6);i++) map[midTile+4][i] = 21;
			map[midTile+3][midTile+5] = 21; map[midTile+5][midTile+5] = 21;
			map[midTile+3][midTile-5] = 21; map[midTile+5][midTile-5] = 21;
			if(Math.floor(Math.random()*2))
			{
				keyDir = 180;
				monsterX = 5; monsterY = -2; isMonster = true;
				monsterVX = 0; monsterVY = 0.125; monsterTime = 60;
				map[midTile+4][midTile+1] = 23;
				map[midTile+4][midTile-1] = 24;
			}
			else
			{
				keyDir = 0;
				monsterX = 5; monsterY = 2; isMonster = true;
				monsterVX = 0; monsterVY = -0.125; monsterTime = 60;
				map[midTile+4][midTile-1] = 23;
				map[midTile+4][midTile+1] = 24;
			}
		}
	}
}

function levelUpdate02()
{
}

function levelUpdate03()
{
}

function levelUpdate04()
{
}

function levelUpdate05()
{
}

//This function does the "behind the character" stuff for sections of endless maze
function endlessMazeBehind()
{
	if ((facing > 45) && (facing <= 135))
	{
		if(inTunnelX())
		{
			for(i=(midTile+1);i<mapSize;i++) for(j=0;j<mapSize;j++) map[i][j] = 0;

			map[midTile+1][midTile] = 21;
			map[midTile+2][midTile] = 21;
			map[midTile+3][midTile] = 21;
			map[midTile+4][midTile] = 21;
			if(Math.floor((Math.random()*2))) map[midTile+4][midTile+1] = 22;
			if(Math.floor((Math.random()*2))) map[midTile+4][midTile-1] = 22;
		}
	}
	else if ((facing > 135) && (facing <= 225))
	{
		if(inTunnelY())
		{
			for(j=0;j<(midTile);j++) for(i=0;i<mapSize;i++) map[i][j] = 0;

			map[midTile][midTile-1] = 21;
			map[midTile][midTile-2] = 21;
			map[midTile][midTile-3] = 21;
			map[midTile][midTile-4] = 21;
			if(Math.floor((Math.random()*2))) map[midTile+1][midTile-4] = 22;
			if(Math.floor((Math.random()*2))) map[midTile-1][midTile-4] = 22;
		}
	}
	else if ((facing > 225) && (facing <= 315))
	{
		if(inTunnelX())
		{
			for(i=0;i<(midTile);i++) for(j=0;j<mapSize;j++) map[i][j] = 0;

			map[midTile-1][midTile] = 21;
			map[midTile-2][midTile] = 21;
			map[midTile-3][midTile] = 21;
			map[midTile-4][midTile] = 21;
			if(Math.floor((Math.random()*2))) map[midTile-4][midTile+1] = 22;
			if(Math.floor((Math.random()*2))) map[midTile-4][midTile-1] = 22;
		}
	}
	else 
	{
		if(inTunnelY())
		{
			for(j=(midTile+1);j<(mapSize);j++) for(i=0;i<mapSize;i++) map[i][j] = 0;
	
			map[midTile][midTile+1] = 21;
			map[midTile][midTile+2] = 21;
			map[midTile][midTile+3] = 21;
			map[midTile][midTile+4] = 21;
			if(Math.floor((Math.random()*2))) map[midTile+1][midTile+4] = 22;
			if(Math.floor((Math.random()*2))) map[midTile-1][midTile+4] = 22;
		}
	}
}

//This function does the construction ahead of the player, different progress levels will
//require additional stuff to be added to the maze on top of this
function endlessMazeAhead()
{
	//There are 8 possible tiles to build extended tunnels
	if(map[midTile-1][midTile-3]==22)	//up left
	{
		var tunLen = Math.floor((Math.random()*3))+4;
		for(i=(midTile-tunLen);i<(midTile);i++) map[i][midTile-3] = 21;
		if(Math.floor((Math.random()*2))) map[midTile-tunLen][midTile-4] = 22;
		if(Math.floor((Math.random()*2))) map[midTile-tunLen][midTile-2] = 22;
	}

	if(map[midTile+1][midTile-3]==22)	//up right
	{
		var tunLen = Math.floor((Math.random()*3))+4;
		for(i=(midTile+1);i<(midTile+tunLen+1);i++) map[i][midTile-3] = 21;
		if(Math.floor((Math.random()*2))) map[midTile+tunLen][midTile-4] = 22;
		if(Math.floor((Math.random()*2))) map[midTile+tunLen][midTile-2] = 22;
	}
	if(map[midTile-1][midTile+3]==22)	//down left
	{
		var tunLen = Math.floor((Math.random()*3))+4;
		for(i=(midTile-tunLen);i<(midTile);i++) map[i][midTile+3] = 21;
		if(Math.floor((Math.random()*2))) map[midTile-tunLen][midTile+4] = 22;
		if(Math.floor((Math.random()*2))) map[midTile-tunLen][midTile+2] = 22;
	}
	if(map[midTile+1][midTile+3]==22)	//down right
	{
		var tunLen = Math.floor((Math.random()*3))+4;
		for(i=(midTile+1);i<(midTile+tunLen+1);i++) map[i][midTile+3] = 21;
		if(Math.floor((Math.random()*2))) map[midTile+tunLen][midTile+4] = 22;
		if(Math.floor((Math.random()*2))) map[midTile+tunLen][midTile+2] = 22;
	}
	if(map[midTile+3][midTile+1]==22)	//right down
	{
		var tunLen = Math.floor((Math.random()*3))+4;
		for(i=(midTile+1);i<(midTile+tunLen+1);i++) map[midTile+3][i] = 21;
		if(Math.floor((Math.random()*2))) map[midTile+2][midTile+tunLen] = 22;
		if(Math.floor((Math.random()*2))) map[midTile+4][midTile+tunLen] = 22;
	}
	if(map[midTile+3][midTile-1]==22)	//right up
	{
		var tunLen = Math.floor((Math.random()*3))+4;
		for(i=(midTile-tunLen);i<(midTile);i++) map[midTile+3][i] = 21;
		if(Math.floor((Math.random()*2))) map[midTile+2][midTile-tunLen] = 22;
		if(Math.floor((Math.random()*2))) map[midTile+4][midTile-tunLen] = 22;
	}
	if(map[midTile-3][midTile+1]==22)	//left down
	{
		var tunLen = Math.floor((Math.random()*3))+4;
		for(i=(midTile+1);i<(midTile+tunLen+1);i++) map[midTile-3][i] = 21;
		if(Math.floor((Math.random()*2))) map[midTile-2][midTile+tunLen] = 22;
		if(Math.floor((Math.random()*2))) map[midTile-4][midTile+tunLen] = 22;
	}
	if(map[midTile-3][midTile-1]==22)	//left up
	{
		var tunLen = Math.floor((Math.random()*3))+4;
		for(i=(midTile-tunLen);i<(midTile);i++) map[midTile-3][i] = 21;
		if(Math.floor((Math.random()*2))) map[midTile-2][midTile-tunLen] = 22;
		if(Math.floor((Math.random()*2))) map[midTile-4][midTile-tunLen] = 22;
	}
}


function clearBehind()
{
	if ((facing > 45) && (facing <= 135))
	{
		for(i=(midTile+1);i<mapSize;i++) for(j=0;j<mapSize;j++) map[i][j] = 0;
	}
	else if ((facing > 135) && (facing <= 225))
	{
		for(j=0;j<(midTile);j++) for(i=0;i<mapSize;i++) map[i][j] = 0;
	}
	else if ((facing > 225) && (facing <= 315))
	{
		for(i=0;i<(midTile);i++) for(j=0;j<mapSize;j++) map[i][j] = 0;
	}
	else 
	{
		for(j=(midTile+1);j<(mapSize);j++) for(i=0;i<mapSize;i++) map[i][j] = 0;
	}
}

//Decides if you are in a space like		###
function inTunnelX()			//	 @ 
{					//	###
	if	((map[midTile+1][midTile] > 20) && (map[midTile-1][midTile] > 20) && 
		(map[midTile-1][midTile+1] < 20) && (map[midTile-1][midTile-1] < 20) && 
		(map[midTile+1][midTile-1] < 20) && (map[midTile+1][midTile+1] < 20) && 
		(map[midTile][midTile+1] < 20) && (map[midTile][midTile-1] < 20))
	{return true;}
	else
	{return false;}
}

//Decides if your in a space like		# #
function inTunnelY()			//	#@#
{					//	# #
	if	((map[midTile][midTile+1] > 20) && (map[midTile][midTile-1] > 20) &&
		(map[midTile-1][midTile+1] < 20) && (map[midTile+1][midTile] < 20) &&
		(map[midTile+1][midTile+1] < 20) && (map[midTile-1][midTile-1] < 20) &&
		(map[midTile-1][midTile] < 20) && (map[midTile+1][midTile-1] < 20))
	{return true;}
	else
	{return false;}
}

