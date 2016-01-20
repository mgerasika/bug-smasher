/*
 tutorial_part1
 */
function tutorial_part1(arr) {
    tutorial_part1.supper.constructor.call(this);
    this._index = 0;
    this._bug;
    this._items = this.init(arr);
};

js.extend(tutorial_part1, screenBase);

tutorial_part1.prototype.getText = function () {
    return "";
};

tutorial_part1.prototype.showScreen = function () {
    tutorial_part1.supper.showScreen.call(this);
    $keyManager.clearAllKeysText();
    $keyManager.showAllKeys();
    $keyManager.render({});
    $fingers.showHands();
    this._endPartHandler = this._endPart1;
    this.updateFinger(this.getActiveObj());
    window.setTimeout(js.bind(this._addBug, this), 10);
    //window.setTimeout(js.bind(this._endPart2, this), 1000);
};

tutorial_part1.prototype.getActiveObj = function () {
    return this._index;
};

tutorial_part1.prototype.getActiveObj = function () {
    return this._items[this._index];
};

tutorial_part1.prototype.hideScreen = function () {
    tutorial_part1.supper.hideScreen.call(this);
    this._index = 0;
    $fingers.hideHands();
    $fingers.hideFingers();
    //this.symbolDiv.parentNode.removeChild(this.symbolDiv);
    this.symbolDiv = undefined;
};
tutorial_part1.prototype._addBug = function () {
    var button = $keyManager.getByIndex(this.getActiveObj().getIndex());
    if (this._bug) {
        this._removeBug();
    }
	button.addRotateState();
    this._bug = new bug2(button);
    this._bug.setAnimationSpeed(100);
    if (tutorial_part1.prototype._endPart1 == this._endPartHandler) {
        this._bug.showBug();
    }
    else if (tutorial_part1.prototype._endPart2 == this._endPartHandler) {
        this._bug.showBug3(this.getActiveObj().getShift() ? button.getShiftSymbol() : button.getSymbol(), function (bug) {
            bug.getButton().hideKey();
        });
    }
};

tutorial_part1.prototype._removeBug = function () {
    var button = $keyManager.getByIndex(this.getActiveObj().getIndex());
	button.removeRotateState();
    if (this._bug) {
        this._bug.hideBug(button);
        this._bug = undefined;
    }
};

tutorial_part1.prototype.keyDown = function (activeButton, ev) {
    tutorial_part1.supper.keyDown.call(this, activeButton, ev);
    if (!activeButton.isShiftButton() && !activeButton.isCapsLockButton()) {
        var activeObj = this.getActiveObj();
        if (activeObj && (activeObj.getIndex() == activeButton.getIndex() && activeObj.getShift() == ev.shiftKey)) {
            //activeButton.addSuccessState();
            $audioManager.playSuccess();

            var button = $keyManager.getByIndex(activeObj.getIndex());
            this._removeBug();
            function run() {
                this._index++;
                activeObj = this.getActiveObj();
                if (activeObj) {
                    this.updateFinger(activeObj);
                    this._addBug();
                } else {
                    if (this._endPartHandler) {
                        this._endPartHandler();
                    }
                }
            }

            window.setTimeout(js.bind(run, this), 1000);
        } else {
            $audioManager.playFailed();
        }
    }
};

tutorial_part1.prototype._endPart1 = function () {
    this._endPartHandler = this._endPart2;

    this._index = 0;
    this.updateFinger(this.getActiveObj());
    this._addBug();

    this._endPartHandler = this._endPart2;
    for (var i = 0, len = this._items.length; i < len; ++i) {
        var button = $keyManager.getByIndex(this._items[i].getIndex());
        button.setShowText(true);
    }
    $keyManager.render({});
};

tutorial_part1.prototype._endPart2 = function () {
    var self = this;
    var success = !$keyManager.hasHiddenKeys();
    $fingers.hideHands();
    if (success) {
        showDialog("LEVEL SUCCESS");
        function a() {
            hideDialog();

            var idx = $screenManager.getActiveScreenIdx();
            var endScreen = $screenManager.getEndTutorialScreen();
            endScreen.showScreen();
            $dataManager.setLevel(idx + 1);
            $dataManager.save();
        }

        window.setTimeout(a, 2000);
    }
    else {
        showDialog("LEVEL FAILED");

        function a() {
            hideDialog();

            self._index = 0;
            self.showScreen();
        }

        window.setTimeout(a, 2000);

    }
};

