/**
 * Created by Pavel on 14.07.2016.
 */




$(function () {

    $('.new').click(function () {



        var blocks = [];
         for (var y = -8; y < 8; y++) {
         for (var x = -8; x < 8; x++) {
         blocks.push({
             position:{x:x,y:y},
             material: ''
         });
         }
         }

        createMap(blocks);

        $('.save').trigger('click');


    });




});