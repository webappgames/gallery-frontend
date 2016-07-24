/**
 * Created by hejny on 17.7.16.
 */



function getPositionFromLeftTop(left,top){


    var offset = $(this).offset();

    var x = (left-window_center.x)/FIELD_SIZE;
    var y = (top-window_center.y)/FIELD_SIZE;

    return({x:x,y:y});

}