/**
 * Created by Pavel on 14.07.2016.
 */


function save() {


    $button = $('#save');
    $button.html('<i class="fa fa-refresh fa-spin fa-fw"></i>Ukládání');//todo fa


    /*blocks = [];

     $('#admin-world').find('.block,.light').each(function () {

     var $this = $(this);
     var x = $this.attr('data-x');
     var y = $this.attr('data-y');
     var type = $this.attr('data-type');
     var material = $this.attr('data-material');



     blocks.push({
     position:{x:x,y:y},
     type: type,
     material: material
     });
     //createMap();

     });*/


    $.post({
        url: '../api/map.php',
        dataType: 'json',
        data: JSON.stringify(objects)

    }).done(function (response) {

        var date = new Date();
        var datetime = date.getHours() + ":" + date.getMinutes() ;//+ ":" + date.getSeconds();


        $button.html('Uloženo '+datetime);//todo datum
        //console.log('done',response);





    }).fail(function (response) {

        //console.log('fail',response);

    });



};





$(function () {


    $('#save').click(function () {
        save();
    });




});