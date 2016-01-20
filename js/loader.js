var $loader = new function() {
    var _aJs = [];
    var _aCss = [];
    var _aCallbacks = [];
    var _head = document.getElementsByTagName("head")[0];

    this.loadJs = function(arr, callback) {
        for (var i = arr.length - 1; i >= 0; --i) {
            _aJs.push(arr[i]);
        }
        _aCallbacks[_aCallbacks.length] = callback;

        loadAndExecuteJs();
    };

    this.loadCss = function(arr, callback) {
        for (var i = arr.length - 1; i >= 0; --i) {
            _aCss.push(arr[i]);
        }

        loadAndExecuteCss();
    };

    this.onComplete = function(callback) {
        _aCallbacks[_aCallbacks.length] = callback;
    };

    function loadAndExecuteJs() {
        var url = _aJs.pop();
        if (url) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = url;
            script.onload = function() {
                loadAndExecuteJs();
            };
            _head.appendChild(script);
        }
        else if (_aCallbacks.length) {
            for (var i = 0, len = _aCallbacks.length; i < len; ++i) {
                _aCallbacks[i]();
            }
        }
    };

    function loadAndExecuteCss() {
        var url = _aCss.pop();
        if (url) {
            var link = document.createElement("link");
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = url;
            link.onload = function() {
                loadAndExecuteCss();
            };
            _head.appendChild(link);
        }
    };
};

function createUrl(controller, action) {
    return SERVER_URL + "/" + controller + ".mvc/" + action;
};