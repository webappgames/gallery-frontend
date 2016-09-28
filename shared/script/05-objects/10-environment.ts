/// <reference path="../../reference.ts" />

namespace GALLERY.Objects{

    export class Environment extends Object{


        public ground: string;
        public skybox: string;



        constructor(object){

            super(object);

            this.ground = this.ground || 'grass';
            this.skybox = this.skybox || 'TropicalSunnyDay';


        }

        create$Element(){



            var $element = this._create$Element();
            let object = this;


            $element.html('<i class="fa fa-cube" aria-hidden="true"></i>');

            return $element;

        }





    }

}