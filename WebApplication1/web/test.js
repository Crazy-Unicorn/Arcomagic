    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="windows1251">
    <title>Компьютерная графика</title> 
    </head>
    <body onLoad="init()">
    <canvas id='canvas' style='border:1px solid' width='600' height='500'></canvas>
    <script type="text/javascript">
    var canvas, w,h, ctx;
var circle = {centerX:250, centerY:250,r:125,angle:0};
var ball = {x:0,y:0,speed:.02};
var rectY=170,rectW=40;
var rectX=200;
var x1=(Math.PI/180)*0;
var x2=(Math.PI/180)*360;
//var rInc = -0.5;
var ax=320,ay=220,ax1=240,ay1=220,ax2=ax,ay2=ay;
 
 
function init(){
    canvas = document.getElementById("canvas");
    w = canvas.width;
    h = canvas.height;
    ctx = canvas.getContext('2d');
    ctx.font = "14px Times-Roman";
    ctx.fillStyle="#99d8e4";
    ctx.fillRect(0,0,w,200);
 
    var img=new Image();
    img.src='tex.jpg';
    img.onload = function () {
        var tex=ctx.createPattern(img,"repeat");
        ctx.strokeStyle="black";
        ctx.fillStyle=tex;
        ctx.beginPath();
        ctx.moveTo(50,70);
        ctx.bezierCurveTo(60,40,90,40,100,60);
        ctx.bezierCurveTo(110,50,130,50,140,60);
        ctx.bezierCurveTo(150,50,170,50,190,60);
        ctx.bezierCurveTo(200,60,200,90,190,90);
        ctx.bezierCurveTo(200,100,180,120,170,120);
        ctx.bezierCurveTo(160,130,150,140,140,130);
        ctx.bezierCurveTo(130,140,120,140,100,130);
        ctx.bezierCurveTo(90,130,80,130,70,120);
        ctx.bezierCurveTo(40,120,30,80,50,70);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
    setInterval(draw,33);
    //draw();
}
 
function clear(){
    var x1=(Math.PI/180)*0;
    var x2=(Math.PI/180)*360;
    w = canvas.width;
    h = canvas.height;
    var palmx=w-300;
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext('2d');
    var grd=ctx.createLinearGradient(w-100,h,w-100,h-220);
    grd.addColorStop("1","#f18c1a");
    grd.addColorStop("0","#bf7500");

    ctx.fillStyle="#f9fc66";
    ctx.fillRect(0,200,w,h);
    //ветки
    ctx.lineWidth=10;
    ctx.lineCap='round';
    ctx.strokeStyle="#50b436";
    for(var i=0;i<5;i++)
    {
        ctx.beginPath();
        ctx.moveTo(270,220);
        ctx.bezierCurveTo(250-15*i,230-15*i,240-15*i,250-15*i,240-17*i,280-15*i);
        ctx.stroke();
        ctx.closePath();
    }
    var opa=80;
    for(var i=0;i<5;i++)
    {
        ctx.beginPath();
        ctx.moveTo(290,220);
        ctx.bezierCurveTo(250+15*i+opa,230-15*i,240+15*i+opa,250-15*i,240+17*i+opa,280-15*i);
        ctx.stroke();
        ctx.closePath();
    }
    ctx.beginPath();
    ctx.moveTo(290,220);
    ctx.bezierCurveTo(290,200,310,180,360,150);
    ctx.moveTo(290,220);
    ctx.bezierCurveTo(290,210,360,140,420,200);
    ctx.moveTo(270,220);
    ctx.bezierCurveTo(260,180,180,160,140,200);
    ctx.moveTo(270,220);
    ctx.bezierCurveTo(260,200,240,150,200,150);
    ctx.moveTo(280,220);
    ctx.bezierCurveTo(260,200,300,120,330,110);
    ctx.moveTo(290,220);
    ctx.bezierCurveTo(290,200,300,120,220,110);
    ctx.moveTo(280,220);
    ctx.bezierCurveTo(280,220,290,160,200,130);
    ctx.moveTo(280,220);
    ctx.bezierCurveTo(280,220,290,160,360,120);
    ctx.stroke();
    ctx.closePath();

    //ствол
    ctx.lineWidth=0.1;
    ctx.strokeStyle="#000000";
    for(var j=0;j<4;j++)
    {
        for (var i=0;i<36;i++)
        {if(i%2==0)
            {ctx.beginPath();
                ctx.arc(palmx-10*j,h-2-8*i,7,x1,x2);
                ctx.fillStyle=grd;
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
            }
            else
            {
                ctx.beginPath();
                ctx.arc(palmx-5-10*j,h-8*i,7,x1,x2);
                ctx.fillStyle=grd;
                ctx.fill();
                ctx.stroke();
                ctx.closePath();    
            }
        }
    }
}
function draw(){
    if (ay<=468)
    {
        clear();
        ctx.lineWidth=1;
        ctx.lineCap='round';
        ctx.strokeStyle="#black";
        ctx.fillStyle="#ffbe00";
        ctx.beginPath();
        ctx.moveTo(ax,ay);
        ctx.bezierCurveTo(ax-15,ay-4,ax-15,ay+35,ax,ay+30);
        ctx.moveTo(ax,ay);
        ctx.bezierCurveTo(ax+15,ay-4,ax+15,ay+35,ax,ay+30);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    
        ctx.strokeStyle="#00cc00";
        ctx.beginPath();
        ctx.moveTo(ax,ay);
        ctx.bezierCurveTo(ax-2,ay-5,ax-4,ay-5,ax-7,ay-5);
        ctx.moveTo(ax,ay);
        ctx.bezierCurveTo(ax+2,ay-5,ax+4,ay-5,ax+7,ay-5);
        ctx.moveTo(ax,ay);
        ctx.bezierCurveTo(ax-1,ay-8,ax-3,ay-8,ax-5,ay-8);
        ctx.moveTo(ax,ay);
        ctx.bezierCurveTo(ax+1,ay-8,ax+3,ay-8,ax+5,ay-8);
        ctx.stroke();
        ctx.closePath();
        ay+=2;
    
    }
    else
    {
        if (ax!=ax1) {ay=ay1; ax=ax1;} else {ay=ay2;ax=ax2}
    }
 
}
    </script>
    </body>
    </html>