tutorial_part1.prototype.keyUp = function (activeButton, ev) {
    tutorial_part1.supper.keyUp.call(this, activeButton, ev);
    window.setTimeout(function () {
    }, 100);
};

function level_1_basicPosition() {
    level_1_basicPosition.supper.constructor.call(this, level_1_basicPosition.ITEMS);
};

js.extend(level_1_basicPosition, tutorial_part1);

level_1_basicPosition.ITEMS = [
    new keyProxy({ buttonIndex: 28, shift: false }),
    new keyProxy({ buttonIndex: 29, shift: false }),
    new keyProxy({ buttonIndex: 30, shift: false }),
    new keyProxy({ buttonIndex: 31, shift: false }),
    new keyProxy({ buttonIndex: 34, shift: false }),
    new keyProxy({ buttonIndex: 35, shift: false }),
    new keyProxy({ buttonIndex: 36, shift: false }),
    new keyProxy({ buttonIndex: 37, shift: false })
];

level_1_basicPosition.prototype.getText = function () {
    return $localizator.Basic_Position;
};

level_1_basicPosition.prototype.updateFinger = function (button) {
    level_1_basicPosition.supper.updateFinger.call(this, button);

    if (button.getIndex() == 28) {
        $fingers.hideFingers();
        $fingers.showLeftFinger(FINGER.Little);
    }
    else if (button.getIndex() == 29) {
        $fingers.hideFingers();
        $fingers.showLeftFinger(FINGER.Ring);
    }
    else if (button.getIndex() == 30) {
        $fingers.hideFingers();
        $fingers.showLeftFinger(FINGER.Middle);
    }
    else if (button.getIndex() == 31) {
        $fingers.hideFingers();
        $fingers.showLeftFinger(FINGER.Index);
    }
    else if (button.getIndex() == 34) {
        $fingers.hideFingers();
        $fingers.showRightFinger(FINGER.Index);
    }
    else if (button.getIndex() == 35) {
        $fingers.hideFingers();
        $fingers.showRightFinger(FINGER.Middle);
    }
    else if (button.getIndex() == 36) {
        $fingers.hideFingers();
        $fingers.showRightFinger(FINGER.Ring);
    }
    else if (button.getIndex() == 37) {
        $fingers.hideFingers();
        $fingers.showRightFinger(FINGER.Little);
    }
    else {
        $fingers.hideFingers();
    }
};


/*
 tutorial_2_left_littleFinger
 */
function level_2_left_litleFinger() {
    level_2_left_litleFinger.supper.constructor.call(this,
        level_2_left_litleFinger.ITEMS);
};

js.extend(level_2_left_litleFinger, tutorial_part1);

level_2_left_litleFinger.ITEMS = [
    new keyProxy({ buttonIndex: 1, shift: false }),
    new keyProxy({ buttonIndex: 15, shift: false }),
    new keyProxy({ buttonIndex: 28, shift: false }),
    new keyProxy({ buttonIndex: 41, shift: false })
];

level_2_left_litleFinger.prototype.getText = function () {
return $localizator.LeftLittleFinger;
};

level_2_left_litleFinger.prototype.updateFinger = function (button) {
    level_2_left_litleFinger.supper.updateFinger.call(this, button);

    $fingers.hideFingers();
    $fingers.showLeftFinger(FINGER.Little);
};

/*
 level_3_left_ringFinger
 */
function level_3_left_ringFinger() {
    level_3_left_ringFinger.supper.constructor.call(this, level_3_left_ringFinger.ITEMS);
};

js.extend(level_3_left_ringFinger, tutorial_part1);

