/// <reference path="../../reference" />

module GALLERY.Objects{

    export class Stairs extends Object{

        public storey: string;
        public material: string;
        public width: number;
        public height: number;
        public rotation: number;
        public isFull: boolean;
        public opacity: number;



        constructor(object){

            super(object);

            this.material = this.material || '#cccccc';
            this.width = this.width || 10;
            this.height = this.height || 2;
            this.rotation = this.rotation || 0;
            this.isFull = this.isFull || false;
            this.opacity = this.opacity || 1;

        }

        getEditorInputHtml(key:string):string{

            switch(key) {
                case 'material':
                    return('<input type="text">');
                case 'width':
                    return('<input type="number">');
                case 'height':
                    return('<input type="number">');
                case 'rotation':
                    return('<input type="number">');
                case 'isFull':
                    return('<input type="checkbox">');
                case 'opacity':
                    return('<input type="number">');
                default:
                    return(super.getEditorInputHtml(key));
            }

        }


        create$Element(){



            var $element = this._create$Element();
            let object = this;


            var $image = $('<img>').addClass('image');


            var width = object.width*zoom_selected;
            var height = object.height*zoom_selected;

            $image.css('width',width);
            $image.css('height',height);

            $image.attr('src','/media/images/icons/stairs.jpg');

            $image.css('position','relative');
            $image.css('top',-height/2);
            $image.css('left',-width/2);

            $image.css('transform','rotate('+object.rotation+'deg)');


            $element.append($image);
            //$element.css('transform','rotate('+object.rotation+'deg)');


            return $element;

        }





    }

}