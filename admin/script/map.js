/**
 * Created by Pavel on 14.07.2016.
 */



$(function(){



    $.get('api/map.php').fail(function (response) {

        console.log('fail',response);

    }).done(function (response) {




        console.log('done', response);


        var blocks = '';
        response.forEach(function (block) {

            blocks += '<div class="block" data-material="'+block.material+'" data-x="' + block.position.x + '" data-y="' + block.position.y + '">';
            blocks += '';
            blocks += '</div>';
            
        });



        /*var blocks = '';
        for (var y = 0; y < 10; y++) {
            for (var x = 0; x < 10; x++) {
                blocks += '<div class="block" data-material="" data-x="' + x + '" data-y="' + y + '">';
                blocks += 'x';
                blocks += '</div>';
            }
        }*/


        var $blocks = $(blocks);


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

        });


        $blocks.each(function () {

            var $this = $(this);
            var x = $this.attr('data-x');
            var y = $this.attr('data-y');


            $this.css('position', 'absolute');
            $this.css('top', y * 30);
            $this.css('left', x * 30);

        });


        $('#admin-world').html($blocks);


    });
    
    
});