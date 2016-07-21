var shape_selected = '';

$('.palette').find('.block').click(function () {

    $('.palette').find('.block').removeClass('selected');
    $(this).addClass('selected');

    shape_selected = $(this).attr('data-shape');
    
    
});

$('.palette').find('.block[data-shape="room"]').trigger('click');

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
            color: '#fff',
            intensity: 1

        });
        createMap();

        $('.save').trigger('click');

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
            color: '#ffffff',
            intensity: 1,
            name: '',
            uri: ''

        });
        createMap();

        $('.save').trigger('click');

        $(this)
            .css('left',0)
            .css('top',0);
        //r(x,y);

    }



});