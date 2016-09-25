/// <reference path="../../reference.ts" />

namespace GALLERY.Objects{

    export class Gate extends Object{




        public size: number;
        public rotation: number;
        public color: string;
        public key: string;



        constructor(object){

            super(object);

            this.size = this.size || 2;
            this.rotation = this.rotation || 0;
            this.color = this.color || '#00ff00';
            this.key = this.key || '#green';

        }





        create$Element(){



            var $element = this._create$Element();
            let object = this;



            if(typeof object.size !== 'undefined'){

                //todo all like this


                $element.css('width','0px');
                $element.css('height','0px');
                $element.css('transform','rotate('+object.rotation+'deg)');

                let $square = $('<span></span>');



                $square.css('display','block');
                $square.css('width',object.size * zoom_selected);
                $square.css('transform','translate(-50%, -50%)');
                $square.css('height',5);

                $square.css('background-color',object.color);

                $element.append($square);

            }else{


                $element.css('width',20);
                $element.css('height',20);

                $element.css('background-color','#ccc');


            }




            return $element;

        }



    }

}