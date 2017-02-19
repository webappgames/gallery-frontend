/// <reference path="../../reference.ts" />
//import {Zone} from '10-zone';

namespace GALLERY.Objects{

    export class Environment extends Zone{


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



        getEditorInputHtml(key:string):string{

            switch(key) {
                case 'ground':
                    return('<input type="text">');
                case 'skybox':
                    return('<input type="text">');
                case 'skyboxSize':
                    return('<input type="number">');
                case 'skybox_reverse':
                    return('<input type="checkbox">');
                case 'fogDensity':
                    return('<input type="range" min="0" max="0.05" step="0.0001">');
                case 'fogColor':
                    return('<input type="color">');
                case 'clearColor':
                    return('<input type="color">');
                case 'endlessStructures':
                    return('<input type="checkbox">');
                case 'endlessStructuresFromStorey':
                    return('<input type="text">');
                case 'shadows':
                    return('<input type="checkbox">');

                default:
                    return(super.getEditorInputHtml(key));
            }

        }


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


        }

        create$Element(){



            var $element = this._create$Element();
            let object = this;


            $element.html('<i class="fa fa-cube" aria-hidden="true"></i>');

            return $element;

        }

        createBabylonMesh(scene) {
            return null;
        }


        isIn(){
            return true;
        }



        /*createVirtualObjects():Objects.Array {

            let virtualObjects = new Objects.Array([new Objects.Zone({

                id: createGuid(),
                type: 'zone',
                world: this.world,
                storey: this.storey,
                position: {
                    x: 0,
                    y: 0,
                },
                width: 500,
                height: 500,

                design: this.design,
                name: this.name,
                html: this.html,
                buttons: this.buttons,
                uri: 'none',
                uri_level: 1,//todo better low priority

                isImportant: true

            })]);


            return (virtualObjects);

        }*/




}