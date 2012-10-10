

var sizeX = 1280;
var sizeY = 720;


var canvas_;
var context;

var item1Text = "Начать игру";
/*var randomPointPosX = 600;
var randomPointPosY = 600;*/

var focusedItemColor = "yellow";
var passiveItemColor = "red";

var itemFont = "30pt Calibri";
var itemAlign = "center";

var itemWidth = 300;
var itemHeight = 50;

function startGame() {

    // Get the canvas element.
    var canvas = document.getElementById("game");
    canvas.width = sizeX;
    canvas.height = sizeY;
    
    // Make sure you got it.
    if (canvas.getContext)

    // If you have it, create a canvas user interface element.
    {
        // Specify 2d canvas type.
        canvas_ = canvas;
        var ctx = canvas.getContext("2d");

        context = ctx;

        // Paint it black.
        ctx.fillStyle = "black";
        //ctx.beginPath();
        ctx.rect(0, 0, sizeX, sizeY);
        //ctx.endPath();
        ctx.fill();
        
        var img = new Image();
 
        img.src = "slrLogo.png";
        
        /*img.onload = function() {
            //alert("loading image...");
            try {
                ctx.drawImage(img, 0, 0);
                //document.logogo.src= img.src;
            } catch (e) {
                alert("image loaded");
                alert("exce " + e.toString());
            }
        }  */
        
        ctx.drawImage(img, 200, 200);
        
        //drawImage(img, 100, 100);
//document.logogo.src= img.src;

        /*var text = "Salkar studios";
        //context.fontWeight = "bold";        
        context.font = "50pt Calibri ";
        context.textAlign = "center";
        context.fillStyle = "white";

        context.fillText(text, 400, sizeY/2);*/
        
       /* ctx.fillStyle = "red";  //  sizeY/2-50   sizeY/2+50
        //ctx.beginPath();
        ctx.rect(100, 350, 250, 400);
        //ctx.endPath();
        ctx.fill();*/
        
       lostFocusedMenuItem1(null);
/*        ctx.beginPath();
        ctx.fillStyle = "blue"; 
        ctx.rect(850, sizeY/2-200, 300, 50);
        ctx.fill();         
        var text = item1Text;
        //ctx.fillStyle = "#BDBDFF";
        //ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Параметры шрифта
        ctx.font = itemFont;
        ctx.textAlign = itemAlign;
        ctx.fillStyle = passiveItemColor;
        ctx.fillText(text, 900+100, sizeY/2-200+35);
        ctx.closePath();*/
        //window.addEventListener('click', whatColorBox, true);
        
        //canvas.onmouseover = mouseover;
        //canvas.onmouseout = mouseout;
        canvas.onmousemove = menuMousemove;
        canvas.onclick = menuClick;
        //window.addEventListener('onmouseover', focusedMenuItem1, true);
        //window.addEventListener('onmouseout', lostFocusedMenuItem1, true);
        //
        //window.addEventListener('click', whatControlBox, true);
        
        /*window.addEventListener('mousedown', whatControlBox1, true);
        window.addEventListener('mouseup', whatControlBox2, true);*/
        // Paint the starfield.
       // stars();
    }
}
/*
function mouseover (evt) {
    focusedMenuItem1(evt);
}

function mouseout (evt) {
    lostFocusedMenuItem1(evt);
}
*/
function menuMousemove (evt) {
    
    if (evt.clientX>=850&&evt.clientX<=(850+itemWidth)&&evt.clientY>=(sizeY/2-200)&&evt.clientY<=(sizeY/2-200+itemHeight)) {
        //alert("evt.clientX "+evt.clientX+" evt.clientY "+evt.clientY);
        focusedMenuItem1(evt);
    }
    else
        lostFocusedMenuItem1(evt);
}

function menuClick (evt) {
    
    if (evt.clientX>=850&&evt.clientX<=(850+itemWidth)&&evt.clientY>=(sizeY/2-200)&&evt.clientY<=(sizeY/2-200+itemHeight)) {
        //alert("evt.clientX "+evt.clientX+" evt.clientY "+evt.clientY);
        menuItem1Activate();
    }
    else
        ;
}

function lostFocusedMenuItem1(evt) {
    //alert("out");
    try {
    if (evt.clientX>=850&&evt.clientX<=(850+itemHeight)&&evt.clientY>=(sizeY/2-200)&&evt.clientY<=(sizeY/2-200+itemHeight)) {
    } else {
        drawLostFocusedMenuItem1();
    }
    } catch (e) {
        drawLostFocusedMenuItem1();
    }
}

function drawLostFocusedMenuItem1 () {
        context.beginPath();
        context.beginPath();
        context.fillStyle = "blue"; 
        context.rect(850, sizeY/2-200, itemWidth, itemHeight);
        context.fill();
        var text = item1Text;
        context.font = itemFont;
        context.textAlign = itemAlign;
        context.fillStyle = passiveItemColor;
        context.fillText(text, 900+100, sizeY/2-200+35);
        context.closePath();   
        //alert("out");
}

