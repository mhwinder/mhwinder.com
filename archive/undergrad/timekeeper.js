// JavaScript Document

function timer()
{
	var i = 3
	
	document.getElementById('timebox').innerHTML=i+' seconds...'
	setTimeout("timecont()",1000)
}

function isnum(x)
{
	if((x == 0) || (x == 1) || (x == 2) || (x == 3) || (x == 4) || (x == 5) || (x == 6) || (x == 7) || (x == 8) || (x == 9))
	{
		return 1
	}
	else
	{
		return 0
	}
}

function timecont()
{
	var line = document.getElementById('timebox').innerHTML
	
	if(isnum(line.charAt(2)))
	{
		num = line.substr(0,3)
		num = num -1
	}
	else if(isnum(line.charAt(1)))
	{
		num = line.substr(0,2)
		num = num -1
	}
	else if(isnum(line.charAt(0)))
	{
		var num = line.charAt(0)
		num = num -1
	}
	else
	{
		num = 'NaN'
	}

	
	if((num <= 0) || (num == 'NaN'))
	{
		document.getElementById('timebox').innerHTML="Initiating Rockman rock out!!!"
		setTimeout("rockstart()",1000)
	}
	else
	{
		document.getElementById('timebox').innerHTML=num+' seconds...'
		setTimeout("timecont()",1000)
	}
}

function rockstart()
{
	if(document.getElementById('rockbox').style.display=="none")
	{
		//Play music
		document.getElementById('music').innerHTML = '<bgsound src="mm2opening.wav">';
		
		document.getElementById('button').disabled=true
		document.getElementById('button').innerHTML="PARTY!"
		document.getElementById('timebox').style.color="red"
		document.getElementById('timebox').innerHTML="Here we go!"
		document.getElementById('rockbox').style.display="block"
		document.getElementById('rockbox').style.background="#FF0000"
		setTimeout("orangerock()",100)
	}
}

function redrock()
{
	document.getElementById('timebox').style.color="red"
	document.getElementById('timebox').innerHTML="Rock it!"
	document.getElementById('rockbox').style.background="#FF0000"
	setTimeout("orangerock()",100)
}

function orangerock()
{
	document.getElementById('rockbox').style.background="#FF9900"
	setTimeout("yellowrock()",100)
}

function yellowrock()
{
	document.getElementById('rockbox').style.background="#FFFF00"
	setTimeout("greenrock()",100)
}

function greenrock()
{
	document.getElementById('timebox').style.color="green"
	document.getElementById('timebox').innerHTML="Work it!"
	document.getElementById('rockbox').style.background="#00FF00"
	setTimeout("bluerock()",100)
}

function bluerock()
{
	document.getElementById('rockbox').style.background="#0000FF"
	setTimeout("violetrock()",100)
}

function violetrock()
{
	document.getElementById('rockbox').style.background="#FF00FF"
	setTimeout("redrock()",100)
}

	