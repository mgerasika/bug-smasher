function progressBar() {
    var self = this;
    this._el = document.getElementById("progressBar");
    this._isStarted = false;
    this._highlightButtons = [];
    this._tutorial;
    this._level = 0;
    this._timeoutRes;
    
    this.showProgress = function() {
        js.removeClass(this._el, "display-none");
    };

    this.startProgress = function(tutorial) {
        if (this._timeoutRes) {
            window.clearTimeout(this._timeoutRes);
        }
        
        this._tutorial = tutorial;
        var button = tutorial.getActiveObj();
        this._isStarted = true;

        var symbol = button.getText();
        var idx = tutorial.getActiveIndex();
        var allLength = tutorial.getItems().length;
        this._el.innerHTML = "<_div style='font-size:2em;'>" + symbol + "(" + idx + "/" + allLength + ")</_div>";

        $audioManager.playBlink();

        function run() {
            if (self._level <= 4 && self._isStarted) {
                self._highlighKeyboard();
                self._level++;
                if (this._timeoutRes) {
                    window.clearTimeout(this._timeoutRes);
                }
                this._timeoutRes = window.setTimeout(run, 500);
            }
        };
        this._timeoutRes = window.setTimeout(run, 0);
    };

    this.stopProgress = function(tutorial) {
        if (this._timeoutRes) {
            window.clearTimeout(this._timeoutRes);
        }

        $audioManager.stopBlink();
        
        this._unHighlighKeyboard();
        this._isStarted = false;
        var button = tutorial.getActiveObj();
        var idx = button.getIndex();
        var buttonObj = $keyManager.getByIndex(idx);
        var text = buttonObj.getText();
        this._el.innerHTML = text;
        
        this._level = 0;
    };

    this.hideProgress = function(button){
        js.addClass(this._el,"display-none");
    };

    this._unHighlighKeyboard = function() {
        while (this._highlightButtons.length) {
            var button = this._highlightButtons.pop();
            button.removeSelectMeState();
        }
    };

    this._highlighKeyboard = function() {
        this._unHighlighKeyboard();

        var activeObj = this._tutorial.getActiveObj();
        var a1 = 0, a2 = 14;
        var b1 = a2, b2 = 27;
        var c1 = b2, c2 = 40;
        var d1 = c2, d2 = 52;

        var rows = [];
        rows.push([a1, a2]);
        rows.push([b1, b2]);
        rows.push([c1, c2]);
        rows.push([d1, d2]);

        var idx = activeObj.getIndex();

        if (true) {
            var resY = -1, resX = -1;
            var isLeft = false;
            for (var y = 0; y < rows.length; ++y) {
                var cells = rows[y];
                if (cells[0] < idx && idx < cells[1]) {
                    resY = y;
                    resX = idx - cells[0];
                    isLeft = Math.ceil(idx - cells[0]) < Math.abs(idx - cells[1]);
                    break;
                }
            }
            console.log("resX  = " + resX + " and resY = " + resY + " isLeft = " + isLeft);

            var level = this._level;
            if (level >= 0) {
                var startY = 0;
                var endY = rows.length;

                if (level >= 4) {
                    button = $keyManager.getByIndex(activeObj.getIndex());
                    button.addSelectMeState();
                    this._highlightButtons.push(button);
                }
                else if (level >= 3) {
                    if (activeObj.getIndex() - 1 >= 0) {
                        button = $keyManager.getByIndex(activeObj.getIndex() - 1);
                        button.addSelectMeState();
                        this._highlightButtons.push(button);
                    }
                    button = $keyManager.getByIndex(activeObj.getIndex());
                    button.addSelectMeState();
                    this._highlightButtons.push(button);

                    button = $keyManager.getByIndex(activeObj.getIndex() + 1);
                    button.addSelectMeState();
                    this._highlightButtons.push(button);
                } else {
                    if (level >= 2) {
                        startY = resY;
                        endY = startY + 1;
                    } else if (level >= 1) {
                        startY = Math.max(0, resY - 1);
                        endY = startY + 2;
                    }
                    for (var y = startY; y < endY; ++y) {
                        cells = rows[y];
                        if (isLeft) {
                            var end = Math.ceil((cells[1] - cells[0]) / 2) + cells[0];
                            for (var x = cells[0]; x < end; x++) {
                                var button = $keyManager.getByIndex(x);
                                button.addSelectMeState();

                                this._highlightButtons.push(button);
                            }
                        } else {
                            var start = Math.ceil((cells[1] - cells[0]) / 2) + cells[0];
                            for (var x = start; x < cells[1]; x++) {
                                button = $keyManager.getByIndex(x);
                                button.addSelectMeState();

                                this._highlightButtons.push(button);
                            }
                        }
                    }
                }
            }


        }
    };
};