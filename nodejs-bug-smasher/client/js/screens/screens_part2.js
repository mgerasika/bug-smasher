function tutorial_part2(arr) {
    tutorial_part2.supper.constructor.call(this, arr);

    this._index = 0;
    this._items = this.init(arr);
};

js.extend(tutorial_part2, screenBase);

tutorial_part2.prototype.getText = function() {
};


tutorial_part2.prototype.showScreen = function() {
    tutorial_part2.supper.showScreen.call(this);

    $keyManager.clearAllKeysText();
    $keyManager.showAllKeys();
    $fingers.showHands();

    for (var i = 0, len = this._items.length; i < len; ++i) {
        var button = $keyManager.getByIndex(this._items[i].getIndex());
        button.setShowText(true);
    }
    $keyManager.render({});
    //$progressBar.showProgress();

    var activeObj = this.getActiveObj();
    //$progressBar.startProgress(this);
    activeObj._startDate = (new Date());

    window.setTimeout(js.bind(this._addBug, this), 1000);
};

tutorial_part2.prototype._addBug = function() {
    var button = $keyManager.getByIndex(this.getActiveObj().getIndex());
    if (this._bug) {
        this._removeBug();
    }

    this._bug = new bug(button);
    this._bug.setAnimationSpeed(100);
    console.log("btnIdx = " + this.getActiveObj().getIndex());
    this._bug.showBug3(this.getActiveObj().getShift() ? button.getShiftSymbol() : button.getSymbol(), function(bug) {
        bug.getButton().hideKey();
    });
};

tutorial_part2.prototype._addBug2 = function() {
    var button = $keyManager.getByIndex(this.getActiveObj().getIndex());
    if (this._bug) {
        this._removeBug();
    }

    this._bug = new bug2(button);
    this._bug.setAnimationSpeed(100);
    console.log("btnIdx = " + this.getActiveObj().getIndex());
    this._bug.showBug3(this.getActiveObj().getShift() ? button.getShiftSymbol() : button.getSymbol(), function(bug) {
        bug.getButton().hideKey();
    });
};

tutorial_part2.prototype._removeBug = function() {
    var button = $keyManager.getByIndex(this.getActiveObj().getIndex());
    if (this._bug) {
        this._bug.hideBug(button);
        this._bug = undefined;
    }
};

tutorial_part2.prototype.hideScreen = function() {
    tutorial_part2.supper.hideScreen.call(this);

    $progressBar.hideProgress();
};

tutorial_part2.prototype.replay = function() {
    this._index = 0;
    this._items = this.init(this._items);
};

tutorial_part2.prototype.getItems = function() {
    return this._items;
};

tutorial_part2.prototype.getActiveIndex = function() {
    return this._index;
};


tutorial_part2.prototype.getActiveObj = function() {
    var res = undefined;
    if (this._items.length > this._index) {
        res = this._items[this._index];
    }
    return res;
};


tutorial_part2.prototype.keyDown = function(activeButton, ev) {
    tutorial_part2.supper.keyDown.call(this, activeButton, ev);
    var activeObj = this.getActiveObj();
    if (!activeButton.isShiftButton() && !activeButton.isCapsLockButton()) {
        if (activeObj && (activeObj.getIndex() == activeButton._buttonIndex && activeObj.getShift() == ev.shiftKey)) {
            //save rate settings
            $audioManager.playSuccess();
            this._removeBug();

//$progressBar.stopProgress(this);

            function run() {
                this._index++;
                activeObj = this.getActiveObj();
                if (activeObj) {
                    //$progressBar.startProgress(this);
                    this._addBug();
                } else {
                    this.hideScreen();
                    this._endPart2();
                }
            }

            window.setTimeout(js.bind(run, this), 1000);
        } else {
            $audioManager.playFailed();
        }
    }
};

tutorial_part2.prototype._endPart2 = function() {
    var self = this;
    var success = !$keyManager.hasHiddenKeys();
    $fingers.hideHands();
    if (success) {
        showDialog($localizator.LevelSuccess);

        function a() {
            hideDialog();

            var idx = $screenManager.getActiveScreenIdx();
            var endScreen = $screenManager.getEndTutorialScreen();
            endScreen.showScreen();

            $dataManager.setLevel(idx + 1);
            $dataManager.save();
        }

        window.setTimeout(a, 2000);
    } else {


        showDialog($localizator.LevelFailed);

        function a() {
            hideDialog();

            self._index = 0;
            self.showScreen();

        }

        window.setTimeout(a, 2000);
    }
};