function focusedMenuItem1(evt) {
    //alert("over");
    //if (evt.clientX>=850&&evt.clientX<=(850+itemHeight)&&evt.clientY>=(sizeY/2-200)&&evt.clientY<=(sizeY/2-200+itemHeight)) {
        context.beginPath();
        context.fillStyle = "#BDBDFF"; 
        context.rect(850, sizeY/2-200, itemWidth, itemHeight);
        context.fill();
        var text = item1Text;
        context.font = itemFont;
        context.textAlign = itemAlign;
        context.fillStyle = focusedItemColor;
        context.fillText(text, 900+100, sizeY/2-200+35);
        context.closePath();
    //}
    //alert("over");
}

var shadowingTimerId;
var shadowingLevel;
var shadowingMaxLevel = 10;
var shadowingMatrixImg;

function menuItem1Activate() {
    boldActivatedMenu();
    shadowingLevel = 0;
    shadowingMatrixImg = context.getImageData(0, 0, sizeX, sizeY);
    shadowingTimerId = setInterval(shadowing, 150);
    canvas_.onmousemove = function(){};
    canvas_.onclick = function(){};
}

function boldActivatedMenu() {
    context.beginPath();
    context.fillStyle = "#BDBDFF"; 
    context.rect(850, sizeY/2-200, itemWidth, itemHeight);
    context.fill();
    var text = item1Text;
    context.font = "bold "+itemFont;
    context.textAlign = itemAlign;
    context.fillStyle = focusedItemColor;
    context.fillText(text, 900+100, sizeY/2-200+35);
    context.closePath();    
}

function shadowing(evt) {
    if (shadowingLevel<=shadowingMaxLevel) {
        var coeff = 1.0*shadowingLevel/shadowingMaxLevel;
        var pixels = shadowingMatrixImg.data;
        for (var i = 0, il = pixels.length; i < il; i += 4) {
            // так как шум монохромный, в каналы R, G и B кладём одно и то же значение
            pixels[i] = pixels[i]-pixels[i]*coeff;
            pixels[i+1] = pixels[i+1]-pixels[i+1]*coeff;
            pixels[i+2] = pixels[i+2]-pixels[i+2]*coeff;
            // делаем пиксель непрозрачным
            pixels[i+3] = 255;
        }
        context.putImageData(shadowingMatrixImg, 0, 0);
        //alert("shadowingLevel "+shadowingLevel);
        shadowingLevel++;
    } else
        clearInterval(shadowingTimerId);
    
}

function whatControlBox1(evt) {
    window.addEventListener('mousemove', whatControlBox, true);
}

function whatControlBox2(evt) {
    window.removeEventListener('mousemove', whatControlBox, true);
}

function whatControlBox(evt) {
    
    var cx = evt.clientX;
    var cy = evt.clientY;
    
    var y1 = sizeY/2-25;
    var y2 = sizeY/2+25;
    
    if (cx>=800&&cx<=850&&cy>=y1&&cy<=y2)
        window.addEventListener('click', whatColorBox, true);
    
    if (cx>=900&&cx<=950&&cy>=y1&&cy<=y2)
        window.removeEventListener('click', whatColorBox, true);
/*    
    var canvas = document.getElementById("game");
    var ctx = canvas.getContext("2d");
    
    
    var  randomPointPosX = evt.clientX;
    var  randomPointPosY = evt.clientY;
    
    setInterval(function() {
        
        var r = Math.floor((Math.random()*9)+1); 
        
        if (r==1||r==4||r==7)
            randomPointPosX--;

        if (r==3||r==6||r==9)
            randomPointPosX++;
 
        if (r==1||r==2||r==3)
            randomPointPosY--;

        if (r==7||r==8||r==9)
            randomPointPosY++;         
        
        if (randomPointPosX < 0)
            randomPointPosX = 0;
        if (randomPointPosX == sizeX)
            randomPointPosX = sizeX-1;
        
        if (randomPointPosY < 0)
            randomPointPosY = 0;
        if (randomPointPosY == sizeY)
            randomPointPosY = sizeY-1;
        
        var pix = ctx.getImageData(randomPointPosX, randomPointPosY, 1, 1);
        
        var newR = Math.floor((Math.random()*255)); 
        var newG = Math.floor((Math.random()*255)); 
        var newB = Math.floor((Math.random()*255)); 
        
        var hex = "#"+rgbToHex(newR, newG, newB);
        
        ctx.beginPath();
        ctx.fillStyle = hex;        
        ctx.rect(randomPointPosX, randomPointPosY, 1, 1);
        ctx.fill();        
        ctx.closePath();       
    },Math.floor((Math.random()*30)+10));
*/
}

function rgbToHex(r, g, b){
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}


function whatColorBox(evt) {
    
    var cx = evt.clientX;
    var cy = evt.clientY;
    
    var y1 = sizeY/2-50;
    var y2 = sizeY/2+50
    
    
    if (cx>=100&&cx<=250&&cy>=y1&&cy<=y2)
        alert("red");

    if (cx>=300&&cx<=450&&cy>=y1&&cy<=y2)
        alert("green");

    if (cx>=500&&cx<=650&&cy>=y1&&cy<=y2)
        alert("blue");

}