function selectorPage() {

    clearElements();
    
    addElement(createObjectElement(function () {
        
        //alert(this.x)
        /*var x = this.x;
        var y = this.y;
        var width = this.width;
        var height = this.height;*/
        
        drawBox(this.x, this.y, this.width, this.height, "#101010");
        drawStrokeBox(this.x, this.y, this.width, this.height, "grey");
        var img = resource["fire_mage"].image;
        //img.width*=4;
        //img.height*=4;
        bctx.drawImage(img, this.x+(this.width-img.width)/2, this.y+(this.height-img.height)/2, img.width*2, img.height*2);
    }, null, 350, 150, 200, 200, 'fireMage')
        .addEvent("mousedown", selectMage));

    var chosen = false;

    function selectMage (evt) {
        if (chosen===true)
            return;
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
        
        //alert(cX + ' ' + cY + ' ' + x_from + ' ' + x_to + ' ' + y_from + ' ' + y_to)
        if (dX>=x_from && dX<=x_to && dY>=y_from && dY<=y_to) {
            currentMage = this.el.name;
            var i = 0;
            var el = this.el;
            var forward = true;
            var tid = setInterval(function() {
                var color = rgbToHex(i, i, i)
                drawBox(el.x, el.y, el.width, el.height, "#"+color);
                drawStrokeBox(el.x, el.y, el.width, el.height, "grey");
                var img = resource["fire_mage"].image;
                bctx.drawImage(img, el.x+(el.width-img.width)/2, el.y+(el.height-img.height)/2, img.width*2, img.height*2);
                onScreen();
                if (forward) {
                    i+=32;
                    if (i>230) {
                        forward = false;
                    }                    
                }
                if (!forward) {
                    i-=32;
                    if (i<0) {
                        keyboardPage();
                        clearInterval(tid);
                    }  
                }

            }, 20);
            chosen=true;
        }
    }
    drawCanvas();
    
}