tutorial_part2.prototype.keyUp = function(activeButton, ev) {
    tutorial_part2.supper.keyUp.call(this, activeButton, ev);
    window.setTimeout(function() {
    }, 100);
};

function level_12_basicKeys() {
    level_12_basicKeys.supper.constructor.call(this, level_12_basicKeys.ITEMS);
};

js.extend(level_12_basicKeys, tutorial_part2);

level_12_basicKeys.ITEMS = [
    new keyProxy({ buttonIndex: 18, shift: false }),
    new keyProxy({ buttonIndex: 19, shift: false }),
    new keyProxy({ buttonIndex: 20, shift: false }),
    new keyProxy({ buttonIndex: 21, shift: false }),
    new keyProxy({ buttonIndex: 22, shift: false }),
    new keyProxy({ buttonIndex: 29, shift: false }),
    new keyProxy({ buttonIndex: 30, shift: false }),
    new keyProxy({ buttonIndex: 31, shift: false }),
    new keyProxy({ buttonIndex: 32, shift: false }),
    new keyProxy({ buttonIndex: 33, shift: false }),
    new keyProxy({ buttonIndex: 34, shift: false }),
    new keyProxy({ buttonIndex: 35, shift: false }),
    new keyProxy({ buttonIndex: 36, shift: false }),
    new keyProxy({ buttonIndex: 43, shift: false }),
    new keyProxy({ buttonIndex: 44, shift: false }),
    new keyProxy({ buttonIndex: 45, shift: false }),
    new keyProxy({ buttonIndex: 46, shift: false }),
    new keyProxy({ buttonIndex: 47, shift: false }),
];

level_12_basicKeys.prototype.getText = function() {
    return $localizator.BasicKeys;
};

function level_13_basicKeys_part2() {
    level_13_basicKeys_part2.supper.constructor.call(this, level_12_basicKeys.ITEMS);
};

js.extend(level_13_basicKeys_part2, tutorial_part2);

level_13_basicKeys_part2.prototype.getText = function() {
    return $localizator.BasicKeysPart2;
};

level_13_basicKeys_part2.prototype._addBug = function() {
    this._addBug2();
};

function level_14_advancedKeys() {
    level_14_advancedKeys.supper.constructor.call(this, level_14_advancedKeys.ITEMS);
};

js.extend(level_14_advancedKeys, tutorial_part2);

level_14_advancedKeys.ITEMS = [
    new keyProxy({ buttonIndex: 15, shift: false }),
    new keyProxy({ buttonIndex: 16, shift: false }),
    new keyProxy({ buttonIndex: 17, shift: false }),
    new keyProxy({ buttonIndex: 23, shift: false }),
    new keyProxy({ buttonIndex: 24, shift: false }),
    new keyProxy({ buttonIndex: 28, shift: false }),
    new keyProxy({ buttonIndex: 41, shift: false }),
    new keyProxy({ buttonIndex: 42, shift: false }),
    new keyProxy({ buttonIndex: 47, shift: false }),
    new keyProxy({ buttonIndex: 29, shift: false }),
    new keyProxy({ buttonIndex: 36, shift: false }),
    new keyProxy({ buttonIndex: 19, shift: false }),
    new keyProxy({ buttonIndex: 20, shift: false }),
    new keyProxy({ buttonIndex: 21, shift: false }),
    new keyProxy({ buttonIndex: 45, shift: false })
];
level_14_advancedKeys.prototype.getText = function() {
    return $localizator.AdvancedKeys;
};

//next
function level_15_advancedKeys_part2() {
    level_15_advancedKeys_part2.supper.constructor.call(this, level_14_advancedKeys.ITEMS);
};

js.extend(level_15_advancedKeys_part2, tutorial_part2);

level_15_advancedKeys_part2.prototype._addBug = function() {
    this._addBug2();
};

level_15_advancedKeys_part2.prototype.getText = function() {
    return $localizator.AdvancedKeysPart2;
};

/*exam 1*/
function level_16_basicKeysSummary() {

    level_16_basicKeysSummary.supper.constructor.call(this, level_16_basicKeysSummary.ITEMS);
};

js.extend(level_16_basicKeysSummary, tutorial_part2);