level_3_left_ringFinger.ITEMS = [
    new keyProxy({buttonIndex: 2, shift: false}),
    new keyProxy({buttonIndex: 16, shift: false}),
    new keyProxy({buttonIndex: 29, shift: false}),
    new keyProxy({buttonIndex: 42, shift: false})
];
level_3_left_ringFinger.prototype.getText = function () {
    return $localizator.LeftRingFinger;
};

level_3_left_ringFinger.prototype.updateFinger = function (button) {
    level_3_left_ringFinger.supper.updateFinger.call(this, button);

    $fingers.hideFingers();
    $fingers.showLeftFinger(FINGER.Ring);
};

/*
 tutorial_4
 */
function level_4_left_middleFinger() {
    level_4_left_middleFinger.supper.constructor.call(this, level_4_left_middleFinger.ITEMS);
};

js.extend(level_4_left_middleFinger, tutorial_part1);

level_4_left_middleFinger.ITEMS = [
    new keyProxy({buttonIndex: 3, shift: false}),
    new keyProxy({buttonIndex: 17, shift: false}),
    new keyProxy({buttonIndex: 30, shift: false}),
    new keyProxy({buttonIndex: 43, shift: false})
];
level_4_left_middleFinger.prototype.getText = function () {
    return $localizator.LeftMiddleFinger;
};

level_4_left_middleFinger.prototype.updateFinger = function (button) {
    level_4_left_middleFinger.supper.updateFinger.call(this, button);

    $fingers.hideFingers();
    $fingers.showLeftFinger(FINGER.Middle);
};

/*
 tutorial_5
 */
function level_5_left_indexFinger() {
    level_5_left_indexFinger.supper.constructor.call(this, level_5_left_indexFinger.ITEMS);
};

js.extend(level_5_left_indexFinger, tutorial_part1);

level_5_left_indexFinger.ITEMS = [
    new keyProxy({buttonIndex: 4, shift: false}),
    new keyProxy({buttonIndex: 5, shift: false}),
    new keyProxy({buttonIndex: 18, shift: false}),
    new keyProxy({buttonIndex: 19, shift: false}),
    new keyProxy({buttonIndex: 31, shift: false}),
    new keyProxy({buttonIndex: 32, shift: false}),
    new keyProxy({buttonIndex: 44, shift: false}),
    new keyProxy({buttonIndex: 45, shift: false})
];

level_5_left_indexFinger.prototype.getText = function () {
    return $localizator.LeftIndexFinger;
};

level_5_left_indexFinger.prototype.updateFinger = function (button) {
    level_5_left_indexFinger.supper.updateFinger.call(this, button);

    $fingers.hideFingers();
    $fingers.showLeftFinger(FINGER.Index);
};

/*
 tutorial_6
 */
function level_6_right_indexFinger() {
    level_6_right_indexFinger.supper.constructor.call(this,
        level_6_right_indexFinger.ITEMS
    );
};

js.extend(level_6_right_indexFinger, tutorial_part1);

level_6_right_indexFinger.ITEMS = [
    new keyProxy({buttonIndex: 6, shift: false}),
    new keyProxy({buttonIndex: 7, shift: false}),
    new keyProxy({buttonIndex: 20, shift: false}),
    new keyProxy({buttonIndex: 21, shift: false}),
    new keyProxy({buttonIndex: 33, shift: false}),
    new keyProxy({buttonIndex: 34, shift: false}),
    new keyProxy({buttonIndex: 46, shift: false}),
    new keyProxy({buttonIndex: 47, shift: false})
];

level_6_right_indexFinger.prototype.getText = function () {
    return $localizator.RightIndexFinger;
};

level_6_right_indexFinger.prototype.updateFinger = function (button) {
    level_6_right_indexFinger.supper.updateFinger.call(this, button);

    $fingers.hideFingers();
    $fingers.showRightFinger(FINGER.Index);
};

/*
 tutorial_7
 */
function level_7_right_middleFinger() {
    level_7_right_middleFinger.supper.constructor.call(this, level_7_right_middleFinger.ITEMS
    );
};

js.extend(level_7_right_middleFinger, tutorial_part1);

