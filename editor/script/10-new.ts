/// <reference path="../../lib/jquery.d.ts" />



function createGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}




$(function () {

    $('.new').click(function () {


        var size={
            x: 16,
            y: 8
        };

        var shape;
        blocks = [];
         for (var y = -size.y; y <= size.y; y++) {
             for (var x = -size.x; x <= size.x; x++) {

                 if (y == size.y && x == 0) {
                     shape = 'door';
                 } else if (x == size.x || y == size.y || x == -size.x || y == -size.y) {
                     shape = 'wall';
                 } else {
                     shape = 'room';
                 }

                 blocks.push({
                     id: createGuid(),
                     type: 'block',
                     position: {x: x, y: y},
                     shape: shape
                 });
             }
         }


        objects = blocks;
        createMap();

        save();


    });




});