level_16_basicKeysSummary.ITEMS = [];
level_16_basicKeysSummary.ITEMS = level_16_basicKeysSummary.ITEMS.concat(level_12_basicKeys.ITEMS);
level_16_basicKeysSummary.ITEMS = level_16_basicKeysSummary.ITEMS.concat(level_14_advancedKeys.ITEMS);

level_16_basicKeysSummary.prototype.getText = function() {
    return $localizator.BasicKeysSummary;
};

level_16_basicKeysSummary.prototype.showScreen = function() {
    level_16_basicKeysSummary.supper.showScreen.call(this);


    $keyManager.clearAllKeysText();
    $keyManager.render({});
};

//next
function level_17_basicKeysSummary_part2() {
    level_17_basicKeysSummary_part2.supper.constructor.call(this, level_16_basicKeysSummary.ITEMS);
};

js.extend(level_17_basicKeysSummary_part2, tutorial_part2);

level_17_basicKeysSummary_part2.prototype._addBug = function() {
    this._addBug2();
};

level_17_basicKeysSummary_part2.prototype.getText = function() {
    return $localizator.BasicKeysSummaryPart2;
};

/*
 * numeric and symbols
 * */
function level_18_numericKeys() {
    level_18_numericKeys.supper.constructor.call(this, level_18_numericKeys.ITEMS);
};

js.extend(level_18_numericKeys, tutorial_part2);

level_18_numericKeys.ITEMS = [
    new keyProxy({ buttonIndex: 1, shift: false }),
    new keyProxy({ buttonIndex: 2, shift: false }),
    new keyProxy({ buttonIndex: 3, shift: false }),
    new keyProxy({ buttonIndex: 4, shift: false }),
    new keyProxy({ buttonIndex: 5, shift: false }),
    new keyProxy({ buttonIndex: 6, shift: false }),
    new keyProxy({ buttonIndex: 7, shift: false }),
    new keyProxy({ buttonIndex: 8, shift: false }),
    new keyProxy({ buttonIndex: 9, shift: false }),
    new keyProxy({ buttonIndex: 10, shift: false }),
    new keyProxy({ buttonIndex: 11, shift: false }),
    new keyProxy({ buttonIndex: 12, shift: false }),
    new keyProxy({ buttonIndex: 25, shift: false }),
    new keyProxy({ buttonIndex: 26, shift: false }),
    new keyProxy({ buttonIndex: 37, shift: false }),
    new keyProxy({ buttonIndex: 38, shift: false }),
    new keyProxy({ buttonIndex: 48, shift: false }),
    new keyProxy({ buttonIndex: 49, shift: false }),
    new keyProxy({ buttonIndex: 50, shift: false })
];

level_18_numericKeys.prototype.getText = function() {
    return $localizator.NumericKeys;
};


//next
function level_19_numericKeys_part2() {
    level_19_numericKeys_part2.supper.constructor.call(this, level_18_numericKeys.ITEMS);
};

js.extend(level_19_numericKeys_part2, tutorial_part2);

level_19_numericKeys_part2.prototype._addBug = function() {
    this._addBug2();
};

level_19_numericKeys_part2.prototype.getText = function() {
    return $localizator.NumericKeysPart2;
};

/*shift symbols symbols*/
function level_20_shiftKeys() {
    level_20_shiftKeys.supper.constructor.call(this, level_20_shiftKeys.ITEMS);
};

js.extend(level_20_shiftKeys, tutorial_part2);

level_20_shiftKeys.ITEMS = [
    new keyProxy({ buttonIndex: 1, shift: true }),
    new keyProxy({ buttonIndex: 2, shift: true }),
    new keyProxy({ buttonIndex: 3, shift: true }),
    new keyProxy({ buttonIndex: 4, shift: true }),
    new keyProxy({ buttonIndex: 5, shift: true }),
    new keyProxy({ buttonIndex: 6, shift: true }),
    new keyProxy({ buttonIndex: 7, shift: true }),
    new keyProxy({ buttonIndex: 8, shift: true }),
    new keyProxy({ buttonIndex: 9, shift: true }),
    new keyProxy({ buttonIndex: 10, shift: true }),
    new keyProxy({ buttonIndex: 11, shift: true }),
    new keyProxy({ buttonIndex: 12, shift: true }),
    new keyProxy({ buttonIndex: 25, shift: true }), //ua
    new keyProxy({ buttonIndex: 26, shift: true }), //ua
    new keyProxy({ buttonIndex: 37, shift: true }), //ua
    new keyProxy({ buttonIndex: 38, shift: true }), //ua
    new keyProxy({ buttonIndex: 48, shift: true }), //ua
    new keyProxy({ buttonIndex: 49, shift: true }), //ua
    new keyProxy({ buttonIndex: 50, shift: true })
];
level_20_shiftKeys.prototype.getText = function() {
    return $localizator.ShiftKeys;
};

