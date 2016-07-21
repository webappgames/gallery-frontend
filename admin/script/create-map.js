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


function removeObjectById(id){
    for (var i in objects) {
        if (objects[i].id == id) {
            objects.splice(i, 1);
            return true;
        }
    }
    return false;
}





var window_width,window_height;
function createMap() {

    var $admin_world = $('#admin-world');
    $admin_world.html('');


    window_width = $(window).width();
    window_height = $(window).height();

    objects.forEach(function (object) {

        $admin_world.append('\n').append(createObject$(object));

    });




    $admin_world.disableSelection();

    var $blocks= $admin_world.find('.block');
    var $lights= $admin_world.find('.light');
    var $labels= $admin_world.find('.label');
    var $images= $admin_world.find('.image');



    /*$admin_world.mousemove(function (e) {
        var position = getPositionFromLeftTop(e.clientX,e.clientY);
        document.title = isWallOn(objects,position);
    });*/




    //----------------------------------------------------------------------------SELECTING

    var $selected_toolbox = $('#selected-toolbox');
    var $selected_properties = $('#selected-properties');

    var top_z_index = 10000;
    var select_callback = function () {


        $this = $(this);


        var id = $this.attr('id');
        var object = getObjectById(id);

        r(object.position);


        if(object.type=='image') {


            var rotation = wallRotation(objects, object.position);

            if (rotation === false) {
                $selected_toolbox.addClass('invalid');
                $selected_toolbox.removeClass('valid');
            } else {
                $selected_toolbox.addClass('valid');
                $selected_toolbox.removeClass('invalid');
            }

        }else{

            $selected_toolbox.addClass('valid');
            $selected_toolbox.removeClass('invalid');

        }




        var $img = $this.find('img');
        if($img.length){
            $this = $img;
        }

        var offset = $this.offset();
        var width = $this.outerWidth();
        var height = $this.outerHeight();

        $('.selected-object').removeClass('selected-object');
        $this.addClass('selected-object');

        var border = 20;

        $selected_toolbox
            .css('position', 'absolute')
            .css('top',offset.top-border)
            .css('left',offset.left-border)
            .css('width',width+2*border)
            .css('height',height+2*border)
            .css('z-index',top_z_index++)
            .show();

        $this.css('z-index',top_z_index++);


        //var $delete = $selected_toolbox.find('.delete');
        // $rotate = $selected_toolbox.find('.rotate');
        //var $resize = $selected_toolbox.find('.resize');




        $selected_properties.html('');
        $selected_properties.append('<legend>Objekt</legend>');

        var input_element,$input_element;
        for(var key in object){



            input_element=false;
            if(key=='name' || key=='uri'/* || key=='color'*/){
                input_element='<input type="text">';
            }else
            if(key=='intensity'){
                input_element='<input type="range" min="0.1" max="5" step="0.1">';
            }else
            if(key=='color'){
                input_element='<input type="color">';
            }else
            if(key=='rotation'){
                input_element='<input type="range" min="0" max="360" step="1">';
            }




            if(input_element) {

                $input_element = $(input_element);

                //r(object[key]);
                $input_element.attr('value',object[key]);
                $input_element.attr('data-id',id);
                $input_element.attr('data-key',key);


                input_element = $input_element.outerHTML();
                //r(input_element);

                $selected_properties.append(
                    '<div class="field">' +
                    '<label>' + key + '</label>' +
                    input_element +
                    '</div>'
                );
            }
        }


        $selected_properties.find('input').change(function () {

            var $this = $(this);

            var val = $this.val();
            var id = $this.attr('data-id');
            var key = $this.attr('data-key');

            var object = getObjectById(id);
            object[key] = val;

            createMap();
            $('.save').trigger('click');
            //r(object);

        });

        $selected_properties.show();




        $delete_button = $('<button>Smazat</button>');
        $delete_button.click(function () {
            removeObjectById(id);
            createMap();
            $selected_toolbox.hide();
            $selected_properties.hide();
            $('.save').trigger('click');
        });


        $selected_properties.append($delete_button);
        /*
        $rotate
            .css('display', 'block')
            .css('position', 'absolute')
            .css('top',-10)
            .css('right',0)
            .css('z-index',top_z_index++);

        r($rotate.css('top'),$rotate.css('left'));*/
        //r(top_z_index++);


    };
    var unselect_callback = function () {
        $selected_toolbox.hide();
        $selected_properties.hide();
    };

    $images.mousedown(select_callback);
    $lights.mousedown(select_callback);
    $labels.mousedown(select_callback);
    //----------------------------------------------------------------------------





    //----------------------------------------------------------------------------BLOCKS
    $blocks.click(function () {

        var $this = $(this);
        $this.attr('data-shape', shape_selected);


        var id = $this.attr('id');
        var object = getObjectById(id);
        object.shape = shape_selected;


        $('.save').trigger('click');


    });

    var drawing = false;

    $blocks.unbind('mousedown').mousedown(function () {
        unselect_callback();

        r('start drawing');
        drawing = true;
    });
    $blocks.unbind('mouseup').mouseup(function () {
        r('stop drawing');
        drawing = false;
        $('.save').trigger('click');
    });

    $blocks.mouseenter(function () {

        if(!drawing)return;

        var $this = $(this);


        $this.attr('data-shape', shape_selected);


        var id = $this.attr('id');
        var object = getObjectById(id);
        object.shape = shape_selected;


    });
    //----------------------------------------------------------------------------



    //----------------------------------------------------------------------------LIGHTS, LABELS
    var draggable_options = {


        drag: function(){
            $('#selected-toolbox').hide();
        },
        stop: function () {


            var offset = $(this).offset();
            var position = getPositionFromLeftTop(offset.left,offset.top);


            var id = $(this).attr('id');
            var object = getObjectById(id);
            object.position = position;

            select_callback.call(this);

            $('.save').trigger('click');


        }


    };
    $lights.draggable(draggable_options);
    $labels.draggable(draggable_options);
    //----------------------------------------------------------------------------



    //----------------------------------------------------------------------------IMAGES
    $images.draggable({

        //grid: [ FIELD_SIZE/2, FIELD_SIZE/2 ],
        snap: ".block[data-shape='wall']",
        //snap: ".block",
        snapMode: "outer",
        //snapTolerance: 10,

        drag: function(){
            $('#selected-toolbox').hide();
        },
        stop: function () {

            var offset = $(this).offset();
            var position = getPositionFromLeftTop(offset.left-7,offset.top);//todo wtf 7


            position.x=Math.round(position.x*2)/2;
            position.y=Math.round(position.y*2)/2;


            var id = $(this).attr('id');
            var object = getObjectById(id);
            object.position = position;

            r(position);

            select_callback.call(this);

            $('.save').trigger('click');//todo refactor to function


        }


        /*
        drag: function(event, ui) {
            var draggable = $(this).data("ui-draggable");
            $.each(draggable.snapElements, function(index, element) {
                ui = $.extend({}, ui, {
                    snapElement: $(element.item),
                    snapping: element.snapping
                });
                if (element.snapping) {
                    if (!element.snappingKnown) {
                        element.snappingKnown = true;
                        draggable._trigger("snapped", event, ui);
                    }
                } else if (element.snappingKnown) {
                    element.snappingKnown = false;
                    draggable._trigger("snapped", event, ui);
                }
            });
        },
        snapped: function(event, ui) {

            var $this = $(this);
            var offset1 = $this.offset();
            var offset2 = ui.snapElement.offset();


            offset1.top += 30;
            offset1.left += 30;

            offset2.top += 15;
            offset2.left += 15;

            var x = offset1.left-offset2.left;
            var y = offset1.top-offset2.top;

            var rad = Math.atan2(y,x);
            var rotation =(rad * (180/Math.PI))%360;
            rotation = Math.floor(rotation/90)*90;


            $this.css('transform','rotate('+rotation+'deg)');

            var offset = $this.offset();
            $('#dot')
                .css('top',offset.top)
                .css('left',offset.left);


            r(rotation);


            $(".block[data-shape='wall']").html('');
            ui.snapElement.html(rotation);
            //$this.css('transform','rotate('+rotation+'deg)');

            return;



            $this.css('border','2px solid #022fff');
            if(rotation==0){
                $this.css('border-top','2px dotted #ff4f12');
            }else
            if(rotation==90){
                $this.css('border-left','2px dotted #ff4f12');
            }else
            if(rotation==180){
                $this.css('border-bottom','2px dotted #ff4f12');
            }else
            if(rotation==270){
                $this.css('border-right','2px dotted #ff4f12');
            }

        }
        */


    });

    $images.each(function () {

        var $this = $(this);


        var object = getObjectById($this.attr('id'));

        var $img = $this.find('img');
        //var $arrow = $this.find('.arrow');

        $img.css('width',object.width*FIELD_SIZE);
        $img.css('height',object.width*FIELD_SIZE);

        $img.attr('src',object.src);



        //$img.css('height',object.width*FIELD_SIZE-4);
        //$this.css('background','url('+$this.attr('data-src')+')');
        //$this.css('background-size','100% 100%');
        //$this.css('background-repeat','no-repeat');


    });

    //----------------------------------------------------------------------------







}