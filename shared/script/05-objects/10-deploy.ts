/// <reference path="../../reference.ts" />

namespace GALLERY.Objects{

    export class Deploy extends Object{


        public url: string;
        public password: string;




        constructor(object){

            super(object);

            this.name = this.name || '';
            this.url = this.url || '';
            this.password = this.password || '';


        }

        create$Element(){



            var $element = this._create$Element();
            let object = this;


            $element.html('<i class="fa fa-cloud-upload" aria-hidden="true"></i>');

            return $element;

        }





    }

}