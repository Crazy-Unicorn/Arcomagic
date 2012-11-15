function keyboardPage() {
    
    var name = "";
    
    var backgroundColor = "black";
    var keyColor = "white";

    clearElements();

    canvas.addEventListener('mousedown', mouseKeybHandler);

    function mouseKeybHandler (event) {
        for (var i in buttons) {
            if (typeof buttons[i].events[event.type] !== 'undefined') {
                buttons[i].events[event.type].process(event);
            }
        }
    }
    
    function drawKeyboard () {
        background.draw();
        keyboard.draw();
        field.draw();
        onScreen();
    }

    function newButton(x, y, width, height, label) {
        return new Button(x, y, width, height, label);
    }

    function Button(x, y, width, height, label) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;    
        this.label = label;
        this.events = [];
        this.addEvent = function (type, processEvent) {
            this.events[type] = new Object();
            this.events[type].el = this;
            this.events[type].processEvent = processEvent;
            this.events[type].process = function (evt) {
                var cX = evt.clientX-canvasOffset.left;
                var cY = evt.clientY-canvasOffset.top;

                cY+=getPageScroll().top;
                cX+=getPageScroll().left;
        
                var dd = xy(cX, cY);
                var x_from = this.el.x;
                var x_to = this.el.x+this.el.width;
                var y_from = this.el.y;
                var y_to = this.el.y+this.el.height;
                var dX = dd.x;
                var dY = dd.y;
                if (dX>=x_from && dX<=x_to && dY>=y_from && dY<=y_to) {
                    this.el.events[evt.type].processEvent();
                }
            };
            return this;
        }
        this.draw = function () {

                bctx.beginPath();
                bctx.strokeStyle = keyColor; 
                bctx.strokeRect(x, y, width, height);
                //bctx.fill();
                bctx.closePath();

                bctx.beginPath();
                var fontHeight = 20;
                bctx.font = fontHeight+"px Arial";
                bctx.textAlign = "center";
                bctx.fillStyle = keyColor;
                bctx.fillText(label, x+width/2, y+height/2+fontHeight/4);
                bctx.closePath();
        }
    }

        background = new Object();
        background.draw = function() {
            bctx.beginPath();
            bctx.fillStyle = backgroundColor; 
            bctx.rect(0, 0, sizeX, sizeY);
            bctx.fill();
            bctx.closePath();
        }
        
        buttons = [];
        
        keyboard = new Object();
        
        keyboard.draw = function() {
            for (var i in buttons) {
                buttons[i].draw();
            }
        };

        field = new Object();
             
	var str='';
		
	var delta=50;
        var shift=70;
	var size_buttom=35;
	var otctup_h=260;
	var otctup_h2=305;
	var otctup_h3=350;
	var otctup_h4=395;
	var str2_otctup=19;
        
        field.draw = function() {
            bctx.beginPath();
            bctx.strokeStyle = keyColor; 
            bctx.strokeRect(delta*4, otctup_h/3, size_buttom*10+delta, 75);
            bctx.closePath();
            
            bctx.beginPath();
            bctx.font = "40pt Lucida Console";
            bctx.textAlign = "left";
            bctx.fillStyle = keyColor;
            bctx.fillText(name, delta*4+size_buttom, otctup_h/3+50);
            bctx.closePath();
            
            if(name.length<10){
            bctx.beginPath();
            bctx.fillStyle = keyColor;
            bctx.rect(delta*4+size_buttom+name.length*32, otctup_h/3+50, 30, 10);
            bctx.fill();
            bctx.closePath();}
        };
	
	//name=name+'qwe';
	 
        buttons.push(newButton(1*delta+shift,otctup_h,size_buttom,size_buttom,'q').addEvent('mousedown', function() {
            //alert('q!');
             if(name.length<10){
                 name=name+'q';
                 drawKeyboard();                  
             }                         
        }));
        buttons.push(newButton(2*delta+shift,otctup_h,size_buttom,size_buttom,'w').addEvent('mousedown', function() {
            if(name.length<10){
                 name=name+'w';
                 drawKeyboard();                  
             } 
        }));
	buttons.push(newButton(3*delta+shift,otctup_h,size_buttom,size_buttom,'e').addEvent('mousedown', function() {
            if(name.length<10){
                 name=name+'e';
                 drawKeyboard();                  
             } 
        }));
        buttons.push(newButton(4*delta+shift,otctup_h,size_buttom,size_buttom,'r').addEvent('mousedown', function() {
            if(name.length<10){
                 name=name+'r';
                 drawKeyboard();                  
             } 
        }));
	buttons.push(newButton(5*delta+shift,otctup_h,size_buttom,size_buttom,'t').addEvent('mousedown', function() {
            if(name.length<10){
                 name=name+'t';
                 drawKeyboard();                  
             } 
        }));
        buttons.push(newButton(6*delta+shift,otctup_h,size_buttom,size_buttom,'y').addEvent('mousedown', function() {
            if(name.length<10){
                 name=name+'y';
                 drawKeyboard();                  
             } 
        }));
	buttons.push(newButton(7*delta+shift,otctup_h,size_buttom,size_buttom,'u').addEvent('mousedown', function() {
            if(name.length<10){
                 name=name+'u';
                 drawKeyboard();                  
             } 
        }));
        buttons.push(newButton(8*delta+shift,otctup_h,size_buttom,size_buttom,'i').addEvent('mousedown', function() {
            if(name.length<10){
                 name=name+'i';
                 drawKeyboard();                  
             } 
        }));
	buttons.push(newButton(9*delta+shift,otctup_h,size_buttom,size_buttom,'o').addEvent('mousedown', function() {
            if(name.length<10){
                 name=name+'o';
                 drawKeyboard();                  
             } 
        }));
        buttons.push(newButton(10*delta+shift,otctup_h,size_buttom,size_buttom,'p').addEvent('mousedown', function() {
            if(name.length<10){
                 name=name+'p';
                 drawKeyboard();                  
             } 
        }));
	buttons.push(newButton(11*delta+shift,otctup_h,size_buttom*1.5,size_buttom,'Del').addEvent('mousedown', function() {
            if(name.length>0){
                name=name.substring(0, name.length-1);
                drawKeyboard();
            }
        }));
	
	buttons.push(newButton(1*delta+str2_otctup+shift,otctup_h2,size_buttom,size_buttom,'a').addEvent('mousedown', function() {
            if(name.length<10){
                 name=name+'a';
                 drawKeyboard();                  
             } 
        }));
        buttons.push(newButton(2*delta+str2_otctup+shift,otctup_h2,size_buttom,size_buttom,'s').addEvent('mousedown', function() {
            if(name.length<10){
                 name=name+'s';
                 drawKeyboard();                  
             } 
        }));
	buttons.push(newButton(3*delta+str2_otctup+shift,otctup_h2,size_buttom,size_buttom,'d').addEvent('mousedown', function() {
            if(name.length<10){
                 name=name+'d';
                 drawKeyboard();                  
             } 
        }));
        buttons.push(newButton(4*delta+str2_otctup+shift,otctup_h2,size_buttom,size_buttom,'f').addEvent('mousedown', function() {
            if(name.length<10){
                 name=name+'f';
                 drawKeyboard();                  
             } 
        }));
	buttons.push(newButton(5*delta+str2_otctup+shift,otctup_h2,size_buttom,size_buttom,'g').addEvent('mousedown', function() {
            if(name.length<10){
                 name=name+'g';
                 drawKeyboard();                  
             } 
        }));
        buttons.push(newButton(6*delta+str2_otctup+shift,otctup_h2,size_buttom,size_buttom,'h').addEvent('mousedown', function() {
            if(name.length<10){
                 name=name+'h';
                 drawKeyboard();                  
             } 
        }));
	buttons.push(newButton(7*delta+str2_otctup+shift,otctup_h2,size_buttom,size_buttom,'j').addEvent('mousedown', function() {
            if(name.length<10){
                 name=name+'j';
                 drawKeyboard();                  
             } 
        }));
        buttons.push(newButton(8*delta+str2_otctup+shift,otctup_h2,size_buttom,size_buttom,'k').addEvent('mousedown', function() {
            if(name.length<10){
                 name=name+'k';
                 drawKeyboard();                  
             } 
        }));
	buttons.push(newButton(9*delta+str2_otctup+shift,otctup_h2,size_buttom,size_buttom,'l').addEvent('mousedown', function() {
            if(name.length<10){
                 name=name+'l';
                 drawKeyboard();                  
             } 
        }));
        buttons.push(newButton(10*delta+str2_otctup+shift,otctup_h2,size_buttom*2,size_buttom,'Enter').addEvent('mousedown', function() {
            if(name.length<=10){
                 canvas.removeEventListener('mousedown', mouseKeybHandler);
                 currentName = name;
                 if (currentName==="")
                     currentName = "#unnamed";
                 waitingPage();
                 
             } 
        }));
	
	buttons.push(newButton(1*delta+str2_otctup*2+shift,otctup_h3,size_buttom,size_buttom,'z').addEvent('mousedown', function() {
            if(name.length<10){
                 name=name+'z';
                 drawKeyboard();                  
             } 
        }));
        buttons.push(newButton(2*delta+str2_otctup*2+shift,otctup_h3,size_buttom,size_buttom,'x').addEvent('mousedown', function() {
            if(name.length<10){
                 name=name+'x';
                 drawKeyboard();                  
             } 
        }));
	buttons.push(newButton(3*delta+str2_otctup*2+shift,otctup_h3,size_buttom,size_buttom,'c').addEvent('mousedown', function() {
            if(name.length<10){
                 name=name+'c';
                 drawKeyboard();                  
             } 
        }));
        buttons.push(newButton(4*delta+str2_otctup*2+shift,otctup_h3,size_buttom,size_buttom,'v').addEvent('mousedown', function() {
            if(name.length<10){
                 name=name+'v';
                 drawKeyboard();                  
             } 
        }));
	buttons.push(newButton(5*delta+str2_otctup*2+shift,otctup_h3,size_buttom,size_buttom,'b').addEvent('mousedown', function() {
            if(name.length<10){
                 name=name+'b';
                 drawKeyboard();                  
             } 
        }));
        buttons.push(newButton(6*delta+str2_otctup*2+shift,otctup_h3,size_buttom,size_buttom,'n').addEvent('mousedown', function() {
            if(name.length<10){
                 name=name+'n';
                 drawKeyboard();                  
             } 
        }));
	buttons.push(newButton(7*delta+str2_otctup*2+shift,otctup_h3,size_buttom,size_buttom,'m').addEvent('mousedown', function() {
            if(name.length<10){
                 name=name+'m';
                 drawKeyboard();                  
             } 
        }));
        buttons.push(newButton(8*delta+str2_otctup*2+shift,otctup_h3,size_buttom,size_buttom,'_').addEvent('mousedown', function() {
            if(name.length<10){
                 name=name+'_';
                 drawKeyboard();                  
             } 
        }));
	buttons.push(newButton(9*delta+str2_otctup*2+shift,otctup_h3,size_buttom,size_buttom,'.').addEvent('mousedown', function() {
            if(name.length<10){
                 name=name+'.';
                 drawKeyboard();                  
             } 
        }));
	buttons.push(newButton(10*delta+str2_otctup*2+shift,otctup_h3,size_buttom,size_buttom,'-').addEvent('mousedown', function() {
            if(name.length<10){
                 name=name+'-';
                 drawKeyboard();                  
             } 
        }));
	
	buttons.push(newButton((10*delta-delta)/2+shift,otctup_h4,size_buttom*6,size_buttom,' ').addEvent('mousedown', function() {
            if(name.length<10){
                 name=name+' ';
                 drawKeyboard();                  
             } 
        }));
	
        drawKeyboard();
    
}