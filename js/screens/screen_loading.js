/*
 screen_loading
 */
function screen_loading() {
    screen_loading.supper.constructor.call(this);
};

js.extend(screen_loading, screenBase);

screen_loading.prototype.getText = function () {
    return "Loading...";
};

screen_loading.prototype.showScreen = function () {
    screen_loading.supper.showScreen.call(this);

    js.addClass(this._keyboard, "displayNone");
    this._el.innerHTML = "";

    var div = document.createElement("div");
    div.innerHTML = "Wait a seccond to load...";
    this._el.appendChild(div);

    var loadingHnd = js.bind(function () {
        var menuScreen = $screenManager.getMainMenuScreen();
        this.hideScreen();
        menuScreen.showScreen();

    }, this);
    window.setTimeout(loadingHnd, 1000);

};

screen_loading.prototype.btnClick = function () {
    var endScreen = $screenManager.getEndTutorialScreen();
    var okHandler = js.bind(function () {
        this.hideScreen();
        this.showScreen();
    }, this);
    var cancelHandler = js.bind(function () {
        var menuScren = $screenManager.getMainMenuScreen();
        this.hideScreen();
        menuScren.showScreen();
    }, this);
    this.hideScreen();
    endScreen.showScreen(okHandler, cancelHandler);
};

screen_loading.prototype.hideScreen = function () {
    screen_loading.supper.hideScreen.call(this);
};