//next
function level_21_shiftKeys_part2() {
    level_21_shiftKeys_part2.supper.constructor.call(this, level_20_shiftKeys.ITEMS);
};

js.extend(level_21_shiftKeys_part2, tutorial_part2);

level_21_shiftKeys_part2.prototype._addBug = function() {
    this._addBug2();
};

level_21_shiftKeys_part2.prototype.getText = function() {
    return $localizator.ShiftKeysPart2;
};

/*exam 2*/
function level_22_advancedKeysSummary() {
    level_22_advancedKeysSummary.supper.constructor.call(this, level_22_advancedKeysSummary.ITEMS);
};

js.extend(level_22_advancedKeysSummary, tutorial_part2);

level_22_advancedKeysSummary.ITEMS = [];
level_22_advancedKeysSummary.ITEMS = level_22_advancedKeysSummary.ITEMS.concat(level_18_numericKeys.ITEMS);
level_22_advancedKeysSummary.ITEMS = level_22_advancedKeysSummary.ITEMS.concat(level_20_shiftKeys.ITEMS);

level_22_advancedKeysSummary.prototype.getText = function() {
    return $localizator.SpecialKeysSummary;
};

level_22_advancedKeysSummary.prototype.showScreen = function() {
    level_22_advancedKeysSummary.supper.showScreen.call(this);


    $keyManager.clearAllKeysText();
    $keyManager.render({});
};

//next
function level_23_advancedKeysSummary_part2() {
    level_23_advancedKeysSummary_part2.supper.constructor.call(this, level_22_advancedKeysSummary.ITEMS);
};

js.extend(level_23_advancedKeysSummary_part2, tutorial_part2);

level_23_advancedKeysSummary_part2.prototype._addBug = function() {
    this._addBug2();
};

level_23_advancedKeysSummary_part2.prototype.getText = function() {
    return $localizator.SpecialKeysSummaryPart2;
};

/*exam 3*/
function level_24_allKeysSummary() {
    level_22_advancedKeysSummary.supper.constructor.call(this, level_24_allKeysSummary.ITEMS);
};

js.extend(level_24_allKeysSummary, tutorial_part2);

level_24_allKeysSummary.ITEMS = [];
level_24_allKeysSummary.ITEMS = level_24_allKeysSummary.ITEMS.concat(level_12_basicKeys.ITEMS);
level_24_allKeysSummary.ITEMS = level_24_allKeysSummary.ITEMS.concat(level_14_advancedKeys.ITEMS);
level_24_allKeysSummary.ITEMS = level_24_allKeysSummary.ITEMS.concat(level_18_numericKeys.ITEMS);
level_24_allKeysSummary.ITEMS = level_24_allKeysSummary.ITEMS.concat(level_20_shiftKeys.ITEMS);

level_24_allKeysSummary.prototype.getText = function() {
    return $localizator.AllKeysSummary;
};

level_24_allKeysSummary.prototype.showScreen = function() {
    level_24_allKeysSummary.supper.showScreen.call(this);


    $keyManager.clearAllKeysText();
    $keyManager.render({});
};

/*exam 4*/
function level_25_advanced() {
    level_25_advanced.supper.constructor.call(this, level_24_allKeysSummary.ITEMS);
};

js.extend(level_25_advanced, tutorial_part2);

level_25_advanced.prototype.getText = function() {
    return $localizator.Advanced;
};

level_25_advanced.prototype._addBug = function() {
    this._addBug2();
};

/*exam 4*/
function level_26_dontTakeMistake() {
    this._activeBtns = [];
    this._bugs = [];

    var res = [];
    res.push(new keyProxy({ buttonIndex: 1, shift: false }));
    res.push(new keyProxy({ buttonIndex: 2, shift: false }));
    level_26_dontTakeMistake.supper.constructor.call(this, level_24_allKeysSummary.ITEMS);
};

js.extend(level_26_dontTakeMistake, tutorial_part2);

level_26_dontTakeMistake.prototype.getText = function() {
    return $localizator.DontTakeMistake;
};

