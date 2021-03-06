/// <reference path="reference" />


var objects: GALLERY.Objects.Array = new GALLERY.Objects.Array();



var drawing: boolean = false;
var moving: boolean = false;


var selected_object;




var window_size = {
    x: $(window).width(),
    y: $(window).height()
};

var window_center = {
    x: $(window).width()  /2,
    y: $(window).height() /2
};









var materialsImages = new GALLERY.ImagesCollection();
var shapesImages = new GALLERY.ImagesCollection();




function createMap() {



    WORLDS = [];
    objects.forEach(function (object) {
        if(WORLDS.indexOf(object.world)==-1){
            WORLDS.push(object.world);
        }

    });
    createWorldsPallete();





    let x = (-window_center.x )/zoom_selected;
    let y = (-window_center.y )/zoom_selected;

    let width  = window_size.x/zoom_selected;
    let height = window_size.y/zoom_selected;
    width -= 5;



    //r(x,y,width,height);
    let objects_world = objects.filterWorld(world_selected).filterStorey(storey_selected).filterSquare(x,y,width,height);
    //let objects_world = objects.filterWorld(world_selected).filterSquare(x+5,y+5,width,height-10);






    let objects_world_ = objects_world.splitTypes('block');
    //r(objects_world_);
    objects_world = objects_world_[1];
    let objects_world_blocks = objects_world_[0];






    let canvas = document.getElementById("admin-world-canvas");
    let $canvas = $(canvas);

    $canvas.css('width','100vw');
    $canvas.css('height','100vh');

    $canvas.attr('width',$canvas.width());
    $canvas.attr('height',$canvas.height());


    let ctx = canvas.getContext("2d");





    //let img = imageCollection.getOrAdd('/media/images/textures/grass.jpg');
    //let door = imageCollection.getOrAdd('/media/images/icons/door.jpg');




    objects_world_blocks.forEach(function (block) {


        let x = (block.position.x-0.5)*zoom_selected + window_center.x;
        let y = (block.position.y-0.5)*zoom_selected + window_center.y;



        if(block.material.substr(0,1)=='#') {

            ctx.fillStyle=block.material;
            ctx.fillRect(x,y,zoom_selected,zoom_selected);


        }else {


            ctx.drawImage(
                materialsImages.getOrAdd(block.material, '/media/images/textures/' + block.material + '.jpg'),
                x,
                y,
                zoom_selected,
                zoom_selected
            );

        }




        if(block.shape!=='room') {
            ctx.drawImage(
                shapesImages.getOrAdd(block.shape, '/media/images/shapes/' + block.shape + '.png'),
                x,
                y,
                zoom_selected,
                zoom_selected
            );
        }


        ctx.fillStyle='rgba(255,255,255,'+(1-block.opacity)+')';
        ctx.fillRect(x,y,zoom_selected,zoom_selected);




        /*ctx.rect(
            x,
            y,
            zoom_selected,
            zoom_selected
        );*/


        ctx.stroke();

    });







    /*let $admin_world_basement = $('#admin-world-basement');
    $admin_world_basement.html('');
    let storey_selected_basement = (parseInt(storey_selected)-1)+'NP';
    objects_world.forEach(function (object) {
        if(object.storey!==storey_selected_basement)return;
        $admin_world_basement.append('\n').append(createObject$(GALLERY.Objects.Object.init(object)));
    });*/




    let $admin_world = $('#admin-world');
    $admin_world.html('');
    objects_world.forEach(function (object) {
        //if(object.storey!==storey_selected)return;
        $admin_world.append('\n').append(createObject$(GALLERY.Objects.Object.init(object)));
    });







    $admin_world.disableSelection();

    let $blocks= $admin_world.find('.block');
    let $blocks_gates= $admin_world.find('.block[data-shape="gate"]');
    let $images= $admin_world.find('.image, .poster, .button');
    let $stairs= $admin_world.find('.stairs');


    let $dot_objects= $admin_world.find(DOT_OBJECTS.map(function (item) {return('.'+item);}).join(', '));


    $dot_objects.css('z-index',2);
    $('.zone,.groundhole').css('z-index',1);



    /*$admin_world.mousemove(function (e) {
        var position = getPositionFromLeftTop(e.clientX,e.clientY);
        document.title = isWallOn(05-objects,position);
    });*/




    //----------------------------------------------------------------------------SELECTING
    let $dot = $('#dot');
    let $selected_properties = $('#selected-properties');


    let select_callback = function () {

        unselect_callback();

        $this = $(this);


        let id = $this.attr('id');
        let object = objects.getObjectById(id);




        r(object);

        selected_object = object;


        $dot.css('position', 'absolute');
        $dot.css('top', object.position.y * zoom_selected + window_center.y-5);
        $dot.css('left', object.position.x * zoom_selected + window_center.x-5);



        let offset = $this.offset();
        let width = $this.outerWidth();
        let height = $this.outerHeight();


        $admin_world.find('div').addClass('not-selected-object').css('z-index','');
        $this.removeClass('not-selected-object');



        $selected_properties.html('');
        $selected_properties.append('<legend>Objekt</legend>');
        $selected_properties.append(
            '<div class="field">' +
            '<label>id</label>' +
            object.id +
            '</div>'
        );



        let input_element,$input_element;
        let check_element,$check_element;


        for(var key in object){



            input_element=null;
            check_element=null;


            input_element = object.getEditorInputHtml(key);

            /*if(!input_element) {
                if (['name', 'design', 'uri', 'next', 'parent', 'key', 'href', 'target', 'world', 'material', 'skybox', 'ground', 'url', 'server', 'username', 'password', 'directory', 'domain', 'endlessStructuresFromStorey'].indexOf(key) !== -1) {
                    input_element = '<input type="text">';
                } else if (['script', 'html', 'buttons', 'selector'].indexOf(key) !== -1) {
                    input_element = ' <textarea></textarea>';
                } else if (key == 'intensity') {
                    input_element = '<input type="range" min="0.1" max="5" step="0.1">';
                } else if (key == 'opacity') {
                    input_element = '<input type="range" min="0" max="1" step="0.1">';
                } else if (key == 'radius') {
                    input_element = '<input type="range" min="0.4" max="5" step="0.1">';
                } else if (key == 'size') {
                    input_element = '<input type="range" min="0.2" max="10" step="0.02">';
                } else if (key == 'width' || key == 'height') {
                    input_element = '<input type="range" min="0.2" max="25" step="0.02">';
                } else if (key == 'fogDensity') {
                    input_element = '<input type="range" min="0" max="0.05" step="0.0001">';
                } else if (key == 'color' || key == 'fogColor' || key == 'clearColor') {
                    input_element = '<input type="color">';
                } else if (key == 'skyboxSize' || key == 'uri_level') {
                    input_element = '<input type="number">';
                } else if (key == 'rotation'/!* && (object.type!=='image' && object.onGround!=='image' )*!/) {
                    input_element = '<input type="range" min="0" max="360" step="10">';
                } else if (key == 'rotationSpeed') {
                    input_element = '<input type="number" min="-360" max="360" step="1">';
                } else if (/!*['onGround','hasAlpha','isEmitting','checkCollisions','isFull'].indexOf(key)!==-1*!/typeof object[key] === "boolean") {

                    check_element = '<input type="checkbox">';
                }
            }*/



            if(input_element) {

                $input_element = $(input_element);

                //r($input_element,object[key]);
                //r(object[key]);
                //$input_element.val(object[key]);

                r($input_element,object[key]);

                if($input_element.prop("tagName")=='INPUT'){//todo better

                    if($input_element.attr('type')!=='checkbox'){
                        $input_element.attr('value',object[key]);
                    }else{
                        if(object[key])$input_element.attr('checked','checked');
                    }



                }else{
                    $input_element.text(object[key]);
                }


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





            if(check_element) {


                $check_element = $(check_element);

                if(object[key]){
                    $check_element.attr('checked','checked');
                }
                $check_element.attr('data-id',id);
                $check_element.attr('data-key',key);

                check_element = $check_element.outerHTML();


                $selected_properties.append(
                    '<div class="field">' +
                    '<label>'+ check_element + key + '</label>' +
                    '</div>'
                );
            }
        }





        let save_callback = function () {

            createMap();
            save();

            var $this = $(this);

            r($this);

            if($this.attr('type')!=='checkbox') {

                var val = $this.val();

                if(val/1 == val){
                    val = val/1;
                }


                var id = $this.attr('data-id');
                var key = $this.attr('data-key');

                var object = objects.getObjectById(id);
                object[key] = val;


            }else{

                var val = $this.prop('checked');
                var id = $this.attr('data-id');
                var key = $this.attr('data-key');

                var object = objects.getObjectById(id);
                object[key] = val;

            }


            r(object);


        };
        $selected_properties.find('input, textarea').change(save_callback);
        $selected_properties.find('input, textarea').keyup(save_callback);
        //$selected_properties.find('input, textarea').keypress(function(){let self = this;setTimeout(save_callback.call(self),50)});







        $selected_properties.show();




        $delete_button = $('<button>Smazat</button>');
        $delete_button.click(function () {
            objects.removeObjectById(id);
            $selected_properties.hide();
            saveAndRedraw();
        });


        $selected_properties.append($delete_button);





        $delete_button = $('<button>Duplikovat</button>');
        $delete_button.click(function () {
            let object = objects.getObjectById(id);
            let new_object = object.clone();

            new_object.id = createGuid();
            new_object.position.x += 1;
            new_object.position.y += 1;

            objects.push(new_object);

            $selected_properties.hide();
            saveAndRedraw();

            r($('#'+new_object.id));
            $('#'+new_object.id).trigger('mousedown');
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
    let unselect_callback = function () {


        selected_object = null;
        $('.not-selected-object').removeClass('not-selected-object');
        $selected_properties.hide();
    };

    $blocks_gates.mousedown(select_callback);
    $images.mousedown(select_callback);
    $stairs.mousedown(select_callback);



    $dot_objects.mousedown(select_callback);



    //----------------------------------------------------------------------------





    //----------------------------------------------------------------------------BLOCKS drawing
    let drawing_x,drawing_y,drawing_objects;
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

        drawing_x = Math.round(( event.clientX -window_center.x  ) / zoom_selected );//+0.5;
        drawing_y = Math.round(( event.clientY -window_center.y  ) / zoom_selected );//+0.5;


        drawing_objects=[];



        r('material: '+material_selected+' | shape: '+shape_selected)

    });


    let admin_world_mousemove;
    $admin_world.unbind('mousemove').mousemove(admin_world_mousemove = function (event) {


        if(!drawing)return;


        //r('drawing rect');
        //r( event.clientY -window_center.y );

        var stop_x = Math.round(( event.clientX -window_center.x ) / zoom_selected );//+0.5;
        var stop_y = Math.round(( event.clientY -window_center.y ) / zoom_selected );//+0.5;

        size_x = Math.abs(stop_x-drawing_x);
        size_y = Math.abs(stop_y-drawing_y);


        signum_x = (stop_x-drawing_x)>0?1:-1;
        signum_y = (stop_y-drawing_y)>0?1:-1;


        drawing_objects.forEach(function (object) {
            $('#'+object.id).remove();
        });
        drawing_objects=new GALLERY.Objects.Array();


        for(var y=0;y<=size_y;y++){
            for(var x=0;x<=size_x;x++){


                let shape:string;

                if(shape_selected == 'wall'){

                    shape = ((x==0 || y==0 || x==size_x || y==size_y)?'wall':'room');

                }else
                if(shape_selected == 'combo-wall'){

                    shape = (x+y)%2?'medium-fence':'big-fence';//((x==0 || y==0 || x==size_x || y==size_y)?'wall':'room');

                }else{

                    shape = shape_selected;

                }




                var object = {
                    id: createGuid(),
                    type: 'block',
                    position: {
                        x: drawing_x +x*signum_x,
                        y: drawing_y +y*signum_y
                    },
                    world: world_selected,
                    storey: storey_selected,
                    material: material_selected,
                    opacity: opacity_selected,
                    shape: shape

                };


                if(shape_selected=='gate'){
                    object.key_type = 'blue';
                }



                //05-objects.push(object);
                drawing_objects.push(object);

                $admin_world.append('\n').append(createObject$(GALLERY.Objects.Object.init(object)));//todo use also in pallete



            }
        }




    });

    $admin_world.unbind('mouseup').mouseup(function (event) {


        if(!drawing)return;
        admin_world_mousemove(event);
        drawing = false;

        var removed_stat = 0;
        r(drawing_objects);





        if(drawing_objects.length === 1 && false){//todo better

            let object = drawing_objects.getAll()[0];
            let object_on_position = objects.getBlockOnPosition(object.position, object.storey, object.world);

            if(object_on_position){

                shape_selected = object_on_position.shape;
                material_selected = object_on_position.material;
                opacity_selected = object_on_position.opacity;

            }else{

                shape_selected = 'none';

            }



        }else {


            drawing_objects.forEach(function (object) {


                if (object.shape == 'current') {

                    let object_on_position = objects.getBlockOnPosition(object.position, object.storey, object.world);
                    if (object_on_position) {
                        object_on_position.material = object.material;
                        object_on_position.opacity = object.opacity;
                    }

                } else {

                    removed_stat += objects.removeBlockOnPosition(object.position, object.storey, object.world) ? 1 : 0;

                    if (object.shape !== 'none') {
                        objects.push(object);
                    }

                }


            });

            r('removed ' + removed_stat + ' objects');



            save();


        }

        createMap();


    });

    //----------------------------------------------------------------------------



    //----------------------------------------------------------------------------LIGHTS, LABELS,TREES drag
    let drag_normal_options = {


        drag: function(){
        },
        stop: function () {


            var offset = $(this).offset();
            var position = getPositionFromLeftTop(offset.left,offset.top);


            var id = $(this).attr('id');
            var object = objects.getObjectById(id);
            object.position = position;

            //select_callback.call(this);

            //createMap();
            save();


        }


    };
    $dot_objects.draggable(drag_normal_options);
    //----------------------------------------------------------------------------



    //----------------------------------------------------------------------------STAIRS drag
    let drag_stairs_options = {

        //grid: [zoom_selected/2,zoom_selected/2],
        //snap: ".block[data-shape='wall']",
        //snapMode: "outer",

        drag: function(e, ui){


            ui.position.left = (Math.floor((ui.position.left-window_center.x) / zoom_selected )+0.5) * zoom_selected+window_center.x;
            ui.position.top  = (Math.floor((ui.position.top -window_center.y) / zoom_selected )+0.5) * zoom_selected+window_center.y;





            /*let grid = zoom_selected/2;
            let offset = {
                x: 0,//todo wth -4
                y: zoom_selected/2
            };


            ui.position.left = Math.floor((ui.position.left+offset.x)/grid)*grid-offset.x;
            ui.position.top = Math.floor((ui.position.top+offset.y)/grid)*grid-offset.y;*/




        },
        stop: function () {


            var offset = $(this).offset();
            var position = getPositionFromLeftTop(offset.left,offset.top);


            var id = $(this).attr('id');
            var object = objects.getObjectById(id);
            object.position = position;

            //select_callback.call(this);

            //createMap();
            save();


        }


    };
    $stairs.draggable(drag_stairs_options);
    //----------------------------------------------------------------------------



    //----------------------------------------------------------------------------IMAGES
    let drag_snap_options = {

        grid: [ zoom_selected/2, zoom_selected/2 ],

        //snap: ".block[data-shape='wall']",
        //snap: ".block",
        //snapMode: "outer",
        //snapTolerance: 10,

        drag: function(event,ui){

            //r('drag');

            //ui.position.left = (Math.floor((ui.position.left-window_center.x) / zoom_selected *2 )/2+0.5) * zoom_selected+window_center.x;
            //ui.position.top  = (Math.floor((ui.position.top -window_center.y) / zoom_selected *2 )/2+0.5) * zoom_selected+window_center.y;



            var draggable = $(this).data("ui-draggable");
            draggable._trigger("snapped", event, ui);



        },
        stop: function (event,ui) {


            var offset = $(this).offset();
            var position = getPositionFromLeftTop(offset.left-7,offset.top);//todo wth -7

            position.x=Math.round(position.x*2)/2;
            position.y=Math.round(position.y*2)/2;



            var id = $(this).attr('id');
            var object = objects.getObjectById(id);


            object.position = position;


            select_callback.call(this);
            save();//todo refactor to function

        },



        /*drag: function(event, ui) {
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
        },*/
        snapped: function(event, ui) {


            /*r(event);
            $(event.toElement).css("border",'1px solid red');
            $(event.toElement).css("z-index",'10000');

            setTimeout(function () {

                $(event.toElement).css("border",'none');
                $(event.toElement).css("z-index",'10');

            },3000);*/



            var id = $(this).attr('id');
            var object = objects.getObjectById(id);


            if(object.onGround){
                return;
            }


            var offset = $(this).offset();
            var position = getPositionFromLeftTop(offset.left-7,offset.top);//todo wtf 7

            position.x=Math.round(position.x*2)/2;
            position.y=Math.round(position.y*2)/2;


            object.position = position;



            var rotation = GALLERY.Objects.Block.wallRotation(objects, position, storey_selected);
            var rotation_rad = rotation/180*Math.PI;

            //r(position,rotation);

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