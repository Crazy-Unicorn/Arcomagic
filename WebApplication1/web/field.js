function fieldPage() {

    clearElements();

var shiftbackright = 0;
var shiftbackdirectionright = 1;
var shiftbackdown = 0;
var shiftbackdirectiondown = 2;


    background.draw = function () {
        drawBox(0,0,relSizeX(),relSizeY(),"#DDDDDD");
        /*drawBox(relSizeX()/2-500, relSizeY()/2+75, 150, 200,"brown");
        drawBox(relSizeX()/2-330, relSizeY()/2+75, 150, 200,"brown");
        drawBox(relSizeX()/2-160, relSizeY()/2+75, 150, 200,"brown");
        drawBox(relSizeX()/2+10, relSizeY()/2+75, 150, 200,"brown");
        drawBox(relSizeX()/2+180, relSizeY()/2+75, 150, 200,"brown");
        drawBox(relSizeX()/2+350, relSizeY()/2+75, 150, 200,"brown");
        drawResources();
        drawTowerTop(100,100,100,50);
        drawTowerBottom(50,400,200,50);
        drawTowerCore(130,150,40,250);*/
        //var img = resource["fon"].image;
        //bctx.drawImage(img, 0, 0);
        //shiftback--;
        if (shiftbackdirectionright===1)
            shiftbackright-=2;
        else
            if (shiftbackdirectionright===0)
                shiftbackright+=2;
        if (shiftbackdirectiondown===1)
            shiftbackdown-=2;
        else
            if (shiftbackdirectiondown===0)
                shiftbackdown+=2;
        
        if ((shiftbackright===-1920+1280)&&(shiftbackdown===0)) {
            shiftbackdirectionright = 2;
            shiftbackdirectiondown = 1;
        }
        
        if ((shiftbackright===-1920+1280)&&(shiftbackdown===-1080+720)) {
            shiftbackdirectionright = 0;
            shiftbackdirectiondown = 2;
        }
    
        if ((shiftbackright===0)&&(shiftbackdown===-1080+720)) {
            shiftbackdirectionright = 2;
            shiftbackdirectiondown = 0;
        }
    
        if ((shiftbackright===0)&&(shiftbackdown===0)) {
            shiftbackdirectionright = 1;
            shiftbackdirectiondown = 2;
        }
        drawPicture("fon", shiftbackright, shiftbackdown);
        //drawPicture("fon", shiftback--, 0);
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
             
            /*this.el.draw = function () {
                drawBox(this.x-5, this.y-5, this.width+10, this.height+10,"#f2de29");
                drawBox(this.x, this.y, this.width, this.height,this.color);*/
             
            drawCanvas();
            processed = true;
        }
        ///alert(cX + " " + cY);//!@#
    }

    var cardMouseUp = function (evt) {
        //alert('1')
        if (tracker.id===this.el.id) {
            if (this.el.waiting===false) {
                this.el.restore();
                this.el.draw = this.el.oldDraw;
                drawCanvas();
                //alert(this.el.oldDraw)
            }
            //drawCanvas();
            tracker.id = null;
            processed = true;
        }
    }

    var cardMouseLeave = function (evt) {
        if (tracker.id===this.el.id) {
            if (this.el.waiting===false) {
                this.el.restore();
                this.el.draw = this.el.oldDraw;    
                drawCanvas();
            }
            //drawCanvas();
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
            
                    ///drawCanvas(); 
                    this.el.waiting=true;
                    this.el.events["mouseup"].process(evt);
                    
                    bctx.beginPath();
                    bctx.font = "60pt Garamond";
                    bctx.textAlign = "center";
                    bctx.fillStyle = "red";
                    bctx.fillText("Выбрал", relSizeX()/2, relSizeY()/3);
                    doPain();
                    doGain();
                    changeCurrentPlayer();
                    
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
                    
                    doHeal();
                    doGain();
                    changeCurrentPlayer();
                    
                    onScreen();
                    var el2 = this.el;
                    setTimeout(function() {el2.restore();el2.restoreDraw();drawCanvas();el2.waiting=false;}, 1000);
                    
                    //cardMouseUp(evt);
                }   
            processed = true;
        }
    }
    
    
    function colorCard (color, card) {
        
        //drawBox(card.x, card.y, card.width, card.height, color);
        var img = resource["card"].image;
        card.width = img.width;
        card.height = img.height;
        bctx.drawImage(img, card.x, card.y);
        /*var matr = bctx.getImageData(card.x-10, card.y-10, card.width, card.height);
        var pixels = matr.data;
        for (var i = 0, il = pixels.length; i < il; i += 4) {
            pixels[i] = pixels[i]*2;
            pixels[i+1] = pixels[i+1]*0.2;
            pixels[i+2] = pixels[i+2]*0.2;
            pixels[i+3] = pixels[i+3]*0.95;
        }
        bctx.putImageData(matr, card.x-10, card.y-10);*/
        card.color = color;
    }
    
    function tower1 (shift, min, max) { //190, 70   до 350
        //var min = 5; //70;
        //var max = 420; //350;

        var top = resource["tower_top_player1"].image;
        var core = resource["tower"].image;
        var dist = (2 + max - min - top.height)*player1.hp/maxhp;
        var disp = (top.width-core.width)/2;
        bctx.drawImage(top, shift, max-dist - top.height);
        bctx.drawImage(core, shift+disp, max-dist);
        //drawBox(150, min-5, 200, 5, "blue");
        //drawBox(150, max, 200, 5, "blue");
    }

    function tower2 (shift, min, max) { //190, 70   до 350
        //var min = 5;
        //var max = 420;

        var top = resource["tower_top_player2"].image;
        var core = resource["tower"].image;
        var dist = (2 + max - min - top.height)*player2.hp/maxhp;
        var disp = (top.width-core.width)/2;
        bctx.drawImage(top, shift, max-dist - top.height);
        bctx.drawImage(core, shift+disp, max-dist);
        //drawBox(750, min-5, 200, 5, "blue");
        //drawBox(750, max, 200, 5, "blue");
    }
    
    function tower (number, shift, min, max) {
        var player = player2;
        if (number===1)
            player = player1;
        
        var top = resource["tower_top_player"+number].image;
        var core = resource["tower"].image;
        var dist = Math.min((/*2 +*/ max - min - top.height),core.height);
        /*if (number===1)
            dist = dist * player1.hp/maxhp;
        else
            dist = dist * player2.hp/maxhp;*/
        dist = dist * player.hp/maxhp;
        var disp = (top.width-core.width)/2;
        bctx.drawImage(top, shift, max-dist - top.height);
        bctx.drawImage(core, shift+disp, max-dist);

        //drawBox(shift+disp+core.width/2-25, 450, 50, 30, "green")
        drawLightening(shift+disp+core.width/2-17, 460, 34, 25, -50);
        drawStrokeBox(shift+disp+core.width/2-17, 460, 34, 25, "white", 1);
        bctx.beginPath();
        var fontWidth = 15;
        bctx.font = "bold "+fontWidth+"pt Calibri";
        bctx.textAlign = "center";
        bctx.fillStyle = "white";
        bctx.fillText(player.hp, shift+disp+core.width/2, 460+25-fontWidth/2);
        bctx.closePath();
    }
    
    function towers () {
        var min = 5;
        var max = 490;
        
        tower(1, 190, min, max);
        tower(2, 890, min, max);
    }

    function drawBottom () {
        drawBox(0, 490, sizeX, sizeY-420, "#AABBAA");
    }

    function drawBorder () {
        var borderColor = "#446644"; //"#AAEEAA"
        drawBox(0, 0, 7, sizeY, borderColor);
        drawBox(0, 0, sizeX, 7, borderColor);
        drawBox(0, sizeY-7, sizeX, 7, borderColor);
        drawBox(sizeX-7, 0, 7, sizeY, borderColor);
    }

    function wall (number, shift, min, max) {
        var player = player2;
        if (number===1)
            player = player1;
        
        var wall = resource["wall"].image;

        var dist = Math.min((2 + max - min), wall.height);

        dist = dist * player.wall/maxwall;


            //alert(dist)
        bctx.drawImage(wall, shift, max-dist);
        //drawBox(shift-100, max-Math.min((2 + max - min), wall.height)-5, 200, 5, "blue")
        //drawBox(shift-100, max, 200, 5, "blue")
        
        
        drawLightening(shift+wall.width/2-17, 460, 34, 25, -50);
        drawStrokeBox(shift+wall.width/2-17, 460, 34, 25, "white", 1);
        bctx.beginPath();
        var fontWidth = 15;
        bctx.font = "bold "+fontWidth+"pt Calibri";
        bctx.textAlign = "center";
        bctx.fillStyle = "white";
        bctx.fillText(player.wall, shift+wall.width/2, 460+25-fontWidth/2);
        bctx.closePath();
    }

    function walls () {
        var min = 5;
        var max = 490;
        
        wall(1, 340, min, max);
        wall(2, 810, min, max);
    }

    /*function resources1 () {
        
    }
    
    function resources2 () {
        
    }*/

    /*function resources (number, x) {


    }

    function resourcesAll () {
        //resources1();
        //resources2();
        resources(1, 20);
        resources(2, );
    }*/

    //addElement(createObjectElement(resources));
    
    addElement(createObjectElement(towers));
    addElement(createObjectElement(walls));
    
    addElement(createObjectElement(drawBottom));
    addElement(createObjectElement(drawBorder));
    
    var cardY = relSizeY()/2+145;
    
    addElement(createObjectElement(function() {
        colorCard("yellow", this);
    }, null, relSizeX()/2-500, cardY, 150, 200)
    .addEvent("mousedown", cardMouseDown)
    .addEvent("mouseup", cardMouseUp)
    .addEvent("mousemove", cardMouseMove)
    .addEvent("mouseleave", cardMouseLeave));//.addEvent("mousedown", process));
    
    addElement(createObjectElement(function () {
        colorCard("magenta", this);
    }, null, relSizeX()/2-330, cardY, 150, 200)
        .addEvent("mousedown", cardMouseDown)
        .addEvent("mouseup", cardMouseUp)
        .addEvent("mousemove", cardMouseMove)
        .addEvent("mouseleave", cardMouseLeave)
   );

    addElement(createObjectElement(function () {
        colorCard("cyan", this);
    }, null, relSizeX()/2-160, cardY, 150, 200)
        .addEvent("mousedown", cardMouseDown)
        .addEvent("mouseup", cardMouseUp)
        .addEvent("mousemove", cardMouseMove)
        .addEvent("mouseleave", cardMouseLeave)
    );

    addElement(createObjectElement(function () {
        colorCard("grey", this);
    }, null, relSizeX()/2+10, cardY, 150, 200)
        .addEvent("mousedown", cardMouseDown)
        .addEvent("mouseup", cardMouseUp)
        .addEvent("mousemove", cardMouseMove)
        .addEvent("mouseleave", cardMouseLeave)
    );


    addElement(createObjectElement(function () {
        colorCard("blue", this);
    }, null, relSizeX()/2+180, cardY, 150, 200)
        .addEvent("mousedown", cardMouseDown)
        .addEvent("mouseup", cardMouseUp)
        .addEvent("mousemove", cardMouseMove)
        .addEvent("mouseleave", cardMouseLeave)
    );

   addElement(createObjectElement(function () {
       colorCard("black", this);
    }, null, relSizeX()/2+350, cardY, 150, 200)
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
       var resName = "res_"+name;
       try {
        gameResource.img = resource[resName].image;
       } catch (e) {
           gameResource.img = new Image();
       }
       return gameResource;
    }

    //var res_gems = resource("gems",2,5); //mana
    //var res_bricks = resource("bricks",2,5); //quarry
    //var res_recruits = resource("recruits",2,5);
    
    function player (name) {
        var player = new Object();
        player.name = name;
        player.resources = [];
        player.hp = 50;
        player.wall = 25;
        return player;
    }   
       
    maxhp = 100;
    maxwall = 100;  
    //player1 = "Player 1";
    //player2 = "Player 2";
    
    var player1 = player("Player "+currentName);//player("Player ITHETESTER");//player("Player 1");
   
   
    player1.resources["water"] = gameResource("water",500,1000);
    player1.resources["necro"] = gameResource("necro",10,75);
    player1.resources["bricks"] = gameResource("bricks",2,5);
    //player1.resources["gems"] = gameResource("gems",2,5);
    //player1.resources["beasts"] = gameResource("beasts",2,5);
    //player1.resources["recruits"] = gameResource("recruits",2,5);
    
    var player2 = player("Enemy  MYOWNENEMY");//player("Player 2");
    
    player2.resources["bricks"] = gameResource("bricks",2,5);
    player2.resources["skull"] = gameResource("skull",2,5);
    //player2.resources["gems"] = resource("gems",2,5);
    //player2.resources["recruits"] = resource("recruits",2,5);
    
    var currentPlayer = player1;
    
    function drawResource (type, x, y, production, amount) {

        var color1 = "white";
        var color2 = "grey";
        var color3 = "white";
        var colorT = "black";
        
        switch (type) {
            case 'life':
                color1 = "white";
                color2 = "grey";
                color3 = "white";
                colorT = "black";
                break;
            case 'necro':
                color1 = "black";
                color2 = "#4bfc3a";
                color3 = "black";
                colorT = "#4bfc3a";
                break;
            case 'water':
                color1 = "#008080";
                color2 = "#120a8f";
                color3 = "#dfe6fc";
                colorT = "#000080";
                break;
        }
            
        var width = 100;
        var height = 100;
        drawBox(x, y, width, height, color1);
        //var r = 6;
        //drawStrokeBox(x+r, y+r, width-r*2, height-r*2, "grey");
        //r = 7;
        //drawStrokeBox(x+r, y+r, width-r*2, height-r*2, "grey");
        var r = 5;//5
        drawBox(x+r, y+r, width-r*2, height-r*2, color2);
        r = 12;//8
        drawBox(x+r, y+r, width-r*2, height-r*2, color3);

        try {
            var img = resource["res_"+type].image;
            bctx.drawImage(img, x+(width-img.width)/2, y+(height-img.height)/4);
        } catch (e) {
            var img = resource["skull"].image;
            bctx.drawImage(img, x+(width-img.width)/2, y+(height-img.height)/4);
        }
        
        bctx.beginPath();
        bctx.font = "italic 25pt Arial";
        bctx.textAlign = "center";
        bctx.fillStyle = colorT;
        bctx.fillText('/', x+width/2, y+height*5/6);
        
        bctx.font = "bold 13pt Arial";
        bctx.textAlign = "right";
        bctx.fillStyle = colorT;
        bctx.fillText(production, x+width*2/5, y+height*3/4);
        
        bctx.font = "bold 13pt Arial";
        bctx.textAlign = "left";
        bctx.fillStyle = colorT;
        bctx.fillText(amount, x+width*3/5, y+height*4/5);
        bctx.closePath();
    }

    function drawResourc (type, x, y, production, amount) {
        var width = 150;
        var height = 40;
        
        var color1 = "grey";
        var color2 = "white";
        var colorT = "black";
        
        switch (type) {
            case 'life':
                color1 = "grey";
                color2 = "white";
                colorT = "black";
                break;
            case 'necro':
                color1 = "#4bfc3a";
                color2 = "black";
                colorT = "#4bfc3a";
                break;
            case 'water':
                color1 = "#120a8f";//"#008080";
                color2 = "#c7e9f7";//"#120a8f";
                colorT = "#000080";
                break;
        }
        
        drawBox(x, y, width, height, color1);
        var r = 3;
        drawBox(x+r, y+r, width-r*2, height-r*2, color2);
        
        try {
            var img = resource["res_"+type].image;
            bctx.drawImage(img, x+r*2, y+(height-img.height)/2);
        } catch (e) {
            var img = resource["skull"].image;
            bctx.drawImage(img, x+r*2, y+(height-img.height)/2);
        }
        
        var fontSize = 15;
        
        bctx.beginPath();

        bctx.font = "bold "+fontSize+"pt Arial";
        bctx.textAlign = "left";
        bctx.fillStyle = colorT;
        bctx.fillText("+"+production, x+r*2+img.width+5, y+r*2+fontSize+4);
        
        bctx.font = "italic 20pt Arial";
        bctx.textAlign = "center";
        bctx.fillStyle = colorT;
        bctx.fillText('/', x+r*2+img.width+5+50, y+r*2+20+4);
        
        bctx.font = "bold "+fontSize+"pt Arial";
        bctx.textAlign = "right";
        bctx.fillStyle = colorT;
        bctx.fillText(amount, x+width-r*2-5, y+r*2+fontSize+4);
        bctx.closePath();
        
    }

    function drawResources() {

        var height=40;
        for (var res in player1.resources) {
            //drawResource(player1.resources[res].name, 20, 80+height, player1.resources[res].production, player1.resources[res].amount);
            //height+=107;
            
            drawResourc(player1.resources[res].name, 20, 80+height, player1.resources[res].production, player1.resources[res].amount);
            height+=46;
            
            /*if (player1.resources[res].img) {
                bctx.drawImage(player1.resources[res].img, 20, 70+height);
                height+=player1.resources[res].img.height;
                i++;
            }*/
        }

        height=0;
        for (var res in player2.resources) {
            drawResourc(player2.resources[res].name, relSizeX()-20-150, 80+height, player2.resources[res].production, player2.resources[res].amount);
            height+=46;
            /*if (player2.resources[res].img) {
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
                    
            }*/
        }
        //drawResource("life", 20, 80, 55, 250);
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
    
    
    addElement(createObjectElement(drawResources));
    
    addElement(createObjectElement(function () {
        
        drawBox(this.x, this.y, this.width, this.height, "black");
        
        var r = 3;
        drawBox(this.x+r, this.y+r, this.width-r*2, this.height-r*2, "white");

        r = 4;
        drawBox(this.x+r, this.y+r, this.width-r*2, this.height-r*2, "black");
        
                    bctx.beginPath();
                    bctx.font = "15pt Arial";//"20pt Arial";
                    bctx.textAlign = "center";
                    bctx.fillStyle = "white";
                    bctx.fillText(player1.name, this.x+this.width/2, this.y+this.height/2+7);
                    bctx.closePath();
                    
                    
        if (currentPlayer.name === player1.name) {
            drawBox(this.x+this.width+10, this.y+5, this.width/2, this.height-10, "black");

                        bctx.beginPath();
                        bctx.font = "10pt Arial";//"15pt Arial";
                        bctx.textAlign = "center";
                        bctx.fillStyle = "white";
                        bctx.fillText("Ходит", this.x+this.width+10+this.width/4, this.y+5+(this.height-10)/2+5);
                        bctx.closePath();
        }      
        
    }, null, 20, 10, 150, 30)  );
        
    addElement(createObjectElement(function () {
        drawBox(this.x, this.y, this.width, this.height, "black");
        
        var r = 3;
        drawBox(this.x+r, this.y+r, this.width-r*2, this.height-r*2, "white");

        r = 4;
        drawBox(this.x+r, this.y+r, this.width-r*2, this.height-r*2, "black");
        
                    bctx.beginPath();
                    bctx.font = "15pt Arial";//"20pt Arial";
                    bctx.textAlign = "center";
                    bctx.fillStyle = "white";
                    bctx.fillText(player2.name, this.x+this.width/2, this.y+this.height/2+7);
                    bctx.closePath();

        if (currentPlayer.name === player2.name) {
            drawBox(this.x-this.width/2-10, this.y+5, this.width/2, this.height-10, "black");

                        bctx.beginPath();
                        bctx.font = "10pt Arial";//"15pt Arial";
                        bctx.textAlign = "center";
                        bctx.fillStyle = "white";
                        bctx.fillText("Ходит", this.x-this.width/2-10+this.width/4, this.y+5+(this.height-10)/2+5);
                        bctx.closePath();
        }
        
        
    }, null, relSizeX()-20-200, 10, 150, 30)  );
    
    
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
 
    function changeCurrentPlayer() {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }

    function doHeal() {
        if (currentPlayer === player1) {
            changeHp(player1, 10);
            doDamage(player1, 25);
            //changeWall(player2, 10);
        } else {
            changeHp(player2, 10);
            doDamage(player2, 25);
            //changeWall(player2, 10);
        }
        drawCanvas();
    }

    function doPain() {
        if (currentPlayer === player1) {
            changeHp(player2, -10);
            doDamage(player2, -25);
            //changeWall(player2, 10);
        } else {
            changeHp(player1, -10);
            doDamage(player1, -25);
            //changeWall(player2, 10);
        }
        drawCanvas();
    }
 
    function changeHp (player, change) {
        player.hp += change;
        if (player.hp < 0)
            player.hp = 0;
        if (player.hp > maxhp)
            player.hp = maxhp;
    }

    function changeWall (player, change) {
        var oldwall = player.wall;
        player.wall += change;
        if (player.wall < 0) {
            player.wall = 0;
            return change+oldwall;
        }
        if (player.wall > maxhp)
            player.wall = maxhp;
        return 0;
    }
    
    function doDamage (player, change) {
        var tail = changeWall(player, change);
        if (tail<0)
            changeHp (player, tail);
        if (player.hp <= 0) {
            
            alert(player.name+" проиграл!");
            clearElements();
            background.draw = function () {
                drawBox(0,0,sizeX,sizeY, "#DDDDDD");
                bctx.beginPath();
                bctx.font = "80pt Garamond";
                bctx.textAlign = "center";
                bctx.fillStyle = "magenta";
                bctx.fillText("Конец.", sizeX/2, sizeY/2);
                bctx.closePath();
            }
            //startGame();
        }
        if (player.hp >= maxhp) {
            
            alert(player.name+" выиграл!");
            clearElements();
            background.draw = function () {
                drawBox(0,0,sizeX,sizeY, "#DDDDDD");
                bctx.beginPath();
                bctx.font = "80pt Garamond";
                bctx.textAlign = "center";
                bctx.fillStyle = "magenta";
                bctx.fillText("Конец.", sizeX/2, sizeY/2);
                bctx.closePath();
            }
            //startGame();
        }
    }

    function doGain () {
        for (var i in player1.resources) {
            player1.resources[i].amount += player1.resources[i].production;
        }
        for (var i in player2.resources) {
            player2.resources[i].amount += player2.resources[i].production;
        }
        drawCanvas();
    }

    drawCanvas();
    
}