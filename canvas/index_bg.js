// Background Animation for Aquarium Care Web App

//Global variables, many are overwritten during runtime
var x_canv = 1000;
var y_canv = 600;
var timer = 0;

var tile_size = 80;

function init() {
  window.requestAnimationFrame(draw);
}

function draw() {
  //var ctx = document.getElementById('myCanvas').getContext('2d');
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");

  x_canv = window.innerWidth;
  y_canv = window.innerHeight;
  //x_canv = document.documentElement.clientWidth - 2;
  //y_canv = document.documentElement.clientHeight - 2;
  //x_canv = document.body.clientWidth;
  //y_canv = document.body.clientHeight;

  c.style.top = window.scrollY;

  c.width = x_canv;
	c.height = y_canv;

  var grd = ctx.createLinearGradient(x_canv/2, 0, x_canv/2, y_canv);
  grd.addColorStop(1, "#660033");
  grd.addColorStop(0, "#330066");

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, x_canv, y_canv);

  var radians = timer*Math.PI/180;

  for (var i = 0; i < x_canv/tile_size; i++) {
    for (var j = 0; j < y_canv/tile_size; j++) {

      var alpha = Math.sin((i+j)*0.5-radians);
      if (alpha > 1.0) {alpha = 1.0}
      else if (alpha < 0.0) {alpha = 0.0}
      alpha = 1-alpha
      ctx.fillStyle = 'rgba(0,0,0,'+alpha+')';
      ctx.fillRect(i*tile_size+5, j*tile_size+5, tile_size-10, tile_size-10)


    }
  }

  //ctx.fill();

  timer += 1;
  if (timer >= 360) {
    timer = 0;
  }

  window.requestAnimationFrame(draw);
}

init();
