function waitingPage() {

    clearElements();

    var element = new Object();
    element.type = "object";

    element.draw = function () {
        //background.draw();
        bctx.beginPath();
        bctx.font = "80pt Garamond";
        bctx.textAlign = "center";
        bctx.fillStyle = "white";
        bctx.fillText("Waiting...", relSizeX()/2, relSizeY()/2);
        bctx.closePath();
    }

    addElement(element);
    
    drawCanvas();
    
    iter = 0;
    timer = setInterval(function() {
        iter++;
        clearElements();
        var element = new Object();
        element.type = "object";
        var po = "   ";
        switch (iter%4) {
            case 1:
                po = ".  ";
                break;
            case 2:
                po = ".. ";
                break;
            case 3:
                po = "...";
                break;
        }
        element.draw = function () {
            //background.draw();
            bctx.beginPath();
            bctx.font = "80pt Garamond";
            bctx.textAlign = "center";
            bctx.fillStyle = "white";
            bctx.fillText("Waiting"+po, relSizeX()/2, relSizeY()/2);
            bctx.closePath();
        }        
        addElement(element);
        drawCanvas();
        if (iter===5) {
            clearInterval(timer);
            fieldPage();
        }
    }, 500);
    
}