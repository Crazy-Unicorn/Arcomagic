function fieldPage() {

    clearElements();

    background.draw = function () {
        bctx.beginPath();
        bctx.fillStyle = "green"; 
        bctx.rect(0, 0, relSizeX(), relSizeY());
        bctx.fill();
        bctx.closePath();
        
        bctx.beginPath();
        bctx.fillStyle = "brown"; 
        bctx.rect(relSizeX()/2-500, relSizeY()/2+75, 150, 200);
        bctx.fill();
        bctx.closePath();          
        bctx.beginPath();
        bctx.fillStyle = "brown"; 
        bctx.rect(relSizeX()/2-330, relSizeY()/2+75, 150, 200);
        bctx.fill();
        bctx.closePath();
        bctx.beginPath();
        bctx.fillStyle = "brown"; 
        bctx.rect(relSizeX()/2-160, relSizeY()/2+75, 150, 200);
        bctx.fill();
        bctx.closePath();
        bctx.beginPath();
        bctx.fillStyle = "brown"; 
        bctx.rect(relSizeX()/2+10, relSizeY()/2+75, 150, 200);
        bctx.fill();
        bctx.closePath();
        bctx.beginPath();
        bctx.fillStyle = "brown"; 
        bctx.rect(relSizeX()/2+180, relSizeY()/2+75, 150, 200);
        bctx.fill();
        bctx.closePath();
        bctx.beginPath();
        bctx.fillStyle = "brown"; 
        bctx.rect(relSizeX()/2+350, relSizeY()/2+75, 150, 200);
        bctx.fill();
        bctx.closePath();
      
    }
    
    var process = function (evt) {
        var cX = evt.clientX-canvasOffset.left;
        var cY = evt.clientY-canvasOffset.top;
        var x_from = this.el.x;
        var x_to = this.el.x+this.el.width;
        var y_from = this.el.y;
        var y_to = this.el.y+this.el.height;   
        //alert(this.el.x);
        if (cX>=x_from && cX<=x_to && cY>=y_from && cY<=y_to) {
            this.el.y-=10;
            drawCanvas();
            processed = true;
        }
    }
    
    var cardMouseDown = function (evt) {
        var cX = evt.clientX-canvasOffset.left;
        var cY = evt.clientY-canvasOffset.top;
        var x_from = this.el.x;
        var x_to = this.el.x+this.el.width;
        var y_from = this.el.y;
        var y_to = this.el.y+this.el.height;   
        //alert(cX+" "+cY+" "+x_from+" "+x_to+" "+y_from+" "+y_to);
        if (cX>=x_from && cX<=x_to && cY>=y_from && cY<=y_to) {
            //alert('found')
            tracker.id = this.el.id;
            tracker.x = cX;
            tracker.y = cY;
            processed = true;
        }
    }

    var cardMouseUp = function (evt) {
        if (tracker.id===this.el.id) {
            tracker.id = null;
            processed = true;
        }
    }

    var cardMouseLeave = function (evt) {
        if (tracker.id===this.el.id) {
            tracker.id = null;
            processed = true;
        }
    }
    
    var cardMouseMove = function (evt) {
        var cX = evt.clientX-canvasOffset.left;
        var cY = evt.clientY-canvasOffset.top;
        var x_from = this.el.x;
        var x_to = this.el.x+this.el.width;
        var y_from = this.el.y;
        var y_to = this.el.y+this.el.height;   
        //alert(this.el.x);
        if (tracker.id===this.el.id) {
            //alert(tracker.y+" "+cY);
            if ((y_to - (tracker.y-cY))<=sizeY) {
                if ((this.el.y-(tracker.y-cY)) >= 0) {
                    this.el.y -= (tracker.y-cY);
                    tracker.y = cY;
                } else {
                    this.el.y = 0;
                }
                if (this.el.y <= (this.el.initY-this.el.height-10)) {
                    this.el.y = this.el.initY-this.el.height-10;
                    //alert("вынул");
                    drawCanvas();
                    //cardMouseUp(evt);
                }   
                drawCanvas();                
            } else {
                this.el.y = sizeY - this.el.height;
                drawCanvas();
            }
            processed = true;
        }
    }
    
    /*var ev = createEvent("mousedown", process);
    var els = [];
    els.push(ev);*/
    
    
    addElement(createObjectElement(function () {
        bctx.beginPath();
        bctx.fillStyle = "yellow"; 
        bctx.rect(this.x, this.y, this.width, this.height);
        bctx.fill();
        bctx.closePath();
    }, null, relSizeX()/2-500, relSizeY()/2+75, 150, 200).addEvent("mousedown", cardMouseDown).addEvent("mouseup", cardMouseUp).addEvent("mousemove", cardMouseMove).addEvent("mouseleave", cardMouseLeave));//.addEvent("mousedown", process));
 /*   
    var el1 = createObjectElement(function () {
        bctx.beginPath();
        bctx.fillStyle = "yellow"; 
        bctx.rect(this.x, this.y, this.width, this.height);
        bctx.fill();
        bctx.closePath();
    }, null, relSizeX()/2-500, relSizeY()/2+75, 150, 200);
    el1.addEvent("mousedown", process);
    addElement(el1);*/
    
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
    element1.events.push(event);
    addElement(element1);*/

    addElement(createObjectElement(function () {
        bctx.beginPath();
        bctx.fillStyle = "magenta"; 
        bctx.rect(this.x, this.y, this.width, this.height);
        bctx.fill();
        bctx.closePath();
    }, null, relSizeX()/2-330, relSizeY()/2+75, 150, 200)
        .addEvent("mousedown", cardMouseDown)
        .addEvent("mouseup", cardMouseUp)
        .addEvent("mousemove", cardMouseMove)
        .addEvent("mouseleave", cardMouseLeave)
   );

    addElement(createObjectElement(function () {
       bctx.beginPath();
        bctx.fillStyle = "cyan"; 
        bctx.rect(this.x, this.y, this.width, this.height);
        bctx.fill();
        bctx.closePath();
    }, null, relSizeX()/2-160, relSizeY()/2+75, 150, 200)
        .addEvent("mousedown", cardMouseDown)
        .addEvent("mouseup", cardMouseUp)
        .addEvent("mousemove", cardMouseMove)
        .addEvent("mouseleave", cardMouseLeave)
    );

    addElement(createObjectElement(function () {
       bctx.beginPath();
        bctx.fillStyle = "grey"; 
        bctx.rect(this.x, this.y, this.width, this.height);
        bctx.fill();
        bctx.closePath();
    }, null, relSizeX()/2+10, relSizeY()/2+75, 150, 200)
        .addEvent("mousedown", cardMouseDown)
        .addEvent("mouseup", cardMouseUp)
        .addEvent("mousemove", cardMouseMove)
        .addEvent("mouseleave", cardMouseLeave)
    );


    addElement(createObjectElement(function () {
        bctx.beginPath();
        bctx.fillStyle = "blue"; 
        bctx.rect(this.x, this.y, this.width, this.height);
        bctx.fill();
        bctx.closePath();
    }, null, relSizeX()/2+180, relSizeY()/2+75, 150, 200)
        .addEvent("mousedown", cardMouseDown)
        .addEvent("mouseup", cardMouseUp)
        .addEvent("mousemove", cardMouseMove)
        .addEvent("mouseleave", cardMouseLeave)
    );

   addElement(createObjectElement(function () {
        bctx.beginPath();
        bctx.fillStyle = "black"; 
        bctx.rect(this.x, this.y, this.width, this.height);
        bctx.fill();
        bctx.closePath();
    }, null, relSizeX()/2+350, relSizeY()/2+75, 150, 200)
        .addEvent("mousedown", cardMouseDown)
        .addEvent("mouseup", cardMouseUp)
        .addEvent("mousemove", cardMouseMove)
        .addEvent("mouseleave", cardMouseLeave)
    );
/*
   addElement(createObjectElement(function () {
        bctx.fillStyle = "brown"; 
        bctx.rect(175, 75, 40, 300);
        bctx.fill();
    }, null));



   addElement(createObjectElement(function () {
        bctx.fillStyle = "brown"; 
        bctx.rect(250, 175, 25, 200);
        bctx.fill();
    }, null));

   addElement(createObjectElement(function () {
        bctx.fillStyle = "brown"; 
        bctx.rect(1065, 75, 40, 300);
        bctx.fill();
    }, null));
    

   addElement(createObjectElement(function () {
        bctx.fillStyle = "brown"; 
        bctx.rect(1005, 175, 25, 200);
        bctx.fill();
    }, null));

   addElement(createObjectElement(function () {
        bctx.fillStyle = "brown"; 
        bctx.rect(175, 400, 100, 25);
        bctx.fill();
    }, null));
    
    
   addElement(createObjectElement(function () {
        bctx.fillStyle = "brown"; 
        bctx.rect(1005, 400, 100, 25);
        bctx.fill();
    }, null));
    
    
   addElement(createObjectElement(function () {
        bctx.fillStyle = "brown"; 
        bctx.rect(25, 50, 100, 300);
        bctx.fill();
    }, null));
    
   addElement(createObjectElement(function () {
        bctx.fillStyle = "brown"; 
        bctx.rect(1155, 50, 100, 300);
        bctx.fill();
    }, null));
    
   addElement(createObjectElement(function () {
        bctx.fillStyle = "brown"; 
        bctx.rect(relSizeX()/2-75, 25, 150, 50);
        bctx.fill();
    }, null));
    */
 
    drawCanvas();
    
}