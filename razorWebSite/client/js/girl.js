function createGirl() {
    var tbl = document.createElement("table");
    js.addClass(tbl, "tblGirl");
    tbl.cellpadding = 0;
    tbl.cellspacing = 0;
    for (var y = 0; y < 10; ++y) {
        var tr = tbl.insertRow(y);
        for (var x = 0; x < 10; ++x) {
            var td = tr.insertCell(x);
            js.addClass(td, "tdGirlItem tdGirlItemSlc");
        }
    }
    document.getElementById("result").appendChild(tbl);
    var girlNumber = parseInt((Math.random() * 10000) % 6, 10);
    var url = "url('images/girls/" + girlNumber + ".jpg')";
    tbl.style.backgroundImage = url;
}

function showGirl(n) {

    
    var tbl = js.getFirstChild(document.getElementById("result"));
    for (var i = 0; i < n; ++i) {
        if (n == 100) {
            c = i;
        }
        else {
            var c = parseInt((Math.random() * 1000) % 100, 10);
        }

        var y = parseInt(c / 10, 10);
        var x = c % 10;

        console.log("c = " + c + " y = " + y + " x = " + x);


        var row = tbl.rows[y];
        var cell = row.cells[x];
        if (js.hasClass(cell, "tdGirlItemSlc")) {
            js.removeClass(cell, "tdGirlItemSlc");
        }
        else {
            i--;
        }
    }
};