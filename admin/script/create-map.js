/**
 * Created by Pavel on 14.07.2016.
 */

var FIELD_SIZE = 30;
var objects = [];

function createMap() {
    

    var blocks_html = '';
    var lights_html = '';
    var images_html = '';

    objects.forEach(function (object) {

        if(object.type == 'block'){

            blocks_html += createObjectHTML(object);

        }else
        if(object.type == 'light'){

            lights_html += createObjectHTML(object);

        }
        if(object.type == 'image'){

            images_html += createObjectHTML(object);

        }

    });


    var $blocks= $(blocks_html);
    var $lights= $(lights_html);
    var $images= $(images_html);





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





    $('#admin-world').html('');
    $('#admin-world').append($blocks);
    $('#admin-world').append($lights);
    $('#admin-world').append($images);


    var width = $(window).width();
    var height = $(window).height();

    $('#admin-world').find('.block,.light,.image').each(function () {

        //r(this);

        var $this = $(this);
        var x = $this.attr('data-x');
        var y = $this.attr('data-y');


        $this.css('position', 'absolute');
        $this.css('top', y * FIELD_SIZE + height / 2);
        $this.css('left', x * FIELD_SIZE + width / 2);

    });



}