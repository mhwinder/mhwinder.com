//This is where any non-player active world elements will be handled.
//Mainly the monster, but anything else that needs to be checked every frame.

var worldUpdate = new Array();

worldUpdate[0] = worldUpdate00;
worldUpdate[1] = worldUpdate01;
worldUpdate[2] = worldUpdate02;
worldUpdate[3] = worldUpdate03;
worldUpdate[4] = worldUpdate04;
worldUpdate[5] = worldUpdate05;




function worldUpdate00()
{
}

function worldUpdate01()
{
	if(isMonster)
	{
		monsterX+=monsterVX;
		monsterY+=monsterVY;
		monsterTime--;
		if(monsterTime < 0) isMonster = false;
	}
}

function worldUpdate02()
{
}


function worldUpdate03()
{
}


function worldUpdate04()
{
}


function worldUpdate05()
{
}

