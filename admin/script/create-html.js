/**
 * Created by hejny on 17.7.16.
 */

function createObject$(object) {

    var element = '<div></div>';

    var $element = $(element);


    $element.attr('class',object.type);
    for(var key in object){
        $element.attr('data-'+key,object[key]);
    }

    $element.attr('data-json',JSON.stringify(object));


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