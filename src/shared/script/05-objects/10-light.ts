/// <reference path="../../reference.ts" />

module GALLERY.Objects{

    export class Light extends Object{

        public storey: string;
        public color: string;
        public intensity: number;


        constructor(object){

            super(object);

            this.color = this.color || '#ffffff';
            this.intensity = this.intensity || 1;

        }

        getEditorInputHtml(key:string):string{

            switch(key) {
                case 'color':
                    return('<input type="color">');
                case 'intensity':
                    return('<input type="number">');
                default:
                    return(super.getEditorInputHtml(key));
            }

        }



        create$Element(){



            var $element = this._create$Element();
            let object = this;

            $element.html('<i style="color:'+object.color+';" class="fa fa-sun-o" aria-hidden="true"></i>');


            return $element;

        }





    }

}