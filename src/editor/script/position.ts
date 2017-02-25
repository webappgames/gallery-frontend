/// <reference path="reference.ts" />



function getPositionFromLeftTop(left,top){


    var offset = $(this).offset();

    var x = (left-window_center.x)/zoom_selected;
    var y = (top-window_center.y)/zoom_selected;

    return({x:x,y:y});

}