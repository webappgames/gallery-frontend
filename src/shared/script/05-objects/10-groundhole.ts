/// <reference path="../../reference.ts" />

module GALLERY.Objects{

    export class GroundHole extends Object{

        public width: number;
        public height: number;




        constructor(object){

            super(object);

            this.width = this.width || 1;
            this.height = this.height || 1;

        }


        getEditorInputHtml(key:string):string{

            switch(key) {
                case 'width':
                    return('<input type="number">');
                case 'height':
                    return('<input type="number">');
                default:
                    return(super.getEditorInputHtml(key));
            }

        }



        create$Element(){



            var $element = this._create$Element();
            let object = this;


            var $block = $('<div>').addClass('image');


            var width = object.width*zoom_selected;
            var height = object.height*zoom_selected;

            $block.css('width',width);
            $block.css('height',height);
            $block.css('background-color','rgba(0,0,100,0.5)');


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