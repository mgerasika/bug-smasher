function screenManager() {
    var _idx = 0;

    var arr = [];

    arr.push(new screen_mainMenu());
    arr.push(new level_1_basicPosition());
    arr.push(new level_2_left_litleFinger());

    arr.push(new level_3_left_ringFinger());
    arr.push(new level_4_left_middleFinger());
    arr.push(new level_5_left_indexFinger());
    arr.push(new level_6_right_indexFinger());
    arr.push(new level_7_right_middleFinger());
    arr.push(new level_8_right_ringFinger());
    arr.push(new level_9_right_litleFinger());
    arr.push(new level_10_right_shiftKeys());
    arr.push(new level_11_left_shiftKeys());

    arr.push(new level_12_basicKeys());
    arr.push(new level_13_basicKeys_part2());
    arr.push(new level_14_advancedKeys());
    arr.push(new level_15_advancedKeys_part2());
    arr.push(new level_16_basicKeysSummary());
    arr.push(new level_17_basicKeysSummary_part2());
    arr.push(new level_18_numericKeys());
    arr.push(new level_19_numericKeys_part2());
    arr.push(new level_20_shiftKeys());
    arr.push(new level_21_shiftKeys_part2());
    arr.push(new level_22_advancedKeysSummary());
    arr.push(new level_23_advancedKeysSummary_part2());
    arr.push(new level_24_allKeysSummary());

    arr.push(new level_25_advanced());
    arr.push(new level_26_dontTakeMistake());
    arr.push(new level_27_expert());


    arr.push(new lastScreen());

    this.getScreen = function (idx) {
        return arr[idx];
    };

    this.getScreens = function () {
        return arr;
    };

    this.setActiveScreen = function (idx) {
        _idx = idx;
        return arr[idx];
    };

    this.getActiveScreen = function () {
        return arr[_idx];
    };

    this.getActiveScreenIdx = function () {
        return _idx;
    };

    this.nextScreen = function () {
        var activeScreen = this.getActiveScreen();
        if (activeScreen && activeScreen.isShown()) {
            activeScreen.hideScreen();
        }
        return arr[++_idx];
    };

    this.getEndTutorialScreen = function () {
        if (!this._endTutorialScreen) {
            this._endTutorialScreen = new screen_endTutorial();
        }
        return this._endTutorialScreen;
    };

    this.getMainMenuScreen = function () {
        _idx = 0;
        return arr[_idx];
    };
};