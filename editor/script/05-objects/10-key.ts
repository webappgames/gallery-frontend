/// <reference path="../reference.ts" />

namespace GALLERY.Objects{

    export class Key extends Object{




        create$Element(){



            var $element = this._create$Element();
            let object = this;


            $element.html('<i class="fa fa-key" aria-hidden="true"></i>');


            return $element;

        }





    }

}