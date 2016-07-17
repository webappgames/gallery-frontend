/**
 * Created by hejny on 17.7.16.
 */

function createObjectHTML(object) {
    
    var html='';

    //todo class should be only object!

    if(object.type == 'block' || object.type == 'light'){

        //todo: shape || intensity, color
        html += '<div class="block" data-type="block" data-material="' + object.material + '" data-x="' + object.position.x + '" data-y="' + object.position.y + '">';
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

}