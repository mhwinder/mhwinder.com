var count = 0;

var pic=new Array(10);
pic[0]="star_hunter/Images/Navigation/fun.png";
pic[1]="star_hunter/Images/Navigation/funo.png";
pic[2]="star_hunter/Images/Navigation/mission.png";
pic[3]="star_hunter/Images/Navigation/missiono.png";
pic[4]="star_hunter/Images/Navigation/about.png";
pic[5]="star_hunter/Images/Navigation/abouto.png";
pic[6]="star_hunter/Images/Navigation/news.png";
pic[7]="star_hunter/Images/Navigation/newso.png";
pic[8]="star_hunter/Images/Navigation/characters.png";
pic[9]="star_hunter/Images/Navigation/characterso.png";

function toggleup()
{
	count += 1;
	if(count == pic.length){
		count = 0;
	}
	document.getElementById('picbox').src=pic[count];
}

function toggledown()
{
	count -= 1;
	if(count == -1){
		count = pic.length-1;
	}
	document.getElementById('picbox').src=pic[count];
}