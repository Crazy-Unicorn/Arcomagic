function fieldPage() {

    clearElements();

    background.draw = function () {
        drawBox(0,0,relSizeX(),relSizeY(),"green");
        drawBox(relSizeX()/2-500, relSizeY()/2+75, 150, 200,"brown");
        drawBox(relSizeX()/2-330, relSizeY()/2+75, 150, 200,"brown");
        drawBox(relSizeX()/2-160, relSizeY()/2+75, 150, 200,"brown");
        drawBox(relSizeX()/2+10, relSizeY()/2+75, 150, 200,"brown");
        drawBox(relSizeX()/2+180, relSizeY()/2+75, 150, 200,"brown");
        drawBox(relSizeX()/2+350, relSizeY()/2+75, 150, 200,"brown");
        drawResources();
        drawTowerTop(100,100,100,50);
        drawTowerBottom(50,400,200,50);
        drawTowerCore(130,150,40,250);
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
            this.el.draw = function () {
                drawBox(this.x-5, this.y-5, this.width+10, this.height+10,"#f2de29");
                drawBox(this.x, this.y, this.width, this.height,this.color);
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
                //alert(this.el.oldDraw)
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
                        drawBox(this.x-5, this.y-5, this.width+10, this.height+10, "red");
                        drawBox(this.x, this.y, this.width, this.height, this.color);
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
                        drawBox(this.x-5, this.y-5, this.width+10, this.height+10, "black");
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
            processed = true;
        }
    }
   
    
    function colorCard (color, card) {
        drawBox(card.x, card.y, card.width, card.height, color);
        card.color = color;
    }
    
    addElement(createObjectElement(function() {colorCard("yellow", this);}, null, relSizeX()/2-500, relSizeY()/2+75, 150, 200)
    .addEvent("mousedown", cardMouseDown)
    .addEvent("mouseup", cardMouseUp)
    .addEvent("mousemove", cardMouseMove)
    .addEvent("mouseleave", cardMouseLeave));//.addEvent("mousedown", process));
    
    addElement(createObjectElement(function () {
        colorCard("magenta", this);
    }, null, relSizeX()/2-330, relSizeY()/2+75, 150, 200)
        .addEvent("mousedown", cardMouseDown)
        .addEvent("mouseup", cardMouseUp)
        .addEvent("mousemove", cardMouseMove)
        .addEvent("mouseleave", cardMouseLeave)
   );

    addElement(createObjectElement(function () {
        colorCard("cyan", this);
    }, null, relSizeX()/2-160, relSizeY()/2+75, 150, 200)
        .addEvent("mousedown", cardMouseDown)
        .addEvent("mouseup", cardMouseUp)
        .addEvent("mousemove", cardMouseMove)
        .addEvent("mouseleave", cardMouseLeave)
    );

    addElement(createObjectElement(function () {
        colorCard("grey", this);
    }, null, relSizeX()/2+10, relSizeY()/2+75, 150, 200)
        .addEvent("mousedown", cardMouseDown)
        .addEvent("mouseup", cardMouseUp)
        .addEvent("mousemove", cardMouseMove)
        .addEvent("mouseleave", cardMouseLeave)
    );


    addElement(createObjectElement(function () {
        colorCard("blue", this);
    }, null, relSizeX()/2+180, relSizeY()/2+75, 150, 200)
        .addEvent("mousedown", cardMouseDown)
        .addEvent("mouseup", cardMouseUp)
        .addEvent("mousemove", cardMouseMove)
        .addEvent("mouseleave", cardMouseLeave)
    );

   addElement(createObjectElement(function () {
       colorCard("black", this);
    }, null, relSizeX()/2+350, relSizeY()/2+75, 150, 200)
        .addEvent("mousedown", cardMouseDown)
        .addEvent("mouseup", cardMouseUp)
        .addEvent("mousemove", cardMouseMove)
        .addEvent("mouseleave", cardMouseLeave)
    );
       
       

    function gameResource (name, production, amount) {
       var gameResource = new Object();
       gameResource.name = name;
       gameResource.production = production;
       gameResource.amount = amount;
       var resName = name;
       gameResource.img = resource[resName].image;
       return gameResource;
    }

    //var res_gems = resource("gems",2,5); //mana
    //var res_bricks = resource("bricks",2,5); //quarry
    //var res_recruits = resource("recruits",2,5);
    
    function player (name) {
        var player = new Object();
        player.name = name;
        player.resources = [];
        return player;
    }   
       
    //player1 = "Player 1";
    //player2 = "Player 2";
    
    var player1 = player("Player 1");
   
    player1.resources["bricks"] = gameResource("bricks",2,5);
    player1.resources["gems"] = gameResource("gems",2,5);
    player1.resources["beasts"] = gameResource("beasts",2,5);
    //player1.resources["recruits"] = gameResource("recruits",2,5);
    
    var player2 = player("Player 2");
    
    player2.resources["bricks"] = gameResource("bricks",2,5);
    player2.resources["skull"] = gameResource("skull",2,5);
    //player2.resources["gems"] = resource("gems",2,5);
    //player2.resources["recruits"] = resource("recruits",2,5);
    
    var currentPlayer = player2;
    
    function drawResources() {
        var i=0;
        var height=0;
        for (var res in player1.resources) {
            if (player1.resources[res].img) {
                bctx.drawImage(player1.resources[res].img, 20, 70+height);
                height+=player1.resources[res].img.height;
                i++;
            }
        }
        i=0;
        height=0;
        for (var res in player2.resources) {
            if (player2.resources[res].img) {
                if (res != 'skull') {
                    bctx.drawImage(player2.resources[res].img, relSizeX()-20-player2.resources[res].img.width, 70+height);
                    height+=player2.resources[res].img.height;
                    i++;
                } else {
                    drawBox(relSizeX()-20-120, 70+height, 120, 100, "#c0c0c0");
                    bctx.drawImage(player2.resources[res].img, relSizeX()-20-60-player2.resources[res].img.width/2, 70+height+50-player2.resources[res].img.height/2);
                    height+=100;
                    i++;
                }
                    
            }
        }
    }
    
    function card (name, type, img, requirements, addndis, damage/*damage4Enemy, damage4Me*/, description) { //damage4ResourceDwellings /*объект*/, damage4Resources /*объект*/,) {
        var card = new Object();
        card.name = name;
        card.type = type;
        card.img = resource[img].img;
        card.requirements = requirements;
        card.addndis = addndis;
        card.damage = damage;
        card.description = description;
    }
    
    
    addElement(createObjectElement(function () {
        
        drawBox(this.x, this.y, this.width, this.height, "black");
        
        var r = 3;
        drawBox(this.x+r, this.y+r, this.width-r*2, this.height-r*2, "white");

        r = 4;
        drawBox(this.x+r, this.y+r, this.width-r*2, this.height-r*2, "black");
        
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
        drawBox(this.x, this.y, this.width, this.height, "black");
        
        var r = 3;
        drawBox(this.x+r, this.y+r, this.width-r*2, this.height-r*2, "white");

        r = 4;
        drawBox(this.x+r, this.y+r, this.width-r*2, this.height-r*2, "black");
        
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
    
    
    function drawTowerTop(x, y, width, height) {
        bctx.beginPath();
        bctx.moveTo(x, y+height); 
        bctx.lineTo(x+width, y+height); 
        bctx.lineTo(x+width/2, y);  
        bctx.moveTo(x+width, y+height); 
        bctx.lineTo(x+width/2, y);  
        bctx.fillStyle = "rgba(255,128,128,1.0)"; 
        bctx.fill();
        bctx.closePath();
    }
    
    function drawTowerBottom(x, y, width, height) {
        bctx.beginPath();
        bctx.moveTo(x, y+height); 
        bctx.lineTo(x+width, y+height); 
        //bctx.moveTo(x, y); 
        bctx.lineTo(x+width*2/3, y);  
        bctx.lineTo(x+width/3, y);  
        bctx.lineTo(x, y+height);
        bctx.fillStyle = "rgba(255,128,128,1.0)"; 
        bctx.fill();
        bctx.closePath();
    }
    
    function drawTowerCore(x, y, width, height) {
        bctx.beginPath();
        bctx.moveTo(x, y); 
        bctx.lineTo(x, y+height); 
        //bctx.moveTo(x, y); 
        bctx.lineTo(x+width, y+height);  
        bctx.lineTo(x+width, y);  
        bctx.lineTo(x, y);
        bctx.fillStyle = "rgba(255,128,128,1.0)"; 
        bctx.fill();
        bctx.closePath();
    }
    
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