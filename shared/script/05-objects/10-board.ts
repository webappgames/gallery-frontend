/// <reference path="../../reference.ts" />


namespace GALLERY.Objects{

    export class Board extends Object{


        public storey: string;
        public html: string;



        constructor(object){

            super(object);

            this.html = this.html || '';
        }




        create$Element(){



            var $element = this._create$Element();
            let object = this;


            $element.html('<i class="fa fa-file-text-o" aria-hidden="true"></i>');



            return $element;

        }





    }

}