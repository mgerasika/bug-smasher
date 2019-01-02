function writeCopyright() {
    document.write("COPYRIGHT " + (new Date()).getFullYear());
}

function isDebug() {
    var res = -1 == document.location.href.indexOf("194");
    return res;
}