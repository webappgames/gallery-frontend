/// <reference path="reference.ts" />




var last_objects;




function cleanStorey() {
    if(confirm('Opravdu chcete vymazat vše v aktuálním podlaží '+storey_selected+'?')){

        var new_objects =
        objects.getAll().filter(function (object) {

            if(object.storey == storey_selected){

                return(false);

            }else{

                return(true);

            }
        });

        objects = new GALLERY.Objects.Array(new_objects);
        saveAndRedraw();


    }
}

function cleanWorld() {
    if(confirm('Opravdu chete vymazat vše a začít znovu?')){

        objects = new GALLERY.Objects.Array();
        saveAndRedraw();

    }
}



function saveAndRedraw(){ //todo use this
    createMap();
    save();
}





function undo() {
    console.warn('Undo not yet working');
    //objects = last_objects;
    //createMap();
}







function save() {


    //last_objects = JSON.parse(JSON.stringify(objects.getAll()));



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


    $.ajax({
        method: 'PUT',
        url: config.GALLERY_API_URL+'galleries/'+gallery,
        contentType: "application/json",
        data: JSON.stringify(objects.getAll()),
        headers: { 'x-auth': password }

    }).done(function (response) {

        var date = new Date();
        var datetime = date.getHours() + ":" + ( (date.getMinutes()<10?'0':'') + date.getMinutes() ) ;//+ ":" + date.getSeconds();


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