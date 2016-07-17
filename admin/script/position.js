/**
 * Created by hejny on 17.7.16.
 */



function getPositionFromLeftTop(left,top){

    var width = $(window).width();
    var height = $(window).height();
    var offset = $(this).offset();

    var x = (left-width/2)/FIELD_SIZE;
    var y = (top-height/2)/FIELD_SIZE;

    return({x:x,y:y});

}