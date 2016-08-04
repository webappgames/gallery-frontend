
var BLOCK_MATERIALS = [
    'clay-bricks',
    'clay-roof',
    'grass',
    'iron-plates',
    'shadow.png',
    'stone-bricks',
    'stone-plain',
    'wood-boards',
    'wood-fence',
    'wood-raw'];

var BLOCK_SHAPES = ['none','room','wall','door','window'];




var material_selected = BLOCK_MATERIALS[0];
var shape_selected = BLOCK_SHAPES[0];



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
});



$('.palette').find('.select-shapes').find('.block').click(function () {

    $('.palette').find('.select-shapes').find('.block').removeClass('selected');
    $(this).addClass('selected');

    shape_selected = $(this).attr('data-shape');
});




//===================================================================================================



$('.palette').find('.light').draggable({

    //helper: 'clone',


    stop: function () {

        var offset = $(this).offset();
        var position = getPositionFromLeftTop(offset.left,offset.top);


        objects.push({
            id: createGuid(),
            type: 'light',
            position: position,
            color: '#ffffff',
            intensity: 1

        });
        createMap();

        save();

        $(this)
            .css('left',0)
            .css('top',0);
        //r(x,y);

    }



});



//===================================================================================================



$('.palette').find('.label').draggable({

    //helper: 'clone',


    stop: function () {

        var offset = $(this).offset();
        var position = getPositionFromLeftTop(offset.left,offset.top);


        objects.push({
            id: createGuid(),
            type: 'label',
            position: position,
            rotation: 0,
            name: '',
            uri: ''

        });
        createMap();

        save();

        $(this)
            .css('left',0)
            .css('top',0);
        //r(x,y);

    }



});