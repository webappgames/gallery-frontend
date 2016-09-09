/// <reference path="../reference.ts" />

namespace GALLERY.Objects{

    export class Light extends Object{




        create$Element(){



            var $element = this._create$Element();
            let object = this;

            $element.html('<i style="color:'+object.color+';" class="fa fa-sun-o" aria-hidden="true"></i>');


            return $element;

        }





    }

}