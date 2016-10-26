/// <reference path="../../reference.ts" />

namespace GALLERY.Objects{

    export class Zone extends Object{

        public storey: string;
        public width: number;
        public height: number;


        public html: string;
        public selector: string;




        constructor(object){

            super(object);

            this.width = this.width || 5;
            this.height = this.height || 5;
            this.html = this.html || '';
            this.selector = this.selector || '';

        }



        create$Element(){



            var $element = this._create$Element();
            let object = this;


            var $block = $('<div>').addClass('image');


            var width = object.width*zoom_selected;
            var height = object.height*zoom_selected;

            $block.css('width',width);
            $block.css('height',height);
            $block.css('background-color','rgba(0,0,0,0.5)');


            $block.css('position','relative');
            $block.css('top',-height/2);
            $block.css('left',-width/2);

            $block.css('transform','rotate('+object.rotation+'deg)');


            $element.append($block);
            //$element.css('transform','rotate('+object.rotation+'deg)');


            return $element;

        }



        /*createBabylonMesh(BABYLON){


        }*/





    }

}