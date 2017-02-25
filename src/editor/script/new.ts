/// <reference path="reference.ts" />







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