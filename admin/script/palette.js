var material_selected = '';

$('.palette').find('.block').click(function () {

    $('.palette').find('.block').removeClass('selected');
    $(this).addClass('selected');

    material_selected = $(this).attr('data-material');
    
    
});



$('.palette').find('.light').draggable({

    //helper: 'clone',


    stop: function () {

        var offset = $(this).offset();
        var position = getPositionFromLeftTop(offset.left,offset.top);


        objects.push({
            position: position,
            type: 'light',
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