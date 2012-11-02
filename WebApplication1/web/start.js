function startPage() {

    clearElements();

    background.draw = function () {
        /*bctx.beginPath();
        
        bctx.fillStyle = "black"; 
        bctx.rect(0, 0, relSizeX(), relSizeY());
        bctx.fill();
        
        bctx.closePath();*/
        
        drawBox(0, 0, relSizeX(), relSizeY(), "black");
        
        /*bctx.beginPath();
        
        bctx.fillStyle = "white"; 
        bctx.rect(100, 100, 274, 353);
        bctx.fill();
        
        bctx.closePath();*/
        /*var img = resource["red_card_back"].image;
        var co = xy(100, 100);
        bctx.drawImage(img, co.x, co.y);*/
        
    }
    
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
        /*bctx.beginPath();
        bctx.fillStyle = "#464451"; 
        bctx.rect(relSizeX()/2-200, relSizeY()/2-100, this.width, this.height);
        bctx.fill();*/
        drawBox(relSizeX()/2-200, relSizeY()/2-100, this.width, this.height, "#464451");
        
        bctx.beginPath();
        bctx.font = "80pt Calibri";
        bctx.textAlign = "center";
        bctx.fillStyle = "red";
        bctx.fillText("START!", relSizeX()/2, relSizeY()/2);
        bctx.closePath();
    }, evs, 0,0,400,200));

    addElement(createObjectElement(function () {
        var img = resource["tbomm_title"].image;
        var co = xy(sizeX/2-img.width/2, 30);
        bctx.drawImage(img, co.x, co.y);
    }, null));
    
    drawCanvas();
    
}