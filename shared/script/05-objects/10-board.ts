/// <reference path="07-protoboard" />



namespace GALLERY.Objects{

    export class Board extends ProtoBoard{

        public isPerspective: boolean;



        constructor(object){

            super(object);
            this.isPerspective = this.isPerspective || false;

        }




        create$Element(){



            var $element = this._create$Element();
            let object = this;


            $element.html('<i class="fa fa-file-text-o" aria-hidden="true"></i>');



            return $element;

        }









    }

}