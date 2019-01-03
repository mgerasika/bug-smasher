function keyProxy(data) {
    this.getIndex = function() {
        return data.buttonIndex;
    };

    this.getShift = function() {
        return data.shift;
    };

    this.getText = function() {
        var button = $keyManager.getByIndex(this.getIndex());
        js.assert(button);
        if (this.getShift()) {
            return button.getShiftSymbol();
        } else {
            return button.getSymbol();
        }
    };

    this.getTime = function() {
        return this._time;
    };

    this.setTime = function(val) {
        this._time = val;
    };
};
/*
base key
*/
function baseKey(idx,data) {
    this._keyCode = data.keyCode;
    this._buttonIndex = idx;
    this._symbol = data.symbol;
    this._shiftSymbol = data.shiftSymbol;
    this._data = data;
    this._div;
    this._text;
    this._canShowText = true;
};

baseKey.prototype.render = function() {
    if (this._div) {
        if (this._data.width) {
            this._div.style.width = this._data.width;
        }
        if (isDebug()) {
            this._div.title = this.getIndex();
        }
    }
};

baseKey.prototype.getIndex = function() {
    return this._buttonIndex;
};

baseKey.prototype.getKeyCode = function() {
    return this._keyCode;
};

baseKey.prototype.showKey = function() {
    this._div.style.visibility = "visible";
};

baseKey.prototype.hideKey = function() {
this._div.style.visibility = "hidden";
};

baseKey.prototype.isShiftButton = function() {
    return this._keyCode == 16;
};

baseKey.prototype.isCapsLockButton = function() {
    return this._keyCode == 20;
};

baseKey.prototype.getSymbol = function() {
    return this._symbol;
};

baseKey.prototype.addBlinkState = function() {
js.addClass(this._div, "blink");
var btn = this;
if (!btn._wRes)  {
    function run() {
        if (btn.hasPressedState()) {
            btn.removePressedState();

        } else {
            btn.addPressedState();
        }

        btn._wRes = window.setTimeout(run, 600);
    }
    run();
    }
};

baseKey.prototype.removeBlinkState = function() {
    window.clearTimeout(this._wRes);
    js.removeClass(this._div, "blink");
};


baseKey.prototype.addRotateState = function() {
	var self = this;
	if (!self._timeoutRotateState) {

		function run() {
			if (js.hasClass(self._div, "rotateLeft")) {
				js.removeClass(self._div, "rotateLeft");
                js.addClass(self._div, "rotateRight");

			} else {
				js.addClass(self._div, "rotateLeft");
                js.removeClass(self._div, "rotateRight");
			}

			self._timeoutRotateState = window.setTimeout(run, 200);
		}

		run();
	}
};

baseKey.prototype.removeRotateState = function() {
	if (this._timeoutRotateState) {
		window.clearTimeout(this._timeoutRotateState);
	}
	js.removeClass(this._div, "rotateLeft");
    js.removeClass(this._div, "rotateRight");
};


baseKey.prototype.addPressedState = function() {
    if (this._div) {
        js.addClass(this._div, "pressed");
    }
};

baseKey.prototype.hasPressedState = function() {
    if (this._div) {
        return js.hasClass(this._div, "pressed");
    }
};

baseKey.prototype.removePressedState = function() {
    if (this._div) {
        js.removeClass(this._div, "pressed");
    }
};



baseKey.prototype.addSelectMeState = function() {
js.addClass(this._div, "selectMe");
};

baseKey.prototype.removeSelectMeState = function() {
js.removeClass(this._div, "selectMe");
};


baseKey.prototype.getDiv = function() {
    return this._div;
};

baseKey.prototype.equals = function(obj) {
    return this._buttonIndex == obj._buttonIndex;
};

baseKey.prototype.getType = function() {
    return "baseKey";
};

baseKey.prototype.setText = function(txt) {
    if (this._div) {
        if (this._canShowText) {
            if (this._text != txt) {
                this.getDiv().innerHTML = txt; // + "(" + this._idx + ")";
                this._text = txt;
            }
        } else {
            if (this._text != "") {
                this.getDiv().innerHTML = this._text = "";
            }
        }
    }
};

