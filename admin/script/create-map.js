/**
 * Created by Pavel on 14.07.2016.
 */

var FIELD_SIZE = 30;
var objects = [];

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
        $this.attr('data-material', material_selected);

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


        $this.attr('data-material', material_selected);



    });
    //----------------------------------------------------------------------------



    //----------------------------------------------------------------------------LIGHTS
    $lights.draggable({

        stop: function () {


            var position = getPositionFromLeftTop(offset.left,offset.top);


            $(this)
                .attr('data-x',position.x)
                .attr('data-y',position.y);

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