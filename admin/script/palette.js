var material_selected = '';

$('#admin-tools').find('.palette').find('.block').click(function () {

    $('#admin-tools').find('.palette').find('.block').removeClass('selected');
    $(this).addClass('selected');

    material_selected = $(this).attr('data-material');
    
    
});