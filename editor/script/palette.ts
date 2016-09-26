/// <reference path="reference.ts" />



var world_selected;

var WORLDS = ['main'];


function createWorldsPallete(){


    $('.select-worlds').find('ul').html('');
    let $ul = $('.select-worlds').find('ul');

    WORLDS.forEach(function (world) {
        let $li = $('<li></li>');
        $li.text(world);
        $li.attr('data-world', world);
        if(world==world_selected){
            $li.addClass('selected');
        }

        $ul.append($li);
    });


    $('.select-worlds').find('ul').find('li').click(function () {


        world_selected = $(this).attr('data-world');


        if(selected_object){
            r('Moving selected object to new world!');

            selected_object.world = world_selected;

            //window_center.x = 0;
            //window_center.y = 0;

        }

        saveAndRedraw();


    });


}



$(function () {

    createWorldsPallete();
    $('.select-worlds').find('ul').find('li').first().trigger('click');

});



//-------------------------------------------------------------



var storey_selected;

var STOREYS = [
    '1NP',
    '2NP',
    '3NP',
    '4NP',
    '5NP',
    '6NP'
];


$(function () {

    STOREYS.forEach(function (storey) {
        $('.select-storeys').find('ul').append($('<li></li>').text(storey).attr('data-storey',storey));
    });



    $('.select-storeys').find('ul').find('li').click(function () {

        //r(this);

        $('.select-storeys').find('ul').find('li').removeClass('selected');
        $(this).addClass('selected');

        storey_selected = $(this).attr('data-storey');


        if(selected_object){
            r('Moving selected object to new storey!');

            selected_object.storey = storey_selected;

        }

        saveAndRedraw();


    }).first().trigger('click');

});

//-------------------------------------------------------------


var zoom_selected;

var ZOOMS = [
    '5',
    '10',
    '20',
    '30',
    '50'
];


$(function () {

    ZOOMS.forEach(function (zoom) {
        $('.select-zooms').find('ul').append($('<li></li>').text(zoom).attr('data-zoom',zoom));
    });



    $('.select-zooms').find('ul').find('li').click(function () {

        //r(this);

        $('.select-zooms').find('ul').find('li').removeClass('selected');
        $(this).addClass('selected');

        zoom_selected = $(this).attr('data-zoom')/1;

        createMap();

    }).first().next().next().next().trigger('click');//todo better

});


//-------------------------------------------------------------




var BLOCK_MATERIALS = [
    //'color-white',
    'color-light-gray',
    'color-dark-gray',
    'clay-bricks',
    'clay-roof',
    'grass',
    'iron-plates',
    'stone-bricks',
    'stone-plain',
    'wood-boards',
    'wood-fence',
    'wood-raw'];

var BLOCK_SHAPES = ['none','room','wall','door','window','floor','ceil'];





$(function () {

    BLOCK_MATERIALS.forEach(function (material) {

        //r('creating block to pallete');

        $('.select-materials').append(createObject$(GALLERY.Objects.Object.init({
            type: 'block',
            shape: 'room',
            material: material
        })));



    });




    BLOCK_SHAPES.forEach(function (shape) {


        $('.select-shapes').append(createObject$(GALLERY.Objects.Object.init({
            type: 'block',
            shape: shape,
            material: 'stone-plain'
        })));



    });






    $('.palette').find('.select-materials').find('.block').click(function () {

        $('.palette').find('.select-materials').find('.block').removeClass('selected');
        $(this).addClass('selected');

        material_selected = $(this).attr('data-material');
    }).first().trigger('click');



    $('.palette').find('.select-shapes').find('.block').click(function () {

        $('.palette').find('.select-shapes').find('.block').removeClass('selected');
        $(this).addClass('selected');

        shape_selected = $(this).attr('data-shape');
    }).first().trigger('click');


});


//===================================================================================================


$(function () {


    ['light','label','tree','stairs','link','gate'].forEach(function (type) {


        let $dot_object = createObject$(GALLERY.Objects.Object.init({
            type: type
        }));



        $dot_object.draggable({

            //helper: 'clone',


            stop: function () {

                var offset = $(this).offset();
                var position = getPositionFromLeftTop(offset.left,offset.top);


                var object = {
                    id: createGuid(),
                    type: type,
                    position: position,
                    world: world_selected
                    storey: storey_selected
                };

                /*if(type == 'light'){
                    object.color = '#ffffff';
                    object.intensity = 1;
                }else
                if(type == 'label'){
                    object.name = '';
                    object.uri = '';
                    object.rotation = 0;
                }
                if(type == 'stairs'){
                    object.width = 10;
                    object.height = 2;
                    object.rotation = 0;
                    object.isFull = false;

                }else
                if(type == 'link'){


                    object.radius = 1;
                    object.href = '/';
                    object.target = '';


                    object.color = '#00ff00';
                    object.opacity = '0.9';



                }else
                if(type == 'gate'){
                    object.size = 2;
                    object.rotation = 0;
                    object.color = '#00ff00';
                    object.opacity = '0.9';
                    object.key = '#red';
                }*/


                objects.push(object);




                createMap();

                save();

                $(this)
                    .css('left',0)
                    .css('top',0);
                //r(x,y);

            }



        });

        $('.select-dot-objects').append($dot_object);


    });

});
