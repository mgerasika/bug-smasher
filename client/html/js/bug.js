function bug(btn) {
    this._button = btn;
    this._el = document.createElement("div");
    this._moveKey = document.createElement("div");
    this._speed = 80;
    js.addClass(this._el,"bug");
};

bug.prototype.getButtonIndex = function() {
    return this.getButton().getIndex();
};

bug.prototype.getButton = function() {
    return this._button;
};

bug.prototype.setAnimationSpeed = function(val) {
    this._speed = val;
};

bug.prototype.getAnimationSpeed = function() {
    return this._speed;
};

bug.prototype.showBug = function(handler) {
    var div = this._button.getDiv();
    /*
    js.removeClass(this._el, "display-none");
    div.appendChild(this._el);
    this.startAnimation();
    */
    js.removeClass(this._el, "display-none");
    document.body.appendChild(this._el);

    var xy = js.getXY(this._button.getDiv());
	this._el.style.left = (xy.x - 10) + "px";
	this._el.style.top = (xy.y - 30) + "px";

    this.startAnimation();
};

bug.prototype.startAnimation = function() {
    var self = this;
    if (js.hasClass(this._el,"bugSprite1")) {
	    js.removeClass(this._el, "bugSprite1");
	    js.addClass(this._el, "bugSprite2");
    }
    else {
        js.removeClass(this._el, "bugSprite2");
	    js.addClass(this._el, "bugSprite1");
    }
    self._bugAnimationRes = window.setTimeout(js.bind(this.startAnimation, this), 200);
};

bug.prototype.stopAnimation = function() {
    js.removeClass(this._el, "bugSprite2");
	js.addClass(this._el, "bugSprite1");
	
    if (this._bugAnimationRes) {
        window.clearTimeout(this._bugAnimationRes);
    }
};

bug.prototype.showBug3 = function(symbol, handler) {
    var self = this;
    var key = this._button.getDiv();
    var div = this._moveKey;
    div.className = key.className;
    div.innerHTML = symbol;
    div.style.position = "absolute";

    js.removeClass(this._el, "display-none");
    document.body.appendChild(this._el);
    document.body.appendChild(div);

    var xy = js.getXY(key);

    var x2 = (document.body.offsetWidth / 2) - 35;
    var y2 = 80;

    this._moveFn = new moveXY(xy.x, xy.y, x2, y2, function(obj) {
        var deg = ((new Date).getTime()) % 360;
        //self._moveKey.style.transform = "rotate(" + deg + "deg)";
        self._moveKey.style.left = obj.x + "px";
        self._moveKey.style.top = obj.y + "px";

        self._el.style.left = (obj.x-10) + "px";
        self._el.style.top = (obj.y - 70) + "px";
        if (obj.y == y2) {
            if (handler) {
                handler(self);
            }
        }
    });
    this._moveFn.speed = this.getAnimationSpeed();
    this._moveFn.start();
    this.startAnimation();
};

bug.prototype.hideBug = function() {
    var self = this;
    if (this._moveFn) {
        this._moveFn.stop();
        this._moveFn = undefined;
    }
    this.stopAnimation();
    js.removeClass(this._el, "bugSprite1");
    js.removeClass(this._el, "bugSprite2");
	js.addClass(this._el, "bugSprite3");

    function run() {
        js.addClass(self._el, "display-none");
        if (self._el.parentNode) {
            self._el.parentNode.removeChild(self._el);
        }

        if (self._moveKey.parentNode) {
            self._moveKey.parentNode.removeChild(self._moveKey);
        }

    }
    window.setTimeout(run, 500);
};


function bug2(btn) {
    bug2.supper.constructor.call(this,btn);
}

js.extend(bug2, bug);

bug2.prototype.showBug3 = function(symbol, handler) {
    var self = this;
    var key = this._button.getDiv();
    var div = this._moveKey;
    div.className = key.className;
    div.innerHTML = symbol;
    div.style.position = "absolute";

    js.removeClass(this._el, "display-none");
    document.body.appendChild(this._el);
    document.body.appendChild(div);

    var length = $keyManager.getKeys().length;
    var r = (Math.random() * 10000) % length;
    r = parseInt(r, 10);
    var someKey = $keyManager.getByIndex(r);
    var xy = js.getXY(someKey.getDiv());

    var x2 = (document.body.offsetWidth / 2) - 35;
    var y2 = 80;

    this._moveFn = new moveXY(xy.x, xy.y, x2, y2, function(obj) {
        var deg = ((new Date).getTime()) % 360;
        //self._moveKey.style.transform = "rotate(" + deg + "deg)";
        self._moveKey.style.left = obj.x + "px";
        self._moveKey.style.top = obj.y + "px";

        self._el.style.left = (obj.x -10 ) + "px";
        self._el.style.top = (obj.y - 70) + "px";
        if (obj.y == y2) {
            if (handler) {
                handler(self);
            }
        }
    });

    this._moveFn.speed = this.getAnimationSpeed();
    this._moveFn.start();
    this.startAnimation();
};

function moveXY(x1, y1, x2, y2, handler) {
    var self = this;
    var timeoutRes = undefined;
    var diff = Math.abs(y2 - y1);
    var step = parseInt(diff / 20, 10);
    this.speed = 80;
    step = y1 > y2 ? -1 * step : step;
    var y = y1;

    this.stop = function() {
        if (timeoutRes) {
            window.clearTimeout(timeoutRes);
        }
    };
    this.start = function(){
        if ((y2 > y1 && y <= y2) || (y2 < y1 && y >= y2)) {
	        x = (((y - y2) * (x2 - x1)) / (y2 - y1)) + x2;
            x = parseInt(x, 10);
            //console.log("moveXY x = " + x + " y =" + y);

            if (handler) {
                handler({ x: x, y: y });
            }
            y += step;
            if (timeoutRes) {
                window.clearTimeout(timeoutRes);
            }
            timeoutRes = window.setTimeout(self.start, self.speed);
        }
        else {
            if (handler) {
                handler({ x: x2, y: y2 });
            }
            if (timeoutRes) {
                window.clearTimeout(timeoutRes);
                
            }
        }
            

        };
    };


    function showDialog(txt) {
        var bigTxt = document.getElementById("bigText");
        var xy = js.getXY($keyManager.getEl());
        bigTxt.style.left = xy.x + "px";
        bigTxt.style.top = xy.y + "px";
        bigTxt.style.width = $keyManager.getEl().offsetWidth + "px";
        bigTxt.style.height = $keyManager.getEl().offsetHeight + "px";
        bigTxt.innerHTML = txt;
        js.removeClass(bigTxt, "display-none");
    }

    function hideDialog() {
        var bigTxt = document.getElementById("bigText");
        js.addClass(bigTxt, "display-none");
    };