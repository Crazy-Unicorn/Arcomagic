function startPage() {

    background.draw = function () {
        bctx.beginPath();
        bctx.fillStyle = "black"; 
        bctx.rect(0, 0, relSizeX(), relSizeY());
        bctx.fill();
        bctx.closePath();
    }

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
            var rx = Math.floor((Math.random()*1000)+1); 
            var ry = Math.floor((Math.random()*600)+1); 
            bctx.beginPath();
            bctx.fillStyle = "yellow"; 
            bctx.rect(rx, ry, 50, 50);
            bctx.fill();
            bctx.closePath();
            onScreen();
            processed = true;
        }
    }

    element.events.push(event);

    addElement(element);
    //elements.push(element);

    var element2 = new Object();
    element2.type = "object";

    element2.draw = function () {
        var img = resource["tbomm_title"].image;
        bctx.drawImage(img, relSizeX()/2-img.width/2, 30);
    }
    
    addElement(element2);
    //elements.push(element2);

    drawCanvas();
    
}