function randnum(x)
{
    var ranNum= Math.floor(Math.random()*x);
    return ranNum;
}

function predict_future()
{
      var who=new Array(12);
      who[0]="You ";
      who[1]="You ";
      who[2]="You ";
      who[3]="You ";
      who[4]="You ";
      who[5]="You ";
      who[6]="You ";
      who[7]="You ";
      who[8]="You ";
      who[9]="A close friend ";
      who[10]="Someone you don\'t know ";
      who[11]="Nobody ";

      var what=new Array(6);
      what[0]="will die tomorrow.";
      what[1]="will win the lottery.";
      what[2]="will forget something important.";
      what[3]="will accomplish a life goal.";
      what[4]="will do something that will never be forgotten (in a good way).";
      what[5]="will do something that will never be forgotten (in a bad way).";

      var whatby=new Array(8);
      whatby[0]="will lose at cards to ";
      whatby[1]="will be robbed by ";
      whatby[2]="will do a favor for ";
      whatby[3]="will need to ask a favor from ";
      whatby[4]="will fail to assist ";
      whatby[5]="will be caught with your pants down by ";
      whatby[6]="will never meet ";
      whatby[7]="will meet ";

      var by=new Array(5);
      by[0]="a masked man in a trenchcoat.";
      by[1]="a poorly groomed ape with red suspenders.";
      by[2]="your mom.";
      by[3]="an unreasonable person.";
      by[4]="a reasonable person.";

      var fortune=new Array(3);
      fortune[0]="Stay out of Mexico.";
      fortune[1]="Avoid tall asian people.";
      fortune[2]="Don't turn around, trust me.";
   
   num = document.getElementById('count').innerHTML;
   num++;
   document.getElementById('count').innerHTML = num;
   
   if(document.getElementById('count').innerHTML<=5 || document.getElementById('count').innerHTML>=55)
   {
   
      type = Math.random();

      if (type<.1)
      {
         quote=fortune[randnum(3)];
      }
      else if (type<.5)
      {
         quote=who[randnum(12)]+what[randnum(6)];
      }
      else
      {
         quote=who[randnum(12)]+whatby[randnum(8)]+by[randnum(5)];
      }
   
      document.getElementById('futuretext').innerHTML=quote;
   }
   else if(document.getElementById('count').innerHTML<=10)
   {
	   document.getElementById('futuretext').innerHTML="Don't be greedy, you've gotten your Future.";
   }
   else if(document.getElementById('count').innerHTML<=20)
   {
	   document.getElementById('futuretext').innerHTML="Alright, now you'll pay...";
   }
   else if(document.getElementById('count').innerHTML<=30)
   {
	   document.getElementById('futuretext').innerHTML="Hey, stop it. I'm serious!!!";
   }
   else if(document.getElementById('count').innerHTML<=40)
   {
	   document.getElementById('futuretext').innerHTML="Damnit, this is pissing me off.";
   }
   else if(document.getElementById('count').innerHTML<=50)
   {
	   document.getElementById('futuretext').innerHTML="Fine, I'll start giving you more predictions, but don't click so hard.";
   }
   
}