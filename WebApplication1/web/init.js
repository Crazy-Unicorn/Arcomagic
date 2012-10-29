/*
function xy_res (horizontal, res) {
    if (horizontal) {
        return {"x":res["x"], "y":res["y"]}}
    else {
        return {"x":res["y"], "y":res["x"]}}
    
}*/

function xy_res (res) {
    if (horizontal) {
        return {"x":res["x"], "y":res["y"]}}
    else {
        return {"x":res["y"], "y":res["x"]}}
    
}

function xy (x, y) {
    if (horizontal) {
        return {"x":x, "y":y}}
    else {
        return {"x":y, "y":x}}
    
}

function relSizeX () {
    if (horizontal) {return sizeX;}
    else {return sizeY;}
}

function relSizeY () {
    if (horizontal) {return sizeY;}
    else {return sizeX;}
}

/*function xy_x (horizontal, x, y) {
    if (horizontal) { return x; }
    else { return y; }
    
}

function xy_y (horizontal, x, y) {
    if (horizontal) { return y; }
    else { return x; }
    
}*/

function drawCanvas () {

    drawBackground();
    drawElements();
    onScreen();
}


function onScreen () {
    var bc = bctx.getImageData(0, 0, buffer.width, buffer.height);
    ctx.putImageData(bc, 000, 000);
}

function drawBackground() {
    background.draw();
}

function drawElements () {
    for (var el in elements) {
        if (elements[el].type == "image") {
            bctx.drawImage(elements[el].image, xy(elements[el].x, elements[el].y).x, xy(elements[el].x, elements[el].y).y);
        } else if (elements[el].type == "text") {
            bctx.beginPath();
            bctx.font = elements[el].font;
            bctx.textAlign = elements[el].textAlign;
            bctx.fillStyle = elements[el].fillStyle;
            bctx.fillText(elements[el].text, xy(elements[el].x, elements[el].y).x, xy(elements[el].x, elements[el].y).y);
            bctx.closePath();  
        } else if (elements[el].type == "object") {
            elements[el].draw();
        }
        /*if (elements[el].event)
            events.push(elements[el].event);*/
    }
}


function init_resources () {

    resource = new Array();
    
    resource["vsAI"] = {
        "image" : null,
        "src" : "res/vsAI.PNG",
        "x" : 900,
        "y" : 150,
        "state" : 0
    };
    resource["vsAIOver"] = {
        "image" : null,
        "src" : "res/vsAI_over.PNG",
        "x" : 900,
        "y" : 150
    };
    resource["vsHuman"] = {
        "image" : null,
        "src" : "res/vsHuman.PNG",
        "x" : 900,
        "y" : 300,
        "state" : 0
    };
    resource["vsHumanOver"] = {
        "image" : null,
        "src" : "res/vsHuman_over.PNG",
        "x" : 900,
        "y" : 300
    };
    resource["tbomm_title"] = {
        "image" : null,
        "src" : "res/tbomm_title.png"
    };
    
    //var count = getResourcesCount();

    //drawStartStripe(0, count);
    
    for (var key in resource) {
        resource[key].image = new Image();
        resource[key].image.src = resource[key].src;
        lctx.drawImage(resource[key].image, 0, 0);
    }
}

function getResourcesCount () {
    var i = 0;
    for (var key in resource)
        i++;
    return i;
}



function startGame() {

    //alert("width = "+getClientWidth() +" & height = "+getClientHeight() );

    horizontal = true;

    sizeX = 1280;
    sizeY = 720;

    canvas = document.getElementById("game");
    canvas.width = relSizeX();
    canvas.height = relSizeY();

    if (canvas.getContext) {
        ctx = canvas.getContext("2d");

        canvasOffset = getOffset(canvas);

        buffer = document.createElement('canvas');
        buffer.width = canvas.width;
        buffer.height = canvas.height;

        bctx = buffer.getContext("2d");

        loader = document.createElement('canvas');
        lctx = loader.getContext("2d");

        init_resources();

/*        canvas.addEventListener('mouseleave', mouseleaveRun, false);
        canvas.addEventListener('mouseenter', mouseenterRun, false);
        canvas.addEventListener('mouseout', mouseoutRun, false);
        canvas.addEventListener('mouseover', mouseoverRun, false);
        canvas.addEventListener('mousedown', mousedownRun, false);
        canvas.addEventListener('mouseup', mouseupRun, false);
        canvas.addEventListener('mousemove', mousemoveRun, false);
        canvas.addEventListener('click', clickRun, false);*/
        
        init_events();

        //mainMenu();

        /*canvas.onmousemove = menuMousemove;
        canvas.onclick = menuClick;*/

        background = new Object();
        elements = [];
        startPage();
        
    }
}

