// JavaScript Document

function showtext(x)
{
	document.getElementById(x).style.display="inline";
	document.getElementById(x+"o").style.display="none";
}

function hidetext(x)
{
	document.getElementById(x).style.display="none";
	document.getElementById(x+"o").style.display="inline";
}