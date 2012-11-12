
backgroundColor = "black";
keyColor = "white";

name = "Player";

function drawKeyboard () {

    background.draw();
    keyboard.draw();
    field.draw();
    onScreen();

}

function onScreen () {
    var bc = bctx.getImageData(0, 0, buffer.width, buffer.height);
    ctx.putImageData(bc, 000, 000);
}


function keyboardShow() {

    //alert("width = "+getClientWidth() +" & height = "+getClientHeight() );

    horizontal = true;

    sizeX = 800;
    sizeY = 480;

    canvas = document.getElementById("game");
    canvas.width = sizeX;
    canvas.height = sizeY;

    if (canvas.getContext) {
        ctx = canvas.getContext("2d");

        canvasOffset = getOffset(canvas);

        buffer = document.createElement('canvas');
        buffer.width = sizeX;
        buffer.height = sizeY;

        bctx = buffer.getContext("2d");

        init_events();
        
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
        
        field.draw = function() {
            bctx.beginPath();
            bctx.strokeStyle = keyColor; 
            bctx.strokeRect(10, 10, 500, 100);
            bctx.closePath();
            
            bctx.beginPath();
            bctx.font = "20pt Arial";
            bctx.textAlign = "left";
            bctx.fillStyle = keyColor;
            bctx.fillText(name, 20, 60);
            bctx.closePath();
            
            bctx.beginPath();
            bctx.fillStyle = keyColor;
            bctx.rect(109, 61, 30, 10);
            bctx.fill();
            bctx.closePath();
        };

        buttons.push(newButton(10,410,40,40,'q').addEvent('mousedown', function() {
            alert('q!')
        }));
        buttons.push(newButton(70,410,40,40,'w').addEvent('mousedown', function() {
            alert('w!')
        }));
        buttons.push(newButton(130,410,80,40,'Enter').addEvent('mousedown', function() {
            alert('Enter')
        }));
        drawKeyboard();
    }
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
            //alert(1)
            var cX = evt.clientX-canvasOffset.left;
            var cY = evt.clientY-canvasOffset.top;
            var x_from = this.el.x;
            var x_to = this.el.x+this.el.width;
            var y_from = this.el.y;
            var y_to = this.el.y+this.el.height;
            alert(cX + ' ' + cY + ' ' + x_from + ' ' + x_to + ' ' + y_from + ' ' + y_to)
            if (cX>=x_from && cX<=x_to && cY>=y_from && cY<=y_to) {
                //alert(2)
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
            bctx.font = "20pt Arial";
            bctx.textAlign = "center";
            bctx.fillStyle = keyColor;
            bctx.fillText(label, x+width/2, y+height/2);
            bctx.closePath();
    }
}

function init_events () {
        
        events = new Object();
        
        canvas.addEventListener('mouseleave', mouseHandler, false);
        canvas.addEventListener('mouseenter', mouseHandler, false);
        canvas.addEventListener('mouseout', mouseHandler, false);
        canvas.addEventListener('mouseover', mouseHandler, false);
        canvas.addEventListener('mousedown', mouseHandler, false);
        canvas.addEventListener('mouseup', mouseHandler, false);
        canvas.addEventListener('mousemove', mouseHandler, false);
        canvas.addEventListener('click', mouseHandler, false);
        
        canvas.addEventListener("touchstart", touchHandler, true);
        canvas.addEventListener("touchmove", touchHandler, true);
        canvas.addEventListener("touchend", touchHandler, true);
        canvas.addEventListener("touchcancel", touchHandler, true); 
}

function mouseHandler (event) {
    
    //alert("mouse "+event.type);

    //processed = false;

    for (var i in buttons) {

        if (typeof buttons[i].events[event.type] !== 'undefined') {
            buttons[i].events[event.type].process(event);
        }
    }
}

function touchHandler(event) {
    
    //alert("touch "+event.type);
    
    var touches = event.changedTouches,
        first = touches[0],
        type = "";

    switch(event.type)  {
        case "touchstart":type = "mousedown";break;
        case "touchmove":type="mousemove";break;        
        case "touchend":type="mouseup";break;
        default:return;
    }

             //initMouseEvent(type, canBubble, cancelable, view, clickCount,
    //           screenX, screenY, clientX, clientY, ctrlKey,
    //           altKey, shiftKey, metaKey, button, relatedTarget);
    
    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
                              first.screenX, first.screenY,
                              first.clientX, first.clientY, false,
                              false, false, false, 0/*left*/, null);

    first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}


function rgbToHex(r, g, b){
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}


function getOffsetRect(elem) {
    // (1)
    var box = elem.getBoundingClientRect()
    
    // (2)
    var body = document.body
    var docElem = document.documentElement
    
    // (3)
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft
    
    // (4)
    var clientTop = docElem.clientTop || body.clientTop || 0
    var clientLeft = docElem.clientLeft || body.clientLeft || 0
    
    // (5)
    var top  = box.top +  scrollTop - clientTop
    var left = box.left + scrollLeft - clientLeft
    
    return {top: Math.round(top), left: Math.round(left)}
}

function getOffsetSum(elem) {
    var top=0, left=0
    while(elem) {
        top = top + parseFloat(elem.offsetTop)
        left = left + parseFloat(elem.offsetLeft)
        elem = elem.offsetParent        
    }
    
    return {top: Math.round(top), left: Math.round(left)}
}


function getOffset(elem) {
    if (elem.getBoundingClientRect) {
        // "правильный" вариант
        return getOffsetRect(elem)
    } else {
        // пусть работает хоть как-то
        return getOffsetSum(elem)
    }
}

function getClientWidth()
{
  return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientWidth:document.body.clientWidth;
}
function getClientHeight()
{
  return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientHeight:document.body.clientHeight;
}
