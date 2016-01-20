var FINGER = {
    None : "none",
	Index: "index",
	Ring: "ring",
	Middle : "middle",
	Little : "little",
	All : "all"
};
function fingers() {
	var self = this;
	this._leftHand = document.createElement("div");
	js.addClass(this._leftHand,"hand leftHand none display-none");
	
	this._rightHand = document.createElement("div");
	js.addClass(this._rightHand,"hand rightHand none display-none");
	
    this._leftFingerName = undefined;
    this._rightFingerName = undefined;
    this._timeout;
    
    this.showLeftFinger = function(name) {
        this._leftFingerName = name;
        window.setTimeout(run, 1);
    };
    
    this.showRightFinger = function(name) {
        this._rightFingerName = name;
	    window.setTimeout(run, 1);
    };
    
    function run() {
	    if (!self._timeout) {
		    self.showAnimate();
	    }
    };

    this.hideFingers = function() {
        js.removeClass(this._leftHand, this._leftFingerName);
        js.removeClass(this._rightHand, this._rightFingerName);
        
        window.clearTimeout(this._timeout);
	    this._leftFingerName = undefined;
	    this._rightFingerName = undefined;
	    this._timeout = undefined;
    };

    this.showHands = function() {
	    this.showLeftHand();
	    this.showRightHand();
    };

    this.showLeftHand = function(){
        var cnt = document.getElementById("keyboardDiv");
        cnt.appendChild(this._leftHand);
        js.removeClass(this._leftHand,"display-none");
    };
    
     this.showRightHand = function(){
        var cnt = document.getElementById("keyboardDiv");
        cnt.appendChild(this._rightHand);
        js.removeClass(this._rightHand,"display-none");
    };
    
    this.hideHands = function(){
        js.addClass(this._leftHand,"display-none");
        js.addClass(this._rightHand,"display-none");
    };

    this.showAnimate = function(){
        if(this._leftFingerName || this._rightFingerName) {
	        if (this._leftFingerName) {
		        if (js.hasClass(this._leftHand, this._leftFingerName)) {
			        js.removeClass(this._leftHand, this._leftFingerName);
		        } else {
			        js.addClass(this._leftHand, this._leftFingerName);
		        }
	        }

	        if (this._rightFingerName) {
		        if ( js.hasClass(this._rightHand, this._rightFingerName)) {
			        js.removeClass(this._rightHand, this._rightFingerName);
		        } else {
			        js.addClass(this._rightHand, this._rightFingerName);
		        }
	        }

	        this._timeout = window.setTimeout(js.bind(this.showAnimate, this), 600);
        }
    };
};