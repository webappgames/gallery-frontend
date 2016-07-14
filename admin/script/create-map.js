/**
 * Created by Pavel on 14.07.2016.
 */

function createMap(blocks) {


    var blocks_html = '';
    blocks.forEach(function (block) {

        blocks_html += '<div class="block" data-material="' + block.material + '" data-x="' + block.position.x + '" data-y="' + block.position.y + '">';
        blocks_html += '';
        blocks_html += '</div>';

    });





    var $blocks = $(blocks_html);


    $blocks.click(function () {


        var $this = $(this);
        //var x = $this.attr('data-x');
        //var y = $this.attr('data-y');
        var material = $this.attr('data-material');


        if (material == '') {
            material = 'stone';
        } else {
            material = '';
        }


        $this.attr('data-material', material);

        $('.save').trigger('click');

    });


    var width = $(window).width();
    var height = $(window).height();

    $blocks.each(function () {

        var $this = $(this);
        var x = $this.attr('data-x');
        var y = $this.attr('data-y');


        $this.css('position', 'absolute');
        $this.css('top', y * 30 + height / 2);
        $this.css('left', x * 30 + width / 2);

    });


    $('#admin-world').html($blocks);


}