/// <reference path="../../reference.ts" />

namespace GALLERY.Objects{

    export class Link extends Object{

        public storey: string;
        public radius: number;
        public href: string;
        public script: string;
        public target: string;
        public color: string;
        public hidden: boolean;


        constructor(object){

            super(object);

            this.radius = this.radius || 1;
            this.href = this.href || '/';
            this.script = this.script || '';
            this.target = this.target || '';
            this.color = this.color || '#00ff00';
            this.hidden = this.hidden || false;


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