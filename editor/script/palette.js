
var STOREYS = [
    '1NP',
    '2NP',
    '3NP',
    '4NP',
    '5NP',
    '6NP'
    ];



STOREYS.forEach(function (storey) {
    $('.select-storeys').find('ul').append($('<li></li>').text(storey).attr('data-storey',storey));
});



$('.select-storeys').find('ul').find('li').click(function () {

    //r(this);

    $('.select-storeys').find('ul').find('li').removeClass('selected');
    $(this).addClass('selected');

    storey_selected = $(this).attr('data-storey');
    createMap();

}).first().trigger('click');



//-------------------------------------------------------------




var BLOCK_MATERIALS = [
    'color-white',
    'clay-bricks',
    'clay-roof',
    'grass',
    'iron-plates',
    'stone-bricks',
    'stone-plain',
    'wood-boards',
    'wood-fence',
    'wood-raw'];

var BLOCK_SHAPES = ['none','room','wall','door','window'];




//-------------------------------------------------------------




BLOCK_MATERIALS.forEach(function (material) {


    $('.select-materials').append(createObject$({
        type: 'block',
        shape: 'wall',
        material: material
    }));



});


BLOCK_SHAPES.forEach(function (shape) {


    $('.select-shapes').append(createObject$({
        type: 'block',
        shape: shape,
        material: 'stone-plain'
    }));



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




//===================================================================================================


['light','label','tree','stairs'].forEach(function (type) {



    $('.palette').find('.'+type).draggable({

        //helper: 'clone',


        stop: function () {

            var offset = $(this).offset();
            var position = getPositionFromLeftTop(offset.left,offset.top);


            var object = {
                id: createGuid(),
                type: type,
                position: position,
                storey: storey_selected
            };

            if(type == 'light'){
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
            }


            objects.push(object);




            createMap();

            save();

            $(this)
                .css('left',0)
                .css('top',0);
            //r(x,y);

        }



    });


});

