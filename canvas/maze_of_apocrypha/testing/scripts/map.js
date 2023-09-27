// Holds map data and functions for manipulating the map


//map size needs to be odd, mid tile is the center
var mapSize = 25;
var midTile = 12;

//Javascript is crappy with 3d arrays
var map = new Array();
var tempMap = new Array();
for(l=0;l<mapSize;l++)
{
	map[l] = new Array();
	tempMap[l] = new Array();
}

//Temp Map
for(i=0;i<mapSize;i++)
{
	for(j=0;j<mapSize;j++)
	{
		map[i][j] = 0;
		tempMap[i][j] = 0;
	}
}

//line in middle

for(i=(midTile-4);i<(midTile+4);i++)
{
	map[i][midTile] = 21;
	map[midTile][i] = 21;
}

/* Here I will put a list of what tile values mean

# > 20 walkable tiles, many will be drawn similarly but be for triggering events
# < 20 Unwalkable tiles, unwalkable tiles will be drawn differently, Id feel dumb 
		if I need to go negative but I have the option


0	:	basic nothing
21	:	stone masonry
22	:	stone masonry, with trigger effects
23	:	stone masonry, with alternate trigger
24	:	stone masonry, even more triggers, I need them I swear!

*/


