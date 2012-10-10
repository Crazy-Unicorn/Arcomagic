

var sizeX = 1280;
var sizeY = 720;

/*var randomPointPosX = 600;
var randomPointPosY = 600;*/

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
        var ctx = canvas.getContext("2d");

        // Paint it black.
        ctx.fillStyle = "white";
        //ctx.beginPath();
        ctx.rect(0, 0, sizeX, sizeY);
        //ctx.endPath();
        ctx.fill();
        
/*        ctx.fillStyle = "red";  //  sizeY/2-50   sizeY/2+50
        //ctx.beginPath();
        ctx.rect(100, 350, 250, 400);
        //ctx.endPath();
        ctx.fill();*/

/*        ctx.beginPath();
        ctx.moveTo(22.3, 12.0);
        ctx.bezierCurveTo(22.3, 13.3, 19.4, 14.3, 15.9, 14.3);
        ctx.bezierCurveTo(12.4, 14.3, 9.6, 13.3, 9.6, 12.0);
        ctx.bezierCurveTo(9.6, 10.8, 12.4, 9.7, 15.9, 9.7);
        ctx.bezierCurveTo(19.4, 9.7, 22.3, 10.8, 22.3, 12.0);
        
        ctx.rect(100, 350, 250, 400);
        ctx.closePath();
        ctx.fillStyle = "rgb(51, 190, 0)";
        ctx.fill();*/
        
        /* ###
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.rect(100, sizeY/2-50, 150, 100);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.rect(300, sizeY/2-50, 150, 100);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        
        ctx.fillStyle = "blue";        
        ctx.rect(500, sizeY/2-50, 150, 100);
        ctx.fill();             
        ctx.closePath();
   

        
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.rect(800, sizeY/2-25, 50, 50);
        ctx.closePath();
        ctx.fill();  
        
        ctx.fillStyle = "magenta";
        ctx.beginPath();
        ctx.rect(900, sizeY/2-25, 50, 50);
        ctx.closePath();
        ctx.fill();  
## */
        //window.addEventListener('click', whatColorBox, true);

        window.addEventListener('mousedown', whatControlBox1, true);
        window.addEventListener('mouseup', whatControlBox2, true);
        // Paint the starfield.
       // stars();
    }
           
/*    var canvas = document.createElement('canvas');
    canvas.width = canvas.height = 200;
    var ctx = canvas.getContext('2d');
    
    ctx.fillStyle = "black";
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();*/
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
        
        //alert("X = "+randomPointPosX+"  Y = "+randomPointPosY+"  pix[0] = "+pix[0]+"  pix[1] = "+pix[1]+"  pix[2] = "+pix[2]);
        //alert("hex = "+hex);
        
        ctx.beginPath();
        ctx.fillStyle = hex;        
        ctx.rect(randomPointPosX, randomPointPosY, 1, 1);
        ctx.fill();        
        ctx.closePath();       
    },Math.floor((Math.random()*30)+10));//33);

    
    /*
    while(1) {
        //alert("!1");
        //var oldRandomPointPosX = randomPointPosX;
        //var oldRandomPointPosY = randomPointPosY;
        
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
        
        //alert("!2");
        
        / *var sumColors = 0, i, j, data, pix, n=0;
        
        for (i=randomPointPosX-1; i<randomPointPosX+2; i++)
            for (j=randomPointPosY-1; j<randomPointPosY+2; j++) {
                //alert("!2-3_1");                
                if (i>=0&&i<sizeX)
                    if (j>=0&&j<sizeY) {
                        //alert("!2-3_2"); 
                        pix = ctx.getImageData(i, j, 1, 1);
                        //alert("!2-3_3"); 
                        sumColors += pix.data[0]*256*256;
                        sumColors += pix.data[1]*256;
                        sumColors += pix.data[2];
                        alert("i = "+i+"  j = "+j+"  data[0] = "+pix.data[0]+"  data[1] = "+pix.data[1]+"  data[2] = "+pix.data[2]);
                        //alert("!2-3_4"); 
                        n++;
                    }
            }
        //alert("!3");
                alert("sumColors = "+sumColors);
        sumColors = sumColors/n;

        var newR = Math.floor(sumColors / (256*256));
        var newG = Math.floor((sumColors % (256*256)) / 256);
        var newB = Math.floor(((sumColors % (256*256)) % 256));
        
        alert("!4 newR = "+newR+"  newG = "+newG+"  newB = "+newB);
        
        var hex = "#"+rgbToHex(newR, newG, newB);
        alert("hex = "+hex);
        
        * /
       
        
        var pix = ctx.getImageData(randomPointPosX, randomPointPosY, 1, 1);
        
        var newR = Math.floor((Math.random()*255)); 
        var newG = Math.floor((Math.random()*255)); 
        var newB = Math.floor((Math.random()*255)); 
        
        var hex = "#"+rgbToHex(newR, newG, newB);
        //alert("hex = "+hex);
        
        / *pix[0] = 255 - newR;
        pix[1] = 255 - newG;
        pix[2] = 255 - newB;* /
        
        //ctx.putImageData(pix, randomPointPosX, randomPointPosY);

        //alert("X = "+randomPointPosX+"  Y = "+randomPointPosY+"  pix[0] = "+pix[0]+"  pix[1] = "+pix[1]+"  pix[2] = "+pix[2]);
        //alert("hex = "+hex);
        

        ctx.beginPath();
        ctx.fillStyle = hex;        
        ctx.rect(randomPointPosX, randomPointPosY, 1, 1);
        ctx.fill();        
        ctx.closePath();

        setInterval(drawRPix,33);
    }
    */
}

function rgbToHex(r, g, b){
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}


function whatColorBox(evt) {
    
    //alert("code = "+evt.keyCode);
    /*switch (evt.keyCode) {
    }*/
    
    //alert("screenX = "+evt.screenX);
    //alert("clientX = "+evt.clientX);
    
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

    //alert("screenX = "+cx+" screenY = "+cy);
}