baseKey.prototype.getText = function() {
    return this._text;
};

baseKey.prototype.setDiv = function(div) {
    this._div = div;
};

baseKey.prototype.setShowText = function(val) {
    this._canShowText = val;
};

baseKey.prototype.getCanShowText = function() {
    return this._canShowText;
};

/*
simpleKey
*/
function simpleKey(idx,data) {
    simpleKey.supper.constructor.call(this,idx,data);
};

js.extend(simpleKey, baseKey);

simpleKey.prototype.getType = function() {
    return "simpleKey";
};

simpleKey.prototype.render = function(ev) {
    simpleKey.supper.render.call(this);

    if(ev.shiftKey) {
        this.setText(this.getSymbol().toUpperCase());
    }
    else if($keyManager.capsLock) {
        this.setText(this.getSymbol().toUpperCase());
    }
    else {
        this.setText(this.getSymbol().toLowerCase());
    }
};


/*
 specialKey
 */
function specialKey(idx,data) {
    specialKey.supper.constructor.call(this,idx,data);
};

js.extend(specialKey, baseKey);

specialKey.prototype.getType = function() {
    return "specialKey";
};

specialKey.prototype.render = function(ev) {
    specialKey.supper.render.call(this);

    this.setText(this.getSymbol());
};

/*
enterKey
*/
function enterKey(idx, data) {
    enterKey.supper.constructor.call(this, idx, data);
    this._subDiv;
   
};

js.extend(enterKey, specialKey);


enterKey.prototype.setDiv = function(div) {
    enterKey.supper.setDiv.call(this, div);
    this._div = div;

    var div = document.createElement("div");
    
    this._div.style.position = "relative";
    js.addClass(div, "key enterKey");
    this._subDiv = div;
};

enterKey.prototype.render = function(ev) {
enterKey.supper.render.call(this);

this.setText(this.getSymbol());
    if (this._div) {
        this._div.appendChild(this._subDiv);
    }
};

enterKey.prototype.addPressedState = function() {
enterKey.supper.addPressedState.call(this);
js.addClass(this._subDiv, "pressed");
};

enterKey.prototype.removePressedState = function() {
enterKey.supper.removePressedState.call(this);
js.removeClass(this._subDiv, "pressed");
};

enterKey.prototype.addBlinkState = function() {
js.addClass(this._div, "blink");
js.addClass(this._subDiv, "blink");
    var btn = this;
    if (!btn._wRes) {
        function run() {
            if (btn.hasPressedState()) {
                btn.removePressedState();

            } else {
                btn.addPressedState();
            }

            btn._wRes = window.setTimeout(run, 600);
        }
        run();
    }
};

enterKey.prototype.removeBlinkState = function() {
    window.clearTimeout(this._wRes);
    js.removeClass(this._div, "blink");
    js.removeClass(this._subDiv, "blink");
};

/*
 shiftKeyButton
 */
function shiftKeyButton(idx, data) {
    shiftKeyButton.supper.constructor.call(this, idx, data);
};

js.extend(shiftKeyButton, baseKey);

shiftKeyButton.prototype.getType = function() {
    return "shiftKey";
};

shiftKeyButton.prototype.getShiftSymbol = function() {
return this._shiftSymbol;
};

shiftKeyButton.prototype.render = function(ev) {
    shiftKeyButton.supper.render.call(this);

    if(ev.shiftKey) {
        this.setText(this.getShiftSymbol());
    }
    else {
        this.setText(this.getSymbol());
    }
};

/*
* keyManagerBase
* */
function keyManagerBase(res) {
    this._res = res;
};

keyManagerBase.prototype.isCapsLock = function(ev) {
    var code = ev.keyCode | ev.which;
    return code == 20;
};

keyManagerBase.prototype.isBackSpace = function(ev) {
    var code = ev.keyCode | ev.which;
    return code == 8;
};