level_26_dontTakeMistake.prototype.keyDown = function(activeButton, ev) {


    if (!activeButton.isShiftButton() && !activeButton.isCapsLockButton()) {
        if (this._hasObj(activeButton)) {
            $audioManager.playSuccess();
            this._removeBug(activeButton);
            this.nextSymb();
        } else {
            $audioManager.playFailed();

            function run() {
                if (this._bugs.length < 3) {
                    this._index++;
                    var activeObj = this.getActiveObj();
                    if (activeObj) {
                        activeObj._startDate = (new Date());
                        this._addBug(true);
                    } else {
                        this.hideScreen();
                        this._endPart2();
                    }
                }
            }

            window.setTimeout(js.bind(run, this), 1000);
        }
    }

};

level_26_dontTakeMistake.prototype.nextSymb = function() {

    function run() {
        if (this._bugs.length == 0) {
            this._index++;
            var activeObj = this.getActiveObj();
            if (activeObj) {
                activeObj._startDate = (new Date());
                this._addBug();
            } else {
                this.hideScreen();
                this._endPart2();
            }
        }
    }

    window.setTimeout(js.bind(run, this), 1000);
};

level_26_dontTakeMistake.prototype._hasObj = function(activeButton) {
    var res = false;
    js.assert($keyManager.evProxy);
    for (var i = 0, len = this._activeBtns.length; i < len; ++i) {
        var obj = this._activeBtns[i];
        if (obj && (obj.getIndex() == activeButton._buttonIndex && obj.getShift() == $keyManager.evProxy.shiftKey)) {
            res = true;
            break;
        }
    }
    return res;
};

level_26_dontTakeMistake.prototype._addBug = function(isExtraBlink) {
    if (this._bugs.length == 0 || isExtraBlink) {
        var self = this;
        var button = $keyManager.getByIndex(this.getActiveObj().getIndex());

        var newBug = new bug2(button);
        newBug.setAnimationSpeed(150);
        console.log("btnIdx = " + this.getActiveObj().getIndex());
        newBug.showBug3(this.getActiveObj().getShift() ? button.getShiftSymbol() : button.getSymbol(), function(bug) {
            bug.getButton().hideKey();
            self._removeBug(bug.getButton());
            self.nextSymb();
        });

        var activeObj = this.getActiveObj();
        this._activeBtns.push(activeObj);
        this._bugs.push(newBug);
    }
};

level_26_dontTakeMistake.prototype._removeBug = function(activeButton) {
    var bug = js.utils.single(this._bugs, function(el) {
        return el.getButtonIndex() == activeButton.getIndex();
    });
    if (bug) {
        bug.hideBug();
        js.utils.remove(this._bugs, bug);
    }
    js.utils.remove(this._activeBtns, function(el) {
        return el.getIndex() == activeButton.getIndex();
    });
};


/*exam 5*/
function level_27_expert() {
    level_27_expert.supper.constructor.call(this, level_24_allKeysSummary.ITEMS);
};

js.extend(level_27_expert, tutorial_part2);

level_27_expert.prototype.getText = function() {
    return $localizator.Expert;
};

level_27_expert.prototype.showScreen = function() {
    level_24_allKeysSummary.supper.showScreen.call(this);


    $keyManager.clearAllKeysText();
    $keyManager.render({});

    $progressBar.showProgress();
};

level_27_expert.prototype._addBug = function() {
    var button = $keyManager.getByIndex(this.getActiveObj().getIndex());
    if (this._bug) {
        this._removeBug();
    }

    this._bug = new bug2(button);
    this._bug.setAnimationSpeed(100);
    console.log("btnIdx = " + this.getActiveObj().getIndex());
    this._bug.showBug3(this.getActiveObj().getShift() ? button.getShiftSymbol() : button.getSymbol(), function(bug) {
        bug.getButton().hideKey();
    });

    var activeObj = this.getActiveObj();
    //$progressBar.startProgress(this);
};

level_27_expert.prototype._removeBug = function() {
    level_27_expert.supper._removeBug.call(this);
    $progressBar.stopProgress(this);
};

/*exam 3*/
function lastScreen() {
    lastScreen.supper.constructor.call(this);
};

js.extend(lastScreen, screenBase);

lastScreen.prototype.getText = function() {
    return $localizator.EndGame;
};

lastScreen.prototype.showScreen = function() {
    lastScreen.supper.showScreen.call(this);
};