level_7_right_middleFinger.ITEMS = [
    new keyProxy({buttonIndex: 8, shift: false}),
    new keyProxy({buttonIndex: 22, shift: false}),
    new keyProxy({buttonIndex: 35, shift: false}),
    new keyProxy({buttonIndex: 48, shift: false})
];
level_7_right_middleFinger.prototype.getText = function () {
    return $localizator.RightMiddleFinger;
};

level_7_right_middleFinger.prototype.updateFinger = function (button) {
    level_7_right_middleFinger.supper.updateFinger.call(this, button);

    $fingers.hideFingers();
    $fingers.showRightFinger(FINGER.Middle);
};

/*
 tutorial_8
 */
function level_8_right_ringFinger() {
    level_8_right_ringFinger.supper.constructor.call(this, level_8_right_ringFinger.ITEMS
    );
};

js.extend(level_8_right_ringFinger, tutorial_part1);

level_8_right_ringFinger.ITEMS = [
    new keyProxy({buttonIndex: 9, shift: false}),
    new keyProxy({buttonIndex: 23, shift: false}),
    new keyProxy({buttonIndex: 36, shift: false}),
    new keyProxy({buttonIndex: 49, shift: false})
];
level_8_right_ringFinger.prototype.getText = function () {
    return $localizator.RightRingFinger;
};

level_8_right_ringFinger.prototype.updateFinger = function (button) {
    level_8_right_ringFinger.supper.updateFinger.call(this, button);

    $fingers.hideFingers();
    $fingers.showRightFinger(FINGER.Ring);
};

/*
 * tutorial_9
 * */
function level_9_right_litleFinger() {
    level_9_right_litleFinger.supper.constructor.call(this, level_9_right_litleFinger.ITEMS
    );
};

js.extend(level_9_right_litleFinger, tutorial_part1);

level_9_right_litleFinger.ITEMS = [
    new keyProxy({buttonIndex: 10, shift: false}),
    new keyProxy({buttonIndex: 24, shift: false}),
    new keyProxy({buttonIndex: 37, shift: false}),
    new keyProxy({buttonIndex: 50, shift: false}),
    new keyProxy({buttonIndex: 11, shift: false}),
    new keyProxy({buttonIndex: 12, shift: false}),
    new keyProxy({buttonIndex: 25, shift: false}),
    new keyProxy({buttonIndex: 26, shift: false}),
    new keyProxy({ buttonIndex: 38, shift: false }),
    new keyProxy({buttonIndex: 50, shift: false})
];

level_9_right_litleFinger.prototype.getText = function () {
    return $localizator.RightLittleFinger;
};

level_9_right_litleFinger.prototype.updateFinger = function (button) {
    level_9_right_litleFinger.supper.updateFinger.call(this, button);

    $fingers.hideFingers();
    $fingers.showRightFinger(FINGER.Little);
};

/* right shift keys*/
/*
 * tutorial_10
 * */
function level_10_right_shiftKeys() {
    level_10_right_shiftKeys.supper.constructor.call(this, level_10_right_shiftKeys.ITEMS);
};
js.extend(level_10_right_shiftKeys, tutorial_part1);

level_10_right_shiftKeys.ITEMS = [
    new keyProxy({buttonIndex: 1, shift: true}),
    new keyProxy({buttonIndex: 2, shift: true}),
    new keyProxy({buttonIndex: 3, shift: true}),
    new keyProxy({buttonIndex: 4, shift: true}),
    new keyProxy({buttonIndex: 5, shift: true})
];

level_10_right_shiftKeys.prototype.getText = function () {
    return $localizator.RightShiftKeys;
};

level_10_right_shiftKeys.prototype._addBug = function() {
    level_10_right_shiftKeys.supper._addBug.call(this);

    if (this.getActiveObj().getShift()) {
        var shiftButton = $keyManager.getByIndex(51);
        //shiftButton.addBlinkState();
        this._shiftBug = new bug(shiftButton);
        this._shiftBug.showBug();

    }
};

level_10_right_shiftKeys.prototype._removeBug = function () {
    level_10_right_shiftKeys.supper._removeBug.call(this);

    if (this.getActiveObj().getShift()) {
        var shiftButton = $keyManager.getByIndex(51);
        this._shiftBug.hideBug(shiftButton);
    }
};


