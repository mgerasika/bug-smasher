function dataManager(uniqueId) {
    var _data = {
        level: 0
    };
    
    this.getLevel = function(){
        return _data.level;
    };

    this.setLevel = function(val){
        _data.level = val;
    };

    this.load = function() {
        var str = localStorage.getItem(uniqueId);
        if (str) {
            var obj = JSON.parse(str);
            if (obj) {
                _data = obj;
            }
        }
    };

    this.save = function() {
        var str = JSON.stringify(_data);
        localStorage.setItem(uniqueId,str);
    };

};