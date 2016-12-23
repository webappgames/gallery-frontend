/// <reference path="../../reference.ts" />

namespace GALLERY.Objects{

    export class Environment extends Object{


        public ground: string;
        public skybox: string;
        public skyboxSize: number;
        public skybox_reverse: boolean;//todo camelCase
        public fogDensity: number;
        public fogColor: string;
        public clearColor: string;
        public endlessStructures: boolean;
        public endlessStructuresFromStorey: string;
        public shadows: boolean;

        public design: string;
        public name: string;
        public html: string;
        public buttons: string;



        constructor(object){

            super(object);

            this.ground = this.ground || 'grass';
            this.skybox = this.skybox || 'TropicalSunnyDay';
            this.skyboxSize = this.skyboxSize || 10000;
            this.skybox_reverse = this.skybox_reverse || false;
            this.fogDensity = this.fogDensity || 0;
            this.fogColor = this.fogColor || '#ffffff';
            this.clearColor = this.clearColor || '#ffffff';
            this.endlessStructures = this.endlessStructures || false;
            this.endlessStructuresFromStorey = this.endlessStructuresFromStorey || '1NP';
            this.shadows = this.shadows || false;

            this.design = this.design || 'board';
            this.name = this.name || '';
            this.html = this.html || '';
            this.buttons = this.buttons || '';


        }

        create$Element(){



            var $element = this._create$Element();
            let object = this;


            $element.html('<i class="fa fa-cube" aria-hidden="true"></i>');

            return $element;

        }





    }

}