var material_selected = '';

$('.palette').find('.block').click(function () {

    $('#admin-tools').find('.palette').find('.block').removeClass('selected');
    $(this).addClass('selected');

    material_selected = $(this).attr('data-material');
    
    
});



$('.palette').find('.light').draggable({

    //helper: 'clone',


    stop: function () {

        var position = getPositionFromLeftTop(offset.left,offset.top);


        objects.push({
            position: position,
            type: 'light',
            material: 'light'

        });
        createMap();

        $('.save').trigger('click');

        $(this)
            .css('left',0)
            .css('top',0);
        //r(x,y);

    }



});