/**
 * Created by Pavel on 14.07.2016.
 */




$(function () {

    $('.new').click(function () {


        var size={
            x: 16,
            y: 8
        };

        var material;
        var blocks = [];
         for (var y = -size.y; y <= size.y; y++) {
         for (var x = -size.x; x <= size.x; x++) {


         if(
             (x==size.x || y==size.y || x==-size.x || y==-size.y)
             && !(y==size.y && x==0 )
         ){
             material='wall';
         }else{
             material='';
         }

         blocks.push({
             position:{x:x,y:y},
             type: 'block',
             material: material
         });
         }
         }

        objects = blocks;
        createMap();

        $('.save').trigger('click');


    });




});