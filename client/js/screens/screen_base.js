/*
 screenBase
 */
function screenBase() {
    this._isShown;
    this._keyboard = document.getElementById("keyboardDiv");
};

screenBase.prototype.getText = function () {
    return "screenBase";
};

screenBase.prototype.init = function (arr) {
    js.assert(arr);
    var cloneArr = [];
    for (var i = 0; i < arr.length; ++i) {
        var obj1 = {
            buttonIndex: arr[i].getIndex(),
            shift: arr[i].getShift()
        };

        var obj2 = {
            buttonIndex: arr[i].getIndex(),
            shift: arr[i].getShift()
        };
        cloneArr.push(new keyProxy(obj1));
        //cloneArr.push(new keyProxy(obj2));
    }
    cloneArr = shuffle(cloneArr);
    return cloneArr;
};

screenBase.prototype.showScreen = function () {
    this._isShown = true;

    js.removeClass(this._keyboard, "displayNone");
    document.getElementById("txt").focus();
};

screenBase.prototype.hideScreen = function () {
    this._isShown = undefined;
};

screenBase.prototype.isShown = function () {
    return this._isShown;
};

screenBase.prototype.keyDown = function (activeButton, ev) {

};

screenBase.prototype.keyUp = function (activeButton, ev) {

};

screenBase.prototype.updateFinger = function (button) {
};

screenBase.prototype.getText = function () {
    return "screen screenBase";
};