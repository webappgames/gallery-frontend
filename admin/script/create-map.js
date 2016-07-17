/**
 * Created by Pavel on 14.07.2016.
 */

var FIELD_SIZE = 30;
var objects = [];

function getObjectById(id){
    for(var i=0,l=objects.length;i<l;i++){
        if(objects[i].id==id)return(objects[i]);
    }
    throw new Error('Unknown id '+id);
}





function createMap() {

    var $admin_world = $('#admin-world');
    $admin_world.html('');


    objects.forEach(function (object) {

        $admin_world.append(createObject$(object));

    });



    var $blocks= $admin_world.find('.block');
    var $lights= $admin_world.find('.light');
    var $images= $admin_world.find('.image');




    //----------------------------------------------------------------------------BLOCKS
    $blocks.click(function () {

        var $this = $(this);
        $this.attr('data-shape', shape_selected);


        var id = $this.attr('data-id');
        var object = getObjectById(id);
        object.shape = shape_selected;


        $('.save').trigger('click');


    });

    var drawing = false;

    $('#admin-world').unbind('mousedown').mousedown(function () {
        r('start drawing');
        drawing = true;
    });
    $('#admin-world').unbind('mouseup').mouseup(function () {
        r('stop drawing');
        drawing = false;
        $('.save').trigger('click');
    });

    $blocks.mouseenter(function () {

        if(!drawing)return;

        var $this = $(this);


        $this.attr('data-shape', shape_selected);


        var id = $this.attr('data-id');
        var object = getObjectById(id);
        object.shape = shape_selected;


    });
    //----------------------------------------------------------------------------



    //----------------------------------------------------------------------------LIGHTS
    $lights.draggable({

        stop: function () {

            var offset = $(this).offset();
            var position = getPositionFromLeftTop(offset.left,offset.top);


            var id = $(this).attr('data-id');
            var object = getObjectById(id);
            object.position = position;

            $('.save').trigger('click');
            

        }
        
        
    });
    //----------------------------------------------------------------------------





    //----------------------------------------------------------------------------POSITIONS
    var width = $(window).width();
    var height = $(window).height();

    $('#admin-world').find('*').each(function () {


        var $this = $(this);
        var object = JSON.parse($this.attr('data-json'));

        //r(object);
        //r('-------------');

        $this.css('position', 'absolute');
        $this.css('top', object.position.y * FIELD_SIZE + height / 2);
        $this.css('left', object.position.x * FIELD_SIZE + width / 2);

    });
    //----------------------------------------------------------------------------



}