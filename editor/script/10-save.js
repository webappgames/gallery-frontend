/**
 * Created by Pavel on 14.07.2016.
 */
var last_objects;
function undo() {
    objects = last_objects;
    createMap();
}
function save() {
    last_objects = JSON.parse(JSON.stringify(objects));
    $button = $('#save');
    $button.html('<i class="fa fa-refresh fa-spin fa-fw"></i>Ukládání'); //todo fa
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
        url: config.GALLERY_API_URL + 'galleries/' + gallery,
        contentType: "application/json",
        data: JSON.stringify(objects),
        headers: { 'x-auth': password }
    }).done(function (response) {
        var date = new Date();
        var datetime = date.getHours() + ":" + ((date.getMinutes() < 10 ? '0' : '') + date.getMinutes()); //+ ":" + date.getSeconds();
        $button.html('Uloženo ' + datetime); //todo datum
        //console.log('done',response);
    }).fail(function (response) {
        //console.log('fail',response);
    });
}
;
$(function () {
    $('#save').click(function () {
        save();
    });
});
//# sourceMappingURL=10-save.js.map