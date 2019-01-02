/*
 screen_mainMenu
 */
function screen_mainMenu() {
    screen_mainMenu.supper.constructor.call(this);
};

js.extend(screen_mainMenu, screenBase);

screen_mainMenu.prototype.getText = function () {
    return "Main menu";
};

screen_mainMenu.prototype.showScreen = function (okHandler, cancelHandler) {
    screen_mainMenu.supper.showScreen.call(this);


    var level = $dataManager.getLevel();
    level = level ? level : 1;
    level = parseInt(level, 10);
    showDialog($screenManager.getScreen(level).getText());
    window.setTimeout(function () {
        $screenManager.getActiveScreen().hideScreen();
        $screenManager.setActiveScreen(level);
        $screenManager.getActiveScreen().showScreen();
        hideDialog();
    }, 2000);
};

screen_mainMenu.prototype.hideScreen = function () {
    screen_mainMenu.supper.hideScreen.call(this);
};

screen_mainMenu.prototype.btnClick = function (el, screen, idx) {
    this.hideScreen();
    screen.showScreen();
};