keyManagerBase.prototype.getKeys = function() {
    return this._res;
};

keyManagerBase.prototype.render = function(ev) {
    for (var i = 0, len = this._res.length; i < len; ++i) {
        this._res[i].render(ev);
    }
};

keyManagerBase.prototype.showAllKeysText = function(ev) {
    for (var i = 0, len = this._res.length; i < len; ++i) {
        this._res[i].setShowText(true);
    }
};

keyManagerBase.prototype.showAllKeys = function(ev) {
    for (var i = 0, len = this._res.length; i < len; ++i) {
        this._res[i].showKey();
    }
};

keyManagerBase.prototype.clearAllKeysText = function(ev) {
    for (var i = 0, len = this._res.length; i < len; ++i) {
        this._res[i].setShowText(false);
    }
};


keyManagerBase.prototype.getByIndex = function(idx) {
    for (var i = 0; i < this._res.length; ++i) {
        var obj = this._res[i];
        if (obj._buttonIndex == idx) {
            return obj;
        }
    }
};

keyManagerBase.prototype.getButtonByKeyCode = function(keyCode) {
    if (js.isChrome) {
        if (keyCode == 186) {
            keyCode = 59;
        }
        else if (keyCode == 189) {
            keyCode = 173;
        }
        else if (keyCode == 187) {
            keyCode = 61;
        }
    }
    
    for (var i = 0; i < this._res.length; ++i) {
        var obj = this._res[i];
        if (obj._keyCode == keyCode) {
            if (obj._keyCode == 16) { //left or right shift pressed
                return obj;
            }
            else {
                return obj;
            }
        }
    }
};

keyManagerBase.prototype.getButtonByValue = function(value) {
    for (var i = 0; i < this._res.length; ++i) {
        var obj = this._res[i];
        if (obj.getSymbol() == value) {
            return obj;
        }
    }
};

keyManagerBase.prototype.getEl = function() {
    var res = document.getElementById("keyboardDiv");
    return res;
};

keyManagerBase.prototype.hasHiddenKeys = function() {
    var res = false;
    for (var i = 0, len = this.getKeys().length; i < len; ++i) {
        if (this.getKeys()[i].getDiv().style.visibility == "hidden") {
            res = true;
            break;
        }
    }
    return res;
};

keyManagerBase.prototype.init = function() {
    var res = document.getElementById("keyboardDiv");
    function renderRow(rowIdx,startIdx, endIdx, df1) {
	    if (res.innerHTML == "") {
            var row = document.createElement("div");
            js.addClass(row, "keyRow")
		    //row.style.clear = "both";
		    for (var i = startIdx; i < endIdx; i++) {
			    var div = document.createElement("div");
			    js.addClass(div, "key");
			    row.appendChild(div);

			    var keyObj = $keyManager.getByIndex(i);
			    keyObj.setDiv(div);

			    keyObj.setShowText(false);
                keyObj.render({});
                

               
		    }
 var endRow = document.createElement("div");
			    js.addClass(endRow, "endRow");
			    row.appendChild(endRow);
		    df1.appendChild(row);
	    }
	    else {
		    var row = res.childNodes[rowIdx];
		    var cellIdx = 0;
		    for (var i = startIdx; i < endIdx; i++) {
			    var div = row.childNodes[cellIdx++];
			    var keyObj = $keyManager.getByIndex(i);
			    keyObj.setDiv(div);
			    keyObj._text = "";
			    keyObj.render({});
		    }
	    }
    }

    var df = document.createDocumentFragment();
    var a1 = 0, a2 = 14;
    var b1 = a2, b2 = 27;
    var c1 = b2, c2 = 40;
    var d1 = c2, d2 = 52;
    var e1 = d2, e2 = 59;
    
    renderRow(0,a1, a2, df);
    renderRow(1,b1, b2, df);
    renderRow(2,c1, c2, df);
    renderRow(3,d1, d2, df);
    renderRow(4,e1, e2, df);
	
	if (!res.innerHTML) {
		res.appendChild(df);
	}
};
