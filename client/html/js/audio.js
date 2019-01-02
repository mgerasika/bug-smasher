function audioManager(){
    var audio1 = document.getElementById("sound1");
    var audio2 = document.getElementById("sound2");
    var audio3 = document.getElementById("sound3");
    var _audioCache = [];
    
    this.playSuccess = function() {
        this.playWav(audio1);
    };

    this.playBlink = function() {
        this.playWav(audio3);
    };

    this.stopBlink = function() {
        this.stopWav(audio3);
    };

    this.playFailed = function() {
        this.playWav(audio2);
    };

    this.playWav = function(audio) {
        /*
        var arr = _audioCache[audio.src];
        if (!arr) {
        _audioCache[audio.src] = arr = [];
        }
        var audioCache = undefined;
        for (var i = 0, len = arr.length; i < len; ++i) {
        if (arr[i].currentTime == arr[i].duration) {
        arr[i].currentTime = 0;
        audioCache = arr[i];
        break;
        }
        js.assert(i < 10);
        }
        if (null == audioCache) {
        audioCache = document.createElement("audio");
        audioCache.src = audio.src;
        document.body.appendChild(audioCache);
        arr[arr.length] = audioCache;
        }
        audioCache.play();
        */
        
        //audio.pause();
        //audio.currentTime = 0;
        //audio.play();

    };

    this.stopWav = function(audio) {
        //audio.pause();
        //audio.currentTime = 0;
    };
}