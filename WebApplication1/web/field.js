function fieldPage() {

    clearElements();

    background.draw = function () {
        /*
        bctx.beginPath();
        bctx.fillStyle = "green"; 
        bctx.rect(0, 0, relSizeX(), relSizeY());
        bctx.fill();
        bctx.closePath();*/
        drawBox(0,0,relSizeX(),relSizeY(),"green");
        
        /*bctx.beginPath();
        bctx.fillStyle = "brown"; 
        bctx.rect(relSizeX()/2-500, relSizeY()/2+75, 150, 200);
        bctx.fill();
        bctx.closePath();  */
        drawBox(relSizeX()/2-500, relSizeY()/2+75, 150, 200,"brown");
        
        /*bctx.beginPath();
        bctx.fillStyle = "brown"; 
        bctx.rect(relSizeX()/2-330, relSizeY()/2+75, 150, 200);
        bctx.fill();
        bctx.closePath();*/
        drawBox(relSizeX()/2-330, relSizeY()/2+75, 150, 200,"brown");
        
        /*bctx.beginPath();
        bctx.fillStyle = "brown"; 
        bctx.rect(relSizeX()/2-160, relSizeY()/2+75, 150, 200);
        bctx.fill();
        bctx.closePath();*/
        drawBox(relSizeX()/2-160, relSizeY()/2+75, 150, 200,"brown");
        
        
        /*bctx.beginPath();
        bctx.fillStyle = "brown"; 
        bctx.rect(relSizeX()/2+10, relSizeY()/2+75, 150, 200);
        bctx.fill();
        bctx.closePath();*/
        drawBox(relSizeX()/2+10, relSizeY()/2+75, 150, 200,"brown");
        
        
        /*bctx.beginPath();
        bctx.fillStyle = "brown"; 
        bctx.rect(relSizeX()/2+180, relSizeY()/2+75, 150, 200);
        bctx.fill();
        bctx.closePath();*/
        drawBox(relSizeX()/2+180, relSizeY()/2+75, 150, 200,"brown");
        
        
        /*bctx.beginPath();
        bctx.fillStyle = "brown"; 
        bctx.rect(relSizeX()/2+350, relSizeY()/2+75, 150, 200);
        bctx.fill();
        bctx.closePath();*/
        drawBox(relSizeX()/2+350, relSizeY()/2+75, 150, 200,"brown");
        
      
    }
    
    /*var process = function (evt) {
        //alert(1)
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
    }*/
    
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
            this.el.oldDraw = this.el.draw;
            this.el.draw = function () {
                /*bctx.beginPath();
                bctx.fillStyle = "#f2de29"; 
                bctx.rect(this.x-5, this.y-5, this.width+10, this.height+10);
                bctx.fill();
                bctx.closePath();*/
                drawBox(this.x-5, this.y-5, this.width+10, this.height+10,"#f2de29");
                /*bctx.beginPath();
                bctx.fillStyle = this.color;//"magenta"; 
                bctx.rect(this.x, this.y, this.width, this.height);
                bctx.fill();
                bctx.closePath();*/
                drawBox(this.x, this.y, this.width, this.height,this.color);
                //colorCard(this.el.color, this.el);
            }
            drawCanvas();
            processed = true;
        }
    }

    var cardMouseUp = function (evt) {
        //alert('1')
        if (tracker.id===this.el.id) {
            if (this.el.waiting===false) {
                this.el.restore();
                this.el.draw = this.el.oldDraw;
            }
            drawCanvas();
            tracker.id = null;
            processed = true;
        }
    }

    var cardMouseLeave = function (evt) {
        if (tracker.id===this.el.id) {
            if (this.el.waiting===false) {
                this.el.restore();
                this.el.draw = this.el.oldDraw;                
            }
            drawCanvas();
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
            //if ((y_to - (tracker.y-cY))<=sizeY) {
                if ((this.el.y-(tracker.y-cY)) >= 0) {
                    this.el.y -= (tracker.y-cY);
                    tracker.y = cY;
                    drawCanvas(); 
                } else {
                    this.el.y = 0;
                    drawCanvas(); 
                }
                if (this.el.y <= (this.el.initY-this.el.height-10)) {
                    this.el.y = this.el.initY-this.el.height-10;
                    //alert("вынул");
                    //drawCanvas();
                    this.el.draw = function () {
                        /*bctx.beginPath();
                        bctx.fillStyle = "red"; 
                        bctx.rect(this.x-5, this.y-5, this.width+10, this.height+10);
                        bctx.fill();
                        bctx.closePath();*/
                        drawBox(this.x-5, this.y-5, this.width+10, this.height+10, "red");
                        /*bctx.beginPath();
                        bctx.fillStyle = this.color;//"magenta"; 
                        bctx.rect(this.x, this.y, this.width, this.height);
                        bctx.fill();
                        bctx.closePath();*/
                        drawBox(this.x, this.y, this.width, this.height, this.color);
                        //colorCard(this.el.color, this.el);
                    }
            
                    drawCanvas(); 
                    this.el.waiting=true;
                    this.el.events["mouseup"].process(evt);
                    
                    bctx.beginPath();
                    bctx.font = "60pt Garamond";
                    bctx.textAlign = "center";
                    bctx.fillStyle = "red";
                    bctx.fillText("Выбрал", relSizeX()/2, relSizeY()/3);
                    bctx.closePath();
                    
                    onScreen();
                    var el1 = this.el;

                    setTimeout(function() {el1.restore();el1.restoreDraw();drawCanvas();el1.waiting=false;}, 1000);
                    
                    //cardMouseUp(evt);
                }   
                if (this.el.y >= (this.el.initY+this.el.height*0.3)) {
                    this.el.y = this.el.initY+this.el.height*0.3;
                    //alert("скинул");
                    this.el.draw = function () {
                        /*bctx.beginPath();
                        bctx.fillStyle = "black"; 
                        bctx.rect(this.x-5, this.y-5, this.width+10, this.height+10);
                        bctx.fill();
                        bctx.closePath();*/
                        drawBox(this.x-5, this.y-5, this.width+10, this.height+10, "black");
                        /*bctx.beginPath();
                        bctx.fillStyle = this.color;//"magenta"; 
                        bctx.rect(this.x, this.y, this.width, this.height);
                        bctx.fill();
                        bctx.closePath();*/
                        drawBox(this.x, this.y, this.width, this.height, this.color);
                        //colorCard(this.el.color, this.el);
                    }
                    drawCanvas();
                    this.el.waiting=true;
                    //alert("скинул");
                    
                    this.el.events["mouseup"].process(evt);
                    
                    bctx.beginPath();
                    bctx.font = "60pt Garamond";
                    bctx.textAlign = "center";
                    bctx.fillStyle = "red";
                    bctx.fillText("Скинул", relSizeX()/2, relSizeY()/3);
                    bctx.closePath();
                    
                    onScreen();
                    var el2 = this.el;
                    setTimeout(function() {el2.restore();el2.restoreDraw();drawCanvas();el2.waiting=false;}, 1000);
                    
                    //cardMouseUp(evt);
                }   
                //drawCanvas();        
           /* } else {
                //alert('here');
                this.el.y = sizeY - this.el.height;
                drawCanvas();
                alert('here');
            }*/
            processed = true;
        }
    }
    
    /*var ev = createEvent("mousedown", process);
    var els = [];
    els.push(ev);*/
    
    
    function colorCard (color, card) {
        drawBox(card.x, card.y, card.width, card.height, color);
        /*bctx.beginPath();
        bctx.fillStyle = color; 
        bctx.rect(card.x, card.y, card.width, card.height);
        bctx.fill();
        bctx.closePath();*/
        card.color = color;
    }
    
    addElement(createObjectElement(function() {colorCard("yellow", this);}, null, relSizeX()/2-500, relSizeY()/2+75, 150, 200)
    .addEvent("mousedown", cardMouseDown)
    .addEvent("mouseup", cardMouseUp)
    .addEvent("mousemove", cardMouseMove)
    .addEvent("mouseleave", cardMouseLeave));//.addEvent("mousedown", process));
    
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
       /* bctx.beginPath();
        bctx.fillStyle = "magenta"; 
        bctx.rect(this.x, this.y, this.width, this.height);
        bctx.fill();
        bctx.closePath();*/
        colorCard("magenta", this);
    }, null, relSizeX()/2-330, relSizeY()/2+75, 150, 200)
        .addEvent("mousedown", cardMouseDown)
        .addEvent("mouseup", cardMouseUp)
        .addEvent("mousemove", cardMouseMove)
        .addEvent("mouseleave", cardMouseLeave)
   );

    addElement(createObjectElement(function () {
      /* bctx.beginPath();
        bctx.fillStyle = "cyan"; 
        bctx.rect(this.x, this.y, this.width, this.height);
        bctx.fill();
        bctx.closePath();*/
        colorCard("cyan", this);
    }, null, relSizeX()/2-160, relSizeY()/2+75, 150, 200)
        .addEvent("mousedown", cardMouseDown)
        .addEvent("mouseup", cardMouseUp)
        .addEvent("mousemove", cardMouseMove)
        .addEvent("mouseleave", cardMouseLeave)
    );

    addElement(createObjectElement(function () {
       /*bctx.beginPath();
        bctx.fillStyle = "grey"; 
        bctx.rect(this.x, this.y, this.width, this.height);
        bctx.fill();
        bctx.closePath();*/
        colorCard("grey", this);
    }, null, relSizeX()/2+10, relSizeY()/2+75, 150, 200)
        .addEvent("mousedown", cardMouseDown)
        .addEvent("mouseup", cardMouseUp)
        .addEvent("mousemove", cardMouseMove)
        .addEvent("mouseleave", cardMouseLeave)
    );


    addElement(createObjectElement(function () {
        /*bctx.beginPath();
        bctx.fillStyle = "blue"; 
        bctx.rect(this.x, this.y, this.width, this.height);
        bctx.fill();
        bctx.closePath();*/
        colorCard("blue", this);
    }, null, relSizeX()/2+180, relSizeY()/2+75, 150, 200)
        .addEvent("mousedown", cardMouseDown)
        .addEvent("mouseup", cardMouseUp)
        .addEvent("mousemove", cardMouseMove)
        .addEvent("mouseleave", cardMouseLeave)
    );

   addElement(createObjectElement(function () {
        /*bctx.beginPath();
        bctx.fillStyle = "black"; 
        bctx.rect(this.x, this.y, this.width, this.height);
        bctx.fill();
        bctx.closePath();*/
       colorCard("black", this);
    }, null, relSizeX()/2+350, relSizeY()/2+75, 150, 200)
        .addEvent("mousedown", cardMouseDown)
        .addEvent("mouseup", cardMouseUp)
        .addEvent("mousemove", cardMouseMove)
        .addEvent("mouseleave", cardMouseLeave)
    );
       
       

    function player(name) {
        var player = new Object();
        player.name = name;

        return player;
    }   
       
    //player1 = "Player 1";
    //player2 = "Player 2";
    
    player1 = player("Player 1");
    player2 = player("Player 2");
    
    currentPlayer = player2;
    
    addElement(createObjectElement(function () {
        /*
        bctx.beginPath();
        bctx.fillStyle = "black"; 
        bctx.rect(this.x-4, this.y-4, this.width+8, this.height+8);
        bctx.fill();
        bctx.closePath();
        
        bctx.beginPath();
        bctx.fillStyle = "white"; 
        bctx.rect(this.x-1, this.y-1, this.width+2, this.height+2);
        bctx.fill();
        bctx.closePath();
        
        bctx.beginPath();
        bctx.fillStyle = "black"; 
        bctx.rect(this.x, this.y, this.width, this.height);
        bctx.fill();
        bctx.closePath();*/
        var r = 4;
        drawBox(this.x-r, this.y-r, this.width+r*2, this.height+r*2, "black");
        
        r = 1;
        drawBox(this.x-r, this.y-r, this.width+r*2, this.height+r*2, "white");

        drawBox(this.x, this.y, this.width, this.height, "black");
        
                    bctx.beginPath();
                    bctx.font = "20pt Arial";
                    bctx.textAlign = "center";
                    bctx.fillStyle = "white";
                    bctx.fillText(player1.name, this.x+this.width/2, this.y+this.height/2+10);
                    bctx.closePath();
                    
                    
        if (currentPlayer.name === player1.name) {
            drawBox(this.x+this.width+10, this.y+5, this.width/2, this.height-10, "black");

                        bctx.beginPath();
                        bctx.font = "15pt Arial";
                        bctx.textAlign = "center";
                        bctx.fillStyle = "white";
                        bctx.fillText("Ходит", this.x+this.width+10+this.width/4, this.y+5+(this.height-10)/2+5);
                        bctx.closePath();
        }
            
                    
    }, null, 20, 20, 200, 40)  );
        
    addElement(createObjectElement(function () {
        /*bctx.beginPath();
        bctx.fillStyle = "black"; 
        bctx.rect(this.x, this.y, this.width, this.height);
        bctx.fill();
        bctx.closePath();*/
        var r = 4;
        drawBox(this.x-r, this.y-r, this.width+r*2, this.height+r*2, "black");
        
        r = 1;
        drawBox(this.x-r, this.y-r, this.width+r*2, this.height+r*2, "white");

        drawBox(this.x, this.y, this.width, this.height, "black");
        
                    bctx.beginPath();
                    bctx.font = "20pt Arial";
                    bctx.textAlign = "center";
                    bctx.fillStyle = "white";
                    bctx.fillText(player2.name, this.x+this.width/2, this.y+this.height/2+10);
                    bctx.closePath();

        if (currentPlayer.name === player2.name) {
            drawBox(this.x-this.width/2-10, this.y+5, this.width/2, this.height-10, "black");

                        bctx.beginPath();
                        bctx.font = "15pt Arial";
                        bctx.textAlign = "center";
                        bctx.fillStyle = "white";
                        bctx.fillText("Ходит", this.x-this.width/2-10+this.width/4, this.y+5+(this.height-10)/2+5);
                        bctx.closePath();
        }

    }, null, relSizeX()-20-200, 20, 200, 40)  );
    
       
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