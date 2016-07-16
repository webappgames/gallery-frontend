/**
 * Created by Pavel on 14.07.2016.
 */

var FIELD_SIZE = 30;
var objects = [];

function createMap() {
    

    var blocks_html = '';
    var items_html = '';

    objects.forEach(function (object) {

        if(object.type == 'block'){

            blocks_html += '<div class="block" data-type="block" data-material="' + object.material + '" data-x="' + object.position.x + '" data-y="' + object.position.y + '">';
            blocks_html += '';
            blocks_html += '</div>';

        }else
        if(object.type == 'item'){

            items_html += '<div class="item" data-type="item" data-material="' + object.material + '" data-x="' + object.position.x + '" data-y="' + object.position.y + '">';
            items_html += '';
            items_html += '</div>';

        }



    });

    var $blocks= $(blocks_html);
    var $items= $(items_html);





    //----------------------------------------------------------------------------

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



    //----------------------------------------------------------------------------
    $items.draggable({

        stop: function () {

            var width = $(window).width();
            var height = $(window).height();
            var offset = $(this).offset();

            var x = (offset.left-width/2)/FIELD_SIZE;
            var y = (offset.top-height/2)/FIELD_SIZE;

            $(this)
                .attr('data-x',x)
                .attr('data-y',y);

            $('.save').trigger('click');
            

        }
        
        
    });
    //----------------------------------------------------------------------------



    $('#admin-world').html('');
    $('#admin-world').append($blocks);
    $('#admin-world').append($items);


    var width = $(window).width();
    var height = $(window).height();

    $('#admin-world').find('.block,.item').each(function () {

        //r(this);

        var $this = $(this);
        var x = $this.attr('data-x');
        var y = $this.attr('data-y');


        $this.css('position', 'absolute');
        $this.css('top', y * FIELD_SIZE + height / 2);
        $this.css('left', x * FIELD_SIZE + width / 2);

    });



}