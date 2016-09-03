/**
 * Created by hejny on 17.7.16.
 */

function createObject$(object) {

    var element = '<div></div>';

    var $element = $(element);


    if(typeof object.position!=='undefined') {

        $element.css('position', 'absolute');

        //if (object.type !== 'image') {

            $element.css('top', object.position.y * zoom_selected + window_center.y);
            $element.css('left', object.position.x * zoom_selected + window_center.x);

        /*} else {

            $element.css('top', ( object.position.y - 0.5 ) * zoom_selected + window_center.y);
            $element.css('left', ( object.position.x - 0.5 ) * zoom_selected + window_center.x);

        }*/

    }


    $element.attr('class',object.type);
    $element.attr('id',object.id);
    $element.attr('data-shape',object.shape);
    $element.attr('data-material',object.material);



    $element.css('width', zoom_selected);
    $element.css('height',zoom_selected);


    /*for(var key in object){
        if(typeof object[key] === 'object'){

            $element.attr('data-'+key,JSON.stringify(object[key]));

        }else{

            $element.attr('data-'+key,object[key]);

        }

    }*/


    //$element.attr('data-json',JSON.stringify(object));





    if(object.type === 'block'){

        object.material = object.material || 'stone-plain';

        $element.css('background','url("/images/textures/'+object.material+'.jpg")');
        $element.css('background-size','cover');

        if(['window','door'].indexOf(object.shape)!=-1) {

            $element.html('<img src="/images/icons/' + object.shape + '.svg">');


            $element.css('background-color', 'rgba(0,0,0,0.5)');
            $element.css('background-blend-mode', 'overlay');

        }else
        if(object.shape=='room'){

            $element.css('background-color','rgba(0,0,0,0.5)');
            $element.css('background-blend-mode','overlay');

        }else
        if(object.shape=='none'){

            $element.css('background','none');
            $element.html('<i class="fa fa-times" aria-hidden="true"></i>');
            $element.css('background-color','transparent');

        }


    }else
    if(object.type === 'light'){
        $element.html('<i style="color:'+object.color+';" class="fa fa-sun-o" aria-hidden="true"></i>');
    }else

    if(object.type === 'label'){
        // style="transform: rotate('+object.rotation+'deg);"
        $element.html('<i class="fa fa-arrow-circle-o-up" aria-hidden="true"></i>');

        $element.css('transform','rotate('+object.rotation+'deg)');


    }else
    if(object.type === 'tree'){

        $element.html('<i class="fa fa-pagelines" aria-hidden="true"></i>');

    }else
    if(object.type === 'image'){

        var $image_0 = $('<img>').addClass('image-0').hide();
        var $image_90 = $('<img>').addClass('image-90').hide();
        var $image_180= $('<img>').addClass('image-180').hide();
        var $image_270 = $('<img>').addClass('image-270').hide();


        $image_0.css('height',object.height*zoom_selected);
        $image_180.css('height',object.height*zoom_selected);
        $image_90.css('width',object.height*zoom_selected);
        $image_270.css('width',object.height*zoom_selected);


        var src = object.src;
        var src_uri = URI(src)
            .removeSearch("width");
        var src_normal = src_uri.addSearch({ width: 100 }).toString();



        $image_0.attr('src',src_normal);
        $image_90.attr('src',src_normal+'&rotation=90');
        $image_180.attr('src',src_normal+'&rotation=180');
        $image_270.attr('src',src_normal+'&rotation=270');


        //rotateImage($image_90[0],90);
        //rotateImage($image_180[0],180);
        //rotateImage($image_270[0],270);


        if(object.rotation === 0)$image_0.show(); else
        if(object.rotation === 90)$image_90.show(); else
        if(object.rotation === 180)$image_180.show(); else
        if(object.rotation === 270)$image_270.show(); else
            $image_0.show();




        $element.append($image_0);
        $element.append($image_90);
        $element.append($image_180);
        $element.append($image_270);
    }else
    if(object.type === 'stairs'){

        var $image = $('<img>').addClass('image');


        var width = object.width*zoom_selected;
        var height = object.height*zoom_selected;

        $image.css('width',width);
        $image.css('height',height);

        $image.attr('src','/images/icons/stairs.jpg');

        $image.css('position','relative');
        $image.css('top',-height/2);
        $image.css('left',-width/2);

        $image.css('transform','rotate('+object.rotation+'deg)');


        $element.append($image);
        //$element.css('transform','rotate('+object.rotation+'deg)');


    }



    return($element);



    //todo class should be only object!
    /*
    if(object.type == 'block'){

        //todo:  || intensity, color
        html += '<div class="block" data-type="block" data-shape="' + object.shape + '" data-x="' + object.position.x + '" data-y="' + object.position.y + '">';
        html += '';
        html += '</div>';
    
    }else
    if(object.type == 'light'){

        html += '<div class="light" data-type="light" data-intensity="' + object.intensity + '" data-color="' + object.color + '" data-x="' + object.position.x + '" data-y="' + object.position.y + '">';
        html += '';
        html += '</div>';

    }else
    if(object.type == 'image'){


        //todo size
        html += '<div class="image" data-type="image" data-src="' + object.src + '" data-name="' + object.name + '" data-x="' + object.position.x + '" data-y="' + object.position.y + '">';
        html += '';
        html += '</div>';

    }

    return(html);
    /**/

}