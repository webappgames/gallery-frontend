/// <reference path="../../../lib/jquery.d.ts" />


namespace GALLERY.Objects{

    export class Light extends Object{




        static create$Element(){



            var $element = super();
            let object = this;

            $element.html('<i style="color:'+object.color+';" class="fa fa-sun-o" aria-hidden="true"></i>');


            return $element;

        }





    }

}