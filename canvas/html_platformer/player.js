//	Main character JS for my platformer	-mhwinder

var player = new Object();
player.x = 32*5;
player.y = 32*5;

player.vx = 0;
player.vy = 0;
player.spawnx = 32*5;
player.spawny = 32*5;
player.grounded = true;
player.jetOn = false;
player.faceRight = true;
player.power = 1000;
player.powerDrainRate = 10;
player.powerRechargeRate = 5;
player.powerJumpCost = 50;
player.jetForce = 1.2;
player.spikeDamage = 100;
player.spikeRebound = 5;
player.shootTimer = 0;

function playerCollision()
{
	var wiggle_room = 8;
	player.grounded = false;

	if(player.vx < 0)
	{
		var tileX = Math.floor((player.x+player.vx)/32);
		var tileTopY = Math.floor((player.y+wiggle_room)/32);
		var tileBottomY = Math.floor((player.y+31-wiggle_room)/32);
		if((map.data[tileTopY].charAt(tileX) != 'A') || (map.data[tileBottomY].charAt(tileX) != 'A'))
		{
			player.vx = 0;
			player.x = 32*(tileX+1);
		}
	}
	else if(player.vx > 0)		//only difference here is a +31 to account for player size
	{
		var tileX = Math.floor((player.x+player.vx+32)/32);
		var tileTopY = Math.floor((player.y+wiggle_room)/32);
		var tileBottomY = Math.floor((player.y+31-wiggle_room)/32);
		if((map.data[tileTopY].charAt(tileX) != 'A') || (map.data[tileBottomY].charAt(tileX) != 'A'))
		{
			player.vx = 0;
			player.x = 32*(tileX-1);
		}
	}

	if(player.vy < 0)
	{
		var tileY = Math.floor((player.y+player.vy)/32);
		var tileTopX = Math.floor((player.x+wiggle_room)/32);
		var tileBottomX = Math.floor((player.x+31-wiggle_room)/32);
		if((map.data[tileY].charAt(tileTopX) != 'A') || (map.data[tileY].charAt(tileBottomX) != 'A'))
		{
			player.vy = 0;
			player.y = 32*(tileY+1);
		}
	}
	else if(player.vy > 0)		//only difference here is a +31 to account for player size
	{
		var tileY = Math.floor((player.y+player.vy+32)/32);
		var tileTopX = Math.floor((player.x+wiggle_room)/32);
		var tileBottomX = Math.floor((player.x+31-wiggle_room)/32);
		if((map.data[tileY].charAt(tileTopX) != 'A') || (map.data[tileY].charAt(tileBottomX) != 'A'))
		{
			player.vy = 0;
			player.y = 32*(tileY-1);
			player.grounded = true;
		}
	}
}

function playerShoot()
{
	if(player.shootTimer != 0) 
	{
		player.shootTimer--;
		return;
	}
	
	var newBulletX;
	var newBulletY;
	var newBulletV;
	if(player.faceRight == true)
	{
		var newBulletX = player.x+32;
		var newBulletY = player.y+16;
		var newBulletV = 1;
	}
	else
	{
		var newBulletX = player.x;
		var newBulletY = player.y+16;
		var newBulletV = -1;
	}

	if ((Key.isDown(Key.A)) && (player.power > 100))
	{
		newBullet(newBulletX,newBulletY,newBulletV*10,0,"basic");
		player.shootTimer += 4;
		player.power -= 30;
		player.vx += -newBulletV*1;
		return;
	}

	if ((Key.isDown(Key.S)) && (player.power > 100))
	{
		newBullet(newBulletX,newBulletY,newBulletV*(5+Math.floor(Math.random()*8)),Math.floor(Math.random()*4)-1,"wiggle");
		player.shootTimer += 1;
		player.power -= 15;
		return;
	}
	
	if ((Key.isDown(Key.D)) && (player.power > 100))
	{
		newBullet(newBulletX,newBulletY,newBulletV*5+player.vx,-15+player.vy,"arc");
		player.shootTimer += 10;
		player.power -= 50;
		player.vx += -newBulletV*10;
		player.vy += 15;
		return;
	}

	if ((Key.isDown(Key.Q)) && (player.power > 100))
	{
		newBullet(newBulletX,newBulletY,newBulletV*5,0,"multi");
		player.shootTimer += 10;
		player.power -= 50;
		player.vx += -newBulletV*10;
		return;
	}

	if ((Key.isDown(Key.W)) && (player.power > 100))
	{
		newBullet(newBulletX,newBulletY,newBulletV*Math.floor(Math.random()*4+2),Math.floor(Math.random()*4)-1,"orbit");
		player.shootTimer += 3;
		player.power -= 30;
		return;
	}
}

function playerUpdate()
{
	//input
	if (Key.isDown(Key.LEFT)) player.faceRight = false;
	if (Key.isDown(Key.RIGHT)) player.faceRight = true;
	player.jetOn = false;

	if(player.grounded == true)
	{
		if (Key.isDown(Key.LEFT)) player.vx = -8;
		if (Key.isDown(Key.RIGHT)) player.vx = 8;

		if((Key.isDown(Key.UP)) && (player.power > (100+player.powerJumpCost)))
		{
			player.vy = -15;		//Jump power
			player.grounded = false;
			player.power -= player.powerJumpCost;
		}

		//Simple Friction
		if(player.vx < -2) player.vx += 2;
		else if(player.vx > 2) player.vx -= 2;
		else player.vx = 0;
	}
	else if(player.power > 100)
	{
		if (Key.isDown(Key.LEFT)) {player.vx -= player.jetForce; player.power -= player.powerDrainRate; player.jetOn = true;}
		if (Key.isDown(Key.RIGHT)) {player.vx += player.jetForce; player.power -= player.powerDrainRate; player.jetOn = true;}

		if (Key.isDown(Key.UP)) {player.vy -= player.jetForce; player.power -= player.powerDrainRate; player.jetOn = true;}
		if (Key.isDown(Key.DOWN)) {player.vy += player.jetForce; player.power -= player.powerDrainRate; player.jetOn = true;}
	}

	//gravity
	player.vy += map.gravity;

	//Set max values for movement
	if(player.vx > 31) player.vx = 31;
	else if(player.vx < -31) player.vx = -31;
	if(player.vy > 31) player.vy = 31;
	else if(player.vy < -31) player.vy = -31;

	//Check for spikes
	var tileX = Math.floor((player.x+16)/32);
	var tileY = Math.floor((player.y+16)/32);
	if((spikeMap.data[tileY].charAt(tileX) != 'A') || (spikeMap.data[tileY].charAt(tileX) != 'A'))
	{
		if(player.vx > 0) {player.x-=player.vx; player.vx = -player.spikeRebound;}
		else {player.x-=player.vx; player.vx = player.spikeRebound;}
		if(player.vy > 0) {player.x-=player.vy; player.vy = -player.spikeRebound;}
		else {player.x-=player.vy; player.vy = player.spikeRebound;}
		player.power -= player.spikeDamage;
	}

	playerShoot();
	playerCollision();

	player.x += player.vx;
	player.y += player.vy;


	//power recharge
	player.power+=player.powerRechargeRate;
	if(player.power > 1000) player.power = 1000;
	if(player.power < 0) {player.power = 1000; player.x = player.spawnx; player.y = player.spawny; player.vx = 0; player.vy = 0;}
}










