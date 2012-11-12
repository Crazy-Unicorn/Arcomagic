function startPage() {

    clearElements();

    background.draw = function () {
        drawBox(0, 0, relSizeX(), relSizeY(), "black");
        
        var img = resource["card"].image;
        bctx.drawImage(img, 200, 400);
        var matr = bctx.getImageData(200, 400, img.width, img.height);
        var pixels = matr.data;
        for (var i = 0, il = pixels.length; i < il; i += 4) {
            // так как шум монохромный, в каналы R, G и B кладём одно и то же значение
            pixels[i] = pixels[i]*2;
            
            pixels[i+1] = pixels[i+1]*0.2;
            pixels[i+2] = pixels[i+2]*0.2;
            // делаем пиксель непрозрачным
            pixels[i+3] = pixels[i+3]*0.95;
        }
        bctx.putImageData(matr, 200, 400);
    }
    
    var evs = new Object();
    evs["mousedown"]=createEvent("mousedown", function (evt) {
        var cX = evt.clientX-canvasOffset.left;
        var cY = evt.clientY-canvasOffset.top;
        var dir_from = xy(relSizeX()/2-200, relSizeY()/2-100);
        var dir_to = xy(relSizeX()/2+200, relSizeY()/2+100);
        
        /*var x_from = relSizeX()/2-200;
        var x_to = x_from + 400;
        var y_from = relSizeY()/2-100;
        var y_to = y_from + 200; */
        var x_from = dir_from.x;
        var x_to = dir_to.x;
        var y_from = dir_from.y;
        var y_to = dir_to.y;
        if (cX>=x_from && cX<=x_to && cY>=y_from && cY<=y_to) {
            processed = true;
            waitingPage();
        }
    });
   
    addElement(createObjectElement(function () {
        drawBox(relSizeX()/2-200, relSizeY()/2-100, this.width, this.height, "#464451");
        bctx.beginPath();
        bctx.font = "80pt Calibri";
        bctx.textAlign = "center";
        bctx.fillStyle = "red";
        bctx.fillText("START!", relSizeX()/2, relSizeY()/2);
        bctx.closePath();
    }, evs, 0,0,400,200));

    /*addElement(createObjectElement(function () {
        var img = resource["tbomm_title"].image;
        var co = xy(sizeX/2-img.width/2, 30);
        bctx.drawImage(img, co.x, co.y);
    }, null));*/
    
    drawCanvas();
    
}