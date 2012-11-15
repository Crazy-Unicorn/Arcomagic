function startPage() {

    clearElements();

    background.draw = function () {
	drawBox(0, 0, sizeX, sizeY, "black");
        //drawBox(0, 0, relSizeX(), relSizeY(), "black");
        
        /*var img = resource["card"].image;
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
        bctx.putImageData(matr, 200, 400);*/
    }
    
    var evs = new Object();
    evs["mousedown"]=createEvent("mousedown", function (evt) {
        var cX = evt.clientX-canvasOffset.left;
        var cY = evt.clientY-canvasOffset.top;
        //alert(evt.screenY + " "+evt.clientY)
        //var html = document.documentElement;
	//var body = document.body;
	//var scrollTop = html.scrollTop || body && body.scrollTop || 0;
        //alert("Текущая прокрутка: " + scrollTop);
        cY+=getPageScroll().top; //getScrollTop();//scrollTop;
        cX+=getPageScroll().left;
        var ddd = xy(cX, cY);
        
        /*var dir_from = xy(sizeX/2-300, sizeY/2-100);
        var dir_to = xy(sizeX/2+100, sizeY/2+100);*/
        
//alert(sizeX/2-200)
//alert(cX+" "+cY+" "+dir_from.x+" "+dir_to.x+" "+dir_from.y+" "+dir_to.y)

        /*var x_from = relSizeX()/2-200;
        var x_to = x_from + 400;
        var y_from = relSizeY()/2-100;
        var y_to = y_from + 200; */
        /*var x_from = dir_from.x;
        var x_to = dir_to.x;
        var y_from = dir_from.y;
        var y_to = dir_to.y;*/


        var x_from = sizeX/2-200;
        var x_to = sizeX/2+200;
        var y_from = sizeY/2-100;
        var y_to = sizeY/2+200;
        
        var ccX = ddd.x;
        var ccY = ddd.y;
        //alert(ccX+" "+ccY+" "+x_from+" "+x_to+" "+y_from+" "+y_to)
        if (ccX>=x_from && ccX<=x_to && ccY>=y_from && ccY<=y_to) {
            processed = true;
//alert(0)
            selectorPage();
        }
    });
   
    addElement(createObjectElement(function () {
        //drawBox(relSizeX()/2-200, relSizeY()/2-100, this.width, this.height, "#464451");
        drawBox(sizeX/2-200, sizeY/2-100, this.width, this.height, "#464451");
        bctx.beginPath();
        bctx.font = "80pt Calibri";
        bctx.textAlign = "center";
        bctx.fillStyle = "red";
        bctx.fillText("START!", sizeX/2, sizeY/2);//relSizeX()/2, relSizeY()/2);
        bctx.closePath();
    }, evs, 0,0,400,200));

    addElement(createObjectElement(function () {
        var img = resource["tbomm_title"].image;
        /*var co = xy(sizeX/2-img.width/2, 30);
        bctx.drawImage(img, co.x, co.y);*/
        bctx.drawImage(img, sizeX/2-img.width/2, 30);
    }, null));
    
    drawCanvas();
    
}