/// <reference path="reference.ts" />




var last_objects;




function cleanStorey() {
    if(confirm('Opravdu chcete vymazat vše v aktuálním podlaží '+storey_selected+'?')){

        var new_objects =
        objects.getAll().filter(function (object) {

            if(object.storey == storey_selected && object.world == world_selected){

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
    if(confirm('Opravdu chete vymazat vše ve světě '+world_selected+' a začít znovu?')){


        var new_objects =
            objects.getAll().filter(function (object) {

                if(object.world == world_selected){

                    return(false);

                }else{

                    return(true);

                }
            });

        objects = new GALLERY.Objects.Array(new_objects);
        saveAndRedraw();


        /*objects = new GALLERY.Objects.Array();
        saveAndRedraw();*/

    }
}


function copyStorey() {
    let storey = prompt('Jaké podlaží chcete zkopírovat?', (parseInt(storey_selected)-1)+'NP');


    let new_objects = objects.filterWorld(world_selected).filterStorey(storey);

    new_objects.forEach(function (object) {

        let new_object = object.clone();
        new_object.id = createGuid();
        new_object.storey = storey_selected;
        objects.push(new_object);

    });

    saveAndRedraw();

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






function save(force = false) {


    if(!loaded){
        console.warn('Cant save because not yet loaded!');
        return;
    }


    if(!force && objects.getAll().length > 1000){


        $button = $('#save');
        $button.addClass('unsaved');
        $button.html('<i class="fa fa-exclamation-triangle" aria-hidden="true"></i> Uložit');//todo fa

    }else{

        $button.removeClass('unsaved');
        putToServer();

    }


}




function putToServer() {


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
        save(true);
    });




});