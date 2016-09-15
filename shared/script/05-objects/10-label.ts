/// <reference path="../../reference.ts" />

namespace GALLERY.Objects{

    export class Label extends Object{




        create$Element(){



            var $element = this._create$Element();
            let object = this;


            // style="transform: rotate('+object.rotation+'deg);"
            $element.html('<i class="fa fa-arrow-circle-o-up" aria-hidden="true"></i>');

            $element.css('transform','rotate('+object.rotation+'deg)');



            return $element;

        }





    }

}