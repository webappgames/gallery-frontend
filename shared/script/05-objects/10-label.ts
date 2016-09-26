/// <reference path="../../reference.ts" />

namespace GALLERY.Objects{

    export class Label extends Object{


        public storey: string;
        public name: string;
        public uri: string;
        public rotation: number;


        constructor(object){

            super(object);

            this.name = this.name || '';
            this.uri = this.uri || '';
            this.rotation = this.rotation || 0;

        }

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