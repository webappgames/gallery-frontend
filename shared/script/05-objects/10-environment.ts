/// <reference path="../../reference.ts" />

namespace GALLERY.Objects{

    export class Environment extends Object{


        public ground: string;
        public skybox: string;
        public skybox_reverse: boolean;
        public fogDensity: number;
        public fogColor: string;



        constructor(object){

            super(object);

            this.ground = this.ground || 'grass';
            this.skybox = this.skybox || 'TropicalSunnyDay';
            this.skybox_reverse = this.skybox_reverse || false;
            this.fogDensity = this.fogDensity || 0;
            this.fogColor = this.fogColor || '#ffffff';


        }

        create$Element(){



            var $element = this._create$Element();
            let object = this;


            $element.html('<i class="fa fa-cube" aria-hidden="true"></i>');

            return $element;

        }





    }

}