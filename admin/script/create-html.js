/**
 * Created by hejny on 17.7.16.
 */

function createObject$(object) {

    var element = '<div></div>';

    var $element = $(element);


    $element.css('position', 'absolute');

    if(object.type=='image'){

        $element.css('top',  object.position.y * FIELD_SIZE  + window_height / 2);
        $element.css('left', object.position.x * FIELD_SIZE  + window_width  / 2);

    }else{

        $element.css('top',  ( object.position.y -0.5 ) * FIELD_SIZE  + window_height / 2);
        $element.css('left', ( object.position.x -0.5 ) * FIELD_SIZE  + window_width  / 2);

    }


    $element.attr('class',object.type);
    $element.attr('id',object.id);
    $element.attr('data-shape',object.shape);
    /*for(var key in object){
        if(typeof object[key] === 'object'){

            $element.attr('data-'+key,JSON.stringify(object[key]));

        }else{

            $element.attr('data-'+key,object[key]);

        }

    }*/


    //$element.attr('data-json',JSON.stringify(object));



    if(object.type === 'image'){
        $element.html('<img>');
    }

    /*if(object.type === 'image' || object.type === 'light') {
        $element.append('<i class="delete fa fa-trash" aria-hidden="true"></i>');
    }*/


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