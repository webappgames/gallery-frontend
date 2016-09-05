


namespace GALLERY.Objects{

    export class Block extends Object{




        static create$Element(){



            var $element = super();
            let object = this;


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


            return $element;

        }





    }

}