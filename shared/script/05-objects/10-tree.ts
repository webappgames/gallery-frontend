/// <reference path="../../reference.ts" />


namespace GALLERY.Objects{

    export class Tree extends Object{




        create$Element(){



            var $element = this._create$Element();
            let object = this;


            $element.html('<i class="fa fa-pagelines" aria-hidden="true"></i>');



            return $element;

        }





    }

}