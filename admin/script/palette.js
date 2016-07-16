var material_selected = '';

$('#admin-tools').find('.palette').find('.block').click(function () {

    $('#admin-tools').find('.palette').find('.block').removeClass('selected');
    $(this).addClass('selected');

    material_selected = $(this).attr('data-material');
    
    
});



$('#admin-tools').find('.palette').find('.item').draggable({

    //helper: 'clone',


    stop: function () {

        var width = $(window).width();
        var height = $(window).height();
        var offset = $(this).offset();

        var x = (offset.left-width/2)/FIELD_SIZE;
        var y = (offset.top-height/2)/FIELD_SIZE;



        objects.push({
            position: {x:x,y:y},
            type: 'item',
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