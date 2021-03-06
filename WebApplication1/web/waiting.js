function waitingPage() {

    clearElements();
    
    addElement(createObjectElement(function () {
        bctx.beginPath();
        bctx.fillStyle = "black"; 
	bctx.rect(0, 0, sizeX, sizeY);
        bctx.fill();
        bctx.closePath();
        
        bctx.beginPath();
        bctx.font = "80pt Garamond";
        bctx.textAlign = "center";
        bctx.fillStyle = "white";
        bctx.fillText("Waiting...", sizeX/2, sizeY/2);
        bctx.closePath();
    }, null));

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
            bctx.beginPath();
            bctx.font = "80pt Garamond";
            bctx.textAlign = "center";
            bctx.fillStyle = "white";
            bctx.fillText("Waiting"+po, sizeX/2, sizeY/2);
            bctx.closePath();
        }        
        addElement(element);
        drawCanvas();
        if (iter===1) {
            clearInterval(timer);
            fieldPage();
        }
    }, 500);
    
}