function init_events () {
        
        events = [];
        
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
    
    alert("mouse "+event.type);
    var len = events.length;

    processed = false;
    for (var i = len-1; i>=0; i--) {
        if (events[i].type === event.type) {
            events[i].process(event);
        }
        if (processed === true) {
            return;
        }
    }
}

function touchHandler(event) {
    
    alert("touch "+event.type);
    
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

function addElement (el) {

    elements.push(el);
    
    if (el.events) {
        events = events.concat(el.events);
    }
    
}


/*

var item1Text = "Начать игру";

var focusedItemColor = "yellow";
var passiveItemColor = "red";

var itemFont = "30pt Calibri";
var itemAlign = "center";

var itemWidth = 300;
var itemHeight = 50;

var shadowLevel = 0;
var shadowMaxLevel = 100;
var shadowMinLevel = 0;
var shadowingTimerId;
var isShadowing = 0;

function startGame() {

//    on_body_load();


    var canvas = document.getElementById("game");
    canvas.width = sizeX;
    canvas.height = sizeY;
    
    if (canvas.getContext) {
        canvas_ = canvas;
        var ctx = canvas.getContext("2d");

        canvasOffset = getOffset(canvas);

        context = ctx;

        buffer = document.createElement('canvas');

        buffer.width = canvas.width;
        buffer.height = canvas.height;
        
        bctx = buffer.getContext("2d");
   
        loader = document.createElement('canvas');
        lctx = loader.getContext("2d");       

        init_resources();
        
        //mainMenu();

        / *canvas.onmousemove = menuMousemove;
        canvas.onclick = menuClick;* /
        
    }
}

var mainMenuTitleShiftLevel;
var mainMenuInterval;

var knopka1active;



var resBackground1;
var resTbommTitle;

var resLoadLevel = 0;
var resLoadStop = 0;

function init_resources () {

    resource = new Array();
    
    resource["vsAI"] = {
        "image" : null,
        "src" : "res/vsAI.PNG",
        "x" : 900,
        "y" : 150,
        "state" : 0,
        "loaded" : 0
    };
    resource["vsAIOver"] = {
        "image" : null,
        "src" : "res/vsAI_over.PNG",
        "x" : 900,
        "y" : 150,
        "loaded" : 0
    };
    resource["vsHuman"] = {
        "image" : null,
        "src" : "res/vsHuman.PNG",
        "x" : 900,
        "y" : 300,
        "state" : 0,
        "loaded" : 0
    };
    resource["vsHumanOver"] = {
        "image" : null,
        "src" : "res/vsHuman_over.PNG",
        "x" : 900,
        "y" : 300,
        "loaded" : 0
    };
    resource["tbomm_title"] = {
        "image" : null,
        "src" : "res/tbomm_title.png",//"res/gif.gif",//"res/tbomm_title.png",
        "loaded" : 0
    };
    
    resLoadLevel = 0;
    
    var count = getResourcesCount();

    drawStartStripe(0, count);
    
    for (var key in resource) {
        resource[key].image = new Image();
        resource[key].image.src = resource[key].src;
        lctx.drawImage(resource[key].image, 0, 0);
        resLoadLevel++;
        drawStartStripe(resLoadLevel, count);
    }
    
    mainMenu();
    
    //alert(getResourcesCount());
    
}


function getResourcesCount () {
    var i = 0;
    for (var key in resource)
        i++;
    return i;
}

function getLoadedResourcesCount () {
    var i = 0;
    for (var key in resource)
        if (resource[key].loaded == 1)
            i++;
    return i;
}

function drawStartStripe (i, max) {
    //alert(i + " & " + max);
    
    bctx.beginPath();
    bctx.fillStyle = "black";
    bctx.rect(0, 0, sizeX, sizeY);
    bctx.fill();
    bctx.closePath();
    
    bctx.beginPath();
    bctx.font = "14pt Arial";
    bctx.textAlign = "center";
    bctx.fillStyle = "white";
    bctx.fillText("Загрузка ресурсов...", sizeX/2, 600);
    bctx.closePath();   
    
    bctx.beginPath();
    bctx.fillStyle = "grey";
    bctx.rect(sizeX/2-300, 615, 600, 15);
    bctx.fill();
    bctx.closePath();
    
    bctx.beginPath();
    bctx.fillStyle = "white";
    bctx.rect(sizeX/2-300, 615, 1.0*i/max*600, 15);
    bctx.fill();
    bctx.closePath();
    
    onScreen();
}

function mainMenu () {
    
    mainMenuTitleShiftLevel = 1400;
    knopka1active = 0;
    
 
    //mainMenuInterval = setInterval(function() {drawMainMenu(i++);}, 33);
    mainMenuInterval = setInterval(drawMainMenu, 33);

    
}

function drawMainMenu () {

    if (mainMenuTitleShiftLevel>100) {
        drawBackground();
      
        drawMainTitle(mainMenuTitleShiftLevel);
        
        mainMenuTitleShiftLevel-=40;

        if (mainMenuTitleShiftLevel<=100) {
            drawMenuItems();    
            clearInterval(mainMenuInterval);
        }
        onScreen();
    }
}

function drawBackground () {
    
    
    / *var back = new Image();

    back.src = "menu_texture7.png";
    //back.onload = function() {
            var cx = buffer.width / back.width;
            var cy = buffer.height / back.height;
            var i,j;
            for (i=0; i<cx; i++)
                for (j=0; j<cy; j++)
            bctx.drawImage(back, i*back.width, j*back.height);
       // }* /
    
    bctx.fillStyle = "#acb78e"; 
    bctx.rect(0, 0, sizeX, sizeY);
    bctx.fill();
        
}

function drawMainTitle (i) {

    bctx.drawImage(resource["tbomm_title"].image, i, 200);

}



function drawMenuItems() {
    
    drawResource("vsAI");
    drawResource("vsHuman");
    
    onScreen();    
        
    canvas_.addEventListener('mousemove', drawMainButtons, true);
    canvas_.addEventListener('click', checkMainMenuClick, true);

}

function drawMainButtons (evt) {


    var cX = evt.clientX-canvasOffset.left; //clientX;
    var cY = evt.clientY-canvasOffset.top;

    var vsAIStateOld = resource["vsAI"].state;
    var vsHumanStateOld = resource["vsHuman"].state;
    
    if (cX>=resource["vsAI"].x&&cX<=resource["vsAI"].x+resource["vsAI"].image.width&&
        cY>=resource["vsAI"].y&&cY<=resource["vsAI"].y+resource["vsAI"].image.height) {
        if (resource["vsAI"].state==0) {
            drawResource("vsAIOver");
            resource["vsAI"].state = 1;
            onScreen();

        }
    } else {
        resource["vsAI"].state = 0;
        if (cX>=resource["vsHuman"].x&&cX<=resource["vsHuman"].x+resource["vsHuman"].image.width&&
            cY>=resource["vsHuman"].y&&cY<=resource["vsHuman"].y+resource["vsHuman"].image.height) {
            
            if (resource["vsHuman"].state==0) {
                drawResource("vsHumanOver");
                resource["vsHuman"].state = 1;
                onScreen();
            }
        } else {
            resource["vsHuman"].state = 0;
        }
        
    }
    
    if (resource["vsAI"].state<vsAIStateOld) {
        drawResource("vsAI");
        onScreen();
    }
    
    if (resource["vsHuman"].state<vsHumanStateOld) {
        drawResource("vsHuman");
        onScreen();
    }
    
}

function drawResource (name) {
    bctx.drawImage(resource[name].image, resource[name].x, resource[name].y);
}

function checkMainMenuClick (evt) {

    var cX = evt.clientX-canvasOffset.left;
    var cY = evt.clientY-canvasOffset.top;
    
    if (cX >= resource["vsAI"].x && cX <= resource["vsAI"].x+resource["vsAI"].image.width && 
        cY >= resource["vsAI"].y && cY <= resource["vsAI"].y+resource["vsAI"].image.height)
        goToSecondMenu();
}

function goToSecondMenu() {
    
    canvas_.removeEventListener('click', checkMainMenuClick, true);
    canvas_.removeEventListener('mousemove', drawMainButtons, true);
    
    shadowing("forward", "second");
    
    / *bctx.fillStyle = "black"; 
    bctx.rect(0, 0, sizeX, sizeY);
    bctx.fill();###############* /
    
    //drawSecondTitle();
    //shadowing(false);
    //onScreen();
}

//var shadowingSpecTimerId;

function shadowing (direction, page) {
    
    cd = context.getImageData(0, 0, canvas_.width, canvas_.height);
    bctx.putImageData(cd, 0, 0);
    isShadowing = 1;
    if (direction == "forward")
        shadowLevel = shadowMinLevel;
    if (direction == "backward")
        shadowLevel = shadowMaxLevel;
    shadowingTimerId = setInterval(function() {doShadowing(direction, page)}, 50);
}

function doShadowing (direction, page) {
    //'use strict';
    if (direction=="forward") {
        if (shadowLevel<=shadowMaxLevel) {
            var contex = bctx.getImageData(0, 0, sizeX, sizeY);
            var pixels = contex.data;
            
            var coeff = 1.0*shadowLevel/(shadowMaxLevel-shadowMinLevel);
            for (var i = 0, il = pixels.length; i < il; i += 4) {
                pixels[i] = pixels[i]-pixels[i]*coeff;
                pixels[i+1] = pixels[i+1]-pixels[i+1]*coeff;
                pixels[i+2] = pixels[i+2]-pixels[i+2]*coeff;
                pixels[i+3] = 255;
            }
            context.putImageData(contex, 0, 0);
            shadowLevel+=5;
           
        } else {
            clearInterval(shadowingTimerId);
            isShadowing = 0;
            drawSecondTitle ();
            shadowingTimerId = setInterval(function() {doShadowing("backward", page)}, 50);
        }
    }
    
    if (direction=="backward") {
        if (shadowLevel>=shadowMinLevel) {

            var contex = bctx.getImageData(0, 0, sizeX, sizeY);
            var pixels = contex.data;
            
            var coeff = 1.0*shadowLevel/(shadowMaxLevel-shadowMinLevel);

            for (var i = 0, il = pixels.length; i < il; i += 4) {
                pixels[i] = pixels[i]-pixels[i]*coeff;
                pixels[i+1] = pixels[i+1]-pixels[i+1]*coeff;
                pixels[i+2] = pixels[i+2]-pixels[i+2]*coeff;
                pixels[i+3] = 255;
            }
            context.putImageData(contex, 0, 0);
            shadowLevel-=5;
        } else {
            clearInterval(shadowingTimerId);
            isShadowing = 0;
        }
    }
}


function drawSecondTitle () {
    var img = new Image();
    img.src = "res/mdn-logo-sm.png";
    //title.onload = function() {
            bctx.fillStyle = "black"; 
        bctx.rect(0, 0, sizeX, sizeY);
        bctx.fill();
        bctx.drawImage(img, 300, 200);
        bctx.drawImage(img, 550, 250);
        bctx.drawImage(img, 870, 120);
        bctx.drawImage(img, 220, 370);
      //bctx.drawImage(resource["tbomm_title"].image, resource["tbomm_title"].x, resource["tbomm_title"].y);
    //}
    //onScreen();
}

/ *
function menuMousemove (evt) {
    
    if (evt.clientX>=850&&evt.clientX<=(850+itemWidth)&&evt.clientY>=(sizeY/2-200)&&evt.clientY<=(sizeY/2-200+itemHeight)) {
        focusedMenuItem1(evt);
    }
    else
        lostFocusedMenuItem1(evt);
}

function menuClick (evt) {
    
    if (evt.clientX>=850&&evt.clientX<=(850+itemWidth)&&evt.clientY>=(sizeY/2-200)&&evt.clientY<=(sizeY/2-200+itemHeight)) {
        menuItem1Activate();
    }
    else
        ;
}

function lostFocusedMenuItem1(evt) {
    try {
    if (evt.clientX>=850&&evt.clientX<=(850+itemHeight)&&evt.clientY>=(sizeY/2-200)&&evt.clientY<=(sizeY/2-200+itemHeight)) {
    } else {
        drawLostFocusedMenuItem1();
    }
    } catch (e) {
        drawLostFocusedMenuItem1();
    }
}

function drawLostFocusedMenuItem1 () {
        context.beginPath();
        context.beginPath();
        context.fillStyle = "blue"; 
        context.rect(850, sizeY/2-200, itemWidth, itemHeight);
        context.fill();
        var text = item1Text;
        context.font = itemFont;
        context.textAlign = itemAlign;
        context.fillStyle = passiveItemColor;
        context.fillText(text, 900+100, sizeY/2-200+35);
        context.closePath();   
        //alert("out");
}

function focusedMenuItem1(evt) {
        context.beginPath();
        context.fillStyle = "#BDBDFF"; 
        context.rect(850, sizeY/2-200, itemWidth, itemHeight);
        context.fill();
        var text = item1Text;
        context.font = itemFont;
        context.textAlign = itemAlign;
        context.fillStyle = focusedItemColor;
        context.fillText(text, 900+100, sizeY/2-200+35);
        context.closePath();

}

var shadowingTimerId;
var shadowingLevel;
var shadowingMaxLevel = 10;
var shadowingMatrixImg;

function menuItem1Activate() {
    boldActivatedMenu();
    shadowingLevel = 0;
    shadowingMatrixImg = context.getImageData(0, 0, sizeX, sizeY);
    shadowingTimerId = setInterval(shadowing, 150);
    canvas_.onmousemove = function(){};
    canvas_.onclick = function(){};
}

function boldActivatedMenu() {
    context.beginPath();
    context.fillStyle = "#BDBDFF"; 
    context.rect(850, sizeY/2-200, itemWidth, itemHeight);
    context.fill();
    var text = item1Text;
    context.font = "bold "+itemFont;
    context.textAlign = itemAlign;
    context.fillStyle = focusedItemColor;
    context.fillText(text, 900+100, sizeY/2-200+35);
    context.closePath();    
}

function shadowing(evt) {
    if (shadowingLevel<=shadowingMaxLevel) {
        var coeff = 1.0*shadowingLevel/shadowingMaxLevel;
        var pixels = shadowingMatrixImg.data;
        for (var i = 0, il = pixels.length; i < il; i += 4) {
            pixels[i] = pixels[i]-pixels[i]*coeff;
            pixels[i+1] = pixels[i+1]-pixels[i+1]*coeff;
            pixels[i+2] = pixels[i+2]-pixels[i+2]*coeff;
            pixels[i+3] = 255;
        }
        context.putImageData(shadowingMatrixImg, 0, 0);
        shadowingLevel++;
    } else
        clearInterval(shadowingTimerId);
    
}

function whatControlBox1(evt) {
    window.addEventListener('mousemove', whatControlBox, true);
}

function whatControlBox2(evt) {
    window.removeEventListener('mousemove', whatControlBox, true);
}
* /
*/

/* copied */

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


/*
var img_obj = {
    'source': null,
    'current': 0,
    'total_frames': 8,//16,
    'width': 50,//16,
    'height': 38//16
};

var img = new Image();
img.onload = function () { // Triggered when image has finished loading.
    img_obj.source = img;  // we set the image source for our object.
}
img.src = 'res/gif.gif';//'img/filename.png'; // contains an image of size 256x16
                              // with 16 frames of size 16x16

function draw_anim(context, x, y, iobj) { // context is the canvas 2d context.
    if (iobj.source != null)
        context.drawImage(iobj.source, iobj.current * iobj.width, 0,
                          iobj.width, iobj.height,
                          x, y, iobj.width, iobj.height);
    iobj.current = (iobj.current + 1) % iobj.total_frames;
                   // incrementing the current frame and assuring animation loop
}

function on_body_load() { // <body onload='on_body_load()'>...
    var canvas = document.getElementById('canvasElement');
                 // <canvas id='canvasElement' width='320' height='200'/>
    var context = canvas.getContext("2d");

    setInterval((function (c, i) {
                return function () {
                    draw_anim(c, 10, 10, i);
                };
    })(context, img_obj), 100);
}
*/