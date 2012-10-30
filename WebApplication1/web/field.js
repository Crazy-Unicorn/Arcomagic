function fieldPage() {

    clearElements();

    background.draw = function () {
        bctx.fillStyle = "green"; 
        bctx.rect(0, 0, relSizeX(), relSizeY());
        bctx.fill();
    }

    /*var element1 = new Object();
    element1.type = "object";

    element1.draw = function () {
        bctx.beginPath();
        bctx.fillStyle = "brown"; 
        bctx.rect(relSizeX()/2-500, relSizeY()/2+75, 150, 200);
        bctx.fill();
        bctx.closePath();
    }*/
    
    addElement(createObjectElement(function () {
        bctx.fillStyle = "brown"; 
        bctx.rect(relSizeX()/2-500, relSizeY()/2+75, 150, 200);
        bctx.fill();
    }, null));
    
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

    /*addElement(element1);*/

    addElement(createObjectElement(function () {
        bctx.fillStyle = "brown"; 
        bctx.rect(relSizeX()/2-330, relSizeY()/2+75, 150, 200);
        bctx.fill();
    }, null));

   addElement(createObjectElement(function () {
        bctx.fillStyle = "brown"; 
        bctx.rect(relSizeX()/2-160, relSizeY()/2+75, 150, 200);
        bctx.fill();
    }, null));

   addElement(createObjectElement(function () {
        bctx.fillStyle = "brown"; 
        bctx.rect(relSizeX()/2+10, relSizeY()/2+75, 150, 200);
        bctx.fill();
    }, null));


    addElement(createObjectElement(function () {
        bctx.fillStyle = "brown"; 
        bctx.rect(relSizeX()/2+180, relSizeY()/2+75, 150, 200);
        bctx.fill();
    }, null));

   addElement(createObjectElement(function () {
        bctx.fillStyle = "brown"; 
        bctx.rect(relSizeX()/2+350, relSizeY()/2+75, 150, 200);
        bctx.fill();
    }, null));

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
    
    
    /*var element2 = new Object();
    element2.type = "object";
    element2.draw = function () {
        bctx.beginPath();
        bctx.fillStyle = "brown"; 
        bctx.rect(relSizeX()/2-330, relSizeY()/2+75, 150, 200);
        bctx.fill();
        bctx.closePath();
    }
    addElement(element2);*/
/*
    var element3 = new Object();
    element3.type = "object";
    element3.draw = function () {
        bctx.beginPath();
        bctx.fillStyle = "brown"; 
        bctx.rect(relSizeX()/2-160, relSizeY()/2+75, 150, 200);
        bctx.fill();
        bctx.closePath();
    }
    addElement(element3);*/
/*
    var element4 = new Object();
    element4.type = "object";
    element4.draw = function () {
        bctx.beginPath();
        bctx.fillStyle = "brown"; 
        bctx.rect(relSizeX()/2+10, relSizeY()/2+75, 150, 200);
        bctx.fill();
        bctx.closePath();
    }
    addElement(element4);

    var element5 = new Object();
    element5.type = "object";
    element5.draw = function () {
        bctx.beginPath();
        bctx.fillStyle = "brown"; 
        bctx.rect(relSizeX()/2+180, relSizeY()/2+75, 150, 200);
        bctx.fill();
        bctx.closePath();
    }
    addElement(element5);

    var element6 = new Object();
    element6.type = "object";
    element6.draw = function () {
        bctx.beginPath();
        bctx.fillStyle = "brown"; 
        bctx.rect(relSizeX()/2+350, relSizeY()/2+75, 150, 200);
        bctx.fill();
        bctx.closePath();
    }
    addElement(element6);

    var element7 = new Object();
    element7.type = "object";
    element7.draw = function () {
        bctx.beginPath();
        bctx.fillStyle = "brown"; 
        bctx.rect(175, 75, 40, 300);
        bctx.fill();
        bctx.closePath();
    }
    addElement(element7);
    
    var element8 = new Object();
    element8.type = "object";
    element8.draw = function () {
        bctx.beginPath();
        bctx.fillStyle = "brown"; 
        bctx.rect(250, 175, 25, 200);
        bctx.fill();
        bctx.closePath();
    }
    addElement(element8);
    
    var element9 = new Object();
    element9.type = "object";
    element9.draw = function () {
        bctx.beginPath();
        bctx.fillStyle = "brown"; 
        bctx.rect(1065, 75, 40, 300);
        bctx.fill();
        bctx.closePath();
    }
    addElement(element9);
    
    var element10 = new Object();
    element10.type = "object";
    element10.draw = function () {
        bctx.beginPath();
        bctx.fillStyle = "brown"; 
        bctx.rect(1005, 175, 25, 200);
        bctx.fill();
        bctx.closePath();
    }
    addElement(element10);
    
    var element11 = new Object();
    element11.type = "object";
    element11.draw = function () {
        bctx.beginPath();
        bctx.fillStyle = "brown"; 
        bctx.rect(175, 400, 100, 25);
        bctx.fill();
        bctx.closePath();
    }
    addElement(element11);
    
    var element12 = new Object();
    element12.type = "object";
    element12.draw = function () {
        bctx.beginPath();
        bctx.fillStyle = "brown"; 
        bctx.rect(1005, 400, 100, 25);
        bctx.fill();
        bctx.closePath();
    }
    addElement(element12);

    var element13 = new Object();
    element13.type = "object";
    element13.draw = function () {
        bctx.beginPath();
        bctx.fillStyle = "brown"; 
        bctx.rect(25, 50, 100, 300);
        bctx.fill();
        bctx.closePath();
    }
    addElement(element13);
    
    var element14 = new Object();
    element14.type = "object";
    element14.draw = function () {
        bctx.beginPath();
        bctx.fillStyle = "brown"; 
        bctx.rect(1155, 50, 100, 300);
        bctx.fill();
        bctx.closePath();
    }
    addElement(element14);
    
    var element15 = new Object();
    element15.type = "object";
    element15.draw = function () {
        bctx.beginPath();
        bctx.fillStyle = "brown"; 
        bctx.rect(relSizeX()/2-75, 25, 150, 50);
        bctx.fill();
        bctx.closePath();
    }
    addElement(element15);
    */
    drawCanvas();
    
}