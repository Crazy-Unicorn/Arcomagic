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
        bctx.drawImage(img, this.x+(this.width-img.width)/2, this.y+(this.height-img.height)/2);
    }, null, 350, 150, 200, 200, 'fireMage')
        .addEvent("mousedown", selectMage));

    var chosen = false;

    function selectMage (evt) {
        if (chosen===true)
            return;
        var cX = evt.clientX-canvasOffset.left;
        var cY = evt.clientY-canvasOffset.top;
        var x_from = this.el.x;
        var x_to = this.el.x+this.el.width;
        var y_from = this.el.y;
        var y_to = this.el.y+this.el.height;
        if (cX>=x_from && cX<=x_to && cY>=y_from && cY<=y_to) {
            //alert('fire')
            currentMage = this.el.name;
            var i = 0;
            var el = this.el;
            var forward = true;
            var tid = setInterval(function() {
                //alert(el.x)
                //var c = ""+i;
                var color = rgbToHex(i, i, i)
                drawBox(el.x, el.y, el.width, el.height, "#"+color);
                drawStrokeBox(el.x, el.y, el.width, el.height, "grey");
                var img = resource["fire_mage"].image;
                bctx.drawImage(img, el.x+(el.width-img.width)/2, el.y+(el.height-img.height)/2);
                onScreen();
                if (forward) {
                    i+=32;
                    if (i>230) {
                        //clearInterval(tid);
                        forward = false;
                    }                    
                }
                if (!forward) {
                    i-=32;
                    if (i<0) {
                        //onScreen();
                        keyboardPage();
                        clearInterval(tid);
                        
                        //forward = false;
                    }  
                }

            }, 20);
            chosen=true;
        }
    }
    drawCanvas();
    
}