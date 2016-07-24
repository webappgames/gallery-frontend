/**
 * Created by Pavel on 14.07.2016.
 */

var FIELD_SIZE = 30;
var objects = [];



drawing=false;
moving=false;


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

function removeBlockOnPosition(position){

    //r(position);

    for (var i in objects) {

        if (objects[i].type == 'block'){
            //r(objects[i]);
            if(objects[i].position.x==position.x && objects[i].position.y==position.y){
                objects.splice(i, 1);
                return true;
            }
        }
    }
    return false;
}



var $admin_world;

var window_center = {};
window_center.x = $(window).width()  /2;
window_center.y = $(window).height() /2;



function createMap() {

    $admin_world = $('#admin-world');
    $admin_world.html('');


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

    var $selected_properties = $('#selected-properties');


    var select_callback = function () {


        $this = $(this);


        var id = $this.attr('id');
        var object = getObjectById(id);

        r(object);




        var offset = $this.offset();
        var width = $this.outerWidth();
        var height = $this.outerHeight();


        $admin_world.find('div').addClass('not-selected-object').css('z-index','');
        $this.removeClass('not-selected-object');
        $this.css('z-index',10000);



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
            if(key=='rotation' && object.type!=='image'){
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
            save();
            //r(object);

        });

        $selected_properties.show();




        $delete_button = $('<button>Smazat</button>');
        $delete_button.click(function () {
            removeObjectById(id);
            createMap();
            $selected_properties.hide();
            save();
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
        $('.not-selected-object').removeClass('not-selected-object');
        $selected_properties.hide();
    };

    $images.mousedown(select_callback);
    $lights.mousedown(select_callback);
    $labels.mousedown(select_callback);
    //----------------------------------------------------------------------------





    //----------------------------------------------------------------------------BLOCKS
    /*$blocks.click(function () {

        var $this = $(this);



        var id = $this.attr('id');
        var object = getObjectById(id);

        if(shape_selected) {

            object.shape = shape_selected;
            $this.attr('data-shape', shape_selected);

        }else{

            removeObjectById(object.id);
            $this.remove();

        }

        save();


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
        save();
    });

    $blocks.mouseenter(function () {

        if(drawing!==1)return;

        var $this = $(this);


        $this.attr('data-shape', shape_selected);


        var id = $this.attr('id');
        var object = getObjectById(id);

        if(shape_selected) {

            object.shape = shape_selected;
            $this.attr('data-shape', shape_selected);

        }else{

            removeObjectById(object.id);
            $this.remove();

        }


    });*/
    //-----------------------------------
    /*$admin_world.click(function (event) {



        if(shape_selected) {

            var x = ( event.clientX -window_center.x /2 ) / FIELD_SIZE ;//+0.5;
            var y = ( event.clientY -window_center.y/2 ) / FIELD_SIZE ;//+0.5;

            x = Math.round(x);
            y = Math.round(y);

            var object = {
                id: createGuid(),
                type: 'block',
                position: {x: x, y: y},
                shape: shape_selected
            };
            objects.push(object);


            $admin_world.append('\n').append(createObject$(object));//todo use also in pallete


        }

        save();


    });*/



    var drawing_x,drawing_y,drawing_objects;
    $admin_world.unbind('mousedown').mousedown(function (event) {

        if($(event.target).hasClass('block') || $(event.target).attr('id')=='admin-world'){

        }else{
            return;
        }


        if($selected_properties.css('display')=='block'){
            unselect_callback();
            return;
        }



        r('start drawing');
        drawing = true;

        drawing_x = Math.round(( event.clientX -window_center.x  ) / FIELD_SIZE );//+0.5;
        drawing_y = Math.round(( event.clientY -window_center.y  ) / FIELD_SIZE );//+0.5;


        drawing_objects=[];

    });


    var admin_world_mousemove;
    $admin_world.unbind('mousemove').mousemove(admin_world_mousemove = function (event) {


        if(!drawing)return;


        //r('drawing rect');
        //r( event.clientY -window_center.y );

        var stop_x = Math.round(( event.clientX -window_center.x ) / FIELD_SIZE );//+0.5;
        var stop_y = Math.round(( event.clientY -window_center.y ) / FIELD_SIZE );//+0.5;

        size_x = Math.abs(stop_x-drawing_x);
        size_y = Math.abs(stop_y-drawing_y);


        signum_x = (stop_x-drawing_x)>0?1:-1;
        signum_y = (stop_y-drawing_y)>0?1:-1;


        drawing_objects.forEach(function (object) {
            $('#'+object.id).remove();
        });
        drawing_objects=[];


        for(var y=0;y<=size_y;y++){
            for(var x=0;x<=size_x;x++){


                var object = {
                    id: createGuid(),
                    type: 'block',
                    position: {
                        x: drawing_x +x*signum_x,
                        y: drawing_y +y*signum_y
                    },
                    shape: shape_selected!='wall'?shape_selected:((x==0 || y==0 || x==size_x || y==size_y)?'wall':'room')
                };
                //objects.push(object);
                drawing_objects.push(object);

                $admin_world.append('\n').append(createObject$(object));//todo use also in pallete



            }
        }




    });

    $admin_world.unbind('mouseup').mouseup(function (event) {


        if(!drawing)return;
        admin_world_mousemove(event);
        drawing = false;

        var removed_stat = 0;
        drawing_objects.forEach(function (object) {

            //r('object',object);
            //r('object.position',object.position);
            removed_stat += removeBlockOnPosition(object.position)?1:0;

            if(object.shape!=='none'){
                objects.push(object);
            }


        });

        r('removed '+removed_stat+' objects');


        //createMap();

        save();



    });

    //----------------------------------------------------------------------------



    //----------------------------------------------------------------------------LIGHTS, LABELS
    var draggable_options = {


        drag: function(){
        },
        stop: function () {


            var offset = $(this).offset();
            var position = getPositionFromLeftTop(offset.left+15,offset.top+15);


            var id = $(this).attr('id');
            var object = getObjectById(id);
            object.position = position;

            //select_callback.call(this);

            //createMap();
            save();


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
        },
        stop: function () {


            var offset = $(this).offset();
            var position = getPositionFromLeftTop(offset.left-7,offset.top);//todo wtf 7

            position.x=Math.round(position.x*2)/2;
            position.y=Math.round(position.y*2)/2;



            var id = $(this).attr('id');
            var object = getObjectById(id);


            object.position = position;


            select_callback.call(this);
            save();//todo refactor to function

        },



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


            var offset = $(this).offset();
            var position = getPositionFromLeftTop(offset.left-7,offset.top);//todo wtf 7

            position.x=Math.round(position.x*2)/2;
            position.y=Math.round(position.y*2)/2;


            var id = $(this).attr('id');
            var object = getObjectById(id);

            object.position = position;


            var rotation = wallRotation(objects, position);
            var rotation_rad = rotation/180*Math.PI;

            if (rotation === false) {

            } else {

                $(this).find('img').hide();
                $(this).find('.image-'+rotation).show();


                object.rotation = rotation;


                //    .css('transform','rotate('+(rotation)+'deg) translate('+(Math.cos(rotation_rad)*-50)+'%, '+(Math.sin(rotation_rad)*-50)+'%)')
                //    .css('transform','rotate('+(rotation)+'deg) translate(-50%, -50%)')

            }


        }



    });

    /*$images.each(function () {

        var $this = $(this);


        var object = getObjectById($this.attr('id'));

        var $img = $this.find('img');
        //var $arrow = $this.find('.arrow');

        //$img.css('width',object.width*FIELD_SIZE);
        $img.css('height',object.height*FIELD_SIZE);



        var src = object.src;
        var src_uri = URI(src)
            .removeSearch("width");
        var src_normal = src_uri.addSearch({ width: 100 }).toString();



        $img.attr('src',src_normal);



        //$img.css('height',object.width*FIELD_SIZE-4);
        //$this.css('background','url('+$this.attr('data-src')+')');
        //$this.css('background-size','100% 100%');
        //$this.css('background-repeat','no-repeat');


    });*/

    //----------------------------------------------------------------------------







}