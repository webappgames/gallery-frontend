


namespace GALLERY.Objects{

    export class Stairs extends Object{




        static create$Element(){



            var $element = super();
            let object = this;


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


            return $element;

        }





    }

}