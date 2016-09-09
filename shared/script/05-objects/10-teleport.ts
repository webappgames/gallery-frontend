/// <reference path="../reference.ts" />

namespace GALLERY.Objects{

    export class Teleport extends Object{


        public radius: number;
        public href: string;
        public target: string;


        create$Element(){



            var $element = this._create$Element();
            let object = this;


            let $inner = $('<i class="fa fa-external-link" aria-hidden="true"></i>');


            $inner.css('width',object.radius * zoom_selected);
            $inner.css('height',object.radius * zoom_selected);

            $inner.css('border-radius',object.radius * zoom_selected);

            $inner.css('border','2px solid #000');



            $element.append($inner);

            return $element;

        }





    }

}