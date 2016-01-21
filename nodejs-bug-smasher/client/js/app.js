var $keyManager;
var $audioManager;
var $screenManager;
var $fingers;
var $progressBar;
var $dataManager;
var $localizator;

var $app = new function() {
    var self = this;
    window.onload = function() {
        $audioManager = new audioManager();
        $screenManager = new screenManager();
        $fingers = new fingers();
        $progressBar = new progressBar();

        document.getElementById("txt").focus();

        js.attach(document.body, "mousedown", focusTxt);
        js.attach(document.body, "mouseup", focusTxt);
        js.attach(js.getById("txt"), "keypress", onKeyPress);
        js.attach(js.getById("txt"), "keyup", onKeyUp);
        js.attach(js.getById("txt"), "blur", onTxtBlur);
        window.onfocus = focusTxt;

        self.init();
    };

    this.init = function() {
        var lang = js.getUrlParam("lang");
        if (lang == "ua") {
            $keyManager = uaKeys;
            $localizator = localizationUa;
        } else {
            lang = "en";
            $keyManager = enKeys;
            $localizator = localizationEn;
        }
        $keyManager.init();

        $dataManager = new dataManager(lang);
        $dataManager.load();

        $screenManager.getMainMenuScreen().showScreen();
    };

    function focusTxt() {
        document.getElementById("txt").focus();
    };

    function onTxtBlur() {
        window.setTimeout(focusTxt, 1);
    };
    
    function createEventProxy(ev) {
        var obj = {
            self: ev,
            keyCode: ev.keyCode,
            button: ev.button,
            shiftKey : ev.shiftKey,
            preventDefault : function() {
                if (obj.self) {
                    obj.self.preventDefault();
                }
            },
            stopPropagation : function() {
                if (obj.self) {
                    obj.self.stopPropagation();
                }
            }
        };
        return obj;
    }

    function onKeyPress(ev) {
        var code = ev.keyCode | ev.which;
        $keyManager.evProxy = createEventProxy(ev);
        console.log(code);

        window.setTimeout(function() {
            var txtEl = document.getElementById("txt");
            var val = txtEl.value;
            var button;
            if (val) {
                button = $keyManager.getButtonByValue(val);
                if (button) {
                    console.log("symbol = " + button.getSymbol());
                } 
            }
            if(!button) {
                button = $keyManager.getButtonByKeyCode(code);

            }
            processButton(button, $keyManager.evProxy);

            if (code != 116) {
                js.cancelEvent(ev);
            }

            if ($keyManager.isBackSpace(ev)) {
                js.cancelEvent(ev);
            }
        }, 0);

        
    };

    function processButton(button, ev) {
        if (button) {
            if ($keyManager.isCapsLock(ev)) {
                $keyManager.capsLock = !$keyManager.capsLock;
            }

            if ($keyManager.isCapsLock(ev)) {
                if ($keyManager.capsLock) {
                    button.addPressedState();
                } else {
                    button.removePressedState();
                }
            } else if (ev.shiftKey) {
                var leftShift = $keyManager.getByIndex(40);
                var rightShift = $keyManager.getByIndex(51);
                leftShift.addPressedState();
                rightShift.addPressedState();
                button.addPressedState();
            } else {
                button.addPressedState();
            }

            if ($screenManager.getActiveScreen().isShown()) {
                $screenManager.getActiveScreen().keyDown(button, ev);
            }
            $keyManager.render(ev);
        }
    }

    function onKeyUp(ev) {
        var code = ev.keyCode | ev.which;
        $keyManager.evProxy = createEventProxy(ev);
        var button = $keyManager.getButtonByKeyCode(code);
        if (button) {
            if (!$keyManager.isCapsLock(ev)) {

                if (button.getIndex() == 40 || button.getIndex() == 51) {
                    var leftShift = $keyManager.getByIndex(40);
                    var rightShift = $keyManager.getByIndex(51);
                    leftShift.removePressedState();
                    rightShift.removePressedState();
                } else {
                    button.removePressedState();
                }

            }
            if ($screenManager.getActiveScreen().isShown()) {
                $screenManager.getActiveScreen().keyUp(button, ev);
            }
            $keyManager.render(ev);
        }
    };

};