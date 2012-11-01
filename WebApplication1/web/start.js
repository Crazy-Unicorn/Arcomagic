function startPage() {

    clearElements();

    background.draw = function () {
        //bctx.beginPath();
        bctx.fillStyle = "black"; 
        bctx.rect(0, 0, relSizeX(), relSizeY());
        bctx.fill();
        //bctx.closePath();
    }
/*
    var element = new Object();
    element.type = "object";

    element.draw = function () {
        bctx.beginPath();
        bctx.fillStyle = "#464451"; 
        bctx.rect(relSizeX()/2-200, relSizeY()/2-100, 400, 200);
        bctx.fill();
        bctx.font = "80pt Calibri";
        bctx.textAlign = "center";
        bctx.fillStyle = "red";
        bctx.fillText("START!", relSizeX()/2, relSizeY()/2);
        bctx.closePath();
    }
    
    element.events = [];
    
    var event = new Object();
    event.type = "mousedown";
    event.process = function (evt) {
        var cX = evt.clientX-canvasOffset.left;
        var cY = evt.clientY-canvasOffset.top;
        var x_from = relSizeX()/2-200;
        var x_to = x_from + 400;
        var y_from = relSizeY()/2-100;
        var y_to = y_from + 200;        
        if (cX>=x_from && cX<=x_to && cY>=y_from && cY<=y_to) {
            //alert("yellow_draw1");
            / *var rx = Math.floor((Math.random()*1000)+1); 
            var ry = Math.floor((Math.random()*600)+1); 
            bctx.beginPath();
            bctx.fillStyle = "yellow"; 
            bctx.rect(rx, ry, 50, 50);
            bctx.fill();
            bctx.closePath();
            onScreen();* /
            
            processed = true;
            waitingPage();
            //alert("yellow_draw2");
        }
    }

    element.events.push(event);

    addElement(element);*/
    
    var evs = new Object();
    evs["mousedown"]=createEvent("mousedown", function (evt) {
        var cX = evt.clientX-canvasOffset.left;
        var cY = evt.clientY-canvasOffset.top;
        var x_from = relSizeX()/2-200;
        var x_to = x_from + 400;
        var y_from = relSizeY()/2-100;
        var y_to = y_from + 200;        
        if (cX>=x_from && cX<=x_to && cY>=y_from && cY<=y_to) {
            processed = true;
            waitingPage();
        }
    });
    
    addElement(createObjectElement(function () {
        bctx.beginPath();
        bctx.fillStyle = "#464451"; 
        bctx.rect(relSizeX()/2-200, relSizeY()/2-100, this.width, this.height);
        bctx.fill();
        bctx.font = "80pt Calibri";
        bctx.textAlign = "center";
        bctx.fillStyle = "red";
        bctx.fillText("START!", relSizeX()/2, relSizeY()/2);
        bctx.closePath();
    }, evs, 0,0,400,200));
    
    //elements.push(element);

   /* var element2 = new Object();
    element2.type = "object";

    element2.draw = function () {
        var img = resource["tbomm_title"].image;
        var co = xy(sizeX/2-img.width/2, 30);
        bctx.drawImage(img, co.x, co.y);
    }
    
    addElement(element2);*/

    addElement(createObjectElement(function () {
        var img = resource["tbomm_title"].image;
        var co = xy(sizeX/2-img.width/2, 30);
        //alert(resource["tbomm_title"].image+" "+co.x+" "+co.y+" "+img.width);
        bctx.drawImage(img, co.x, co.y);
        if (img.width===0)
             bctx.drawImage(resource["tbomm_title"].image, co.x, co.y);  
    }, null));
    //elements.push(element2);
    
    drawCanvas();
    
}