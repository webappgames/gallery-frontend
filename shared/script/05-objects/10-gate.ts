/// <reference path="../reference.ts" />

namespace GALLERY.Objects{

    export class Gate extends Object{


    public size: number;
    public rotation: number;


        create$Element(){



            var $element = this._create$Element();
            let object = this;


            let $inner = $('<img src="/images/icons/gate.svg">');


            $inner.css('width',object.size * zoom_selected);
            $element.css('transform','rotate('+object.rotation+'deg)');
            $inner.css('height',5);

            $inner.css('background-color',object.color);



            $element.append($inner);

            return $element;

        }



    }

}