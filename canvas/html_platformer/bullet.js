//	Bullet JS for my platformer	-mhwinder

// bulletData is the object that knows about the individual bullets
var bulletMax = 200;
var bulletData = [];
for(var tempi = 0; tempi < bulletMax; tempi++) {bulletData[tempi] = new Object(); bulletData[tempi].live = false;}

//bulletHandler deals with all the bullets as a group
var bulletHandler = new Object();
bulletHandler.bullets = bulletData;
bulletHandler.count = 0;
bulletHandler.current = 0;

function newBullet(x,y,vx,vy,type)
{
	bulletHandler.bullets[bulletHandler.count].live = true;
	bulletHandler.bullets[bulletHandler.count].x = x
	bulletHandler.bullets[bulletHandler.count].y = y
	bulletHandler.bullets[bulletHandler.count].vx = vx
	bulletHandler.bullets[bulletHandler.count].vy = vy

	if(type == "basic")
	{
		bulletHandler.bullets[bulletHandler.count].update = updateStraight;
		bulletHandler.bullets[bulletHandler.count].hit = hitRegular;
		bulletHandler.bullets[bulletHandler.count].effect = effectDamage;
		bulletHandler.bullets[bulletHandler.count].img = bullet_1;
	}
	else if(type == "wiggle")
	{
		bulletHandler.bullets[bulletHandler.count].update = updateJitter;
		bulletHandler.bullets[bulletHandler.count].hit = hitNoWalls;
		bulletHandler.bullets[bulletHandler.count].effect = effectDamage;
		bulletHandler.bullets[bulletHandler.count].img = jet_1;
	}
	else if(type == "arc")
	{
		bulletHandler.bullets[bulletHandler.count].update = updateArc;
		bulletHandler.bullets[bulletHandler.count].hit = hitRegular;
		bulletHandler.bullets[bulletHandler.count].effect = effectExplode;
		bulletHandler.bullets[bulletHandler.count].img = bullet_2;
	}
	else if(type == "multi")
	{
		bulletHandler.bullets[bulletHandler.count].update = updateMultiply;
		bulletHandler.bullets[bulletHandler.count].hit = hitRegular;
		bulletHandler.bullets[bulletHandler.count].effect = effectExplode;
		bulletHandler.bullets[bulletHandler.count].img = bullet_2;
		bulletHandler.bullets[bulletHandler.count].timer = 15;
	}
	else if(type == "orbit")
	{
		bulletHandler.bullets[bulletHandler.count].update = updateOrbit;
		bulletHandler.bullets[bulletHandler.count].hit = hitNoWalls;
		bulletHandler.bullets[bulletHandler.count].effect = effectDamage;
		bulletHandler.bullets[bulletHandler.count].img = bullet_1;
		bulletHandler.bullets[bulletHandler.count].timer = 300;
	}

	bulletHandler.count++;
	if(bulletHandler.count == bulletMax) bulletHandler.count = 0;
}

function removeBullet()
{
	bulletHandler.bullets[bulletHandler.current].update = noFunction;
	bulletHandler.bullets[bulletHandler.current].hit = noFunction;
	bulletHandler.bullets[bulletHandler.current].effect = noFunction;
	bulletHandler.bullets[bulletHandler.current].live = false;
}

function updateBullets()
{
	for(bulletHandler.current=0;bulletHandler.current<bulletMax;bulletHandler.current++) 
	{
		if(bulletHandler.bullets[bulletHandler.current].live == true)
		{
			bulletHandler.bullets[bulletHandler.current].update();
			bulletHandler.bullets[bulletHandler.current].hit();
		}
	}
}


//Different bullet properties to be added to bullets by the handler

//Path effects

function updateStraight()
{
	this.x += this.vx;
	this.y += this.vy;
}

function updateJitter()
{
	this.x += this.vx+Math.floor(Math.random()*8)-4;
	this.y += this.vy+Math.floor(Math.random()*8)-4;
}

function updateArc()
{
	this.x += this.vx;
	this.vy+= map.gravity;
	this.y += this.vy;
}

function updateFade()
{
	this.x += this.vx;
	this.y += this.vy;
	if(this.timer == 0) removeBullet();
	else this.timer--;
}

function updateMultiply()
{
	this.x += this.vx;
	this.y += this.vy;
	if(this.timer == 0)
	{
		newBullet(this.x,this.y,0,10,"basic");
		newBullet(this.x,this.y,0,-10,"basic");
		this.timer = 15;
	}
	else this.timer--;
}

function updateOrbit()
{
	var attract = 0.4;
	var repel = 0.2;
	if(Math.abs(player.x+16-this.x) < 32)
	{
		if((player.x+16) > this.x) this.vx -= repel;
		else this.vx += repel;
	}
	else
	{
		if((player.x+16) > this.x) this.vx += attract;
		else this.vx -= attract;
	}

	if(Math.abs(player.y+16-this.y) < 32)
	{
		if((player.y+16) > this.y) this.vy -= repel;
		else this.vy += repel;
	}
	else
	{
		if((player.y+16) > this.y) this.vy += attract;
		else this.vy -= attract;
	}

	if(this.vx > 7) this.vx = 7;
	if(this.vy > 7) this.vy = 7;
	if(this.vx < -7) this.vx = -7;
	if(this.vy < -7) this.vy = -7;

	this.x += this.vx;
	this.y += this.vy;
	if(this.timer == 0) removeBullet();
	else this.timer--;
}

//Collision Types

function hitRegular()
{
	var tileX = Math.floor(this.x/32);
	var tileY = Math.floor(this.y/32);
	if((tileX > map.width) || (tileY > map.height) || (tileX < 0) || (tileY < 0)) removeBullet();
	if((map.data[tileY].charAt(tileX) != 'A') || (map.data[tileY].charAt(tileX) != 'A')) this.effect();
}

function hitNoWalls()
{
	var tileX = Math.floor(this.x/32);
	var tileY = Math.floor(this.y/32);
	if((tileX > map.width) || (tileY > map.height) || (tileX < 0) || (tileY < 0)) removeBullet();
}

//Damage Effects

function effectDamage()
{
	removeBullet();
}

function effectExplode()
{
	this.x -= this.vx;
	this.y -= this.vy;
	newBullet(this.x+0,this.y+10,0,10,"basic");
	newBullet(this.x+7,this.y+7,7,7,"basic");
	newBullet(this.x+10,this.y+0,10,0,"basic");
	newBullet(this.x+7,this.y-7,7,-7,"basic");
	newBullet(this.x+0,this.y-10,0,-10,"basic");
	newBullet(this.x-7,this.y-7,-7,-7,"basic");
	newBullet(this.x-10,this.y+0,-10,0,"basic");
	newBullet(this.x-7,this.y+7,-7,7,"basic");
	removeBullet();
}

function effectBreak()
{
	removeBullet();
}

function noFunction()
{
}






