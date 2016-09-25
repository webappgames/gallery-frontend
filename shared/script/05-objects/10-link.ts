/// <reference path="../../reference.ts" />

namespace GALLERY.Objects{

    export class Link extends Object{


        public radius: number;
        public href: string;
        public target: string;
        public color: string;


        constructor(object){

            super(object);

            this.radius = this.radius || 1;
            this.href = this.href || '/';
            this.target = this.target || '';
            this.color = this.color || '#00ff00';


        }



        create$Element(){



            var $element = this._create$Element();
            let object = this;


            let $inner = $('<i class="fa fa-key" aria-hidden="true"></i>');


            $inner.css('width',object.radius * zoom_selected);
            $inner.css('height',object.radius * zoom_selected);

            $inner.css('border-radius',object.radius * zoom_selected);

            $inner.css('border','2px solid #000');



            $element.append($inner);

            return $element;

        }



    }

}