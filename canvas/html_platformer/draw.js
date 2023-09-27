//	Drawing JS for my platformer	-mhwinder


var ctx;

//Load all my png's
var hero_tex = new Image();
var tex_1 = new Image();
var tex_2 = new Image();
var tex_3 = new Image();
var tex_4 = new Image();
var spike_1 = new Image();
var spike_2 = new Image();
var jet_1 = new Image();
var jet_2 = new Image();
var bullet_1 = new Image();
var bullet_2 = new Image();
hero_tex.src = 'graphics/hero_sprite.png';
tex_1.src = 'graphics/tiles/tex_1.png';
tex_2.src = 'graphics/tiles/tex_2.png';
tex_3.src = 'graphics/tiles/tex_3.png';
tex_4.src = 'graphics/tiles/tex_4.png';
spike_1.src = 'graphics/tiles/spike_1.png';
spike_2.src = 'graphics/tiles/spike_2.png';
jet_1.src = 'graphics/jet_1.png';
jet_2.src = 'graphics/jet_2.png';
bullet_1.src = 'graphics/bullets/bullet_1.png';
bullet_2.src = 'graphics/bullets/bullet_2.png';

function clearCanvas()
{
	ctx.globalCompositeOperation = 'destination-over';
	ctx.clearRect(0,0,800,480); // clear canvas
}

function drawHero()
{
	ctx.save();
	ctx.translate(-player.x+12*32, -player.y+7*32);

	if(player.faceRight == false)
	{
		ctx.save();
		ctx.scale(-1,1);
		ctx.drawImage(hero_tex,-player.x-32,player.y);
		ctx.restore();
	}
	else
	{
		ctx.drawImage(hero_tex,player.x,player.y);
	}

	if(player.jetOn == true)
	{
		var jet = jet_1;
		if((animation%2) == 1) jet = jet_2; 
		var size = Math.floor(Math.random()*4);
		var len = 10+Math.floor(Math.random()*8);
		
		if (Key.isDown(Key.RIGHT)) {ctx.save(); ctx.rotate(Math.PI/2); ctx.drawImage(jet,player.y+8-size,-player.x,16+2*size,len);ctx.restore();}
		if (Key.isDown(Key.LEFT)) {ctx.save(); ctx.rotate(Math.PI*3/2); ctx.drawImage(jet,-player.y-24-size,player.x+32,16+2*size,len);ctx.restore();}
		if(player.faceRight == true)
		{
			if (Key.isDown(Key.UP)) {ctx.drawImage(jet,player.x-size,player.y+32,16+2*size,len);}
			if (Key.isDown(Key.DOWN)) {ctx.save(); ctx.rotate(Math.PI); ctx.drawImage(jet,-player.x-16-size,-player.y,16+2*size,len);ctx.restore();}
		}
		else
		{
			if (Key.isDown(Key.UP)) {ctx.drawImage(jet,player.x-size+16,player.y+32,16+2*size,len);}
			if (Key.isDown(Key.DOWN)) {ctx.save(); ctx.rotate(Math.PI); ctx.drawImage(jet,-player.x-32-size,-player.y,16+2*size,len);ctx.restore();}
		}
	}

	ctx.restore();
}

function drawMap()
{
	ctx.save();
	ctx.translate(-player.x+12*32, -player.y+7*32);

	//Draw only the tiles on the screen
	var startX = Math.floor(player.x/32)-12;
	var stopX = Math.floor(player.x/32)+14;
	var startY = Math.floor(player.y/32)-7;
	var stopY = Math.floor(player.y/32)+9;
	if(startX < 0) startX = 0;
	if(stopX > map.width) stopX = map.width;
	if(startY < 0) startY = 0;
	if(stopY > map.height) stopY = map.height;

	var i,j;
	for(i=startX;i<stopX;i++)
	{
		for(j=startY;j<stopY;j++)
		{
			if(map.data[j].charAt(i) == 'B') ctx.drawImage(tex_1,i*32,j*32);
			if(map.data[j].charAt(i) == 'C') ctx.drawImage(tex_2,i*32,j*32);
			if(map.data[j].charAt(i) == 'D') ctx.drawImage(tex_3,i*32,j*32);
			if(map.data[j].charAt(i) == 'E') ctx.drawImage(tex_4,i*32,j*32);
			/*if(map.data[j].charAt(i) == 'F') ctx.drawImage(tex_2,i*32,j*32);
			if(map.data[j].charAt(i) == 'G') ctx.drawImage(tex_2,i*32,j*32);
			if(map.data[j].charAt(i) == 'H') ctx.drawImage(tex_2,i*32,j*32);
			if(map.data[j].charAt(i) == 'I') ctx.drawImage(tex_2,i*32,j*32);
			if(map.data[j].charAt(i) == 'J') ctx.drawImage(tex_2,i*32,j*32);
			if(map.data[j].charAt(i) == 'K') ctx.drawImage(tex_2,i*32,j*32);
			if(map.data[j].charAt(i) == 'L') ctx.drawImage(tex_2,i*32,j*32);
			if(map.data[j].charAt(i) == 'M') ctx.drawImage(tex_2,i*32,j*32);
			if(map.data[j].charAt(i) == 'N') ctx.drawImage(tex_2,i*32,j*32);*/

			//Draw spikes
			if(spikeMap.data[j].charAt(i) == 'B') ctx.drawImage(spike_1,i*32,j*32);
			if(spikeMap.data[j].charAt(i) == 'C') ctx.drawImage(spike_2,i*32,j*32);
		}
	}

	ctx.restore();

	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillRect(0,0,800,480);
}

function drawUI()
{
	if(player.power > 500) value = 255;
	else value = Math.floor(255*(player.power/500));
	ctx.fillStyle = "rgb(255,"+value+","+value+")";
	ctx.fillRect(15,15,(player.power/5),15);

	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillRect(12,12,206,21);

	ctx.fillStyle = "rgb(255,"+value+","+value+")";
	ctx.fillRect(9,9,212,27);
}

function drawBullets()
{

	ctx.save();
	ctx.translate(-player.x+12*32, -player.y+7*32);

	for(i=0;i<bulletMax;i++)
	{
		if(bulletHandler.bullets[i].live == true)
		{
			var imgx = bulletHandler.bullets[i].x - bulletHandler.bullets[i].img.width/2;
			var imgy = bulletHandler.bullets[i].y - bulletHandler.bullets[i].img.height/2;
			ctx.drawImage(bulletHandler.bullets[i].img,imgx,imgy);
		}
	}

	ctx.restore();
}






















