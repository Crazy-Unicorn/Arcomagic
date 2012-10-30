function fieldPage() {

    clearElements();

    background.draw = function () {
        bctx.beginPath();
        bctx.fillStyle = "green"; 
        bctx.rect(0, 0, relSizeX(), relSizeY());
        bctx.fill();
        bctx.closePath();
    }

    var element1 = new Object();
    element1.type = "object";

    element1.draw = function () {
        bctx.beginPath();
        bctx.fillStyle = "brown"; 
        bctx.rect(relSizeX()/2-500, relSizeY()/2+100, 150, 200);
        bctx.fill();
        bctx.closePath();
    }
    
    /*element1.events = [];
    
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
          
            processed = true;
            //waitingPage();
            //alert("yellow_draw2");
        }
    }

    element1.events.push(event);*/

    addElement(element1);


    var element2 = new Object();
    element2.type = "object";
    element2.draw = function () {
        bctx.beginPath();
        bctx.fillStyle = "brown"; 
        bctx.rect(relSizeX()/2-330, relSizeY()/2+100, 150, 200);
        bctx.fill();
        bctx.closePath();
    }
    addElement(element2);

    var element3 = new Object();
    element3.type = "object";
    element3.draw = function () {
        bctx.beginPath();
        bctx.fillStyle = "brown"; 
        bctx.rect(relSizeX()/2-160, relSizeY()/2+100, 150, 200);
        bctx.fill();
        bctx.closePath();
    }
    addElement(element3);

    var element4 = new Object();
    element4.type = "object";
    element4.draw = function () {
        bctx.beginPath();
        bctx.fillStyle = "brown"; 
        bctx.rect(relSizeX()/2+10, relSizeY()/2+100, 150, 200);
        bctx.fill();
        bctx.closePath();
    }
    addElement(element4);

    var element5 = new Object();
    element5.type = "object";
    element5.draw = function () {
        bctx.beginPath();
        bctx.fillStyle = "brown"; 
        bctx.rect(relSizeX()/2+180, relSizeY()/2+100, 150, 200);
        bctx.fill();
        bctx.closePath();
    }
    addElement(element5);

    var element6 = new Object();
    element6.type = "object";
    element6.draw = function () {
        bctx.beginPath();
        bctx.fillStyle = "brown"; 
        bctx.rect(relSizeX()/2+350, relSizeY()/2+100, 150, 200);
        bctx.fill();
        bctx.closePath();
    }
    addElement(element6);

    drawCanvas();
    
}