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
$(function () {
    $admin_world = $('#admin-world');
});


var window_center = {};
window_center.x = $(window).width()  /2;
window_center.y = $(window).height() /2;



function createMap() {


    $admin_world.html('');


    objects.forEach(function (object) {

        $admin_world.append('\n').append(createObject$(object));

    });




    $admin_world.disableSelection();

    var $blocks= $admin_world.find('.block');
    var $lights= $admin_world.find('.light');
    var $labels= $admin_world.find('.label');
    var $trees = $admin_world.find('.tree');
    var $images= $admin_world.find('.image');
    var $stairs= $admin_world.find('.stairs');



    /*$admin_world.mousemove(function (e) {
        var position = getPositionFromLeftTop(e.clientX,e.clientY);
        document.title = isWallOn(objects,position);
    });*/




    //----------------------------------------------------------------------------SELECTING
    var $dot = $('#dot');
    var $selected_properties = $('#selected-properties');


    var select_callback = function () {


        $this = $(this);


        var id = $this.attr('id');
        var object = getObjectById(id);

        r($this,id,object);



        $dot.css('position', 'absolute');
        $dot.css('top', object.position.y * FIELD_SIZE + window_center.y-5);
        $dot.css('left', object.position.x * FIELD_SIZE + window_center.x-5);



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
                input_element='<input type="range" min="0" max="360" step="10">';
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
    $trees.mousedown(select_callback);
    $stairs.mousedown(select_callback);
    //----------------------------------------------------------------------------





    //----------------------------------------------------------------------------BLOCKS drawing
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



        r('material: '+material_selected+' | shape: '+shape_selected)

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
                    material: material_selected,
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
        r(drawing_objects);
        drawing_objects.forEach(function (object) {

            //r('object',object);
            //r('object.position',object.position);
            removed_stat += removeBlockOnPosition(object.position)?1:0;

            if(object.shape!=='none'){
                objects.push(object);
            }


        });

        r('removed '+removed_stat+' objects');


        createMap();

        save();



    });

    //----------------------------------------------------------------------------



    //----------------------------------------------------------------------------LIGHTS, LABELS,TREES drag
    var drag_normal_options = {


        drag: function(){
        },
        stop: function () {


            var offset = $(this).offset();
            var position = getPositionFromLeftTop(offset.left,offset.top);


            var id = $(this).attr('id');
            var object = getObjectById(id);
            object.position = position;

            //select_callback.call(this);

            //createMap();
            save();


        }


    };
    $lights.draggable(drag_normal_options);
    $labels.draggable(drag_normal_options);
    $trees.draggable(drag_normal_options);
    //----------------------------------------------------------------------------



    //----------------------------------------------------------------------------STAIRS drag
    var drag_stairs_options = {

        //grid: [30,30],
        //snap: ".block[data-shape='wall']",
        //snapMode: "outer",

        drag: function(e, ui){

            ui.position.left = Math.floor((ui.position.left-window_center.x) / 30) * 30+window_center.x;
            ui.position.top  = Math.floor((ui.position.top -window_center.y) / 30) * 30+window_center.y;

        },
        stop: function () {


            var offset = $(this).offset();
            var position = getPositionFromLeftTop(offset.left,offset.top);


            var id = $(this).attr('id');
            var object = getObjectById(id);
            object.position = position;

            //select_callback.call(this);

            //createMap();
            save();


        }


    };
    $stairs.draggable(drag_stairs_options);
    //----------------------------------------------------------------------------



    //----------------------------------------------------------------------------IMAGES
    var drag_snap_options = {

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



    };

    $images.draggable(drag_snap_options);
    //----------------------------------------------------------------------------







}