level_10_right_shiftKeys.prototype.hideScreen = function () {
    level_10_right_shiftKeys.supper.hideScreen.call(this);
    var shiftButton = $keyManager.getByIndex(51);
    shiftButton.removeBlinkState();
};

level_10_right_shiftKeys.prototype.updateFinger = function (button) {
    level_10_right_shiftKeys.supper.updateFinger.call(this, button);

    $fingers.hideFingers();

    if (button.getIndex() == 1) {
        $fingers.showLeftFinger(FINGER.Little);
        $fingers.showRightFinger(FINGER.Little);
    }
    else if (button.getIndex() == 2) {
        $fingers.showLeftFinger(FINGER.Ring);
        $fingers.showRightFinger(FINGER.Little);
    }
    else if (button.getIndex() == 3) {
        $fingers.showLeftFinger(FINGER.Middle);
        $fingers.showRightFinger(FINGER.Little);
    }
    else if (button.getIndex() == 4) {
        $fingers.showLeftFinger(FINGER.Index);
        $fingers.showRightFinger(FINGER.Little);
    }
    else if (button.getIndex() == 5) {
        $fingers.showLeftFinger(FINGER.Index);
        $fingers.showRightFinger(FINGER.Little);
    }
};

/*left shift keys*/
/*
 * tutorial_11
 * */
function level_11_left_shiftKeys() {
    level_11_left_shiftKeys.supper.constructor.call(this, level_11_left_shiftKeys.ITEMS);
};

js.extend(level_11_left_shiftKeys, tutorial_part1);

level_11_left_shiftKeys.ITEMS = [
    new keyProxy({buttonIndex: 6, shift: true}),
    new keyProxy({buttonIndex: 7, shift: true}),
    new keyProxy({buttonIndex: 8, shift: true}),
    new keyProxy({buttonIndex: 9, shift: true}),
    new keyProxy({buttonIndex: 10, shift: true})
];

level_11_left_shiftKeys.prototype.getText = function () {
    return $localizator.LeftShiftKeys;
};

level_11_left_shiftKeys.prototype._addBug = function() {
    level_11_left_shiftKeys.supper._addBug.call(this);

    if (this.getActiveObj().getShift()) {
        var shiftButton = $keyManager.getByIndex(40);
        //shiftButton.addBlinkState();
        this._shiftBug = new bug(shiftButton);
        this._shiftBug.showBug();
    }
};

level_11_left_shiftKeys.prototype._removeBug = function () {
    level_11_left_shiftKeys.supper._removeBug.call(this);

    if (this.getActiveObj().getShift()) {
        var shiftButton = $keyManager.getByIndex(40);
        this._shiftBug.hideBug(shiftButton);
    }
};

level_11_left_shiftKeys.prototype.hideScreen = function () {
    level_11_left_shiftKeys.supper.hideScreen.call(this);
    var shiftButton = $keyManager.getByIndex(40);
    shiftButton.removeBlinkState();
};

level_11_left_shiftKeys.prototype.updateFinger = function (button) {
    level_11_left_shiftKeys.supper.updateFinger.call(this, button);

    $fingers.hideFingers();

    if (button.getIndex() == 6) {
        $fingers.showRightFinger(FINGER.Index);
        $fingers.showLeftFinger(FINGER.Little);
    }
    else if (button.getIndex() == 7) {
        $fingers.showRightFinger(FINGER.Index);
        $fingers.showLeftFinger(FINGER.Little);
    }
    else if (button.getIndex() == 8) {
        $fingers.showRightFinger(FINGER.Middle);
        $fingers.showLeftFinger(FINGER.Little);
    }
    else if (button.getIndex() == 9) {
        $fingers.showRightFinger(FINGER.Ring);
        $fingers.showLeftFinger(FINGER.Little);
    }
    else if (button.getIndex() == 10) {
        $fingers.showRightFinger(FINGER.Little);
        $fingers.showLeftFinger(FINGER.Little);
    }
};