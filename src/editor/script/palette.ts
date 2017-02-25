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


    }).first().next().next().next().trigger('click');

});

//-------------------------------------------------------------


var zoom_selected;



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


var material_selected, shape_selected,opacity_selected;



$(function () {

    BLOCK_MATERIALS.forEach(function (material) {

        //r('creating block to pallete');

        $('.select-textures').append(createObject$(GALLERY.Objects.Object.init({
            type: 'block',
            shape: 'room',
            material: material
        })));



    });

    ['#cccccc','#444444'].forEach(function (material) {

        //r('creating block to pallete');

        $('.select-colors').append(createObject$(GALLERY.Objects.Object.init({
            type: 'block',
            shape: 'room',
            material: material
        })));

    });
    $('.select-colors').find('input').change(function () {

        $('.select-colors').append(createObject$(GALLERY.Objects.Object.init({
            type: 'block',
            shape: 'room',
            material: $(this).val()
        })));

        materialClick();

    });



    BLOCK_SHAPES.forEach(function (shape) {


        $('.select-shapes').append(createObject$(GALLERY.Objects.Object.init({
            type: 'block',
            shape: shape,
            material: 'stone-plain',
        })));



    });




    for(var opacity=1;opacity>0;opacity-=0.1){
        $('.select-opacity').append(createObject$(GALLERY.Objects.Object.init({
            type: 'block',
            shape: 'room',
            material: 'stone-plain',
            opacity: opacity
        })));
    }





    function materialClick() {
        $('.palette').find('.select-materials').find('.block').click(function () {

            $('.palette').find('.select-materials').find('.block').removeClass('selected');
            $(this).addClass('selected');

            material_selected = $(this).attr('data-material');
        }).last().trigger('click');
    }
    materialClick();


    $('.palette').find('.select-shapes').find('.block').click(function () {

        $('.palette').find('.select-shapes').find('.block').removeClass('selected');
        $(this).addClass('selected');

        shape_selected = $(this).attr('data-shape');
    }).first().trigger('click');




    $('.palette').find('.select-opacity').find('.block').click(function () {

        $('.palette').find('.select-opacity').find('.block').removeClass('selected');
        $(this).addClass('selected');

        opacity_selected = parseFloat($(this).attr('data-opacity'));
        r(opacity_selected);
    }).first().trigger('click');




});


//===================================================================================================


$(function () {


    OBJECT_TYPES.forEach(function (type) {


        let $dot_object = createObject$(GALLERY.Objects.Object.init({
            type: type
        }));

        //r(type,$dot_object);


        $dot_object.draggable({

            //helper: 'clone',


            stop: function () {

                var offset = $(this).offset();
                var position = getPositionFromLeftTop(offset.left,offset.top);


                var object = {
                    id: createGuid(),
                    type: type,
                    position: position,
                    world: world_selected,
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
