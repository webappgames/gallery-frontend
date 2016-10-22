/// <reference path="reference.ts" />



var VIEWER_SCRIPT, VIEWER_STYLE;


/*
r('VIEWER_SCRIPT');
$.get('/viewer/script/viewer.js').done(function (response) {

    VIEWER_SCRIPT = response;
    r('VIEWER_SCRIPT',VIEWER_SCRIPT);


});*/



var request_script = new XMLHttpRequest();
request_script.open('GET', '/viewer/script/viewer.js');
request_script.onreadystatechange = function () {


    VIEWER_SCRIPT = request_script.responseText;


};
request_script.send();







var request_style = new XMLHttpRequest();
request_style.open('GET', '/viewer/style/viewer.css');
request_style.onreadystatechange = function () {


    VIEWER_STYLE = request_style.responseText;


};
request_style.send();