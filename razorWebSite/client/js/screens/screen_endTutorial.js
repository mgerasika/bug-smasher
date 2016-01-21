/*
 screen_endTutorial
 */
function screen_endTutorial() {
    screen_endTutorial.supper.constructor.call(this);


};

js.extend(screen_endTutorial, screenBase);

screen_endTutorial.prototype.showScreen = function () {
    screen_endTutorial.supper.showScreen.call(this);

    var idx = $screenManager.getActiveScreenIdx();
    var txt = $screenManager.getScreen(idx + 1).getText();
    $fingers.hideHands();
    showDialog(txt);
    window.setTimeout(function () {
        hideDialog();
        $screenManager.getActiveScreen().hideScreen();
        $screenManager.nextScreen().showScreen();

    }, 2000);

};

screen_endTutorial.prototype.hideScreen = function () {
    screen_endTutorial.supper.hideScreen.call(this);
};

screen_endTutorial.prototype.getText = function () {
    return "End tutorial";
};