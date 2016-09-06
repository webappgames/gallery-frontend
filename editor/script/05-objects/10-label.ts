/// <reference path="../../../lib/jquery.d.ts" />


namespace GALLERY.Objects{

    export class Label extends Object{




        static create$Element(){



            var $element = super();
            let object = this;


            // style="transform: rotate('+object.rotation+'deg);"
            $element.html('<i class="fa fa-arrow-circle-o-up" aria-hidden="true"></i>');

            $element.css('transform','rotate('+object.rotation+'deg)');



            return $element;

        }





    }

}