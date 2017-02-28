/// <reference path="../../reference" />

module GALLERY.Objects{

    export class Label extends Object{


        public storey: string;
        public name: string;
        public uri: string;
        public next: string;
        public rotation: number;
        public rotationNotImportant: boolean;
        public rotationSpeed: number;


        constructor(object){

            super(object);

            this.name = this.name || '';
            this.uri = this.uri || '';
            this.next = this.next || 'none';
            this.rotation = this.rotation || 0;
            this.rotationNotImportant = this.rotationNotImportant || false;
            this.rotationSpeed = this.rotationSpeed || 0;

        }

        getEditorInputHtml(key:string):string{

            switch(key) {
                case 'name':
                    return('<input type="text">');
                case 'uri':
                    return('<input type="text">');
                case 'next':
                    return('<input type="text">');
                case 'rotation':
                    return('<input type="number">');
                case 'rotationNotImportant':
                    return('<input type="checkbox">');
                case 'rotationSpeed':
                    return('<input type="number">');
                default:
                    return(super.getEditorInputHtml(key));
            }

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